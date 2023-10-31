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

	product := builder.product.Build()

	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		Query: graphql.NewObject(graphql.ObjectConfig{
			Name: "Query",
			Fields: graphql.Fields{
				"product":  product.QueryField,
				"products": product.ListField,
			},
		}),
		Mutation: graphql.NewObject(graphql.ObjectConfig{
			Name: "Mutation",
			Fields: graphql.Fields{
				"createProduct": product.CreateField,
			},
		}),
	})

	return schema, err
}
