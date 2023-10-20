package main

import "app/src/server/infra"

type (
	AppOptions struct {
		Address string
	}

	App struct {
		options    *AppOptions
		services   []infra.MicroService
		httpServer *infra.HttpServer
	}
)

func NewApp(
	options *AppOptions,
	services []infra.MicroService,
	httpServer *infra.HttpServer,
) *App {
	return &App{
		options:    options,
		services:   services,
		httpServer: httpServer,
	}
}

func (app *App) Run() error {
	for _, subApp := range app.services {
		err := subApp.Run()
		if err != nil {
			return err
		}
	}

	app.httpServer.Start(app.options.Address)

	return nil
}
