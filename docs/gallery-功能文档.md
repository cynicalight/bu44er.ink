# Gallery 功能详细文档

## 概述

Gallery 是 bu44er.ink 网站的图片画廊功能，用于展示照片集合，主要用于记录生活、旅行等图片内容。该功能支持响应式布局、图片缩放查看、以及专门优化的MDX渲染。

## 功能架构

### 1. 数据来源与结构

#### 1.1 数据类型定义

```typescript
// types/data.ts
export type Gallery = {
  type: 'trip' | 'street' | 'self' // 画廊类型
  title: string // 标题
  description?: string // 描述
  imgSrc: string // 封面图片
  url?: string // 链接地址
  repo?: string | GithubRepository | null
}
```

#### 1.2 Contentlayer 配置

```typescript
// contentlayer.config.ts
export const Gallery = defineDocumentType(() => ({
  name: 'Gallery',
  filePathPattern: 'gallery/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'json' }, // 图片列表，第一张作为封面
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
  },
  // ... 其他配置
}))
```

#### 1.3 数据存储结构

```
data/
├── gallery.ts                    # 手动维护的画廊索引配置
└── gallery/                      # MDX 画廊文件
    ├── 2024/
    │   └── shannan.mdx           # 山南支教画廊
    └── 2025/
        └── summer.mdx            # 颐和园画廊
```

### 2. 前端展示组件

#### 2.1 页面结构

```
/gallery                          # 画廊首页
├── /gallery/2024/shannan         # 具体画廊页面
└── /gallery/2025/summer          # 具体画廊页面
```

#### 2.2 关键组件

##### Gallery 首页组件

- **文件位置**: `app/gallery/page.tsx`
- **功能**: 展示所有画廊的卡片列表
- **数据源**: `allGalleries` from Contentlayer

##### GalleryCard 组件

- **文件位置**: `components/cards/gallery.tsx`
- **功能**: 单个画廊的卡片展示
- **包含**: 封面图、标题、描述、渐变边框效果

##### Gallery详情页面

- **文件位置**: `app/gallery/[...slug]/page.tsx`
- **功能**: 展示具体画廊内容
- **布局**: 使用专门的 `GalleryLayout`

### 3. 专门的布局系统

#### 3.1 GalleryLayout

- **文件位置**: `layouts/gallery-layout.tsx`
- **特点**:
  - 不使用 `prose` 类避免样式冲突
  - 应用 `gallery-grid` 类实现网格布局
  - 保留博客的基本结构（标题、标签、评论等）

#### 3.2 样式系统

- **文件位置**: `css/gallery.css`
- **核心特性**:
  - CSS Grid 布局，响应式设计
  - 固定宽高比 (3:2) 确保图片一致性
  - 悬停效果和暗色模式支持

```css
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.gallery-image {
  aspect-ratio: 3/2;
  object-fit: cover;
  border-radius: 12px;
}
```

### 4. MDX 渲染系统

#### 4.1 专用 MDX 组件

- **文件位置**: `components/gallery/gallery-mdx.tsx`
- **功能**:
  - 重写 `img` 标签渲染
  - 统一图片尺寸和样式
  - 添加缩放功能（react-medium-image-zoom）

#### 4.2 客户端渲染包装器

- **文件位置**: `components/gallery/client-wrapper.tsx`
- **作用**:
  - 客户端渲染 MDX 内容
  - 应用专用的 Gallery MDX 组件
  - 避免 SSR/CSR 不一致问题

### 5. 交互逻辑

#### 5.1 图片交互

- **缩放查看**: 点击图片使用 `react-medium-image-zoom` 放大
- **响应式**: 根据屏幕尺寸调整网格列数
- **懒加载**: 图片支持 lazy loading 优化性能

#### 5.2 导航交互

- **画廊列表**: 从首页点击卡片进入具体画廊
- **上下翻页**: 画廊详情页支持前后画廊导航
- **标签过滤**: 支持按标签浏览相关内容

