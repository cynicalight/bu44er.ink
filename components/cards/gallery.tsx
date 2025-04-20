import { clsx } from 'clsx'
import { type Gallery } from 'contentlayer/generated'
import { type CoreContent } from 'pliny/utils/contentlayer'
import { Link } from '~/components/ui/link'
import type { BrandsMap } from '~/components/ui/brand'
import { Brand } from '~/components/ui/brand'
import { GradientBorder } from '~/components/ui/gradient-border'
import { GrowingUnderline } from '~/components/ui/growing-underline'
import { TiltedGridBackground } from '~/components/ui/tilted-grid-background'

export function GalleryCard({ gallery }: { gallery: CoreContent<Gallery> }) {
  const { title, summary, path, images } = gallery
  const cover = Array.isArray(images) ? images[0] : images

  return (
    <GradientBorder className="rounded-2xl">
      <Link
        href={`/${path}`}
        title={title}
        className={clsx([
          'relative flex h-full rounded-2xl',
          'bg-zinc-50 dark:bg-white/5',
          'transition-shadow hover:shadow-md',
          'hover:shadow-zinc-900/5 dark:hover:shadow-black/15',
        ])}
      >
        <TiltedGridBackground className="inset-0" />
        {cover && (
          <img
            src={cover}
            alt={title}
            className="h-48 w-full rounded-2xl object-cover"
            loading="lazy"
          />
        )}
        <div className="relative w-full px-4 pb-6 pt-6">
          <h3 className="mt-4 text-xl font-semibold leading-7">
            <GrowingUnderline>{title}</GrowingUnderline>
          </h3>
          <p className="mt-1.5 line-clamp-2 text-zinc-600 dark:text-zinc-400">{summary}</p>
        </div>
      </Link>
    </GradientBorder>
  )
}
