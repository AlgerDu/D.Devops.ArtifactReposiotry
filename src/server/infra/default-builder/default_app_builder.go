package defaultbuilder

import (
	"app/src/server/infra"

	di "github.com/AlgerDu/go-di/src"
)

type DefaultAppBuilder struct {
	container *di.Container
	envs      []string
}

func New(
	envs ...string,
) *DefaultAppBuilder {

	builder := &DefaultAppBuilder{
		container: di.New(),
		envs:      envs,
	}

	return builder
}

func (builder *DefaultAppBuilder) SetConfigFile(filePath string) *DefaultAppBuilder {
	return builder
}

func (builder *DefaultAppBuilder) ConfigService(configFuncs ...func(di.ServiceCollector) error) *DefaultAppBuilder {

	for _, configFunc := range configFuncs {
		configFunc(builder.container)
	}

	return builder
}

func (builder *DefaultAppBuilder) Build() (infra.App, error) {
	app, err := di.Provider_GetService[infra.App](builder.container)
	return app, err
}
