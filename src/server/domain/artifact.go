package domain

import (
	"app/src/server/po"
	"encoding/json"
)

type (
	Artifact struct {
		*DataBox

		ID        int64
		Name      string
		VersionID int64
		Type      string
	}
)

func (data *Artifact) ToPo() *po.Artifact {

	buffer, _ := json.Marshal(data.Data)

	return &po.Artifact{
		BasePO: &po.BasePO{
			ID:       data.ID,
			IsDelete: false,
		},
		VersionID: data.VersionID,
		Name:      data.Name,
		Type:      data.Type,
		Data:      string(buffer),
	}
}

func Artifact_FromPO(poData *po.Artifact) *Artifact {
	data := &Artifact{
		DataBox: &DataBox{
			Data: map[string]any{},
		},
	}

	data.ID = poData.ID
	data.Name = poData.Name
	data.VersionID = poData.VersionID
	data.Type = poData.Type

	json.Unmarshal([]byte(poData.Data), &data.Data)

	return data
}

func Arfitact_FromMap(data map[string]any) (*Artifact, error) {
	artifact := &Artifact{
		DataBox: &DataBox{
			Data: map[string]any{},
		},
	}

	for key, value := range data {
		switch key {
		case "name":
			name, ok := value.(string)
			if !ok {
				return nil, nil
			}
			artifact.Name = name
		case "type":
			t, ok := value.(string)
			if !ok {
				return nil, nil
			}
			artifact.Type = t
		default:
			artifact.Data[key] = value
		}
	}

	return artifact, nil
}
