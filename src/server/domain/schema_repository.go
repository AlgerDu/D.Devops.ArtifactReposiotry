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

func (repo *SchemaRepository) Get(path string) *Schema {

	logger := repo.logger.WithField(infra.LF_Track, path)
	schema := &Schema{
		Fields: []*SchemaField{},
	}

	sqlStr := `
	WITH RECURSIVE tree AS (
        SELECT id, name AS path
        FROM schema
        WHERE parent_id = 0
     UNION ALL
        SELECT origin.id, tree.path || '.' || origin.name
        FROM tree JOIN schema origin
             ON origin.parent_id = tree.id
	)
	SELECT id FROM tree WHERE path = ?;
	`

	var ids []int64
	sqlRst := repo.db.Raw(sqlStr, path).Find(&ids)
	if sqlRst.Error != nil || len(ids) != 1 {
		logger.WithError(sqlRst.Error).WithField("count", len(ids)).Error("db record error")
		return schema
	}

	var pos []po.Schema
	sqlRst = repo.db.Where("parent_id = ? AND is_delete = ?", ids[0], false).Find(&pos)
	if sqlRst.Error != nil {
		logger.WithError(sqlRst.Error).Error("search from pg err")
		return nil
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
