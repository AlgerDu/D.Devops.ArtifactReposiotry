package domain

import "app/src/server/infra"

type (
	SchemaRepository struct {
	}
)

func NewSchemaRepository(
	logger infra.Logger,
) *SchemaRepository {
	return &SchemaRepository{}
}

func (repo *SchemaRepository) Get(name string) *Schema {
	return &Schema{
		Fields: []*SchemaField{
			{
				Name: "name",
				Type: "string",
			},
		},
	}
}
