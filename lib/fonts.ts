import {
  JetBrains_Mono,
  Nunito,
  Playpen_Sans,
  Yuji_Boku,
  Athiti,
  Tinos,
  Exo_2,
} from 'next/font/google'

export const FONT_JETBRAINS_MONO = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const FONT_NUNITO = Nunito({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
})

export const FONT_PLAYPEN_SANS = Playpen_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playpen-sans',
})

export const FONT_YUJI_BOKU = Yuji_Boku({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-yuji-boku',
  style: ['normal'],
})

export const FONT_ATHITI = Athiti({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-athiti',
  style: ['normal'],
})

export const FONT_TINOS = Tinos({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-tinos',
  style: ['normal', 'italic'],
})

export const FONT_EXO_2 = Exo_2({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-exo-2',
  style: ['normal', 'italic'],
})
