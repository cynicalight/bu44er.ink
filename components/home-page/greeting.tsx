import clsx from 'clsx'
import { Twemoji } from '~/components/ui/twemoji'

export function Greeting() {
  return (
    <div
      className={clsx(
        'font-greeting font-extrabold tracking-tight',
        'text-[40px] leading-[60px] md:text-[68px] md:leading-[100px]',
        'bg-clip-text text-transparent',
        // 浅色模式：淡紫 → 淡粉渐变
        'bg-gradient-to-l from-blue-600/80 dark:to-pink-600/70',
        // 深色模式：稍深的紫灰 → 粉灰渐变
        'to-pink-200/90 dark:bg-gradient-to-r dark:from-purple-200/90'
      )}
      //'dark:bg-gradient-to-l dark:from-slate-500 dark:to-cyan-200'
    >
      Hello, world! <Twemoji emoji="waving-hand" size="base" />
    </div>
  )
}
