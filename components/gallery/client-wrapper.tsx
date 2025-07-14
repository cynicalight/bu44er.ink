'use client'

import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { GALLERY_MDX_COMPONENTS } from './gallery-mdx'

export function GalleryContentRenderer({ code, toc }: { code: string; toc: any }) {
  console.log('GalleryContentRenderer called with:', { code: code.substring(0, 100), toc })
  console.log('GALLERY_MDX_COMPONENTS:', GALLERY_MDX_COMPONENTS)

  return <MDXLayoutRenderer code={code} components={GALLERY_MDX_COMPONENTS} toc={toc} />
}
