package main

import "app/src/server/infra"

type (
	App struct {
		subApps    []infra.SubApp
		httpServer *infra.HttpServer
	}
)

func NewApp(
	subApps []infra.SubApp,
	httpServer *infra.HttpServer,
) *App {
	return &App{
		subApps:    subApps,
		httpServer: httpServer,
	}
}

func (app *App) Run() error {
	for _, subApp := range app.subApps {
		err := subApp.Run()
		if err != nil {
			return err
		}
	}

	app.httpServer.Start(":8080")

	return nil
}
