// backend/utils/jwt.go
package utils

import (
	"errors"
	"time"

	"github.com/cynicalight/butter.ink/backend/config"
	"github.com/golang-jwt/jwt/v4"
)

// 自定义JWT声明
type JWTClaims struct {
	UserID uint
	Role   string
	jwt.RegisteredClaims
}

// GenerateToken 生成JWT令牌
func GenerateToken(userID uint, role string) (string, error) {
	conf := config.GetConfig()
	
	// 设置token有效期为24小时
	expireTime := time.Now().Add(24 * time.Hour)
	
	claims := JWTClaims{
		UserID: userID,
		Role:   role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expireTime),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Subject:   "user_auth",
		},
	}
	
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(conf.JWTSecret))
}

// ParseToken 解析JWT令牌
func ParseToken(tokenString string) (*JWTClaims, error) {
	conf := config.GetConfig()
	
	token, err := jwt.ParseWithClaims(tokenString, &JWTClaims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(conf.JWTSecret), nil
	})
	
	if err != nil {
		return nil, err
	}
	
	if claims, ok := token.Claims.(*JWTClaims); ok && token.Valid {
		return claims, nil
	}
	
	return nil, errors.New("无效的token")
}