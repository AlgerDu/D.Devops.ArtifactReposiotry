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
