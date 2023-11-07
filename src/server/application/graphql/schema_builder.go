package appgraphlql

import (
	"app/src/server/infra"

	"github.com/graphql-go/graphql"
)

type (
	SchemaBuilder struct {
		logger    infra.Logger
		resolvers []Resolver
	}
)

func NewSchemaBuilder(
	logger infra.Logger,
	resolvers []Resolver,
) *SchemaBuilder {
	return &SchemaBuilder{
		logger:    logger,
		resolvers: resolvers,
	}
}

func (builder *SchemaBuilder) Build() (graphql.Schema, error) {

	ctx := &BuildContext{
		Types:          map[ObjectTypeName]*graphql.Object{},
		QueryFields:    map[string]*graphql.Field{},
		MutationFields: map[string]*graphql.Field{},
	}

	toResolveResolvers := builder.resolvers
	nextRoundResolvers := []Resolver{}

	for len(toResolveResolvers) > 0 {
		for _, resolver := range toResolveResolvers {
			depends := resolver.DependOnTypes()
			dependOk := true

			for _, dependName := range depends {
				if _, ok := ctx.Types[dependName]; !ok {
					dependOk = false
					break
				}
			}

			if !dependOk {
				nextRoundResolvers = append(nextRoundResolvers, resolver)
				continue
			}

			err := resolver.Resolve(ctx)
			if err != nil {
				return graphql.Schema{}, err
			}
		}

		toResolveResolvers = nextRoundResolvers
	}

	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		Query: graphql.NewObject(graphql.ObjectConfig{
			Name:   "Query",
			Fields: ctx.QueryFields,
		}),
		Mutation: graphql.NewObject(graphql.ObjectConfig{
			Name:   "Mutation",
			Fields: ctx.MutationFields,
		}),
	})

	return schema, err
}
