package domain

import (
	"app/src/server/infra"
	"app/src/server/po"
	"encoding/json"
)

type (
	ProductRepository struct {
		logger infra.Logger
		db     *infra.Database
	}
)

func NewProductRepository(
	logger infra.Logger,
	db *infra.Database,
) *ProductRepository {
	return &ProductRepository{
		logger: logger.WithField(infra.LF_Source, "ProductRepository"),
		db:     db,
	}
}

func (repo *ProductRepository) Get(name string) *Product {

	logger := repo.logger.WithField(infra.LF_Track, name)

	var po po.Product
	sqlRst := repo.db.Where("name = ? AND is_delete = ?", name, false).First(&po)
	if sqlRst.Error != nil {
		logger.WithError(sqlRst.Error).Error("get product err")
		return nil
	}

	product := &Product{
		DataBox: &DataBox{
			Data: map[string]any{},
		},
	}

	json.Unmarshal([]byte(po.Data), &product.Data)
	product.Name = po.Name

	return product
}
