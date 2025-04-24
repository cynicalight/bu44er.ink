'use client'

import { Image, Zoom, type ImageProps } from '~/components/ui/image'
import { MDX_COMPONENTS } from '~/components/mdx'
import { useState } from 'react'
import React from 'react'

// 增强的图片组件，每行显示两张
const EnhancedGalleryImage = ({ alt = '', src, style, ...rest }: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  if (!src) return null

  return (
    <Zoom zoomImg={{ src, alt }} canSwipeToUnzoom={true} zoomMargin={40}>
      <div className="gallery-image">
        <img
          alt={alt}
          src={src}
          style={{
            maxWidth: '400px',
            maxHeight: '300px',
            objectFit: 'cover',
            display: 'block',
            ...style,
          }}
          className="h-auto w-full"
        />
      </div>
    </Zoom>
    // {alt && <figcaption className="mt-2 text-center text-sm text-gray-600">{alt}</figcaption>}
  )
}

// Gallery 专用的 MDX 组件
export const GALLERY_MDX_COMPONENTS = {
  ...MDX_COMPONENTS,
  // 覆盖默认的 img 标签渲染
  img: EnhancedGalleryImage,
  // 添加新的包装容器
  wrapper: ({ children }) => <div className="gallery-grid">{children}</div>,
  // 覆盖默认的 p 标签渲染
  p: (props) => {
    const child = props.children
    if (
      React.Children.count(child) === 1 &&
      React.isValidElement(child) &&
      (child.type === 'img' || child.type === EnhancedGalleryImage)
    ) {
      return <div className="gallery-item">{child}</div>
    }
    return <p {...props} />
  },
}
