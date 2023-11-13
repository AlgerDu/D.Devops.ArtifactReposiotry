package appdocker

import (
	"app/src/server/infra"

	di "github.com/AlgerDu/go-di/src"
)

func IoC(services di.ServiceCollector) error {

	di.AddSingleton(services, NewController)

	di.AddSingleton(services, NewNameMiddleware)

	di.AddSingletonFor[infra.MicroService](services, NewDockerApp)

	return nil
}
