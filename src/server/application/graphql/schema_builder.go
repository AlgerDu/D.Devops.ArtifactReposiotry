package appgraphlql

import (
	"github.com/graphql-go/graphql"
)

type (
	SchemaBuilder struct {
		product *ProductSchemaBuilder
	}
)

func NewSchemaBuilder(
	product *ProductSchemaBuilder,
) *SchemaBuilder {
	return &SchemaBuilder{
		product: product,
	}
}

func (builder *SchemaBuilder) Build() (graphql.Schema, error) {

	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		Query: builder.query(),
	})

	return schema, err
}

func (builder *SchemaBuilder) query() *graphql.Object {

	product := builder.product.Build()

	return graphql.NewObject(graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"product": &graphql.Field{
				Type: product.Query,
				Args: graphql.FieldConfigArgument{
					"name": &graphql.ArgumentConfig{
						Type: graphql.String,
					},
				},
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					// var foo = Model{
					// 	DataBox: &domain.DataBox{
					// 		Data: map[string]any{
					// 			"type": "docker",
					// 		},
					// 	},
					// 	Name: "test",
					// }

					return func() (interface{}, error) {
						return nil, nil
					}, nil
				},
			},
		},
	})
}
