package appgraphlql

import (
	"app/src/server/domain"
	"app/src/server/infra"
)

type (
	BaseResolver struct {
		logger      infra.Logger
		DependTypes []ObjectTypeName
		schemaRepo  *domain.SchemaRepository
	}
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
