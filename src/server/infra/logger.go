package infra

import "github.com/sirupsen/logrus"

type (
	LogFields map[string]interface{}

	Logger interface {
		WithField(key string, value interface{}) *logrus.Entry
		WithFields(fields logrus.Fields) *logrus.Entry
		WithError(err error) *logrus.Entry

		Tracef(format string, args ...interface{})
		Debugf(format string, args ...interface{})
		Infof(format string, args ...interface{})
		Printf(format string, args ...interface{})
		Warnf(format string, args ...interface{})
		Warningf(format string, args ...interface{})
		Errorf(format string, args ...interface{})
		Fatalf(format string, args ...interface{})
		Panicf(format string, args ...interface{})

		Trace(args ...interface{})
		Debug(args ...interface{})
		Info(args ...interface{})
		Print(args ...interface{})
		Warn(args ...interface{})
		Warning(args ...interface{})
		Error(args ...interface{})
		Fatal(args ...interface{})
		Panic(args ...interface{})

		Traceln(args ...interface{})
		Debugln(args ...interface{})
		Infoln(args ...interface{})
		Println(args ...interface{})
		Warnln(args ...interface{})
		Warningln(args ...interface{})
		Errorln(args ...interface{})
		Fatalln(args ...interface{})
		Panicln(args ...interface{})
	}
)
