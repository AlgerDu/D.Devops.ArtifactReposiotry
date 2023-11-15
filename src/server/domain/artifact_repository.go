package domain

import (
	"app/src/server/infra"
	"app/src/server/po"
)

type (
	ArtifactRepository struct {
		logger infra.Logger
		db     *infra.Database
	}
)

func NewArtifactRepository(
	logger infra.Logger,
	db *infra.Database,
) *ArtifactRepository {
	return &ArtifactRepository{
		logger: logger.WithField(infra.LF_Source, "ArtifactRepository"),
		db:     db,
	}
}

func (repo *ArtifactRepository) List(versionID int64) ([]*Artifact, error) {

	logger := repo.logger.WithField(infra.LF_Track, versionID)
	logger.Trace("try get artifacts")

	sql := repo.db.Where("version_id = ? AND is_delete", versionID, false).
		Order("name")

	var pos []po.Artifact
	sqlRst := sql.Find(&pos)
	if sqlRst.Error != nil {
		logger.WithError(sqlRst.Error).Error("get artifacts err")
		return nil, sqlRst.Error
	}

	artifacts := []*Artifact{}
	for _, po := range pos {
		artifacts = append(artifacts, Artifact_FromPO(&po))
	}

	return artifacts, nil
}

func (repo *ArtifactRepository) Get(versionID int64, name string) (*Artifact, error) {

	var poData po.Artifact
	sqlRst := repo.db.Where("version_id = ? AND name = ? AND is_delete = ?", versionID, name, false).
		First(&poData)
	if sqlRst.Error != nil {
		return nil, ErrNoRecord
	}

	artifact := Artifact_FromPO(&poData)

	return artifact, nil
}

func (repo *ArtifactRepository) Create(data *Artifact) (*Artifact, error) {

	artifact, _ := repo.Get(data.VersionID, data.Name)
	if artifact != nil {
		return artifact, ErrRecordExist
	}

	poData := data.ToPo()
	sqlRst := repo.db.Create(poData)
	if sqlRst.Error != nil {
		return nil, ErrCreateRecord
	}

	return repo.Get(data.VersionID, data.Name)
}
