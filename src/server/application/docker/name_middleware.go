package appdocker

import (
	"app/src/server/infra"
	"fmt"
	"regexp"

	"github.com/labstack/echo/v4"
	"github.com/sirupsen/logrus"
)

type (
	NameMiddleware struct {
		logger infra.Logger

		regexps []*regexp.Regexp
	}
)

func NewNameMiddleware(
	logger infra.Logger,
) (*NameMiddleware, error) {

	regexps := []*regexp.Regexp{}
	patterns := []string{
		"/docker/v2/([\\s\\S]+)/blobs/uploads/[\\s\\S]+$",
		"/docker/v2/([\\s\\S]+)/manifests/[\\s\\S]+$",
	}

	for _, pattern := range patterns {
		reg, err := regexp.Compile(pattern)
		if err != nil {
			return nil, err
		}
		regexps = append(regexps, reg)
	}

	return &NameMiddleware{
		logger:  logger.WithField(infra.LF_Source, "NameMiddleware"),
		regexps: regexps,
	}, nil
}

func (middleware *NameMiddleware) Handle(context echo.Context, next echo.HandlerFunc) error {

	middleware.logger.Trace("in middleware")

	req := context.Request()
	path := req.URL.Path

	hasName := false
	var match []int

	for _, reg := range middleware.regexps {
		match = reg.FindStringSubmatchIndex(path)
		if match == nil || len(match) <= 0 {
			continue
		}

		hasName = true
		break
	}

	if hasName {
		name := path[match[2]:match[3]]
		path = fmt.Sprintf("%s%s", path[0:match[2]-1], path[match[3]:len(path)-1])

		req.URL.Path = path
		context.Set("name", name)

		middleware.logger.WithFields(logrus.Fields{
			"name": name,
			"path": req.URL.Path,
		}).Trace("url with repositry name rewrite")
	}

	return next(context)
}
