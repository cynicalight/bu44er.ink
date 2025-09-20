'use client'

import { clsx } from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { Link } from '~/components/ui/link'

type TocItem = {
  value: string
  url: string
  depth: number
}

function useActiveTocItem(ids: string[]) {
  const [inViewIds, setInViewIds] = useState<string[]>([])
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (document) {
      const headings = ids.map((id) =>
        document.getElementById(id.startsWith('#') ? id.slice(1) : id)
      )
      observer.current?.disconnect()
      observer.current = new IntersectionObserver(
        (entries) => {
          for (const { intersectionRatio, target } of entries) {
            if (intersectionRatio > 0) {
              if (!inViewIds.includes(target.id)) {
                setInViewIds([...inViewIds, target.id])
              }
            } else {
              if (inViewIds.includes(target.id) && inViewIds.length > 1) {
                setInViewIds(inViewIds.filter((id) => id !== target.id))
              }
            }
          }
        },
        { rootMargin: '-96px 0% 0% 0%' }
      )
      for (const el of headings) {
        el && observer.current.observe(el)
      }
      return () => observer.current?.disconnect()
    }
  }, [ids])

  return inViewIds[0]
}

export function TableOfContents({ toc, className }: { toc: TocItem[]; className?: string }) {
  const ids = toc.map((item) => item.url)
  const activeId = useActiveTocItem(ids)

  return (
    <div className={clsx('space-y-4', className)}>
      <h3 className="text-2xl font-semibold text-black dark:text-[#DED7CD]">On this page</h3>
      <div className="toc-scroll max-h-[calc(100vh-200px)] overflow-y-auto scroll-smooth">
        <ul className="flex flex-col space-y-2 pr-2">
          {toc.map(({ value, depth, url }) => (
            <li
              key={url}
              className={clsx([
                'font-medium transition-colors duration-200',
                url === `#${activeId}`
                  ? 'text-gray-700 dark:text-[#DED7CD]'
                  : 'text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-[#DED7CD]',
              ])}
              style={{ paddingLeft: (depth - 2) * 16 }}
            >
              <Link
                href={url}
                className="block rounded px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {value}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
