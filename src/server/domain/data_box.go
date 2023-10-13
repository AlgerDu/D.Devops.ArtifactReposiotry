package domain

type (
	ValueGetter interface {
		Get(key string) (any, bool)
	}

	DataBox struct {
		Data map[string]any
	}
)

func (box *DataBox) Get(key string) (any, bool) {
	v, exist := box.Data[key]
	return v, exist
}
