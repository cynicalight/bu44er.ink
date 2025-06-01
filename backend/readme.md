## backend structure

```bash
backend/
├── main.go           # 入口文件
├── config/           # 配置文件
├── controllers/      # 控制器(处理请求)
├── middleware/       # 中间件
├── models/           # 数据模型
├── routes/           # 路由定义
└── utils/            # 工具函数
```

## init

```bash
# 创建项目目录
mkdir -p backend
cd backend

# 初始化Go模块
go mod init github.com/cynicalight/butter.ink/backend

# 安装必要的依赖
go get github.com/gin-gonic/gin
go get gorm.io/gorm
go get gorm.io/driver/postgres
go get github.com/golang-jwt/jwt/v4
go get golang.org/x/crypto/bcrypt
```
