package domain

import (
	"app/src/server/infra"
	"app/src/server/po"
	"fmt"

	"gorm.io/gorm"
)

type (
	VersionRepository struct {
		logger infra.Logger
		db     *infra.Database
	}
)

func NewVersionRepository(
	logger infra.Logger,
	db *infra.Database,
) *VersionRepository {
	return &VersionRepository{
		logger: logger.WithField(infra.LF_Source, "VersionRepository"),
		db:     db,
	}
}

func (repo *VersionRepository) Get(productID int64, version string) (*Version, error) {
	logger := repo.logger.WithField(infra.LF_Track, fmt.Sprintf("%d:%s", productID, version))

	var poData po.Version
	sqlRst := repo.db.Where("product_id = ? AND name = ? AND is_delete = ?", productID, version, false).First(&poData)
	if sqlRst.Error != nil {
		logger.WithError(sqlRst.Error).Error("get Version err")
		return nil, ErrNoRecord
	}

	Version := Version_FromPO(&poData)

	return Version, nil
}

func (repo *VersionRepository) Create(data *Version) (*Version, error) {
	logger := repo.logger.WithField(infra.LF_Track, fmt.Sprintf("%d:%s", data.ProductID, data.Version))

	version, _ := repo.Get(data.ProductID, data.Version)
	if version != nil {
		logger.WithError(ErrRecordExist).Error("version")
		return version, ErrRecordExist
	}

	poData := version.ToPo()

	sqlRet := repo.db.Create(poData)
	if sqlRet.Error != nil {
		logger.WithError(ErrCreateRecord).Error("version")
		return nil, ErrCreateRecord
	}

	return repo.Get(data.ProductID, data.Version)
}

func (repo *VersionRepository) List(productID int64) ([]*Version, error) {
	logger := repo.logger

	var pos []po.Version
	sqlRst := repo.db.Where("product_id = ?", productID).Find(&pos)
	if sqlRst.Error != nil {
		logger.WithError(sqlRst.Error).Error("get Version list error")
		return nil, sqlRst.Error
	}

	versions := []*Version{}
	for _, poData := range pos {
		versions = append(versions, Version_FromPO(&poData))
	}

	return versions, nil
}

func (repo *VersionRepository) Update(data *Version) (*Version, error) {
	logger := repo.logger.WithField(infra.LF_Track, fmt.Sprintf("%d:%s", data.ProductID, data.Version))

	poData := data.ToPo()
	sqlRst := repo.db.
		Model(poData).
		Where("product_id = ? AND name = ? AND is_delete = ?", data.ProductID, data.Version, false).
		Update("data", gorm.Expr("data || ?", poData.Data))

	if sqlRst.Error != nil {
		logger.WithError(sqlRst.Error).Error("Version update error")
		return nil, sqlRst.Error
	}

	return repo.Get(data.ProductID, data.Version)
}
