import type { MDXComponents } from 'mdx/types'
import { MDX_COMPONENTS as DefaultMDXComponents } from '~/components/mdx'
import { Image, Zoom, type ImageProps } from '~/components/ui/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, createContext, useContext } from 'react'

// 创建画廊上下文
const GalleryContext = createContext<{
  images: Array<{ src: string; alt: string }>
  registerImage: (src: string, alt: string) => void
}>({
  images: [],
  registerImage: () => {},
})

// 画廊Provider组件
export function GalleryProvider({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<Array<{ src: string; alt: string }>>([])

  const registerImage = (src: string, alt: string) => {
    setImages((prev) => {
      if (prev.some((img) => img.src === src)) return prev
      return [...prev, { src, alt }]
    })
  }

  return (
    <GalleryContext.Provider value={{ images, registerImage }}>
      {children}
      <GalleryGrid />
    </GalleryContext.Provider>
  )
}

// 增强的图片组件
function EnhancedImage({ alt = '', src, ...rest }: ImageProps) {
  const { registerImage } = useContext(GalleryContext)

  useEffect(() => {
    if (src) {
      registerImage(src, alt || '')
    }
  }, [src, alt, registerImage])

  return (
    <figure className="my-6">
      <Zoom zoomImg={{ src, alt }} canSwipeToUnzoom={true} zoomMargin={40}>
        <Image
          alt={alt}
          src={src}
          width={800}
          height={600}
          className="h-auto w-full rounded-lg object-cover shadow-md transition-all duration-300 hover:shadow-xl"
          {...rest}
        />
      </Zoom>
      {alt && <figcaption className="mt-2 text-center text-sm text-gray-600">{alt}</figcaption>}
    </figure>
  )
}

// 图片网格组件
function GalleryGrid() {
  const { images } = useContext(GalleryContext)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  if (images.length < 2) return null

  return (
    <div className="mb-8 mt-12">
      <h2 className="mb-4 text-xl font-bold">画廊</h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {images.map((image, idx) => (
          <motion.div
            key={idx}
            className="relative aspect-square cursor-pointer overflow-hidden rounded-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedImage(idx)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div className="relative max-h-[90vh] max-w-4xl">
              <Image
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                width={1200}
                height={800}
                className="max-h-[80vh] w-auto"
                onClick={(e) => e.stopPropagation()}
              />
              {images[selectedImage].alt && (
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 text-center text-white">
                  {images[selectedImage].alt}
                </div>
              )}
            </motion.div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage((prev) => (prev === null ? null : (prev + 1) % images.length))
              }}
              className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black bg-opacity-50 text-white"
            >
              →
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSelectedImage((prev) =>
                  prev === null ? null : (prev - 1 + images.length) % images.length
                )
              }}
              className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-full bg-black bg-opacity-50 text-white"
            >
              ←
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// 导出 Gallery 专用的 MDX 组件
export const GALLERY_MDX_COMPONENTS: MDXComponents = {
  // 继承默认组件
  ...DefaultMDXComponents,

  // 覆盖需要定制的组件
  img: (props: ImageProps) => <EnhancedImage {...props} />,

  // 你可以在这里添加更多 gallery 专用的组件
}
