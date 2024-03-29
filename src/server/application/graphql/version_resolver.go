package appgraphlql

import (
	"app/src/server/domain"
	"app/src/server/infra"
	"errors"

	"github.com/graphql-go/graphql"
	"github.com/mitchellh/mapstructure"
)

type (
	VersionCreateExtArgs struct {
		ProductName string
	}

	VersionResolver struct {
		*BaseResolver

		versionRepo  *domain.VersionRepository
		productRepo  *domain.ProductRepository
		artifactRepo *domain.ArtifactRepository
	}
)

func NewVersionResolver(
	logger infra.Logger,
	schemaRepo *domain.SchemaRepository,
	versionRepo *domain.VersionRepository,
	productRepo *domain.ProductRepository,
	artifactRepo *domain.ArtifactRepository,
) *VersionResolver {
	return &VersionResolver{
		BaseResolver: NewBaseResolver(
			logger.WithField(infra.LF_Source, "VersionResolver"),
			[]ObjectTypeName{
				OTN_Artifact,
			},
			schemaRepo,
		),
		versionRepo:  versionRepo,
		productRepo:  productRepo,
		artifactRepo: artifactRepo,
	}
}

func (resolver *VersionResolver) Resolve(context *BuildContext) error {

	domainSchema := resolver.schemaRepo.Get("version")
	artifactType := context.Types[OTN_Artifact]

	fields := ConvertToGraphqlFields(domainSchema)
	fields["artifacts"] = &graphql.Field{
		Type:    artifactType,
		Resolve: resolver.resolveArtifacts,
	}

	objectType := graphql.NewObject(graphql.ObjectConfig{
		Name:   string(OTN_Version),
		Fields: fields,
	})

	context.Types[OTN_Version] = objectType

	context.MutationFields["createVersion"] = &graphql.Field{
		Type:    objectType,
		Args:    ConvertToCreateArgs(domainSchema),
		Resolve: resolver.resolveCreate,
	}
	context.MutationFields["updateVersion"] = &graphql.Field{
		Type:    objectType,
		Args:    ConvertToCreateArgs(domainSchema),
		Resolve: resolver.resolveUpdate,
	}

	return nil
}

func (resolver *VersionResolver) resolveCreate(p graphql.ResolveParams) (interface{}, error) {

	var args VersionCreateExtArgs
	if err := mapstructure.Decode(p.Args, &args); err != nil {
		return nil, err
	}

	product, err := resolver.productRepo.Get(args.ProductName)
	if err != nil {
		return nil, err
	}

	version, err := domain.Version_FromMap(p.Args)
	if err != nil {
		return nil, err
	}

	version.ProductID = product.ID

	return resolver.versionRepo.Create(version)
}

func (resolver *VersionResolver) resolveUpdate(p graphql.ResolveParams) (interface{}, error) {

	var args VersionCreateExtArgs
	if err := mapstructure.Decode(p.Args, &args); err != nil {
		return nil, err
	}

	product, err := resolver.productRepo.Get(args.ProductName)
	if err != nil {
		return nil, err
	}

	version, err := domain.Version_FromMap(p.Args)
	if err != nil {
		return nil, err
	}

	version.ProductID = product.ID

	return resolver.versionRepo.Update(version)
}

func (resolver *VersionResolver) resolveArtifacts(p graphql.ResolveParams) (interface{}, error) {
	version, ok := p.Source.(*domain.Version)
	if !ok {
		return nil, errors.New("param error")
	}

	return resolver.artifactRepo.List(version.ID)
}
