package po

type Product struct {
	*BasePO

	Name string `gorm:"column:name"`
	Data string `gorm:"column:data"`
}

func (Product) TableName() string {
	return "product"
}
