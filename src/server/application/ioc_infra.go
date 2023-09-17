package main

import di "github.com/AlgerDu/go-di/src"

func IoC_Infra(services di.ServiceCollector) error {

	di.Collector_AddSingleton(services, NewApp)

	return nil
}
