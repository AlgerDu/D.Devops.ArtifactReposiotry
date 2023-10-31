package domain

import (
	"app/src/server/infra"
	"app/src/server/po"
	"fmt"
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

func (repo *ProductRepository) Get(name string) (*Product, error) {
	logger := repo.logger.WithField(infra.LF_Track, name)

	var poData po.Product
	sqlRst := repo.db.Where("name = ? AND is_delete = ?", name, false).First(&poData)
	if sqlRst.Error != nil {
		logger.WithError(sqlRst.Error).Error("get product err")
		return nil, ErrNoRecord
	}

	product := Product_FromPO(&poData)

	return product, nil
}

func (repo *ProductRepository) Create(data *Product) (*Product, error) {
	logger := repo.logger.WithField(infra.LF_Track, data.Name)

	product, _ := repo.Get(data.Name)
	if product != nil {
		logger.WithError(ErrRecordExist).Error("product")
		return product, ErrRecordExist
	}

	poData := product.ToPo()

	sqlRet := repo.db.Create(poData)
	if sqlRet.Error != nil {
		logger.WithError(ErrCreateRecord).Error("product")
		return nil, ErrCreateRecord
	}

	return repo.Get(data.Name)
}

func (repo *ProductRepository) List(test string) ([]*Product, error) {
	logger := repo.logger

	var pos []po.Product
	sqlRst := repo.db.Where("name like ?", fmt.Sprintf("%%%s%%", test)).Find(&pos)
	if sqlRst.Error != nil {
		logger.WithError(sqlRst.Error).Error("get product list error")
		return nil, sqlRst.Error
	}

	produces := []*Product{}
	for _, poData := range pos {
		produces = append(produces, Product_FromPO(&poData))
	}

	return produces, nil
}
