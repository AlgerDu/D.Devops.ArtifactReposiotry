package domain

import (
	"app/src/server/po"
	"encoding/json"
)

type (
	Version struct {
		*DataBox

		ID        int64
		ProductID int64
		Version   string
	}
)

func (version *Version) ToPo() *po.Version {

	data, _ := json.Marshal(version.Data)

	return &po.Version{
		BasePO: &po.BasePO{
			ID:       version.ID,
			IsDelete: false,
		},
		ProductID: version.ProductID,
		Version:   version.Version,
		Data:      string(data),
	}
}

func Version_FromPO(pod *po.Version) *Version {
	version := &Version{
		DataBox: &DataBox{
			Data: map[string]any{},
		},
	}

	version.ID = pod.ID
	version.ProductID = pod.ProductID
	version.Version = pod.Version

	json.Unmarshal([]byte(pod.Data), &version.Data)

	return version
}

func Version_FromMap(data map[string]any) (*Version, error) {
	version := &Version{
		DataBox: &DataBox{
			Data: map[string]any{},
		},
	}

	for key, value := range data {

		switch key {
		case "version":
			v, ok := value.(string)
			if !ok {
				return nil, nil
			}
			version.Version = v

		case "productID":
			v, ok := value.(int64)
			if !ok {
				return nil, nil
			}
			version.ProductID = v

		default:
			version.Data[key] = value
		}
	}

	return version, nil
}
