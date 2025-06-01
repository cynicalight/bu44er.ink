// backend/routes/routes.go
package routes

import (
	"github.com/cynicalight/butter.ink/backend/controllers"
	"github.com/cynicalight/butter.ink/backend/middleware"
	"github.com/gin-gonic/gin"
)

// SetupRoutes 配置API路由
func SetupRoutes(r *gin.Engine) {
	// API 路由组
	api := r.Group("/api")
	
	// 公开路由
	api.POST("/register", controllers.Register)
	api.POST("/login", controllers.Login)
	api.GET("/posts", controllers.GetPosts)
	api.GET("/posts/:slug", controllers.GetPost)
	
	// 需要认证的路由
	auth := api.Group("/")
	auth.Use(middleware.JWTAuth())
	{
		// 用户相关
		auth.GET("/user", controllers.GetCurrentUser)
		
		// 文章相关（需要认证）
		auth.POST("/posts", controllers.CreatePost)
		auth.PUT("/posts/:slug", controllers.UpdatePost)
		auth.DELETE("/posts/:slug", controllers.DeletePost)
	}
	
	// 仅管理员可访问的路由
	admin := api.Group("/admin")
	admin.Use(middleware.JWTAuth(), middleware.RoleAuth("admin"))
	{
		// 用户管理
		admin.GET("/users", controllers.GetUsers)
		admin.PUT("/users/:id/role", controllers.UpdateUserRole)
		admin.DELETE("/users/:id", controllers.DeleteUser)
	}
}