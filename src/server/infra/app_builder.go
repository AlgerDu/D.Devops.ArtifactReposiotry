package infra

import di "github.com/AlgerDu/go-di/src"

type (
	AppBuilder interface {
		ConfigService(configFuncs ...func(di.ServiceCollector) error) AppBuilder
		Build() (App, error)
	}

	SubApp interface {
		Run() error
	}

	App interface {
		Run() error
	}
)
