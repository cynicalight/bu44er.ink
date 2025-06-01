<h1 align="center">bu44er.ink 🧑‍💻</h1>

<div align="center">

[简体中文](./README_zh-CN.md)

</div>

<img style="border-radius: 6px" src="./public/static/images/home-page.png">

## Project Structure

```
app/ - Next.js App Router
    layout.tsx: Global layout component with header, footer, and theme switching
    page.tsx: Home page component
    blog/[...slug]/page.tsx: Blog post dynamic routing
    api/: Server API endpoints
components/ - Reusable components
    ui/: Basic UI components (buttons, inputs, cards)
    blog/: Blog-related components (article lists, tags, comments)
    mdx/: MDX rendering enhancement components
    gallery/: Image gallery components
    header/, footer/: Page structure components
layouts/ - Page layout templates
    post-layout.tsx: Blog post layout
    list-layout.tsx: List page layout
data/ - Content data
    blog/: MDX format blog posts
    authors/: Author information
    site-metadata.ts: Website metadata
public/ - Static resources
    static/images/: Image resources
    fonts/: Font files
css/ - Global styles
    tailwind.css: TailwindCSS entry point
    gallery.css: Gallery-specific styles
prisma/ - Database interaction
    schema.prisma: Database model definition
    migrations/: Database migration files
utils/, hooks/, server/ - Functional code
    Utility functions, custom hooks, server-side logic
```

## Motivation

> Sharing is learning!

I created this blog to record and share my learnings and insights as a software engineer, but also to keep track of my life. It is a treasure trove of valuable information that I have accumulated throughout my journey.

Recording and organizing my thoughts helps me solidify my understanding of new concepts and technologies. My goal is to provide a useful resource for those interested in web development and related technologies.

Your comments and feedback are highly appreciated 🍻. They contribute to the growth and improvement of this blog.

## Tech stack

- 🪤 Hosted on [Vercel](https://vercel.com/).
- 🧱 Built with **React 18+**, **NextJS 14+**.
- 📊 Monitoring site with [Umami](https://umami.is/) website analytics.
- 🎉 Adopting **Typescript**, committing with [Conventional Commits](https://www.conventionalcommits.org/).

## DEMO

You can see what the blog looks like here: <https://bu44er.ink>

## How to deploy a similar blog?

### 1. Installation

1. Clone or fork this repository.

2. Run `npm install` or `yarn` to install dependencies.

### 2. Modify data

1. Rename the `.env.example` file in the root directory to `.env` and modify the value in it.

2. Update the information in the files in the `/data` directory, which contains the blog data.

### 3. Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmk965%2Fmengke.me&env=NEXT_PUBLIC_GISCUS_REPO,NEXT_PUBLIC_GISCUS_REPOSITORY_ID,NEXT_PUBLIC_GISCUS_CATEGORY,NEXT_PUBLIC_GISCUS_CATEGORY_ID,NEXT_UMAMI_ID,SPOTIFY_CLIENT_ID,SPOTIFY_CLIENT_SECRET,SPOTIFY_REFRESH_TOKEN,DATABASE_URL,GITHUB_API_TOKEN&envDescription=Giscus%5CUmami%5CSpotify%5CData%5CGithub&envLink=https%3A%2F%2Fgithub.com%2Fmk965%2Fmengke.me%2Fblob%2Fmain%2F.env.example&project-name=mengke-me-blog&repository-name=mengke-me-blog&demo-title=mengke.me&demo-description=Mengke's%20blog%20-%20Mengke's%20coding%20journey&demo-url=https%3A%2F%2Fwww.mengke.me%2F&demo-image=https%3A%2F%2Fwww.mengke.me%2Fstatic%2Fimages%2Fhome_page.webp)

### 4. Blog post visits can also be stored in Vercel for free

1. Create a `Postgres Database` in Vercel.

2. You will get a string similar to: `postgres://default:xxxxx@xx-xx-xx-xxxx.us-xx-x.postgres.vercel-storage.com:xxx/verceldb`, add it to the `DATABASE_URL` variable.

3. Run `npx prisma db push` to create the `views` table.

4. The number of views of each blog post will be automatically counted in this database.

## Settings

If you want to add some twemoji, you can add the following code to your `css/twemoji.css` file:

```css
/* ❤️‍🩹 mending heart */
.twa-mending-heart {
  background-image: url('https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/2764-fe0f-200d-1fa79.svg');
}
```

## ☕️ Support Open Source

Thanks to the original author: [Mengke](https://github.com/mengke)
