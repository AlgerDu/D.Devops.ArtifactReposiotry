package appdocker

type (
	ErrorCode string

	DockerError struct {
		Code    ErrorCode `json:"code"`
		Message string    `json:"message"`
		Detail  any       `json:"detail"`
	}

	Tmp struct {
		Name      string `param:"name"`
		Reference string `param:"reference"`
	}

	Pagination struct {
		N    int    `query:"n" `
		Last string `query:"last"`
	}

	Catalog struct {
		Repositories []string `json:"repositories"`
	}

	ImageTags struct {
		Name string   `json:"name"`
		Tags []string `json:"tags"`
	}

	BlobSum struct {
		BlobSum string `json:"blobSums"`
	}

	ImageManifest struct {
		Name          string    `json:"name"`
		Tag           string    `json:"tag"`
		Architecture  string    `json:"architecture"`
		SchemaVersion string    `json:"schemaVersion"`
		History       []string  `json:"history"`
		BlobSums      []BlobSum `json:"blobSums"`
	}
)

const (
	HttpHeader_DockerDistributionAPIVersion = "Docker-Distribution-API-Version"
	HttpHeader_Link                         = "Link"
)
