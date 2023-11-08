package appgraphlql

import (
	"github.com/graphql-go/graphql"
)

type (
	ObjectTypeName string

	BuildContext struct {
		Types          map[ObjectTypeName]*graphql.Object
		QueryFields    graphql.Fields
		MutationFields graphql.Fields
	}

	Resolver interface {
		DependOnTypes() []ObjectTypeName
		Resolve(context *BuildContext) error
	}
)

var (
	OTN_Version ObjectTypeName = "Version"
	OTN_Product ObjectTypeName = "Product"
)
