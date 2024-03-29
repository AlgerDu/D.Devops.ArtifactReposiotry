package main

import (
	appdocker "app/src/server/application/docker"
	appgraphlql "app/src/server/application/graphql"
	"app/src/server/domain"
	defaultbuilder "app/src/server/infra/default-builder"
	"os"
)

func main() {

	builder := defaultbuilder.
		New(os.Environ()...).
		SetConfigFile("config.yml").
		ConfigService(
			IoC_Infra,
			domain.IoC,
			IoC_App,
			appgraphlql.IoC,
			appdocker.IoC,
		)

	app, err := builder.Build()
	if err != nil {
		panic(err)
	}

	app.Run()
}
