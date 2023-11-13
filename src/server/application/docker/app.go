package appdocker

import (
	"app/src/server/infra"
)

type (
	DockerApp struct {
		logger         infra.Logger
		httpServer     *infra.HttpServer
		controller     *Controller
		nameMiddleware *NameMiddleware
	}
)

func NewDockerApp(
	logger infra.Logger,
	httpServer *infra.HttpServer,
	controller *Controller,
	nameMiddleware *NameMiddleware,
) *DockerApp {
	return &DockerApp{
		logger:         logger,
		httpServer:     httpServer,
		controller:     controller,
		nameMiddleware: nameMiddleware,
	}
}

func (app *DockerApp) Run() error {

	app.httpServer.Pre(infra.EchoMiddlewareToFunc(app.nameMiddleware))

	g := app.httpServer.Group("/docker")

	g.GET("/v2", app.controller.VersionCheck)
	g.HEAD("/v2/manifests/:reference", app.controller.PullingManifest)

	return nil
}
