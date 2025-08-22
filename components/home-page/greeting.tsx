import clsx from 'clsx'
import { Twemoji } from '~/components/ui/twemoji'

export function Greeting() {
  return (
    <div
      className={clsx(
        'font-greeting font-bold', // 修复拼写错误
        'text-[40px] leading-[56px] md:text-[68px] md:leading-[80px]', // 放大字体尺寸

        // 简约的灰色调，统一色系
        'text-gray-700 dark:text-gray-300',

        // 添加细微的阴影增加层次感
        'drop-shadow-sm',

        // 简单的过渡动画
        'transition-colors duration-300',

        // 去掉过于突兀的效果，保持简约
        'tracking-tight' // 字符间距紧一点，更现代
      )}
    >
      BU44ER'S BLOG
    </div>
  )
}
