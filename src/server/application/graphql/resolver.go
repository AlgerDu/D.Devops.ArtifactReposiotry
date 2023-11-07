package appgraphlql

import (
	"app/src/server/domain"
	"app/src/server/infra"

	"github.com/graphql-go/graphql"
)

type (
	ObjectTypeName string

	BuildContext struct {
		Types          map[ObjectTypeName]*graphql.Object
		QueryFields    graphql.Fields
		MutationFields graphql.Fields
	}

	Resolver interface {
		DependOnTypes() []ObjectTypeName
		Resolve(context *BuildContext) error
	}

	BaseResolver struct {
		logger      infra.Logger
		DependTypes []ObjectTypeName
		schemaRepo  *domain.SchemaRepository
	}
)

var (
	OTN_Version ObjectTypeName = "Version"
	OTN_Product ObjectTypeName = "Product"
)

func NewBaseResolver(
	logger infra.Logger,
	dependTypes []ObjectTypeName,
	schemaRepo *domain.SchemaRepository,
) *BaseResolver {
	return &BaseResolver{
		logger:      logger,
		DependTypes: dependTypes,
		schemaRepo:  schemaRepo,
	}
}

func (resolver *BaseResolver) DependOnTypes() []ObjectTypeName {
	return resolver.DependTypes
}
