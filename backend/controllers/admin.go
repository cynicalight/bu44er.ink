// backend/controllers/admin.go
package controllers

import (
	"net/http"
	"strconv"

	"github.com/cynicalight/butter.ink/backend/models"
	"github.com/gin-gonic/gin"
)

// 更新用户角色请求
type UpdateRoleRequest struct {
	Role string `json:"role" binding:"required"`
}

// GetUsers 获取所有用户
func GetUsers(c *gin.Context) {
	var users []models.User
	if err := models.DB.Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "获取用户失败"})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"users": users})
}

// UpdateUserRole 更新用户角色
func UpdateUserRole(c *gin.Context) {
	userID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的用户ID"})
		return
	}
	
	var user models.User
	if err := models.DB.First(&user, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "用户不存在"})
		return
	}
	
	var req UpdateRoleRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求数据"})
		return
	}
	
	// 验证角色是否有效
	validRoles := map[string]bool{"admin": true, "editor": true, "user": true}
	if !validRoles[req.Role] {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的角色"})
		return
	}
	
	// 更新角色
	user.Role = req.Role
	if err := models.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "更新角色失败"})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{
		"message": "角色更新成功",
		"user": gin.H{
			"id":       user.ID,
			"username": user.Username,
			"email":    user.Email,
			"role":     user.Role,
		},
	})
}

// DeleteUser 删除用户
func DeleteUser(c *gin.Context) {
	userID, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的用户ID"})
		return
	}
	
	var user models.User
	if err := models.DB.First(&user, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "用户不存在"})
		return
	}
	
	// 当前登录的用户不能删除自己
	currentUserID, _ := c.Get("userID")
	if uint(userID) == currentUserID.(uint) {
		c.JSON(http.StatusBadRequest, gin.H{"error": "不能删除当前登录的用户"})
		return
	}
	
	if err := models.DB.Delete(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "删除用户失败"})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"message": "用户删除成功"})
}