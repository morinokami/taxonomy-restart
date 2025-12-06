# Taxonomy Restart

An open source app built with [TanStack Start](https://tanstack.com/start).

## About

This is a clone of shadcn's [Taxonomy](https://github.com/shadcn-ui/taxonomy) app rebuilt with TanStack Start. I wanted to explore TanStack Start's capabilities and how it integrates with various modern tools, and Taxonomy seemed like an ideal candidate for this experiment, so I decided to port it to TanStack Start.

## Features

- Routing using [TanStack Router](https://tanstack.com/router)
- [Layout Routes](https://tanstack.com/router/latest/docs/framework/react/routing/routing-concepts#layout-routes)
- [Server Functions](https://tanstack.com/start/latest/docs/framework/react/guide/server-functions)
- [Server Routes](https://tanstack.com/start/latest/docs/framework/react/guide/server-routes)
- [Static Prerendering](https://tanstack.com/start/latest/docs/framework/react/guide/static-prerendering)
- Authentication using [Clerk](https://clerk.com/)
- ORM using [Prisma](https://www.prisma.io/)
- Database on [Prisma Postgres](https://www.prisma.io/postgres)
- Components from [shadcn/ui](https://ui.shadcn.com/)
- Styling using [Tailwind CSS](https://tailwindcss.com/)
- Documentation and blog using [MDX](https://mdxjs.com/) and [Content Collections](https://www.content-collections.dev/)
- Subscriptions using [Stripe](https://stripe.com/)
- Forms using [TanStack Form](https://tanstack.com/form)
- Validation using [Valibot](https://valibot.dev/)
- Open Graph image generation using [@vercel/og](https://www.npmjs.com/package/@vercel/og)
- Written in [TypeScript](https://www.typescriptlang.org/)
- Running on [Bun](https://bun.com/)
- Deployed on [Vercel](https://vercel.com/)

## Setup

1. Clone the repository:
```bash
git clone git@github.com:morinokami/taxonomy-restart.git
```

2. Install dependencies using Bun:
```bash
bun install
```

3. Copy the .env.example file to .env and fill in the values:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
bun run dev
```
