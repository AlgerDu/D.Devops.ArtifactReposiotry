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
)
