---
title: Headless CMSs with Next.js | Frontend Masters (WIP)
description: by Scott Moss.
publishDate: 2026-08-15
course: nextjs
order: 2
---


Course repo: https://github.com/Hendrixer/headless-nextjs

# Headless CMS with Next.js Notes

## Introduction

Course repository:

https://github.com/Hendrixer/headless-nextjs

Start from the initial course step:

```bash
git checkout step/0
```

---

## Course Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

UI/template resource:

https://cruip.com/

---

## Setup Contentful

A **headless CMS** manages content separately from the frontend application.

Instead of rendering the website itself, the CMS exposes the content through an API. The frontend—such as a Next.js application—fetches that content and decides how to display it.

Examples of headless CMS platforms:

- Sanity: https://www.sanity.io/
- Payload: https://payloadcms.com/
- Strapi: https://strapi.io/
- Contentful: https://www.contentful.com/

### Basic architecture

```text
Headless CMS
    ↓
API
    ↓
Next.js application
    ↓
User interface
```

This separation allows the same content to potentially be consumed by multiple clients, such as:

- Websites
- Mobile applications
- Other frontend applications
- External services

---

## Content Model in Contentful

Create the application's content model inside Contentful.

The Next.js application can then fetch that content through Contentful's GraphQL API.

Example endpoint:

```text
https://graphql.contentful.com/content/v1/spaces/:spaceid
```

A file such as `fetch.ts` can contain the logic responsible for sending requests to Contentful and retrieving the application's content.

Conceptually:

```text
Contentful content model
        ↓
Contentful GraphQL API
        ↓
fetch.ts
        ↓
Next.js application
```

---

## Course Links

### Introduction

https://master.dev/courses/headless-cms-nextjs/introduction/

### Course Setup

https://master.dev/courses/headless-cms-nextjs/course-setup/

### Setup Contentful

https://master.dev/courses/headless-cms-nextjs/setup-contentful/

### Content Model in Contentful

https://master.dev/courses/headless-cms-nextjs/content-model-in-contentful/





.....






# Frontend masters notes: 

# Headless CMSs with Next.js | Frontend Masters

### Introduction

**Introduction**

