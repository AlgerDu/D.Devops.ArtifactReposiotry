package main

import (
	appgraphlql "app/src/server/application/graphql"
	defaultbuilder "app/src/server/infra/default-builder"
	"os"
)

func main() {

	builder := defaultbuilder.
		New(os.Environ()...).
		SetConfigFile("config.yml").
		ConfigService(
			IoC_Infra,
			IoC_App,
			appgraphlql.IoC,
		)

	app, err := builder.Build()
	if err != nil {
		panic(err)
	}

	app.Run()
}
