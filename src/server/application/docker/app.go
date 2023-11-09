package appdocker

import "app/src/server/infra"

type (
	DockerApp struct {
		logger     infra.Logger
		httpServer *infra.HttpServer
		controller *Controller
	}
)

func NewDockerApp(
	logger infra.Logger,
	httpServer *infra.HttpServer,
	controller *Controller,
) *DockerApp {
	return &DockerApp{
		logger:     logger,
		httpServer: httpServer,
		controller: controller,
	}
}

func (app *DockerApp) Run() error {

	app.httpServer.GET("/docker/v2", app.controller.VersionCheck)

	return nil
}
