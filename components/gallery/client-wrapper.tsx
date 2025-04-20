'use client'

import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { GALLERY_MDX_COMPONENTS } from './gallery-mdx'

export function GalleryContentRenderer({ code, toc }: { code: string; toc: any }) {
  return <MDXLayoutRenderer code={code} components={GALLERY_MDX_COMPONENTS} toc={toc} />
}
