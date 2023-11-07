package appgraphlql

import (
	"app/src/server/domain"
	"app/src/server/infra"
	"errors"

	"github.com/graphql-go/graphql"
)

type (
	ProductResolver struct {
		*BaseResolver

		versionRepo *domain.VersionRepository
		productRepo *domain.ProductRepository
	}
)

func NewProductResolver(
	logger infra.Logger,
	schemaRepo *domain.SchemaRepository,
	versionRepo *domain.VersionRepository,
	productRepo *domain.ProductRepository,
) *ProductResolver {
	return &ProductResolver{
		BaseResolver: NewBaseResolver(
			logger.WithField(infra.LF_Source, "ProductResolver"),
			[]ObjectTypeName{
				OTN_Version,
			},
			schemaRepo,
		),
		versionRepo: versionRepo,
		productRepo: productRepo,
	}
}

func (resolver *ProductResolver) Resolve(context *BuildContext) error {

	domainSchema := resolver.schemaRepo.Get("product")
	versionType := context.Types[OTN_Version]

	fields := ConvertToGraphqlFields(domainSchema)
	fields["version"] = &graphql.Field{
		Type: versionType,
		Args: graphql.FieldConfigArgument{
			"version": &graphql.ArgumentConfig{
				Type:        graphql.String,
				Description: "",
			},
		},
		Resolve: resolver.resolveVersion,
	}

	objectType := graphql.NewObject(graphql.ObjectConfig{
		Name:   string(OTN_Product),
		Fields: fields,
	})

	context.Types[OTN_Version] = objectType

	context.QueryFields["product"] = &graphql.Field{
		Type:    objectType,
		Args:    ConvertToKeyArgs(domainSchema),
		Resolve: resolver.resolveGet,
	}
	context.QueryFields["products"] = &graphql.Field{
		Type: graphql.NewList(objectType),
		Args: graphql.FieldConfigArgument{
			"text": &graphql.ArgumentConfig{
				Type:        graphql.String,
				Description: "",
			},
		},
		Resolve: resolver.resolveList,
	}

	context.MutationFields["createProduct"] = &graphql.Field{
		Type:    objectType,
		Args:    ConvertToCreateArgs(domainSchema),
		Resolve: resolver.resolveCreate,
	}
	context.MutationFields["updateProduct"] = &graphql.Field{
		Type:    objectType,
		Args:    ConvertToCreateArgs(domainSchema),
		Resolve: resolver.resolveUpdate,
	}

	return nil
}

func (resolver *ProductResolver) resolveGet(p graphql.ResolveParams) (interface{}, error) {
	name, ok := p.Args["name"].(string)
	if !ok {
		resolver.logger.WithField("name", p.Args["name"]).Error("type error")
		return nil, errors.New("param error")
	}

	return resolver.productRepo.Get(name)
}

func (resolver *ProductResolver) resolveCreate(p graphql.ResolveParams) (interface{}, error) {
	name, ok := p.Args["name"].(string)
	if !ok {
		resolver.logger.WithField("name", p.Args["name"]).Error("type error")
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

	return resolver.productRepo.Create(data)
}

func (resolver *ProductResolver) resolveList(p graphql.ResolveParams) (interface{}, error) {

	text := ""

	value, exist := p.Args["text"]
	if exist {
		tmp, ok := value.(string)
		if !ok {
			resolver.logger.WithField("text", p.Args["text"]).Error("type error")
			return nil, errors.New("param type error")
		}
		text = tmp
	}

	return resolver.productRepo.List(text)
}

func (resolver *ProductResolver) resolveUpdate(p graphql.ResolveParams) (interface{}, error) {
	_, ok := p.Args["name"].(string)
	if !ok {
		resolver.logger.WithField("name", p.Args["name"]).Error("type error")
		return nil, errors.New("param type error")
	}

	data, err := domain.Product_FromMap(p.Args)
	if err != nil {
		return nil, err
	}

	return resolver.productRepo.Update(data)
}

func (resolver *ProductResolver) resolveVersion(p graphql.ResolveParams) (interface{}, error) {

	version, ok := p.Args["version"].(string)
	if !ok {
		resolver.logger.WithField("version", p.Args["version"]).Error("type error")
		return nil, errors.New("param error")
	}

	product, ok := p.Source.(*domain.Product)
	if !ok {
		resolver.logger.Error("source is not domain.Product")
		return nil, errors.New("param error")
	}

	return resolver.versionRepo.Get(product.ID, version)
}
