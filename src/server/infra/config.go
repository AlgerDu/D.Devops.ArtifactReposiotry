package infra

import di "github.com/AlgerDu/go-di/src"

type (
	Config interface {
		BindStruct(path string, dst any) error
	}
)

func DI_ConfigOptions[insType any](services di.ServiceCollector, path string, ins insType) {
	di.AddScope(services, func(config Config) insType {
		config.BindStruct(path, ins)
		return ins
	})
}
