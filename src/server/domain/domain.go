package domain

import "errors"

var (
	ErrNoRecord     = errors.New("no record")
	ErrRecordExist  = errors.New("record exist")
	ErrCreateRecord = errors.New("create record err")
)
