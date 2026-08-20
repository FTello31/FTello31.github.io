---
title: Build a Fullstack Next.js App, v4 | Frontend Masters (WIP)
description: by  Brian Holt • Feb 13, 2026.
publishDate: 2026-08-15
---

https://fullstack-v4.holt.courses/

https://github.com/btholt/fullstack-next-wiki


# Build a Fullstack Next.js App, v4

## Quick Reference


```bash
npx create-next-app@latest wikimasters
npm run lint
npm run format
npx shadcn@latest init
```



## Introduction

Course site:

https://fullstack-v4.holt.courses/

Related React learning resources:

- https://frontendmasters.com/learn/react/
- https://frontendmasters.com/courses/complete-react-v9/
- https://tanstack.com/start/latest

Course repositories:

- https://github.com/btholt/build-a-fullstack-nextjs-app-v4
- https://github.com/btholt/fullstack-next-wiki

Clone the wiki project:

```bash
git clone https://github.com/btholt/fullstack-next-wiki.git
```

---

## Setup

Setup instructions:

https://fullstack-v4.holt.courses/lessons/welcome/my-setup

---

## Creating a Next.js App

Create a new Next.js application:

```bash
npx create-next-app@latest wikimasters
```

Course configuration:

- TypeScript: **Yes**
- Biome: used for linting and formatting
- React Compiler: enabled
- Tailwind CSS: initially **No**
- `src/` directory: **Yes**
- App Router: **Yes**
- Turbopack: **Yes**
- Custom import alias: initially **No**

Starter code:

https://github.com/btholt/fullstack-next-wiki/tree/main/00-start

### Biome

Biome can replace tools such as ESLint and Prettier for many linting and formatting tasks.

VS Code extension:

https://marketplace.visualstudio.com/items?itemName=biomejs.biome

Run linting:

```bash
npm run lint
```

Run linting with automatic fixes:

```bash
npm run lint -- --fix --unsafe
```

If the project defines a formatting script:

```bash
npm run format
```

Biome can also be run directly:

```bash
npx biome format .
```

To write formatting changes:

```bash
npx biome format --write .
```

---

## Adding shadcn, Tailwind & Radix

Course lesson:

https://fullstack-v4.holt.courses/lessons/styling/shadcn

Useful comparison:

https://workos.com/blog/what-is-the-difference-between-radix-and-shadcn-ui

### Radix UI vs. shadcn/ui

**Radix UI** provides low-level, accessible, unstyled UI primitives.

Examples:

- Dialog
- Dropdown Menu
- Tabs
- Popover
- Tooltip

**shadcn/ui** provides reusable component source code built using technologies such as Radix UI and Tailwind CSS.

A useful mental model:

```text
Radix UI
   ↓
accessible primitives

shadcn/ui
   ↓
styled, editable components built on top of primitives
```

Unlike a traditional component library, shadcn/ui usually copies component source code directly into your project so you can modify it.

Initialize shadcn:

```bash
npx shadcn@latest init
```

Add the navigation menu:

```bash
npx shadcn@latest add navigation-menu
```

Add a button:

```bash
npx shadcn@latest add button
```

---

## Sign In & Sign Up with Stack Auth

Code checkpoint:

https://github.com/btholt/fullstack-next-wiki/tree/main/01-shadcn

Course lesson:

https://fullstack-v4.holt.courses/lessons/auth/signin-and-signup

### Authentication note

The course originally referenced Neon Auth, but a breaking change required switching to **Stack Auth** for authentication.

Neon is still used for the database.

### Environment variables

From the Neon dashboard:

1. Open the project.
2. Click **Connect**.
3. Copy the PostgreSQL connection string.
4. Add it to a `.env` file in the project root.

Example:

```env
DATABASE_URL="postgresql://..."
```

Do not commit secrets or database credentials to Git.

A typical `.gitignore` should include:

```text
.env
.env.local
```

---

## Drizzle ORM Setup

Course lesson:

https://fullstack-v4.holt.courses/lessons/database/setting-up-drizzle

Drizzle is a TypeScript ORM designed to provide a strongly typed interface for SQL databases.

Typical architecture:

