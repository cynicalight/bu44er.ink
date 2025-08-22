const { withContentlayer } = require('next-contentlayer2')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// You might need to insert additional domains in script-src if you are using external services
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app analytics.umami.is *.i.posthog.com static.cloudflareinsights.com;
  style-src 'self' 'unsafe-inline' cdn.jsdelivr.net;
  img-src * blob: data:;
  media-src *.s3.amazonaws.com;
  connect-src *;
  
  font-src 'self' cdn.jsdelivr.net; 

  frame-src giscus.app *.github.io *.google.com codepen.io
`

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const output = process.env.EXPORT ? 'export' : undefined
const basePath = process.env.BASE_PATH || undefined
const unoptimized = process.env.UNOPTIMIZED ? true : undefined

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = () => {
  const plugins = [withContentlayer, withBundleAnalyzer]
  return plugins.reduce((acc, next) => next(acc), {
    output,
    basePath,
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.gr-assets.com', // Goodreads book covers
        },
        {
          protocol: 'https',
          hostname: 'i.scdn.co', // Spotify album covers
        },
        {
          protocol: 'https',
          hostname: 'm.media-amazon.com', // IMDB movie posters
        },
        {
          protocol: 'https',
          hostname: 'qingwu-oss.oss-cn-heyuan.aliyuncs.com', // 阿里云 OSS
        },
        {
          protocol: 'https',
          hostname: '*.aliyuncs.com', // 所有阿里云 OSS 域名
        },
        {
          protocol: 'https',
          hostname: 'cdn.jsdelivr.net', // CDN 图片
        },
        {
          protocol: 'https',
          hostname: 'raw.githubusercontent.com', // GitHub 原始文件
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com', // Unsplash 图片
        },
        {
          protocol: 'https',
          hostname: 'picsum.photos', // Lorem Picsum 图片
        },
        {
          protocol: 'http',
          hostname: '**', // 允许所有 HTTP 图片（开发环境）
        },
        {
          protocol: 'https',
          hostname: '**', // 允许所有 HTTPS 图片
        },
      ],
      unoptimized,
    },
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
      ]
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'prefixIds',
                    params: {
                      delim: '__',
                      prefixIds: true,
                      prefixClassNames: true,
                    },
                  },
                ],
              },
            },
          },
        ],
      })

      return config
    },
  })
}
