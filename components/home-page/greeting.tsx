import clsx from 'clsx'
import { Twemoji } from '~/components/ui/twemoji'

export function Greeting() {
  return (
    <div
      className={clsx(
        'font-greeting font-extrabold',

        // 'text-[35px] leading-[50px] md:text-[60px] md:leading-[120px]',
        // 'bg-clip-text text-transparent',
        // // 浅色模式：淡紫 → 淡粉渐变
        // // 'bg-gradient-to-l from-blue-600/80 dark:to-pink-600/70',
        // // 浅色模式：深绿色渐变
        // 'bg-gradient-to-r from-[#123524] to-[#889A92]',

        // // 深色模式：稍深的紫灰 → 粉灰渐变
        // // 'to-pink-200/90 dark:bg-gradient-to-r dark:from-purple-200/90'
        // 'dark:bg-gradient-to-r dark:from-[#B9C3B5] dark:to-[#3a5041]'

        'text-[35px] leading-[50px] md:text-[60px] md:leading-[120px]',
        // 设置浅色模式下的文字颜色
        'text-[#6b6f59]',
        // 设置深色模式下的文字颜色
        'dark:text-[#727B67]'
      )}
      //'dark:bg-gradient-to-l dark:from-slate-500 dark:to-cyan-200'
    >
      44's BLOG
      <Twemoji emoji="/" size="base" />
    </div>
  )
}
