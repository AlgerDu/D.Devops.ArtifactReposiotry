package appgraphlql

import (
	"app/src/server/domain"
	"app/src/server/infra"

	"github.com/graphql-go/graphql"
)

type (
	ProductSchema struct {
		Query *graphql.Object
	}

	ProductSchemaBuilder struct {
		logger     infra.Logger
		schemaRepo *domain.SchemaRepository
	}
)

func NewProductSchemaBuilder(
	logger infra.Logger,
	schemaRepo *domain.SchemaRepository,
) *ProductSchemaBuilder {
	return &ProductSchemaBuilder{
		logger:     logger,
		schemaRepo: schemaRepo,
	}
}

func (builder *ProductSchemaBuilder) Build() *ProductSchema {
	return &ProductSchema{
		Query: builder.createQuery(),
	}
}

func (builder *ProductSchemaBuilder) createQuery() *graphql.Object {

	domainSchema := builder.schemaRepo.Get("product")

	return graphql.NewObject(graphql.ObjectConfig{
		Name:   "Product",
		Fields: ConvertToGraphqlFields(domainSchema),
	})
}
