package domain

type (
	SchemaField struct {
		Name        string
		Type        string
		Description string
		IsExt       bool
		Editable    bool
		IsKey       bool
	}

	Schema struct {
		Fields []*SchemaField
	}
)
