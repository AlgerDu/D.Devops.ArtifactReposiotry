package main

import "app/src/server/infra"

type (
	App struct {
		subApps []infra.SubApp
	}
)

func NewApp(
	subApps []infra.SubApp,
) *App {
	return &App{
		subApps: subApps,
	}
}

func (app *App) Run() error {
	for _, subApp := range app.subApps {
		err := subApp.Run()
		if err != nil {
			return err
		}
	}

	return nil
}
