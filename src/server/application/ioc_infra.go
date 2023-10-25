package main

import (
	"app/src/server/infra"
	"app/src/server/infra/gorm"
	"app/src/server/infra/logrus"

	di "github.com/AlgerDu/go-di/src"
)

func IoC_Infra(services di.ServiceCollector) error {
	di.AddSingleton(services, logrus.NewDefaultOptions)
	di.AddSingleton(services, logrus.NewLogger)

	di.AddSingleton(services, gorm.NewDatabase)

	di.AddSingleton(services, infra.NewHttpServer)

	return nil
}

func IoC_App(services di.ServiceCollector) error {

	infra.DI_ConfigOptions(services, "app", &AppOptions{})
	infra.DI_ConfigOptions(services, "pg", &gorm.PgDatabaseOptions{TLS: false})

	di.AddSingletonFor[infra.App](services, NewApp)
	return nil
}
