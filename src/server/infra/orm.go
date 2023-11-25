package infra

import "gorm.io/gorm"

type (
	// 数据库 ORM 结构体
	Database struct {
		*gorm.DB
	}

	// 数据库 provider
	DatabaseProvider interface {
		Provide(name string) (*Database, error)
	}
)
