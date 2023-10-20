package appgraphlql

import (
	"app/src/server/infra"

	di "github.com/AlgerDu/go-di/src"
)

func IoC(services di.ServiceCollector) error {

	di.AddSingleton(services, NewProductSchemaBuilder)
	di.AddSingleton(services, NewSchemaBuilder)
	di.AddSingleton(services, NewGraphqlController)
	di.AddSingletonFor[infra.MicroService](services, NewGraphqlService)

	return nil
}
