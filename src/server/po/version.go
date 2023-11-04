package po

type Version struct {
	*BasePO

	ProductID int64  `gorm:"column:product_id"`
	Version   string `gorm:"column:version"`
	Data      string `gorm:"column:data"`
}

func (Version) TableName() string {
	return "version"
}
