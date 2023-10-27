package appgraphlql

import (
	"app/src/server/domain"
	"app/src/server/infra"
	"errors"

	"github.com/graphql-go/graphql"
)

type (
	ProductSchema struct {
		Query      *graphql.Object
		QueryField *graphql.Field
	}

	ProductSchemaBuilder struct {
		logger      infra.Logger
		schemaRepo  *domain.SchemaRepository
		productRepo *domain.ProductRepository
	}
)

func NewProductSchemaBuilder(
	logger infra.Logger,
	schemaRepo *domain.SchemaRepository,
	productRepo *domain.ProductRepository,
) *ProductSchemaBuilder {
	return &ProductSchemaBuilder{
		logger:      logger,
		schemaRepo:  schemaRepo,
		productRepo: productRepo,
	}
}

func (builder *ProductSchemaBuilder) Build() *ProductSchema {

	productType := builder.createQuery()

	return &ProductSchema{
		Query: productType,
		QueryField: &graphql.Field{
			Type: productType,
			Args: graphql.FieldConfigArgument{
				"name": &graphql.ArgumentConfig{
					Type: graphql.String,
				},
			},
			Resolve: builder.nameResolve,
		},
	}
}

func (builder *ProductSchemaBuilder) createQuery() *graphql.Object {

	domainSchema := builder.schemaRepo.Get("product")

	return graphql.NewObject(graphql.ObjectConfig{
		Name:   "Product",
		Fields: ConvertToGraphqlFields(domainSchema),
	})
}

func (builder *ProductSchemaBuilder) nameResolve(p graphql.ResolveParams) (interface{}, error) {
	name, ok := p.Args["name"].(string)
	if !ok {
		builder.logger.WithField("name", p.Args["name"]).Error("type error")
		return nil, errors.New("param type error")
	}

	product := builder.productRepo.Get(name)
	return product, nil
}
