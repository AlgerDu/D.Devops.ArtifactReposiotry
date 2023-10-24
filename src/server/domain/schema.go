package domain

type (
	SchemaField struct {
		Name             string
		Type             string
		Description      string
		ValueFromExtData bool
	}

	Schema struct {
		Fields []*SchemaField
	}
)
