## Twitter Clone

This is a [Twitter](https://twitter.com) Clone project built with [Next.js](https://nextjs.org/), [Prisma](https://www.prisma.io/), [MongoDb](https://www.mongodb.com/), [Tailwind](https://tailwindcss.com/), [Typescript](https://www.typescriptlang.org/) and [NextAuth](https://next-auth.js.org/) libraries. It is a full-stack project that uses [Next.js](https://nextjs.org/) for the frontend and [Prisma](https://www.prisma.io/) for the backend. It is a Twitter clone that allows users to create an account, login, logout, follow other users, like and retweet tweets, and more.

## Demo

You can see the demo of the project [here](https://twitter-clone-hd.vercel.app/).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

<h3>Installing</h3>

A step by step series of examples that tell you how to get a development env running
Clone the repository

```bash
git clone https://github.com/yourusername/twitter-clone.git
```

<p>Install dependencies</p>

```bash
npm install
```

```bash
npx prisma generate
```

Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

<ul>
<li><code>npm run dev</code> - Runs the app in the development mode.</li>
<li><code>npm run start</code> - Runs the app in the production mode.</li>
<li><code>npm run fresh</code> - Drops the database, creates a new one, and runs all migrations.</li>
<li><code>npx prisma db seed</code> - Runs the seed file.</li>
</ul>

## Prisma

Prisma is an open-source database toolkit that makes it easy for developers to reason about their data and how they access it. It is used to query a database inside a Node.js or TypeScript application.

## Prisma Schema

The Prisma schema is the single source of truth for your database schema. It describes your database tables, columns, and relations. It also defines which operations are available on your data.

## Prisma Client

Prisma Client is an auto-generated and type-safe query builder for Node.js & TypeScript. It's used as an alternative to writing plain SQL, or using another database access tool such as SQL query builders (e.g. SQLAlchemy) or ORMs (e.g. TypeORM).

## Built With

<ul>
<li>
<a href="https://www.typescriptlang.org/">Typescript</a><span> (for type safety)<span></li>
<li><a href="https://nextjs.org/">Next.js</a><span></span> (for server-side rendering)</span></li>
<li><a href="https://www.prisma.io/">Prisma</a><span> (for database access)</span>
</li>
<li><a href="https://nodejs.org/api/modules.html">Node.js</a><span> (for running scripts)</span>
</li>
<li><a href="https://www.npmjs.com/package/swr">SWR</a><span> (for data fetching)</span>
</li>
<li><a href="https://www.npmjs.com/package/react-hot-toast">Hot-Toast</a><span> (for toast notifications)</span>
</li>
<li><a href="https://www.npmjs.com/package/next-auth">Next-Auth</a><span> (for authentication)</span>
</li>
<li><a href="https://www.npmjs.com/package/axios">Axios</a><span> (for making HTTP requests)</span>
</li>
<li><a href="https://www.npmjs.com/package/react-icons">React-Icons</a><span> (for icons)</span>
</li>
<li><a href="https://www.npmjs.com/package/zustand">Zustand</a><span> (for state management)</span>
</li>
<li><a href="https://www.npmjs.com/package/bcrypt">Bcrypt</a><span> (for hashing passwords)</span>
</li>
</ul>

## Authors

<ul>
<li><a href="https://github.com/harundogdu">Harun Doğdu</a></li>
<li><a href="https://github.com/atahantutar">Atahan Tutar</a></li>
<li><a href="https://github.com/yusufalperendumlu">Yusuf Alperen Dumlu</a></li>
</ul>

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
