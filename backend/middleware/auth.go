// backend/middleware/auth.go
package middleware

import (
	"net/http"
	"strings"

	"github.com/cynicalight/butter.ink/backend/utils"
	"github.com/gin-gonic/gin"
)

// JWT认证中间件
func JWTAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "未提供认证信息"})
			c.Abort()
			return
		}
		
		// 检查Bearer前缀
		parts := strings.SplitN(authHeader, " ", 2)
		if !(len(parts) == 2 && parts[0] == "Bearer") {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "认证格式错误"})
			c.Abort()
			return
		}
		
		// 解析token
		claims, err := utils.ParseToken(parts[1])
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "无效的token"})
			c.Abort()
			return
		}
		
		// 将用户信息存入上下文
		c.Set("userID", claims.UserID)
		c.Set("role", claims.Role)
		c.Next()
	}
}

// 角色授权中间件
func RoleAuth(roles ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		role, exists := c.Get("role")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "未认证"})
			c.Abort()
			return
		}
		
		userRole := role.(string)
		
		// 检查用户角色是否在允许的角色列表中
		allowed := false
		for _, r := range roles {
			if r == userRole {
				allowed = true
				break
			}
		}
		
		if !allowed {
			c.JSON(http.StatusForbidden, gin.H{"error": "无权访问"})
			c.Abort()
			return
		}
		
		c.Next()
	}
}