package po

import (
	"time"
)

type BasePO struct {
	ID int64 `gorm:"column:id;primaryKey"`

	CreateAt time.Time `gorm:"column:create_at;autoCreateTime:milli;type:time"`
	UpdateAt time.Time `gorm:"column:update_at;autoUpdateTime:milli;type:time"`

	IsDelete bool `gorm:"column:is_delete"`
}
