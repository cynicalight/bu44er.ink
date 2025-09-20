'use client'

import { clsx } from 'clsx'
import { useEffect, useRef } from 'react'
import Typed from 'typed.js'
import { Twemoji } from '~/components/ui/twemoji'

function createTypedInstance(el: HTMLElement) {
  return new Typed(el, {
    stringsElement: '#bios',
    typeSpeed: 80,
    backSpeed: 30,
    loop: true,
    backDelay: 1000,
  })
}

export function TypedBios() {
  const el = useRef(null)
  const typed = useRef<Typed | null>(null)

  useEffect(() => {
    if (el.current) {
      typed.current?.destroy()
      typed.current = createTypedInstance(el.current)
    }
  }, [])

  return (
    <div
      className={clsx([
        'flex min-h-8 items-center justify-center gap-0.5', // 添加 justify-center 居中对齐
        [
          '[&_.typed-cursor]:inline-block',
          '[&_.typed-cursor]:w-2',
          '[&_.typed-cursor]:h-5.5',
          '[&_.typed-cursor]:text-transparent',
          '[&_.typed-cursor]:bg-slate-800',
          'dark:[&_.typed-cursor]:bg-slate-100',
        ],
      ])}
    >
      <ul id="bios" className="hidden">
        {/* <li>
          I'm aliased as <span className="font-medium">Xiaoke</span> at work.
        </li> */}
        <li>I work mostly with Python.</li>
        <li>I love street photography.</li>
        <li>
          My first programming language was <b className="font-medium">C on Arduino</b>.
        </li>
        <li>My favorite band is the Beatles.</li>
        <li>Because of La La Land, I fell in love with jazz.</li>
        <li>
          I live in <b className="font-medium">Shanghai, China</b>.
        </li>
        <li>
          I'm a dog-person. <Twemoji emoji="dog" />
        </li>
        <li>
          I'm a sport-guy. I love
          <span className="ml-1">
            <Twemoji emoji="badminton" />,
            <Twemoji emoji="person-running" />.
          </span>
        </li>
        <li>I'm a learner, builder, and freedom seeker.</li>
      </ul>
      <span ref={el} className="text-neutral-900 dark:text-neutral-200" />
    </div>
  )
}
