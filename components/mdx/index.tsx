import type { MDXComponents } from 'mdx/types'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import Pre from 'pliny/ui/Pre'
import TOCInline from 'pliny/ui/TOCInline'
import { Image, Zoom, type ImageProps } from '~/components/ui/image'
import { Link } from '~/components/ui/link'
import { Twemoji } from '~/components/ui/twemoji'
import { TableWrapper } from './table-wrapper'

export const MDX_COMPONENTS: MDXComponents = {
  // for <Image />
  Image: ({ alt, src, ...rest }: ImageProps) => {
    return (
      <Zoom zoomImg={{ src, alt }} canSwipeToUnzoom={true} zoomMargin={40}>
        <Image alt={alt} src={src} {...rest} className="my-4" />
      </Zoom>
    )
  },

  // for <img />
  // ![alt](src) is img
  img: ({ alt = '', src, ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    if (!src) return null
    return (
      <Zoom zoomImg={{ src, alt }} canSwipeToUnzoom={true} zoomMargin={100}>
        <img alt={alt} src={src} className="my-4 max-w-full rounded-lg" {...rest} />
      </Zoom>
    )
  },

  TOCInline,
  Twemoji,
  a: Link,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
}
