package domain

type (
	Product struct {
		*DataBox

		ID   int64
		Name string
	}
)
