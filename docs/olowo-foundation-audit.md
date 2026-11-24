# OLÓWÒ foundation audit — 24 November 2026

This audit records implementation evidence from the repository. It does not certify the gated Vercel preview or a production database.

| Area | Observed state | Production readiness | Action |
| --- | --- | --- | --- |
| Public product page | Metadata and landing copy now distinguish the persisted workspace from the browser-only receipt/tax demo, disclose missing modules, remove unsupported tax/filing/messaging claims, and provide a valid skip-to-content target. | Copy corrected; deployment rendering not verified because the supplied Vercel preview requires authentication. | Keep capability statements synchronized with implementation. |
| Product branding | Updated user-facing OLÓWÒ landing and demo email language. Internal `smarttax` API/storage identifiers remain for compatibility; generated legacy receipt numbers are rebranded on browser-state load. | Partial | Continue removing obsolete branding from user-facing outputs without renaming compatibility routes or storage keys. |
| Authentication | Business APIs use the Supabase server user. SMTP share and legacy return-document upload routes now require a signed-in user. Middleware leaves the shared `/login` and `/signup` routes unrevised; login returns users to a safe same-site `next` destination. | Code-level foundation; deployed credentials/session behavior not verified. | Add auth/session integration coverage and persistent rate limits before release. |
| Tenant boundary | Current business, membership, product, inventory, customer, sale, payment, account, journal, audit and event records are business-scoped. Current business APIs check membership server-side. | Foundation only; no PostgreSQL integration test or production migration verification. | Extend to every new module and verify with cross-tenant database tests. |
| Roles and permissions | Membership roles exist; current write access is enforced by a central helper with fixed role allowlists. | Incomplete | Add configurable business-scoped permission records and view/create/edit/void/approve/export/settings capabilities. |
| Business setup | Signed-in business creation atomically creates the business, owner membership, audit log and event. | Implemented in code; actual target database availability is unverified. | Verify migration and API behavior against staging. |
| Products and inventory | Product/warehouse creation and append-only stock movements persist. On-hand stock is derived from movements; stock adjustments use idempotency and serializable transactions. | First operational slice | Add purchases, counts, transfers, returns, damage/loss, and PostgreSQL concurrency tests. |
| Sales and customers | Workspace UI and API support customer creation and completed sales. A sale validates business-owned records, records payment/receivable, stock movements, balanced sale journal entries, audit history and events in one transaction. | Partial | Add later payment collection, returns/refunds/void reversals, tax integration, sale-linked receipts and reports. |
| Finance | Minimal chart-of-accounts and balanced journal records exist for completed sales. | Foundation only | Add controlled reversal and accounting flows for purchases, expenses, payments and financial statements. |
| Receipts and tax | Existing receipt/tax demo remains browser-local. New tax draft PDFs are generated in the browser; legacy secure-file routes remain for previously created drafts. The demo is not connected to persisted sales or tax authorities. | Not production-ready | Keep demo-only labeling; replace with business-scoped receipt/tax records and verified configurable, versioned rules before production use. |
| Email and document endpoints | SMTP send and legacy PDF upload endpoints require authentication. Demo share UI distinguishes local drafts and WhatsApp preparation from confirmed delivery. | Partial | Add durable rate limiting, ownership-aware document storage, and integration tests; mail acceptance does not prove recipient delivery. |
| Other modules | Purchases, suppliers, expense workflows, payments after sale, payroll/HR, branches, approvals, notifications, automation, global search, imports/exports, backups and complete reports are absent from the persisted workspace. | Not implemented | Build incrementally on the existing transaction and tenant foundation. |
| Environment and deployment | `.env.example` lists `DATABASE_URL`, `DIRECT_URL`, Supabase and mail variables. This workspace has no local `.env*` values; the external Vercel preview is access-protected. | Not verified | Inspect Vercel/Neon environment in the authorized project; verify migration status, backups, logs and deployment without exposing secrets. |
| Testing | Unit/API tests exist for business, inventory, sales, demo tax/document behavior; this change adds auth checks for demo email/PDF endpoints and legacy receipt-ID migration. | Partial | Add PostgreSQL-backed tenant, balance, rollback, idempotency and concurrency tests; run production build and all critical workflow tests. |

## Data and migration safety

The OLÓWÒ foundation migrations are additive and retain legacy demo routes and browser storage identifiers. No database migration or production data operation was run during this audit. Before applying migrations to any environment with data, verify the target connection, take and validate a backup, inspect `prisma migrate status`, then deploy migrations and verify resulting tables, indexes and constraints.

## Remaining work, prioritized

1. Verify the configured Neon/PostgreSQL staging connection and migration history; the local workspace and gated preview do not provide evidence of production database state.
2. Add subsequent payment collection, reversals/voids, returns/refunds and persisted receipts, preserving atomic stock, payment, journal and audit effects.
3. Implement supplier/purchase and expense transaction workflows before expanding dashboards or financial reports.
4. Add durable rate limits, centralized configurable permissions, and ownership-aware document storage.
5. Add PostgreSQL-backed integration tests for tenant isolation, journal balance, transaction rollback, idempotency and concurrent stock sales.
6. Implement the remaining modules in dependency order: configurable tax records, reporting, approvals/documents, import/export and verified backup/restore; payroll and advanced integrations follow the MVP.

## Validation status

Record exact targeted test, lint, type-check and build outcomes in the implementation handoff. A passing local build or unit suite does not establish that the protected Vercel preview, Neon connection or production migrations are healthy.