[00:01:53](https://master.dev/courses/headless-cms-nextjs/introduction?t=113)
Here's a link to the [course repo](https://github.com/Hendrixer/headless-nextjs)

[00:02:06](https://master.dev/courses/headless-cms-nextjs/introduction?t=126)
https://github.com/Hendrixer/headless-nextjs

git checkout step/0

[00:02:53](https://master.dev/courses/headless-cms-nextjs/introduction?t=173)
`git checkout step/0`

[00:05:13](https://master.dev/courses/headless-cms-nextjs/introduction?t=313)
Here's a link to check out [Intermediate Next.js](https://master.dev/courses/intermediate-next-js)

[00:05:30](https://master.dev/courses/headless-cms-nextjs/introduction?t=330)
Here's a link to check out our [Node.js Learning Path](https://master.dev/learn/node-js/)

[00:05:44](https://master.dev/courses/headless-cms-nextjs/introduction?t=344)
Here's a link to check out our [GraphQL courses](https://master.dev/topics/graphql/)

**Course Setup**

[00:00:02](https://master.dev/courses/headless-cms-nextjs/course-setup?t=2)
Here's a link to the [course repo](https://github.com/Hendrixer/headless-nextjs)

[00:00:07](https://master.dev/courses/headless-cms-nextjs/course-setup?t=7)
`npm install`

[00:00:15](https://master.dev/courses/headless-cms-nextjs/course-setup?t=15)
`npm run dev`

[00:00:45](https://master.dev/courses/headless-cms-nextjs/course-setup?t=45)
Here's a link to check out [Cruip](https://cruip.com/)

[00:03:44](https://master.dev/courses/headless-cms-nextjs/course-setup?t=224)
npm install

npm run dev

https://cruip.com/

### Contentful Headless CMS

**Headless CMS & Industry Overview**

[00:03:55](https://master.dev/courses/headless-cms-nextjs/headless-cms-industry-overview?t=235)
Here's a link to check out [Sanity](https://www.sanity.io/)

[00:06:11](https://master.dev/courses/headless-cms-nextjs/headless-cms-industry-overview?t=371)
Here's a link to check out [Payload](https://payloadcms.com/)

[00:06:31](https://master.dev/courses/headless-cms-nextjs/headless-cms-industry-overview?t=391)
Here's a link to check out [Strapi](https://strapi.io/)

[00:08:00](https://master.dev/courses/headless-cms-nextjs/headless-cms-industry-overview?t=480)
Here's a link to check out [Contentful](https://www.contentful.com/)

[00:10:51](https://master.dev/courses/headless-cms-nextjs/headless-cms-industry-overview?t=651)
With a free plan you will start with one Space named "Blank"

**Setup Contentful**

[00:00:03](https://master.dev/courses/headless-cms-nextjs/setup-contentful?t=3)
headless cms , manage your content and will be delivered over an API

open source: sanity, payload (https://payloadcms.com/), strapi (https://strapi.io/), contentful (https://www.contentful.com/)

[00:00:18](https://master.dev/courses/headless-cms-nextjs/setup-contentful?t=18)
Here's a link to a [.env example](https://github.com/Hendrixer/headless-nextjs/blob/main/.env.example)

**Contentful API Setup**

[00:07:49](https://master.dev/courses/headless-cms-nextjs/contentful-api-setup?t=469)
`https://graphql.contentful.com/content/v1/spaces/:spaceid`

**Content Model in Contentful**

[00:00:02](https://master.dev/courses/headless-cms-nextjs/content-model-in-contentful?t=2)
create  content / fetch.ts -> https://graphql.contentful.com/content/v1/spaces/:spaceid

### Dynamic Content & Image Assets

**Querying Content with GraphQL**

[00:03:51](https://master.dev/courses/headless-cms-nextjs/querying-content-with-graphql?t=231)
Here's a link to [Apollo Studio Explorer Sandbox](https://studio.apollographql.com/sandbox/explorer)

[00:04:08](https://master.dev/courses/headless-cms-nextjs/querying-content-with-graphql?t=248)
`https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`

**Pulling Content into Next.js**

[00:09:05](https://master.dev/courses/headless-cms-nextjs/pulling-content-into-next-js?t=545)
`npm run dev`

[00:11:01](https://master.dev/courses/headless-cms-nextjs/pulling-content-into-next-js?t=661)
Here's a link to check out [Intermediate Next.js](https://master.dev/courses/intermediate-next-js/)

**Content Modeling Images**

[00:03:39](https://master.dev/courses/headless-cms-nextjs/content-modeling-images?t=219)
Here's a link to the [images](https://github.com/Hendrixer/headless-nextjs/tree/main/public/images)

**Loading Images into Next.js**

[00:00:27](https://master.dev/courses/headless-cms-nextjs/loading-images-into-next-js?t=27)
Here's a link to the [next.config.js code](https://github.com/Hendrixer/headless-nextjs/blob/main/next.config.js)

[00:07:24](https://master.dev/courses/headless-cms-nextjs/loading-images-into-next-js?t=444)
Here's a link to the [Next.js docs](https://nextjs.org/docs)

### Dynamic Paths & Previewing Content

**Dynamic Content Fetching**

[00:02:55](https://master.dev/courses/headless-cms-nextjs/dynamic-content-fetching?t=175)
Here's a link to check out the [rich-text-react-renderer](https://github.com/contentful/rich-text/tree/master/packages/rich-text-react-renderer)

[00:03:06](https://master.dev/courses/headless-cms-nextjs/dynamic-content-fetching?t=186)
`npm install @contentful/rich-text-react-renderer`

**Pre-rendering Dynamic Routes**

[00:05:21](https://master.dev/courses/headless-cms-nextjs/pre-rendering-dynamic-routes?t=321)
`npm run build`

**Adding Content Preview Route**

[00:07:29](https://master.dev/courses/headless-cms-nextjs/adding-content-preview-route?t=449)
Here's a link to check out the Next.js docs for [Draft Mode](https://nextjs.org/docs/app/building-your-application/configuring/draft-mode)

**Previewing Content Q&A**

[00:01:51](https://master.dev/courses/headless-cms-nextjs/previewing-content-q-a?t=111)
Here's a link to check out [Liveblocks](https://liveblocks.io/)

[00:08:44](https://master.dev/courses/headless-cms-nextjs/previewing-content-q-a?t=524)
Here's a link to check out the [Next.js ISR docs](https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration)

**Resources & Next Steps**

[00:01:49](https://master.dev/courses/headless-cms-nextjs/resources-next-steps?t=109)
Here's a link to check out [Builder](https://www.builder.io/)

[00:03:49](https://master.dev/courses/headless-cms-nextjs/resources-next-steps?t=229)
Here's a link to check out [Prismic](https://prismic.io/)

[00:05:28](https://master.dev/courses/headless-cms-nextjs/resources-next-steps?t=328)
Here's a link to check out [Sanity](https://www.sanity.io/)

[00:05:41](https://master.dev/courses/headless-cms-nextjs/resources-next-steps?t=341)
Here's a link to check out [Storyblok](https://www.storyblok.com/)

[00:06:35](https://master.dev/courses/headless-cms-nextjs/resources-next-steps?t=395)
Here's a link to check out [Framer](https://www.framer.com/)
