package gorm

import (
	"app/src/server/infra"
	"fmt"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	glogger "gorm.io/gorm/logger"
)

type (
	PgDatabaseOptions struct {
		Host     string
		Port     int
		User     string
		Password string
		Database string

		TLS bool
	}
)

func NewDatabase(
	logger infra.Logger,
	options *PgDatabaseOptions,
) *infra.Database {

	logger = logger.WithField(infra.LF_Source, "gorm.NewDatabase")

	dsn := fmt.Sprintf(
		"user=%s password=%s dbname=%s host=%s port=%d TimeZone=Asia/Shanghai",
		options.User,
		options.Password,
		options.Database,
		options.Host,
		options.Port,
	)

	if options.TLS {
		dsn = dsn + " sslmode=enable"
	} else {
		dsn = dsn + " sslmode=disable"
	}

	gormDB, err := gorm.Open(postgres.New(postgres.Config{
		DSN: dsn,
	}), &gorm.Config{
		SkipDefaultTransaction: true,
		Logger:                 glogger.Default.LogMode(glogger.Info),
	})
	if err != nil {
		logger.WithError(err).Error("create grom db err")
		panic(err)
	}

	db := &infra.Database{
		DB: gormDB,
	}

	logger.Info("create gorm db success")

	return db
}
