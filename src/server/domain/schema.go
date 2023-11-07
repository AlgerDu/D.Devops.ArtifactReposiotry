package domain

type (
	SchemaField struct {
		Name        string
		Type        string
		Description string
		IsExt       bool
		Editable    bool
		ExtCreate   bool
		IsKey       bool
	}

	Schema struct {
		Fields []*SchemaField
	}
)
