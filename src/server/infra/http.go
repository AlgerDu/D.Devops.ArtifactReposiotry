package infra

import "github.com/labstack/echo/v4"

type (
	HttpServer struct {
		*echo.Echo
	}
)

func NewHttpServer() *HttpServer {
	e := echo.New()

	return &HttpServer{
		Echo: e,
	}
}

func (server *HttpServer) Start(address string) error {
	return server.Echo.Start(address)
}
