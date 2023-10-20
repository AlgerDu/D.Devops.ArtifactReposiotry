package domain

type (
	SchemaField struct {
		Name             string
		Type             string
		ValueFromExtData bool
	}

	Schema struct {
		Fields []*SchemaField
	}
)
