package domain

type (
	SchemaField struct {
		Name        string
		Type        string
		Description string
		IsExt       bool
	}

	Schema struct {
		Fields []*SchemaField
	}
)
