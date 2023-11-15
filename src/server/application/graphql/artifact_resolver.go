package appgraphlql

import (
	"app/src/server/domain"
	"app/src/server/infra"

	"github.com/graphql-go/graphql"
	"github.com/mitchellh/mapstructure"
)

type (
	ArtifactCreateExtArgs struct {
		ProductName string
		Version     string
	}

	ArtifactResolver struct {
		*BaseResolver

		versionRepo  *domain.VersionRepository
		productRepo  *domain.ProductRepository
		artifactRepo *domain.ArtifactRepository
	}
)

func NewArtifactResolver(
	logger infra.Logger,
	schemaRepo *domain.SchemaRepository,
	versionRepo *domain.VersionRepository,
	productRepo *domain.ProductRepository,
	artifactRepo *domain.ArtifactRepository,
) *ArtifactResolver {
	return &ArtifactResolver{
		BaseResolver: NewBaseResolver(
			logger.WithField(infra.LF_Source, "ArtifactResolver"),
			[]ObjectTypeName{},
			schemaRepo,
		),
		versionRepo:  versionRepo,
		productRepo:  productRepo,
		artifactRepo: artifactRepo,
	}
}

func (resolver *ArtifactResolver) Resolve(context *BuildContext) error {

	domainSchema := resolver.schemaRepo.Get("artifact")

	fields := ConvertToGraphqlFields(domainSchema)
	objectType := graphql.NewObject(graphql.ObjectConfig{
		Name:   string(OTN_Artifact),
		Fields: fields,
	})

	context.Types[OTN_Artifact] = objectType

	context.MutationFields["createArtifact"] = &graphql.Field{
		Type:    objectType,
		Args:    ConvertToCreateArgs(domainSchema),
		Resolve: resolver.resolveCreate,
	}

	return nil
}

func (resolver *ArtifactResolver) resolveCreate(p graphql.ResolveParams) (interface{}, error) {

	var args ArtifactCreateExtArgs
	if err := mapstructure.Decode(p.Args, &args); err != nil {
		return nil, err
	}

	product, err := resolver.productRepo.Get(args.ProductName)
	if err != nil {
		return nil, err
	}

	vaersion, err := resolver.versionRepo.Get(product.ID, args.Version)
	if err != nil {
		return nil, err
	}

	artifact, err := domain.Arfitact_FromMap(p.Args)
	if err != nil {
		return nil, err
	}

	artifact.VersionID = vaersion.ID

	return resolver.artifactRepo.Create(artifact)
}
