package appdocker

import (
	"app/src/server/infra"

	"github.com/labstack/echo/v4"
)

type (
	Controller struct {
		logger infra.Logger
	}
)

func NewController(
	logger infra.Logger,
) *Controller {
	return &Controller{
		logger: logger,
	}
}

func (controller *Controller) VersionCheck(c echo.Context) error {
	return nil
}

func (controller *Controller) PullingManifest(c echo.Context) error {
	test := &Tmp{}
	c.Bind(test)

	controller.logger.Info(test.Name)
	controller.logger.Info(test.Reference)

	return nil
}
