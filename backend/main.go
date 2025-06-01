// backend/main.go
package main

import (
	"log"
	"strconv"

	"github.com/cynicalight/butter.ink/backend/config"
	"github.com/cynicalight/butter.ink/backend/middleware"
	"github.com/cynicalight/butter.ink/backend/models"
	"github.com/cynicalight/butter.ink/backend/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	// 初始化配置
	config.InitConfig()
	conf := config.GetConfig()

	// 初始化数据库
	models.SetupDB()

	// 创建Gin实例
	r := gin.Default()

	// 配置CORS
	r.Use(middleware.Cors())

	// 设置路由
	routes.SetupRoutes(r)

	// 启动服务器
	log.Printf("服务器启动在 :%d", conf.Port)
	r.Run(":" + strconv.Itoa(conf.Port))
}
