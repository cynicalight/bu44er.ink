// config.go
package config

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

// Config 应用配置结构
type Config struct {
	Port             int
	DBUrl            string
	JWTSecret        string
	CorsAllowOrigins []string
}

var appConfig *Config

// InitConfig 初始化应用配置
func InitConfig() {
	// 加载.env文件
	err := godotenv.Load()
	if err != nil {
		log.Println("警告: 未找到.env文件或加载失败，将使用默认值或系统环境变量")
	}

	port, _ := strconv.Atoi(getEnv("PORT", "8080"))

	appConfig = &Config{
		Port:             port,
		DBUrl:            getEnv("DB_URL", "postgres://postgres:postgres@localhost:5432/butter_ink"),
		JWTSecret:        getEnv("JWT_SECRET", "your-secret-key"),
		CorsAllowOrigins: []string{"http://localhost:3434", "https://bu44er.ink"},
	}
}

// GetConfig 获取应用配置
func GetConfig() *Config {
	return appConfig
}

// 从环境变量获取值，如不存在则使用默认值
func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
