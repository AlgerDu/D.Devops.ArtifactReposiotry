package appgraphlql

import (
	"context"
	"fmt"

	"github.com/graphql-go/graphql"
	"github.com/labstack/echo/v4"
)

type (
	postData struct {
		Query     string                 `json:"query"`
		Operation string                 `json:"operationName"`
		Variables map[string]interface{} `json:"variables"`
	}

	GraphqlController struct {
		schmea graphql.Schema
	}
)

func NewGraphqlController(
	schemaBuilder *SchemaBuilder,
) *GraphqlController {

	schema, err := schemaBuilder.Build()
	if err != nil {
		panic(err)
	}

	return &GraphqlController{
		schmea: schema,
	}
}

func (controller *GraphqlController) Query(c echo.Context) error {

	var p postData
	if err := c.Bind(&p); err != nil {
		return err
	}

	fmt.Println(p.Query)
	result := graphql.Do(graphql.Params{
		Context:        context.Background(),
		Schema:         controller.schmea,
		RequestString:  p.Query,
		VariableValues: p.Variables,
		OperationName:  p.Operation,
	})

	c.JSON(200, result)
	return nil
}
