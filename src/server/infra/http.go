package infra

import "github.com/labstack/echo/v4"

type (
	HttpServer struct {
		*echo.Echo
	}
)

func NewHttpServer() *HttpServer {
	e := echo.New()

	e.HideBanner = true
	e.Debug = true

	return &HttpServer{
		Echo: e,
	}
}

func (server *HttpServer) Start(address string) error {
	return server.Echo.Start(address)
}

type EchoMiddleware interface {
	Handle(context echo.Context, next echo.HandlerFunc) error
}

func EchoMiddlewareToFunc(middleware EchoMiddleware) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(context echo.Context) error {
			return middleware.Handle(context, next)
		}
	}
}

func UseMiddleware(group *echo.Group, middleware EchoMiddleware) {
	group.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(context echo.Context) error {
			return middleware.Handle(context, next)
		}
	})
}
