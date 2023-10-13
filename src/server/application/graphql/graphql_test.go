package appgraphlql

import (
	"encoding/json"
	"fmt"
	"log"
	"testing"

	"github.com/graphql-go/graphql"
)

type WithData struct {
	Data map[string]any
}

type Artifact struct {
	*WithData
	Name string
}

var ArtifactType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Artifact",
	Fields: graphql.Fields{
		"name": &graphql.Field{Type: graphql.String},
		"type": &graphql.Field{
			Type: graphql.String,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				fmt.Println(p.Source)
				fmt.Println(p.Info.FieldName)

				artifact, ok := p.Source.(*WithData)
				if !ok {
					fmt.Println("a")
					return "unknown", nil
				}

				value, ok := artifact.Data["type"]
				if !ok {
					return "unknown", nil
				}

				return value, nil
			}},
	},
})

// QueryType fields: `concurrentFieldFoo` and `concurrentFieldBar` are resolved
// concurrently because they belong to the same field-level and their `Resolve`
// function returns a function (thunk).
var QueryType = graphql.NewObject(graphql.ObjectConfig{
	Name: "Query",
	Fields: graphql.Fields{
		"artifacct": &graphql.Field{
			Type: ArtifactType,
			Resolve: func(p graphql.ResolveParams) (interface{}, error) {
				var foo = Artifact{Name: "test", WithData: &WithData{Data: map[string]any{"type": "docker"}}}

				return func() (interface{}, error) {
					return &foo, nil
				}, nil
			},
		},
	},
})

func TestGraphql_Main(t *testing.T) {
	schema, err := graphql.NewSchema(graphql.SchemaConfig{
		Query: QueryType,
	})
	if err != nil {
		log.Fatal(err)
	}
	query := `
		query {
			artifacct {
				name
				type
			}
		}
	`
	result := graphql.Do(graphql.Params{
		RequestString: query,
		Schema:        schema,
	})
	b, err := json.Marshal(result)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%s", b)
}
