package appgraphlql

import (
	"app/src/server/infra"

	di "github.com/AlgerDu/go-di/src"
)

func IoC(services di.ServiceCollector) error {

	di.AddSingletonFor[Resolver](services, NewVersionResolver)
	di.AddSingletonFor[Resolver](services, NewProductResolver)
	di.AddSingletonFor[Resolver](services, NewArtifactResolver)

	di.AddSingleton(services, NewSchemaBuilder)
	di.AddSingleton(services, NewGraphqlController)
	di.AddSingletonFor[infra.MicroService](services, NewGraphqlService)

	return nil
}
