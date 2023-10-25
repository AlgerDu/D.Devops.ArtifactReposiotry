package infra

import "gorm.io/gorm"

type Database struct {
	*gorm.DB
}

type DatabaseProvider interface {
	Provide(name string) (*Database, error)
}
