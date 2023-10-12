package domain

type (
	ArtifactRepository struct {
	}
)

func NewArtifactRepository() *ArtifactRepository {
	return &ArtifactRepository{}
}

func (repo *ArtifactRepository) Get(id int64) (*Artifact, error) {
	return nil, nil
}
