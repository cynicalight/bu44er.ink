import { genPageMetadata } from 'app/seo'
import { allGalleries } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { Container } from '~/components/ui/container'
import { PageHeader } from '~/components/ui/page-header'
import { GalleryCard } from '~/components/cards/gallery'

export const metadata = genPageMetadata({ title: 'Gallery' })

export default function GalleryPage() {
  const galleries = allCoreContent(sortPosts(allGalleries))

  return (
    <Container className="pt-4 lg:pt-12">
      <PageHeader
        title="Gallery"
        description="This is my life, my world, my journey, and my gallery."
        className="border-b border-gray-200 dark:border-gray-700"
      />
      <div className="py-10">
        <div className="grid-cols-2 gap-x-6 gap-y-10 space-y-10 md:grid md:space-y-0">
          {galleries.map((gallery) => (
            <GalleryCard gallery={gallery} key={gallery.path} />
          ))}
        </div>
      </div>
    </Container>
  )
}
