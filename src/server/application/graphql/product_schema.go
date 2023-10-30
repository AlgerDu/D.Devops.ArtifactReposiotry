package appgraphlql

import (
	"app/src/server/domain"
	"app/src/server/infra"
	"errors"

	"github.com/graphql-go/graphql"
)

type (
	ProductSchema struct {
		Query       *graphql.Object
		QueryField  *graphql.Field
		CreateArgs  graphql.FieldConfigArgument
		CreateField *graphql.Field
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

	domainSchema := builder.schemaRepo.Get("product")
	productType := builder.createQuery(domainSchema)

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
		CreateArgs: ConvertToCreateArgs(domainSchema),
		CreateField: &graphql.Field{
			Type:    productType,
			Args:    ConvertToCreateArgs(domainSchema),
			Resolve: builder.createResolve,
		},
	}
}

func (builder *ProductSchemaBuilder) createQuery(domainSchema *domain.Schema) *graphql.Object {

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

func (builder *ProductSchemaBuilder) createResolve(p graphql.ResolveParams) (interface{}, error) {
	name, ok := p.Args["name"].(string)
	if !ok {
		builder.logger.WithField("name", p.Args["name"]).Error("type error")
		return nil, errors.New("param type error")
	}

	data := &domain.Product{
		DataBox: &domain.DataBox{
			Data: map[string]any{},
		},
		ID:   0,
		Name: name,
	}
	for k, v := range p.Args {
		data.Data[k] = v
	}

	return builder.productRepo.Create(data)
}
