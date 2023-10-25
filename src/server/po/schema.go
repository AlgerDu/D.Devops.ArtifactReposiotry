package po

type Schema struct {
	*BasePO

	ParentID int64 `gorm:"column:parent_id"`

	Name     string `gorm:"column:name"`
	Type     string `gorm:"column:type"`
	Descript string `gorm:"column:descript"`
	Data     string `gorm:"column:data"`
}

func (Schema) TableName() string {
	return "schema"
}
