// backend/models/setup.go
package models

import (
	"log"

	"github.com/cynicalight/butter.ink/backend/config"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

// SetupDB 初始化数据库连接
func SetupDB() {
	conf := config.GetConfig()
	var err error
	
	DB, err = gorm.Open(postgres.Open(conf.DBUrl), &gorm.Config{})
	if err != nil {
		log.Fatalf("连接数据库失败: %v", err)
	}
	
	// 自动迁移模型到数据库
	err = DB.AutoMigrate(&User{}, &Post{}, &Tag{})
	if err != nil {
		log.Fatalf("数据库迁移失败: %v", err)
	}
	
	log.Println("数据库连接和迁移成功")
}