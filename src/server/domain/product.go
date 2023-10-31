package domain

import (
	"app/src/server/po"
	"encoding/json"
)

type (
	Product struct {
		*DataBox

		ID   int64
		Name string
	}
)

func (product *Product) ToPo() *po.Product {

	data, _ := json.Marshal(product.Data)

	return &po.Product{
		BasePO: &po.BasePO{
			ID:       product.ID,
			IsDelete: false,
		},
		Name: product.Name,
		Data: string(data),
	}
}

func Product_FromPO(pod *po.Product) *Product {
	product := &Product{
		DataBox: &DataBox{
			Data: map[string]any{},
		},
	}

	product.ID = pod.ID
	product.Name = pod.Name

	json.Unmarshal([]byte(pod.Data), &product.Data)

	return product
}

func Product_FromMap(data map[string]any) (*Product, error) {
	product := &Product{
		DataBox: &DataBox{
			Data: map[string]any{},
		},
	}

	for key, value := range data {
		if key == "name" {
			name, ok := value.(string)
			if !ok {
				return nil, nil
			}
			product.Name = name
			continue
		}

		product.Data[key] = value
	}

	return product, nil
}