### 6. 内容管理流程

#### 6.1 添加新画廊的步骤

1. **创建 MDX 文件**

   ```bash
   data/gallery/YYYY/gallery-slug.mdx
   ```

2. **配置 frontmatter**

   ```yaml
   ---
   title: '画廊标题'
   summary: '画廊描述'
   date: '2025-07-14'
   tags: ['others']
   draft: false
   images: ['/static/images/blog/YYYY/gallery-slug/cover.webp']
   authors: ['default']
   ---
   ```

3. **添加图片内容**

   ```markdown
   ![](/static/images/blog/YYYY/gallery-slug/image1.webp)
   ![](/static/images/blog/YYYY/gallery-slug/image2.webp)
   ```

4. **更新画廊索引** (⚠️ 重要)
   ```typescript
   // data/gallery.ts
   {
     type: 'trip',
     title: '画廊标题',
     description: '画廊描述',
     imgSrc: '/static/images/blog/YYYY/gallery-slug/cover.webp',
     url: '/gallery/YYYY/gallery-slug',
   }
   ```

#### 6.2 图片资源管理

- **存储位置**: `public/static/images/blog/YYYY/gallery-slug/`
- **命名规范**: 使用描述性名称或时间戳
- **格式要求**: 推荐 WebP 格式，优化文件大小
- **尺寸建议**: 宽度不超过 1200px，保持合理的文件大小

### 7. 技术实现细节

#### 7.1 解决的技术问题

1. **React Hydration 错误**

   - **问题**: MDX wrapper 组件导致 SSR/CSR 不一致
   - **解决**: 移除 wrapper，使用专门的布局组件

2. **图片显示异常**

   - **问题**: 使用 flexbox 导致图片比例失调
   - **解决**: 改用 CSS Grid + 固定 aspect-ratio

3. **样式冲突**
   - **问题**: Prose 样式影响 Gallery 布局
   - **解决**: 创建专门的 GalleryLayout，避免 prose 类

#### 7.2 性能优化

1. **图片优化**

   - WebP 格式支持
   - 响应式图片加载
   - 懒加载实现

2. **渲染优化**
   - 客户端 MDX 渲染
   - 避免不必要的重渲染
   - 合理的组件拆分

### 8. 维护注意事项

#### 8.1 常见问题

1. **忘记更新 gallery.ts**: 新画廊不会在首页显示
2. **图片路径错误**: 确保图片文件存在且路径正确
3. **frontmatter 格式**: 确保 YAML 格式正确

#### 8.2 调试方法

1. **控制台日志**: `GalleryContentRenderer` 会输出调试信息
2. **构建检查**: Contentlayer 会在构建时验证数据
3. **开发服务器**: 支持热重载，便于调试

#### 8.3 扩展建议

1. **批量上传**: 可考虑添加批量图片上传功能
2. **自动缩略图**: 实现图片自动压缩和缩略图生成
3. **图片元数据**: 支持 EXIF 信息展示
4. **标签系统**: 增强标签过滤和搜索功能

### 9. 相关文件清单

#### 核心文件

- `app/gallery/page.tsx` - 画廊首页
- `app/gallery/[...slug]/page.tsx` - 画廊详情页
- `layouts/gallery-layout.tsx` - 专用布局
- `components/gallery/gallery-mdx.tsx` - MDX 组件
- `components/gallery/client-wrapper.tsx` - 客户端包装器
- `components/cards/gallery.tsx` - 画廊卡片
- `css/gallery.css` - 样式文件
- `data/gallery.ts` - 画廊索引配置

#### 数据文件

- `data/gallery/**/*.mdx` - 画廊内容文件
- `public/static/images/blog/**/*` - 图片资源

#### 配置文件

- `contentlayer.config.ts` - 内容层配置
- `types/data.ts` - 类型定义

这个文档应该能帮助你今后更好地维护和扩展 Gallery 功能。如果需要添加新功能或修复问题，可以参考这个文档快速定位相关代码和实现逻辑。
