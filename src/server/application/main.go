package main

import (
	"app/src/server/application/graphql"
	defaultbuilder "app/src/server/infra/default-builder"
	"os"
)

func main() {

	builder := defaultbuilder.
		New(os.Environ()...).
		ConfigService(
			IoC_Infra,
			graphql.IoC,
		)

	app, err := builder.Build()
	if err != nil {
		panic(err)
	}

	app.Run()
}
