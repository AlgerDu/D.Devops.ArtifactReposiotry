package domain

import (
	di "github.com/AlgerDu/go-di/src"
)

func IoC(services di.ServiceCollector) error {

	di.AddSingleton(services, NewSchemaRepository)
	di.AddSingleton(services, NewProductRepository)
	di.AddSingleton(services, NewVersionRepository)

	return nil
}
