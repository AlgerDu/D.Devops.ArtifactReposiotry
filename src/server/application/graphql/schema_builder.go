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
			"product": product.QueryField,
		},
	})
}
