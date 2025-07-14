'use client'

import { Image, Zoom, type ImageProps } from '~/components/ui/image'
import { MDX_COMPONENTS } from '~/components/mdx'
import { useState } from 'react'
import React from 'react'

// 增强的图片组件，统一尺寸显示
const EnhancedGalleryImage = ({ alt = '', src, style, width, height, ...rest }: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  if (!src) return null

  return (
    <Zoom zoomImg={{ src, alt }} canSwipeToUnzoom={true} zoomMargin={60}>
      <div className="gallery-image">
        <img
          alt={alt}
          src={src}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            margin: '0',
            padding: '0',
            ...style,
          }}
          className="transition-transform duration-300 hover:scale-105"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </Zoom>
  )
}

// Gallery 专用的 MDX 组件
export const GALLERY_MDX_COMPONENTS = {
  ...MDX_COMPONENTS,
  // 覆盖默认的 img 标签渲染
  img: (props: ImageProps) => {
    return (
      <div className="gallery-item">
        <EnhancedGalleryImage {...props} />
      </div>
    )
  },
  // 覆盖 Image 组件渲染 (用于包含 width/height 的图片)
  Image: (props: ImageProps) => {
    return (
      <div className="gallery-item">
        <EnhancedGalleryImage {...props} />
      </div>
    )
  },
  // 移除wrapper，让每个图片单独渲染
}
