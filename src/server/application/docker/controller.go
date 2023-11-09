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
