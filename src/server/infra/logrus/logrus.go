package logrus

import (
	"os"

	"github.com/sirupsen/logrus"

	"app/src/server/infra"
)

type (
	LoggerOptions struct {
		MinLevel logrus.Level
	}
)

func NewDefaultOptions() *LoggerOptions {
	return &LoggerOptions{
		MinLevel: logrus.DebugLevel,
	}
}

func NewLogger(
	options *LoggerOptions,
) infra.Logger {

	if options == nil {
		options = NewDefaultOptions()
	}

	logger := logrus.New()

	logger.SetOutput(os.Stdout)
	logger.SetLevel(options.MinLevel)

	logger.SetFormatter(&logrus.TextFormatter{
		DisableColors:   true,
		FullTimestamp:   true,
		TimestampFormat: "2006-01-02 15:04:05.000",
	})

	return logger
}
