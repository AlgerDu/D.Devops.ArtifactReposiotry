package appdocker

import (
	"fmt"

	"github.com/labstack/echo/v4"
)

func Ext_Context_SetRespLink(c echo.Context, n int, last string) {
	// TODO
	url := c.Request().URL
	path := url.Path
	link := fmt.Sprintf("%s?n=%d&last=%s; rel=\"next\"", path, n, last)
	c.Response().Header().Set(HttpHeader_Link, link)
}
