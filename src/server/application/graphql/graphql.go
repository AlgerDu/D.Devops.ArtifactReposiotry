package appgraphlql

import "app/src/server/infra"

type (
	GraphqlService struct {
		httpServer *infra.HttpServer
		controller *GraphqlController
	}
)

func NewGraphqlService(
	httpServer *infra.HttpServer,
	controller *GraphqlController,
) *GraphqlService {
	return &GraphqlService{
		httpServer: httpServer,
		controller: controller,
	}
}

func (service *GraphqlService) Run() error {

	service.httpServer.POST("/graphql", service.controller.Query)

	return nil
}
