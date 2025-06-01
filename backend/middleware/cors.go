// cors.go
package middleware

import (
	"github.com/cynicalight/butter.ink/backend/config"
	"github.com/gin-gonic/gin"
)

// Cors 跨域中间件
func Cors() gin.HandlerFunc {
	return func(c *gin.Context) {
		conf := config.GetConfig()

		// 设置允许的来源
		origin := c.Request.Header.Get("Origin")

		// 检查来源是否在允许列表中
		allowed := false
		for _, allowedOrigin := range conf.CorsAllowOrigins {
			if allowedOrigin == origin || allowedOrigin == "*" {
				allowed = true
				break
			}
		}

		if allowed {
			c.Writer.Header().Set("Access-Control-Allow-Origin", origin)
			c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
			c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
		}

		// 处理预检请求
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
