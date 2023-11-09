package appdocker

type (
	ErrorCode string

	DockerError struct {
		Code    ErrorCode `json:"code"`
		Message string    `json:"message"`
		Detail  any       `json:"detail"`
	}
)
