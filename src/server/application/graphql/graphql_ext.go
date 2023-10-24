package appgraphlql

import (
	"app/src/server/domain"

	"github.com/graphql-go/graphql"
)

func Resolver_FromDataBox(p graphql.ResolveParams) (interface{}, error) {
	getter, ok := p.Source.(domain.ValueGetter)
	if !ok {
		return nil, nil
	}

	value, ok := getter.Get(p.Info.FieldName)
	if !ok {
		return nil, nil
	}

	return value, nil
}

func ConvertToGraphqlType(typeName string) graphql.Output {
	switch typeName {
	case "string":
		return graphql.String
	default:
		return graphql.String
	}
}

func ConvertToGraphqlFields(schema *domain.Schema) graphql.Fields {
	fields := graphql.Fields{}

	for _, field := range schema.Fields {
		graphqlField := &graphql.Field{}
		graphqlField.Type = ConvertToGraphqlType(field.Type)
		graphqlField.Description = field.Description

		if field.IsExt {
			graphqlField.Resolve = Resolver_FromDataBox
		}

		fields[field.Name] = graphqlField
	}

	return fields
}
