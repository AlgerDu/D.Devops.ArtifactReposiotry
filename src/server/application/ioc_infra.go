package main

import (
	"app/src/server/infra"

	di "github.com/AlgerDu/go-di/src"
)

func IoC_Infra(services di.ServiceCollector) error {

	di.AddSingleton(services, infra.NewHttpServer)

	return nil
}

func IoC_App(services di.ServiceCollector) error {
	di.AddSingletonFor[infra.App](services, NewApp)
	return nil
}
