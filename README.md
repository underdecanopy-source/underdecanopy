This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Olowo

Olowo is the target multi-tenant Business Operating System for SMEs. The current repository still contains legacy applications and browser-based demos; the presence of a screen or demo workflow does not mean that capability is backed by production persistence or is production-ready.

Copy `.env.example` to `.env.local` and configure the database and Supabase values before using the authenticated business workspace API. `DIRECT_URL` is used for direct database/migration connections. Configure `HOUSEHOOD_SESSION_SECRET` and `SMARTTAX_DEMO_FILE_SECRET` as independent random secrets of at least 32 characters before using those signed-token features. Do not commit `.env.local` or production secrets.

The current persisted Olowo foundation includes authenticated business creation/listing and a tenant-scoped inventory preview for products, categories, warehouses, and audited stock adjustments. Inventory quantities are derived from the stock-movement ledger; adjustment writes require an authorized business role, run serializably, reject negative stock, and accept idempotency keys. Apply the business foundation and inventory migrations before using these endpoints. Sales, purchases, customers, suppliers, payments, journal entries, and financial reports are not connected to this inventory slice yet, so it is not a complete or production-ready Business OS. The receipt/tax demo remains browser-local and must not be used as a source of production business records. Filed-return files are still stored on local disk or temporary server storage, not durable tenant-scoped object storage.

The checked-in Prisma migration history does not yet reconstruct every model in the current Prisma schema on a clean database. Reconcile and verify the migration baseline against the target database before deployment; do not assume the current migrations are safe for a fresh production install or apply destructive schema changes without a verified backup.