```text
Next.js application
       ↓
Drizzle ORM
       ↓
PostgreSQL / Neon
```

Drizzle can be used for:

- Defining database schemas
- Creating typed queries
- Performing inserts, updates, deletes, and selects
- Managing migrations

---



frontend masters notes; 

# Build a Fullstack Next.js App, v4 | Frontend Masters

### Introduction

**Introduction**

[00:00:10](https://master.dev/courses/fullstack-app-next-v4/introduction?t=10)
Here's a link to the [course website](https://fullstack-v4.holt.courses/)

[00:01:02](https://master.dev/courses/fullstack-app-next-v4/introduction?t=62)
Here's a link to the [Intro notes](https://fullstack-v4.holt.courses/lessons/welcome/intro)

[00:01:35](https://master.dev/courses/fullstack-app-next-v4/introduction?t=95)
Here are links to check out [Scott Moss](https://master.dev/teachers/scott-moss) and [Build an AI-Powered Fullstack Next.js App, v3](https://master.dev/courses/fullstack-app-next-v3/)

[00:02:21](https://master.dev/courses/fullstack-app-next-v4/introduction?t=141)
Here's a link to the [React/Next.js Learning Path](https://master.dev/learn/react/)

[00:02:30](https://master.dev/courses/fullstack-app-next-v4/introduction?t=150)
Here's a link to the [Beginner Learning Path](https://master.dev/learn/beginner/)

[00:02:36](https://master.dev/courses/fullstack-app-next-v4/introduction?t=156)
Here's a link to check out the [Complete Intro to React](https://master.dev/courses/complete-react-v9/)

[00:02:56](https://master.dev/courses/fullstack-app-next-v4/introduction?t=176)
Here are links to check out [Intermediate React, v6](https://master.dev/courses/intermediate-react-v6/) and [Next.js Fundamentals, v4](https://master.dev/courses/next-js-v4/)

[00:06:25](https://master.dev/courses/fullstack-app-next-v4/introduction?t=385)
Here's a link to check out [TanStack Start](https://tanstack.com/start/latest)

[00:09:03](https://master.dev/courses/fullstack-app-next-v4/introduction?t=543)
Here are links to check out [Brian's 𝕏](https://twitter.com/holtbt), [Bluesky](https://bsky.app/profile/brianholt.me), [LinkedIn](https://www.linkedin.com/in/btholt/), and [GitHub](https://github.com/btholt)

[00:09:55](https://master.dev/courses/fullstack-app-next-v4/introduction?t=595)
Here's a link to the [course repo](https://github.com/btholt/build-a-fullstack-nextjs-app-v4)

[00:09:57](https://master.dev/courses/fullstack-app-next-v4/introduction?t=597)
Here's a link to [fullstack-next-wiki](https://github.com/btholt/fullstack-next-wiki)

[00:11:13](https://master.dev/courses/fullstack-app-next-v4/introduction?t=673)
`git clone https://github.com/btholt/fullstack-next-wiki.git`

[00:11:37](https://master.dev/courses/fullstack-app-next-v4/introduction?t=697)
Go [star the repo](https://github.com/btholt/build-a-fullstack-nextjs-app-v4)

[00:11:44](https://master.dev/courses/fullstack-app-next-v4/introduction?t=704)
https://fullstack-v4.holt.courses/
https://master.dev/learn/react/

https://master.dev/courses/complete-react-v9/

https://tanstack.com/start/latest

2 repos : https://github.com/btholt/build-a-fullstack-nextjs-app-v4
https://github.com/btholt/fullstack-next-wiki


git clone https://github.com/btholt/fullstack-next-wiki.git

**Setup**

[00:00:02](https://master.dev/courses/fullstack-app-next-v4/setup?t=2)
Here's a link to [Brian's setup notes](https://fullstack-v4.holt.courses/lessons/welcome/my-setup)

[00:00:21](https://master.dev/courses/fullstack-app-next-v4/setup?t=21)
https://fullstack-v4.holt.courses/lessons/welcome/my-setup

### UI Styling

**Creating a Next.js App**

[00:00:01](https://master.dev/courses/fullstack-app-next-v4/creating-a-next-js-app?t=1)
npx create-next-app@latest wikimasters

customize settings
typescript
Biome -> biome does the prettier things 
React compiler No
Tailwind Y 
src/ Y 
App Router Y 
Turbopack Y
import alias No (but will be used)


commands: 
npm run lint
npm run lint -- --fix --unsafe


npm biome format -> formatter
npm run format



https://marketplace.visualstudio.com/items?itemName=biomejs.biome

https://github.com/btholt/fullstack-next-wiki/tree/main/00-start

[00:01:20](https://master.dev/courses/fullstack-app-next-v4/creating-a-next-js-app?t=80)
`npx create-next-app@latest wikimasters`

[00:02:41](https://master.dev/courses/fullstack-app-next-v4/creating-a-next-js-app?t=161)
Here's a link to check out [Complete Intro to React, v9](https://master.dev/courses/complete-react-v9/)

[00:07:31](https://master.dev/courses/fullstack-app-next-v4/creating-a-next-js-app?t=451)
Here's a link to the [Biome VSCode Extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)

[00:09:28](https://master.dev/courses/fullstack-app-next-v4/creating-a-next-js-app?t=568)
Here's a link to the [00-start](https://github.com/btholt/fullstack-next-wiki/tree/main/00-start) checkpoint

**Adding shadcn, Tailwind & Radix**

[00:00:35](https://master.dev/courses/fullstack-app-next-v4/adding-shadcn-tailwind-radix?t=35)
Here's a link to the [shadcn notes](https://fullstack-v4.holt.courses/lessons/styling/shadcn)

[00:01:18](https://master.dev/courses/fullstack-app-next-v4/adding-shadcn-tailwind-radix?t=78)
Here's a link to check out [shadcn ui](https://ui.shadcn.com/)

[00:01:51](https://master.dev/courses/fullstack-app-next-v4/adding-shadcn-tailwind-radix?t=111)
Here's a link to the [Radix vs shadcn-ui article](https://workos.com/blog/what-is-the-difference-between-radix-and-shadcn-ui)

[00:04:30](https://master.dev/courses/fullstack-app-next-v4/adding-shadcn-tailwind-radix?t=270)
Here's a link to check out [Tailwind CSS 4+](https://master.dev/courses/tailwind-css-v2/)

[00:06:37](https://master.dev/courses/fullstack-app-next-v4/adding-shadcn-tailwind-radix?t=397)
Here's a link to [shadcn's 𝕏](https://x.com/shadcn)

[00:07:21](https://master.dev/courses/fullstack-app-next-v4/adding-shadcn-tailwind-radix?t=441)
`npx shadcn@latest init`

[00:08:09](https://master.dev/courses/fullstack-app-next-v4/adding-shadcn-tailwind-radix?t=489)
`npx shadcn@latest add @shadcn/navigation-menu`

[00:08:59](https://master.dev/courses/fullstack-app-next-v4/adding-shadcn-tailwind-radix?t=539)
`npx shadcn@latest add @shadcn/button`

[00:09:09](https://master.dev/courses/fullstack-app-next-v4/adding-shadcn-tailwind-radix?t=549)
https://fullstack-v4.holt.courses/lessons/styling/shadcn

What is the difference between Radix and shadcn-ui?: https://workos.com/blog/what-is-the-difference-between-radix-and-shadcn-ui

npx shadcn@latest init
npx shadcn@latest add @shadcn/navigation-menu
npx shadcn@latest add @shadcn/button

**Creating a Nav UI Component**

[00:12:29](https://master.dev/courses/fullstack-app-next-v4/creating-a-nav-ui-component?t=749)
Here's a link to check out [shadcn ui](https://ui.shadcn.com/)

**Creating a Card UI Component**

[00:03:23](https://master.dev/courses/fullstack-app-next-v4/creating-a-card-ui-component?t=203)
The wiki-card code can be found on [this page](https://fullstack-v4.holt.courses/lessons/styling/shadcn)

[00:07:40](https://master.dev/courses/fullstack-app-next-v4/creating-a-card-ui-component?t=460)
Here's a link to check out our [Practical Prompt Engineering](https://master.dev/courses/prompt-engineering/) course

**Scaling Tailwind & Adding Components**

[00:00:03](https://master.dev/courses/fullstack-app-next-v4/scaling-tailwind-adding-components?t=3)
Here's a link to the [01-shadcn checkpoint](https://github.com/btholt/fullstack-next-wiki/tree/main/01-shadcn)

[00:00:22](https://master.dev/courses/fullstack-app-next-v4/scaling-tailwind-adding-components?t=22)
Here's a link to the [Scaling Tailwind notes](https://fullstack-v4.holt.courses/lessons/styling/scaling-tailwind)

[00:00:29](https://master.dev/courses/fullstack-app-next-v4/scaling-tailwind-adding-components?t=29)
Here's a link to check out [Tailwind CSS 4+](https://master.dev/courses/tailwind-css-v2/)

[00:02:09](https://master.dev/courses/fullstack-app-next-v4/scaling-tailwind-adding-components?t=129)
Here's a link to check out the [Tailwind docs](https://tailwindcss.com/docs/theme)

[00:02:43](https://master.dev/courses/fullstack-app-next-v4/scaling-tailwind-adding-components?t=163)
Here's a link to check out [CVA](https://cva.style/docs)

[00:05:15](https://master.dev/courses/fullstack-app-next-v4/scaling-tailwind-adding-components?t=315)
Here's a link to the [complete ui](https://fullstack-v4.holt.courses/lessons/styling/complete-ui) notes

[00:05:18](https://master.dev/courses/fullstack-app-next-v4/scaling-tailwind-adding-components?t=318)
Here's a link to the [02-complete-ui checkpoint](https://github.com/btholt/fullstack-next-wiki/tree/main/02-complete-ui)

### Authentication

**Signin & Signup with Stack Auth**

[00:00:04](https://master.dev/courses/fullstack-app-next-v4/signin-signup-with-stack-auth?t=4)
🚨NOTE: Neon Auth shipped a breaking change. We recommend using Stack Auth. Follow the steps [on the course site](https://fullstack-v4.holt.courses/lessons/auth/signin-and-signup)

[00:00:07](https://master.dev/courses/fullstack-app-next-v4/signin-signup-with-stack-auth?t=7)
https://github.com/btholt/fullstack-next-wiki/tree/main/01-shadcn

🚨NOTE: Neon Auth shipped a breaking change. We recommend using Stack Auth. Follow the steps on the course site
https://fullstack-v4.holt.courses/lessons/auth/signin-and-signup

Here's a link to sign up for Neon. You'll still need this for the database piece.


Froom your Neon Dashboard, click the Connect button and copy the connection string into a .env file at the root of your proj

[00:00:08](https://master.dev/courses/fullstack-app-next-v4/signin-signup-with-stack-auth?t=8)
Here's a link to the [signin and signup](https://fullstack-v4.holt.courses/lessons/auth/signin-and-signup) notes

[00:00:33](https://master.dev/courses/fullstack-app-next-v4/signin-signup-with-stack-auth?t=33)
We've updated the course site with the [Stack Auth instructions](https://fullstack-v4.holt.courses/lessons/auth/signin-and-signup)

[00:01:41](https://master.dev/courses/fullstack-app-next-v4/signin-signup-with-stack-auth?t=101)
Here's a link to [sign up for Neon](https://neon.com/). You'll still need this for the database piece.

[00:03:10](https://master.dev/courses/fullstack-app-next-v4/signin-signup-with-stack-auth?t=190)
Don't enable Neon Auth

[00:03:24](https://master.dev/courses/fullstack-app-next-v4/signin-signup-with-stack-auth?t=204)
You can skip this step. You will need to create a [Stack Auth account](https://stack-auth.com)

[00:04:10](https://master.dev/courses/fullstack-app-next-v4/signin-signup-with-stack-auth?t=250)
From your Neon Dashboard, click the `Connect` button and copy the connection string into a `.env` file at the root of your project.

[00:04:39](https://master.dev/courses/fullstack-app-next-v4/signin-signup-with-stack-auth?t=279)
You only need the `DATABASE_URL` from Neon. The other keys will be copied from your Stack Auth account.

[00:04:50](https://master.dev/courses/fullstack-app-next-v4/signin-signup-with-stack-auth?t=290)
Follow the instructions [on the course website](https://fullstack-v4.holt.courses/lessons/auth/signin-and-signup) to create the three Next.js keys

[00:05:47](https://master.dev/courses/fullstack-app-next-v4/signin-signup-with-stack-auth?t=347)
`npx @stackframe/init-stack@latest --no-browser`

[00:14:24](https://master.dev/courses/fullstack-app-next-v4/signin-signup-with-stack-auth?t=864)
Note: Set a `user name` in your account settings if you don't have one. User Name is used as the article author.

[00:15:12](https://master.dev/courses/fullstack-app-next-v4/signin-signup-with-stack-auth?t=912)
You won't have this in your Neon console. Later in the course, you'll add a function to sync Stack Auth with the Neon DB

**Protecting Routes**

[00:03:13](https://master.dev/courses/fullstack-app-next-v4/protecting-routes?t=193)
Here's a link to the [protecting routes](https://fullstack-v4.holt.courses/lessons/auth/protecting-routes) notes

[00:09:39](https://master.dev/courses/fullstack-app-next-v4/protecting-routes?t=579)
Here's a link to check out [Scott Moss's API Design in Node.js course](https://master.dev/courses/api-design-nodejs-v5/)

**Creating Protected Server Actions**

[00:00:02](https://master.dev/courses/fullstack-app-next-v4/creating-protected-server-actions?t=2)
Here's a link to the [actions file](https://github.com/btholt/fullstack-next-wiki/tree/main/03-auth/src/app/actions)

[00:10:54](https://master.dev/courses/fullstack-app-next-v4/creating-protected-server-actions?t=654)
Here's a link to the [03-auth checkpoint](https://github.com/btholt/fullstack-next-wiki/tree/main/03-auth)

### Neon Postgres Database

**Drizzle ORM Setup**

[00:00:05](https://master.dev/courses/fullstack-app-next-v4/drizzle-orm-setup?t=5)
Here's a link to the [03-auth checkpoint](https://github.com/btholt/fullstack-next-wiki/tree/main/03-auth)

[00:00:20](https://master.dev/courses/fullstack-app-next-v4/drizzle-orm-setup?t=20)
Here's a link to the [neon and postgres](https://fullstack-v4.holt.courses/lessons/database/neon-and-postgres) notes

[00:02:14](https://master.dev/courses/fullstack-app-next-v4/drizzle-orm-setup?t=134)
Here's a link to check out [Brian's Complete Intro to SQL & PostgreSQL](https://master.dev/courses/sql/) course

[00:02:29](https://master.dev/courses/fullstack-app-next-v4/drizzle-orm-setup?t=149)
Here's a link to check out [Brian's Complete Intro to Databases](https://master.dev/courses/databases/)

[00:02:45](https://master.dev/courses/fullstack-app-next-v4/drizzle-orm-setup?t=165)
Here's a link to the [setting up drizzle](https://fullstack-v4.holt.courses/lessons/database/setting-up-drizzle) notes

[00:03:12](https://master.dev/courses/fullstack-app-next-v4/drizzle-orm-setup?t=192)
Drizzle: https://fullstack-v4.holt.courses/lessons/database/setting-up-drizzle

[00:05:19](https://master.dev/courses/fullstack-app-next-v4/drizzle-orm-setup?t=319)
ORM stands for "Object-Relational Mapping"

**Create a Drizzle Schema**

[00:00:09](https://master.dev/courses/fullstack-app-next-v4/create-a-drizzle-schema?t=9)
`npm i drizzle-orm @neondatabase/serverless dotenv`

[00:00:55](https://master.dev/courses/fullstack-app-next-v4/create-a-drizzle-schema?t=55)
`npm i -D drizzle-kit drizzle-seed`

[00:07:30](https://master.dev/courses/fullstack-app-next-v4/create-a-drizzle-schema?t=450)
You don't need to import `usersSync`. You will make a custom usersSync function. 

[00:15:33](https://master.dev/courses/fullstack-app-next-v4/create-a-drizzle-schema?t=933)
🚨Important: [Follow these steps](https://github.com/btholt/fullstack-next-wiki/blob/main/ERRATA.md#code-changes-steps-04-09) to add the usersSync method

**Run Database Migration**

[00:05:35](https://master.dev/courses/fullstack-app-next-v4/run-database-migration?t=335)
`npx drizzle-kit migrate`

**Database Seed Script**

[00:00:50](https://master.dev/courses/fullstack-app-next-v4/database-seed-script?t=50)
npm i -D tsx

[00:01:05](https://master.dev/courses/fullstack-app-next-v4/database-seed-script?t=65)
Here's a link to the [seed.ts code](https://github.com/btholt/fullstack-next-wiki/tree/main/04-database/src/db/seed.ts)

[00:02:18](https://master.dev/courses/fullstack-app-next-v4/database-seed-script?t=138)
🚨Important: Make sure usersSync is coming from `@/db/schema`

[00:02:49](https://master.dev/courses/fullstack-app-next-v4/database-seed-script?t=169)
Note: The seed script creates a "Seed User" to associate with all the seeded articles

**Read from the Database**

[00:05:29](https://master.dev/courses/fullstack-app-next-v4/read-from-the-database?t=329)
Note: The author of your seeded articles will be the "Seed User"

**Create & Update Queries**

[00:00:04](https://master.dev/courses/fullstack-app-next-v4/create-update-queries?t=4)
Here's a link to the [writes with drizzle](https://fullstack-v4.holt.courses/lessons/database/writes-with-drizzle) notes

[00:00:15](https://master.dev/courses/fullstack-app-next-v4/create-update-queries?t=15)
Here are links to check out [Intermediate React, v6](https://master.dev/courses/intermediate-react-v6/) and [Next.js Fundamentals, v4](https://master.dev/courses/next-js-v4/)

[00:01:38](https://master.dev/courses/fullstack-app-next-v4/create-update-queries?t=98)
🚨You'll want to make sure you include the `ensureUserExists` function call here. Follow steps [2 and 3 in the Errata](https://github.com/btholt/fullstack-next-wiki/blob/main/ERRATA.md#code-changes-steps-04-09)

**Authorization**

[00:02:32](https://master.dev/courses/fullstack-app-next-v4/authorization?t=152)
Here's a link to the [authorization notes](https://fullstack-v4.holt.courses/lessons/database/authorization)

[00:15:42](https://master.dev/courses/fullstack-app-next-v4/authorization?t=942)
If you are having any issues, check out the [04-database Code Checkpoint resources](https://fullstack-v4.holt.courses/lessons/database/code-checkpoint)

### Object Storage & Key-Value Store

**Vercel Blob**

[00:02:51](https://master.dev/courses/fullstack-app-next-v4/vercel-blob?t=171)
Here's a link to [Vercel](https://vercel.com/)

**Upload Images**

[00:00:12](https://master.dev/courses/fullstack-app-next-v4/upload-images?t=12)
Here's a link to check out [Cloudinary](https://cloudinary.com/)

**Why Use a Key-Value Store**

[00:00:10](https://master.dev/courses/fullstack-app-next-v4/why-use-a-key-value-store?t=10)
Here's a link to the [key-value stores](https://fullstack-v4.holt.courses/lessons/key-value-store/upstash) notes

[00:00:52](https://master.dev/courses/fullstack-app-next-v4/why-use-a-key-value-store?t=52)
Here's a link to check out [Brian's redis-to -postgres repo](https://github.com/btholt/redis-to-postgres)

[00:01:42](https://master.dev/courses/fullstack-app-next-v4/why-use-a-key-value-store?t=102)
Here's a link to check out [Brian's Complete Intro to Databases](https://master.dev/courses/databases/)

[00:09:12](https://master.dev/courses/fullstack-app-next-v4/why-use-a-key-value-store?t=552)
Here's a link to check out [Upstash](https://upstash.com/)

[00:11:22](https://master.dev/courses/fullstack-app-next-v4/why-use-a-key-value-store?t=682)
`npm i @upstash/redis`

**Key-Value Store with Redis**

[00:00:22](https://master.dev/courses/fullstack-app-next-v4/key-value-store-with-redis?t=22)
Here's a link to the [caching](https://fullstack-v4.holt.courses/lessons/key-value-store/caching) notes

**Redis Page View Counter**

[00:00:21](https://master.dev/courses/fullstack-app-next-v4/redis-page-view-counter?t=21)
Here's a link to the [counting](https://fullstack-v4.holt.courses/lessons/key-value-store/counting) notes

### Transactional Emails

**Resend Setup**

[00:00:06](https://master.dev/courses/fullstack-app-next-v4/resend-setup?t=6)
Here's a link to the [06-chaching](https://github.com/btholt/fullstack-next-wiki/tree/main/06-caching) checkpoint

[00:01:30](https://master.dev/courses/fullstack-app-next-v4/resend-setup?t=90)
Here's a link to the [resend](https://fullstack-v4.holt.courses/lessons/email/resend) notes

[00:01:44](https://master.dev/courses/fullstack-app-next-v4/resend-setup?t=104)
Here's a link to checkout [Resend](https://resend.com/)

**Creating Email Logic**

[00:01:14](https://master.dev/courses/fullstack-app-next-v4/creating-email-logic?t=74)
`npm i resend @react-email/render`

[00:04:22](https://master.dev/courses/fullstack-app-next-v4/creating-email-logic?t=262)
🚨You need to import the custom usersSync method: `import { usersSync } from "@/db/schema"`

**React Email**

[00:00:11](https://master.dev/courses/fullstack-app-next-v4/react-email?t=11)
Here's a link to the [send emails to users](https://fullstack-v4.holt.courses/lessons/email/send-emails-to-users) notes

[00:00:22](https://master.dev/courses/fullstack-app-next-v4/react-email?t=22)
Here's a link to check out [react email](https://react.email/)

### AI Integration

**Vercel AI Gateway**

[00:01:09](https://master.dev/courses/fullstack-app-next-v4/vercel-ai-gateway?t=69)
Here's a link to the [Vercel AI Gateway notes](https://fullstack-v4.holt.courses/lessons/ai/vercel-ai-gateway)

[00:02:40](https://master.dev/courses/fullstack-app-next-v4/vercel-ai-gateway?t=160)
Here's a link to [Open Router](https://openrouter.ai/)

[00:04:22](https://master.dev/courses/fullstack-app-next-v4/vercel-ai-gateway?t=262)
Create an environment variable for `AI_GATEWAY_API_KEY`

[00:06:13](https://master.dev/courses/fullstack-app-next-v4/vercel-ai-gateway?t=373)
The `ai` folder should be one level higher. Brian fixes this in the next lesson.

[00:06:48](https://master.dev/courses/fullstack-app-next-v4/vercel-ai-gateway?t=408)
You can copy the code [from the notes](https://fullstack-v4.holt.courses/lessons/ai/ai-inference)

[00:08:23](https://master.dev/courses/fullstack-app-next-v4/vercel-ai-gateway?t=503)
Also check out [Practical Prompt Engineering](https://master.dev/courses/prompt-engineering/)

**Create a Cron Job**

[00:01:58](https://master.dev/courses/fullstack-app-next-v4/create-a-cron-job?t=118)
The code for this job can be found [in the notes](https://fullstack-v4.holt.courses/lessons/ai/cron)

[00:16:46](https://master.dev/courses/fullstack-app-next-v4/create-a-cron-job?t=1006)
Here's a link to [crontab.guru](https://crontab.guru/)

### DevOps & Deployment

**Configure Pre-Production Environments**

[00:20:07](https://master.dev/courses/fullstack-app-next-v4/configure-pre-production-environments?t=1207)
Brian still needs to add the Stack Auth keys. He does this in the next lesson.

**Analytics, Logging & Observability**

[00:08:18](https://master.dev/courses/fullstack-app-next-v4/analytics-logging-observability?t=498)
Here's a link to [Node Pino](https://getpino.io/)

**Continuous Integration**

[00:00:06](https://master.dev/courses/fullstack-app-next-v4/continuous-integration?t=6)
For more CI/CD, check out our [DevOps Learning Path](https://master.dev/learn/devops/)
