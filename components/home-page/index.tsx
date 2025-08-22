'use client'

import { useState, useEffect } from 'react'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Snippet } from '~/.contentlayer/generated'
import { Container } from '~/components/ui/container'
import { Greeting } from './greeting'
import { LatestPosts } from './latest-posts'
import { TypedBios } from './typed-bios'

export function Home({
  posts,
  snippets,
}: {
  posts: CoreContent<Blog>[]
  snippets: CoreContent<Snippet>[]
}) {
  const [showLatestPosts, setShowLatestPosts] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const threshold = 200 // 滚动超过200px时显示内容

      if (scrollY > threshold) {
        setShowLatestPosts(true)
        setShowScrollHint(false)
      } else {
        setShowLatestPosts(false)
        setShowScrollHint(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Container as="div" className="pt-0">
      {/* 主内容区域 - 全宽居中，减少上方空白 */}
      <div className="relative flex min-h-screen flex-col items-center justify-center py-8">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <Greeting />
          <div className="text-lg leading-8 text-gray-600 dark:text-gray-400 md:text-xl md:leading-9">
            <TypedBios />
            <div className="mb-6 mt-6 md:mb-8 md:mt-8">
              {/* <p className="text-xl md:text-2xl leading-relaxed">
                This is the track of my journey along the way, the path I have paved with my
                experiences and thoughts.{' '}
              </p> */}
            </div>
          </div>
        </div>

        {/* 首页下拉箭头 滚动提示箭头 - 固定在屏幕底部 */}
        {showScrollHint && (
          <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transform">
            <div className="flex cursor-pointer flex-col items-center text-gray-500 transition-colors duration-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <div
                className="animate-bounce"
                style={{
                  animationDuration: '2s',
                  animationIterationCount: 'infinite',
                }}
              >
                <svg
                  className="mb-2 h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium opacity-80">More</span>
            </div>
          </div>
        )}
      </div>

      {/* Latest Posts 内容区域 */}
      <div
        className={`transition-all duration-700 ease-in-out ${
          showLatestPosts
            ? 'translate-y-0 opacity-100'
            : 'pointer-events-none translate-y-10 opacity-0'
        }`}
      >
        <LatestPosts posts={posts} snippets={snippets} />
      </div>
    </Container>
  )
}
