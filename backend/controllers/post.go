// backend/controllers/post.go
package controllers

import (
	"net/http"
	"time"

	"github.com/cynicalight/butter.ink/backend/models"
	"github.com/gin-gonic/gin"
	gosimpleSlug "github.com/gosimple/slug"
)

// 创建文章请求
type CreatePostRequest struct {
	Title     string `json:"title" binding:"required"`
	Content   string `json:"content" binding:"required"`
	Published bool   `json:"published"`
	TagIDs    []uint `json:"tag_ids"`
}

// 创建文章
func CreatePost(c *gin.Context) {
	var req CreatePostRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求数据"})
		return
	}

	userID, _ := c.Get("userID")

	// 生成slug
	postSlug := gosimpleSlug.Make(req.Title)

	// 创建文章
	post := models.Post{
		Title:     req.Title,
		Slug:      postSlug,
		Content:   req.Content,
		Published: req.Published,
		UserID:    userID.(uint),
	}

	// 如果发布，设置发布时间
	if req.Published {
		post.PublishedAt = time.Now()
	}

	if err := models.DB.Create(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "创建文章失败"})
		return
	}

	// 添加标签
	if len(req.TagIDs) > 0 {
		var tags []models.Tag
		models.DB.Where("id IN ?", req.TagIDs).Find(&tags)
		models.DB.Model(&post).Association("Tags").Append(tags)
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "文章创建成功",
		"post":    post,
	})
}

// 获取所有文章
func GetPosts(c *gin.Context) {
	var posts []models.Post
	query := models.DB.Preload("User").Preload("Tags")

	// 管理员可以看到所有文章，普通用户只能看到已发布文章
	role, _ := c.Get("role")
	if role != "admin" {
		query = query.Where("published = ?", true)
	}

	if err := query.Find(&posts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "获取文章失败"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"posts": posts})
}

// 获取单篇文章
func GetPost(c *gin.Context) {
	slug := c.Param("slug")

	var post models.Post
	query := models.DB.Preload("User").Preload("Tags").Where("slug = ?", slug)

	// 管理员可以看到所有文章，普通用户只能看到已发布文章
	role, exists := c.Get("role")
	if !exists || role != "admin" {
		query = query.Where("published = ?", true)
	}

	if err := query.First(&post).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "文章不存在"})
		return
	}

	// 更新浏览量
	models.DB.Model(&post).Update("views", post.Views+1)

	c.JSON(http.StatusOK, gin.H{"post": post})
}

// 更新文章
func UpdatePost(c *gin.Context) {
	slug := c.Param("slug")

	var post models.Post
	if err := models.DB.Where("slug = ?", slug).First(&post).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "文章不存在"})
		return
	}

	// 权限检查：只有管理员或文章作者可以更新
	userID, _ := c.Get("userID")
	role, _ := c.Get("role")
	if role != "admin" && post.UserID != userID.(uint) {
		c.JSON(http.StatusForbidden, gin.H{"error": "无权操作"})
		return
	}

	var req CreatePostRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求数据"})
		return
	}

	// 如果标题改变，更新slug
	if req.Title != post.Title {
		post.Title = req.Title
		post.Slug = gosimpleSlug.Make(req.Title)
	}

	post.Content = req.Content

	// 如果从未发布变为发布，设置发布时间
	if !post.Published && req.Published {
		post.PublishedAt = time.Now()
	}
	post.Published = req.Published

	if err := models.DB.Save(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "更新文章失败"})
		return
	}

	// 更新标签
	if len(req.TagIDs) > 0 {
		var tags []models.Tag
		models.DB.Where("id IN ?", req.TagIDs).Find(&tags)
		models.DB.Model(&post).Association("Tags").Replace(tags)
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "文章更新成功",
		"post":    post,
	})
}

// 删除文章
func DeletePost(c *gin.Context) {
	slug := c.Param("slug")

	var post models.Post
	if err := models.DB.Where("slug = ?", slug).First(&post).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "文章不存在"})
		return
	}

	// 权限检查：只有管理员或文章作者可以删除
	userID, _ := c.Get("userID")
	role, _ := c.Get("role")
	if role != "admin" && post.UserID != userID.(uint) {
		c.JSON(http.StatusForbidden, gin.H{"error": "无权操作"})
		return
	}

	if err := models.DB.Delete(&post).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "删除文章失败"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "文章删除成功"})
}
