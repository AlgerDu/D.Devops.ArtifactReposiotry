package infra

type (
	ResultCode int

	Result struct {
		Code ResultCode
		Msg  *string
	}
)

const (
	RC_OK    ResultCode = 0
	RC_Error ResultCode = 1
)
