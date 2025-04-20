'use client'

import { Image, Zoom, type ImageProps } from '~/components/ui/image'
import { MDX_COMPONENTS } from '~/components/mdx'
import { useState } from 'react'
import React from 'react'

// 增强的图片组件，每行显示两张
const EnhancedGalleryImage = ({ alt = '', src, ...rest }: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)

  if (!src) return null

  return (
    <figure className="gallery-item">
      <Zoom zoomImg={{ src, alt }} canSwipeToUnzoom={true} zoomMargin={40}>
        <div className="gallery-image" style={{ maxWidth: 600, margin: '0 auto' }}>
          <Image
            alt={alt}
            src={src}
            width={400}
            height={300}
            className="h-auto w-full object-cover"
            onLoadingComplete={() => setIsLoaded(true)}
            style={{ opacity: isLoaded ? 1 : 0 }}
            {...rest}
          />
        </div>
      </Zoom>
      {alt && <figcaption className="mt-2 text-center text-sm text-gray-600">{alt}</figcaption>}
    </figure>
  )
}

// 包装容器，确保图片布局正确
const GalleryImagesContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="-mx-2 my-6 flex flex-wrap">{children}</div>
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
    // 如果 p 只包含一个 img，则用 gallery-item 包裹
    const child = props.children
    if (React.Children.count(child) === 1 && React.isValidElement(child) && child.type === 'img') {
      return <div className="gallery-item">{child}</div>
    }
    // 否则正常渲染
    return <p {...props} />
  },
}
