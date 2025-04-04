export const SITE_METADATA = {
  title: `Bu44er's blog - Bu44er's coding journey`,
  author: 'Bu44er',
  headerTitle: `Bu44er's blog`,
  description:
    'A personal space on the cloud where I document my programming journey, sharing lessons, insights, and resources for fellow developers.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://www.bu44er.ink',
  siteRepo: 'https://github.com/cynicalight/bu44er.ink',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/profile.webp`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.jpeg`,

  locale: 'en-US',
  stickyNav: true,
  analytics: {
    umamiAnalytics: {
      websiteId: process.env.NEXT_UMAMI_ID,
      shareUrl: 'https://analytics.eu.umami.is/share/EqvpZYPABxaQA3mr/mengke.me',
    },
  },
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  comments: {
    provider: 'giscus', // supported providers: giscus, utterances, disqus
    giscusConfig: {
      // https://giscus.app/
      repo: process.env.NEXT_PUBLIC_GISCUS_REPO!,
      repositoryId: process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID!,
      category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY!,
      categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID!,
      mapping: 'title', // supported options: pathname, url, title
      reactions: '1', // Emoji reactions: 1 = enable / 0 = disable
      metadata: '0',
      theme: 'light',
      darkTheme: 'transparent_dark',
      themeURL: '',
      lang: 'en',
    },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      // path to load documents to search
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}
