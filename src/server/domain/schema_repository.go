package domain

import (
	"app/src/server/infra"
	"app/src/server/po"
	"encoding/json"
)

type (
	SchemaRepository struct {
		logger infra.Logger
		db     *infra.Database
	}
)

func NewSchemaRepository(
	logger infra.Logger,
	db *infra.Database,
) *SchemaRepository {
	return &SchemaRepository{
		logger: logger.WithField(infra.LF_Source, "SchemaRepository"),
		db:     db,
	}
}

func (repo *SchemaRepository) Get(name string) *Schema {

	logger := repo.logger.WithField(infra.LF_Track, name)

	var pos []po.Schema
	sqlRst := repo.db.Where("is_delete = ?", false).Find(&pos)
	if sqlRst.Error != nil {
		logger.WithError(sqlRst.Error).Error("search from pg err")
		return nil
	}

	if len(pos) < 1 {
		logger.Warn("no record")
		return nil
	}

	schema := &Schema{
		Fields: []*SchemaField{},
	}

	for _, po := range pos {
		field := &SchemaField{}
		json.Unmarshal([]byte(po.Data), field)

		field.Description = po.Descript
		field.Type = po.Type
		field.Name = po.Name

		schema.Fields = append(schema.Fields, field)
	}

	return schema
}
