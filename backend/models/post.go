// backend/models/post.go
package models

import (
	"time"
)

// Post 文章模型
type Post struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Title       string    `json:"title" gorm:"not null"`
	Slug        string    `json:"slug" gorm:"unique;not null"`
	Content     string    `json:"content"`
	Published   bool      `json:"published" gorm:"default:false"`
	Views       int64     `json:"views" gorm:"default:0"`
	UserID      uint      `json:"user_id"`
	User        User      `json:"user" gorm:"foreignKey:UserID"`
	Tags        []Tag     `json:"tags" gorm:"many2many:post_tags;"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
	PublishedAt time.Time `json:"published_at"`
}

// Tag 标签模型
type Tag struct {
	ID    uint   `json:"id" gorm:"primaryKey"`
	Name  string `json:"name" gorm:"unique;not null"`
	Slug  string `json:"slug" gorm:"unique;not null"`
	Posts []Post `json:"posts" gorm:"many2many:post_tags;"`
}