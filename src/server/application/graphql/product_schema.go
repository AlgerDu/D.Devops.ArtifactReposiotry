package appgraphlql

import (
	"app/src/server/domain"
	"app/src/server/infra"
	"errors"

	"github.com/graphql-go/graphql"
)

type (
	ProductSchema struct {
		ObjectType  *graphql.Object
		QueryField  *graphql.Field
		CreateField *graphql.Field
		ListField   *graphql.Field
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
		logger:      logger.WithField(infra.LF_Source, "ProductSchemaBuilder"),
		schemaRepo:  schemaRepo,
		productRepo: productRepo,
	}
}

func (builder *ProductSchemaBuilder) Build() *ProductSchema {

	domainSchema := builder.schemaRepo.Get("product")

	productType := graphql.NewObject(graphql.ObjectConfig{
		Name:   "Product",
		Fields: ConvertToGraphqlFields(domainSchema),
	})

	return &ProductSchema{
		ObjectType: productType,
		QueryField: &graphql.Field{
			Type:    productType,
			Args:    ConvertToKeyArgs(domainSchema),
			Resolve: builder.resolveName,
		},
		CreateField: &graphql.Field{
			Type:    productType,
			Args:    ConvertToCreateArgs(domainSchema),
			Resolve: builder.resolveCreate,
		},
		ListField: &graphql.Field{
			Type: graphql.NewList(productType),
			Args: graphql.FieldConfigArgument{
				"text": &graphql.ArgumentConfig{
					Type:        graphql.String,
					Description: "",
				},
			},
			Resolve: builder.resolveList,
		},
	}
}

func (builder *ProductSchemaBuilder) resolveName(p graphql.ResolveParams) (interface{}, error) {
	name, ok := p.Args["name"].(string)
	if !ok {
		builder.logger.WithField("name", p.Args["name"]).Error("type error")
		return nil, errors.New("param error")
	}

	return builder.productRepo.Get(name)
}

func (builder *ProductSchemaBuilder) resolveCreate(p graphql.ResolveParams) (interface{}, error) {
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

func (builder *ProductSchemaBuilder) resolveList(p graphql.ResolveParams) (interface{}, error) {

	text := ""

	value, exist := p.Args["text"]
	if exist {
		tmp, ok := value.(string)
		if !ok {
			builder.logger.WithField("text", p.Args["text"]).Error("type error")
			return nil, errors.New("param type error")
		}
		text = tmp
	}

	return builder.productRepo.List(text)
}
