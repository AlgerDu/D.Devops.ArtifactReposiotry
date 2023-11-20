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

func Ext_Context_SetName(c echo.Context, v string) {
	c.Set("name", v)
}

func Ext_Context_GetName(c echo.Context) string {
	return c.Get("name").(string)
}

func Ext_Context_GetPage(c echo.Context) (*Pagination, error) {

	page := &Pagination{}
	if err := c.Bind(page); err != nil {
		return nil, err
	}

	if page.N == 0 {
		page.N = 5
	}

	return page, nil
}
