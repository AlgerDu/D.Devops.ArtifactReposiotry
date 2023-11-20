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
)

const (
	HttpHeader_DockerDistributionAPIVersion = "Docker-Distribution-API-Version"
	HttpHeader_Link                         = "Link"
)
