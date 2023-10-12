package main

import "app/src/server/infra"

type (
	App struct {
		services   []infra.MicroService
		httpServer *infra.HttpServer
	}
)

func NewApp(
	services []infra.MicroService,
	httpServer *infra.HttpServer,
) *App {
	return &App{
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

	app.httpServer.Start(":8080")

	return nil
}
