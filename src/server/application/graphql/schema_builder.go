package appgraphlql

import (
	"app/src/server/domain"

	"github.com/graphql-go/graphql"
)

type (
	SchemaBuilder struct {
	}

	Model struct {
		*domain.DataBox
		Name string
	}
)

func NewSchemaBuilder() *SchemaBuilder {
	return &SchemaBuilder{}
}

func (builder *SchemaBuilder) Build() (graphql.Schema, error) {

	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		Query: builder.query(),
	})

	return schema, err
}

func (builder *SchemaBuilder) query() *graphql.Object {
	return graphql.NewObject(graphql.ObjectConfig{
		Name: "Query",
		Fields: graphql.Fields{
			"product": &graphql.Field{
				Type: productType,
				Resolve: func(p graphql.ResolveParams) (interface{}, error) {
					var foo = Model{
						DataBox: &domain.DataBox{
							Data: map[string]any{
								"type": "docker",
							},
						},
						Name: "test",
					}

					return func() (interface{}, error) {
						return &foo, nil
					}, nil
				},
			},
		},
	})
}

var productType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Product",
	Fields: graphql.Fields{
		"name": &graphql.Field{Type: graphql.String},
		"type": &graphql.Field{
			Type:    graphql.String,
			Resolve: Resolver_FromDataBox,
		},
	},
})
