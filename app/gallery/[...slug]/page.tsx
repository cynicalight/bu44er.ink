import type { Author, Gallery } from 'contentlayer/generated'
import { allAuthors, allGalleries } from 'contentlayer/generated'
import 'css/prism.css'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { allCoreContent, coreContent, sortPosts } from 'pliny/utils/contentlayer'
import { SITE_METADATA } from '~/data/site-metadata'
import { PostBanner } from '~/layouts/post-banner'
import { PostLayout } from '~/layouts/post-layout'
import { PostSimple } from '~/layouts/post-simple'
// 导入 Gallery 专用的 MDX 组件
import { GALLERY_MDX_COMPONENTS } from '~/components/gallery/gallery-mdx'
import { GalleryContentRenderer } from '~/components/gallery/client-wrapper'

const DEFAULT_LAYOUT = 'PostSimple'
const LAYOUTS = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] }
}): Promise<Metadata | undefined> {
  const slug = decodeURI(params.slug.join('/'))
  const gallery = allGalleries.find((s) => s.slug === slug)
  const authorList = gallery?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Author)
  })
  if (!gallery) {
    return
  }

  const publishedAt = new Date(gallery.date).toISOString()
  const modifiedAt = new Date(gallery.lastmod || gallery.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [SITE_METADATA.socialBanner]
  if (gallery.images) {
    imageList = typeof gallery.images === 'string' ? [gallery.images] : gallery.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : SITE_METADATA.siteUrl + img,
    }
  })

  return {
    title: gallery.title,
    description: gallery.summary,
    openGraph: {
      title: gallery.title,
      description: gallery.summary,
      siteName: SITE_METADATA.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authors.length > 0 ? authors : [SITE_METADATA.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: gallery.title,
      description: gallery.summary,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  return allGalleries.map((s) => ({ slug: s.slug.split('/').map((name) => decodeURI(name)) }))
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allGalleries))
  const galleryIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (galleryIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[galleryIndex + 1]
  const next = sortedCoreContents[galleryIndex - 1]
  const gallery = allGalleries.find((p) => p.slug === slug) as Gallery
  const authorList = gallery?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Author)
  })
  const mainContent = coreContent(gallery)
  const jsonLd = gallery.structuredData
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    }
  })

  const Layout = LAYOUTS[gallery.layout || DEFAULT_LAYOUT]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <GalleryContentRenderer code={gallery.body.code} toc={gallery.toc} />
      </Layout>
    </>
  )
}
