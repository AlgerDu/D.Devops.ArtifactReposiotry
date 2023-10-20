package gookit

import (
	"github.com/gookit/config/v2"
	"github.com/gookit/config/v2/yaml"
)

type ConfigShell struct {
	*config.Config
}

func NewConfig(
	files ...string,
) *ConfigShell {

	core := createGookitConfig()

	err := core.LoadFiles(files...)
	if err != nil {
		panic(err)
	}

	return &ConfigShell{
		Config: core,
	}
}

func createGookitConfig() *config.Config {

	cfg := config.NewWithOptions("core", config.ParseEnv)

	cfg.AddDriver(yaml.Driver)

	return cfg
}
