package appdocker

import (
	"app/src/server/infra"
	"app/src/server/po"
	"net/http"

	"github.com/labstack/echo/v4"
)

type (
	Controller struct {
		logger infra.Logger
		db     *infra.Database
	}
)

func NewController(
	logger infra.Logger,
	db *infra.Database,
) *Controller {
	return &Controller{
		logger: logger.WithField(infra.LF_Source, "Controller"),
		db:     db,
	}
}

func (controller *Controller) VersionCheck(c echo.Context) error {
	c.Response().Header().Set(HttpHeader_DockerDistributionAPIVersion, "registry/2.0")
	return c.NoContent(http.StatusOK)
}

func (controller *Controller) ListingRepositories(c echo.Context) error {
	page, err := Ext_Context_GetPage(c)
	if err != nil {
		return err
	}

	sql := controller.db.Table(po.Product{}.TableName()).
		Where("data->>'dockerName' IS NOT NULL").
		Order("data->>'dockerName'").
		Select("data->>'dockerName' AS Name").
		Limit(page.N)

	if page.Last != "" {
		sql = sql.Where("data->>'dockerName' > ?", page.Last)
	}

	names := []string{}
	sqlRst := sql.Find(&names)
	if sqlRst.Error != nil {
		return sql.Error
	}

	if len(names) >= page.N {
		Ext_Context_SetRespLink(c, page.N, names[len(names)-1])
	}

	return c.JSON(http.StatusOK, &Catalog{
		Repositories: names,
	})
}

func (controller *Controller) ListingImageTags(c echo.Context) error {
	repoName := Ext_Context_GetName(c)
	page, err := Ext_Context_GetPage(c)
	if err != nil {
		return err
	}

	sql := controller.db.Table("artifact AS a").
		Select("a.name").
		Joins("LEFT JOIN version AS v ON a.version_id = v.id").
		Joins("LEFT JOIN product AS p ON v.product_id = p.id").
		Where("a.type = ?", "docker").
		Where("p.data->>'dockerName' = ?", repoName).
		Order("a.name").
		Limit(page.N)

	if page.Last != "" {
		sql = sql.Where("a.Name > ?", page.Last)
	}

	tags := []string{}
	sqlRst := sql.Find(&tags)
	if sqlRst.Error != nil {
		return sqlRst.Error
	}

	if len(tags) >= page.N {
		Ext_Context_SetRespLink(c, page.N, tags[len(tags)-1])
	}

	return c.JSON(http.StatusOK, &ImageTags{
		Name: repoName,
		Tags: tags,
	})
}

func (controller *Controller) PullingManifest(c echo.Context) error {
	test := &Tmp{}
	c.Bind(test)

	controller.logger.Info(test.Name)
	controller.logger.Info(test.Reference)

	return nil
}
