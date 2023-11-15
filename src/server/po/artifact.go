package po

type Artifact struct {
	*BasePO

	VersionID int64  `gorm:"column:version_id"`
	Name      string `gorm:"column:name"`
	Type      string `gorm:"column:type"`
	Data      string `gorm:"column:data"`
}

func (Artifact) TableName() string {
	return "artifact"
}
