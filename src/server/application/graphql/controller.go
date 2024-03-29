package appgraphlql

import (
	"app/src/server/infra"
	"context"

	"github.com/graphql-go/graphql"
	"github.com/labstack/echo/v4"
	"github.com/sirupsen/logrus"
)

type (
	postData struct {
		Query     string                 `json:"query"`
		Operation string                 `json:"operationName"`
		Variables map[string]interface{} `json:"variables"`
	}

	GraphqlController struct {
		logger infra.Logger
		schmea graphql.Schema
	}
)

func NewGraphqlController(
	logger infra.Logger,
	schemaBuilder *SchemaBuilder,
) *GraphqlController {

	schema, err := schemaBuilder.Build()
	if err != nil {
		panic(err)
	}

	return &GraphqlController{
		logger: logger,
		schmea: schema,
	}
}

func (controller *GraphqlController) Query(c echo.Context) error {

	var data postData
	if err := c.Bind(&data); err != nil {
		return err
	}

	controller.logger.WithFields(logrus.Fields{
		"query":     data.Query,
		"variables": data.Variables,
		"operation": data.Operation,
	}).Trace("graphql post data")

	result := graphql.Do(graphql.Params{
		Context:        context.Background(),
		Schema:         controller.schmea,
		RequestString:  data.Query,
		VariableValues: data.Variables,
		OperationName:  data.Operation,
	})

	return c.JSON(200, result)
}
