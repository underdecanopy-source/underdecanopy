# OLÓWÒ foundation audit — 22 November 2026

This audit is based on the repository, not the labels shown in the UI.

| Area | Observed state | Production readiness | Action |
| --- | --- | --- | --- |
| Product branding | Public OLÓWÒ routes and metadata exist. Some internal `smarttax` route/library names remain for legacy demo compatibility. | Partial | Improve user-facing OLÓWÒ language as screens are changed; retain legacy API identifiers until an explicit migration. |
| Authentication | Business APIs obtain the Supabase server user; browser does not provide a user ID. | Partial | Keep; add automated login/session coverage and rate limits before release. |
| Tenant boundary | Businesses, memberships, inventory, customers, sales, payments, accounts, journals, audits and events are business-scoped. The APIs query membership before access. Composite foreign keys protect new sale/account relations. | Foundation only | Keep and extend to every future module; add integration tests against PostgreSQL. |
| Receipt/tax demo | Browser-local state and local/temporary filed-return storage. It is explicitly called a demo in current documentation. | Not production-ready | Preserve as legacy preview; replace with tenant-scoped persisted receipts and secure object storage later. |
| Inventory | Products, warehouses and append-only stock movements persist. On-hand stock is derived from movements; adjustments are serializable and idempotent. | First operational slice | Keep and connect purchases, returns, transfers and counts. |
| Sales and customers | New persisted customer directory and completed-sale API. A sale validates tenant-owned records/stock, records payment or receivable, writes movements, posts a balanced journal, and emits audit/event records atomically. | Backend foundation | Improve with a sales UI, payment collection, tax rules, receipt documents, void/refund and reporting. |
| Finance | New minimal chart-of-accounts and immutable journal entry/line records support sale postings. | Foundation only | Expand to purchases, expenses, payment allocation, controlled reversals and financial statements. |
| Testing | Unit tests cover current business/inventory routes and the new sale atomic workflow. The repository has no configured database in this workspace for migration/integration verification. | Partial | Add PostgreSQL-backed tenant, balance, idempotency and concurrent-stock tests. |
| Deployment | Next.js/Vercel configuration exists; `.env.example` documents database, Supabase and email variables. | Not verified | Verify build, migrations, storage, logs, backups and environment configuration against staging before release. |

## Current data migration approach

The sales-finance migration is additive: it creates new tables and enum types only. It does not rename or delete existing tables, rows or legacy SmartTax/demo files. Take and verify a database backup before applying it to any environment with business data. Run `prisma migrate status` and `prisma migrate deploy` against a configured target database; this workspace does not contain a database connection that can prove migration application.

## Immediate next phase

1. Build the authenticated sales/POS workspace on top of the completed-sale API and generate persisted OLÓWÒ receipts.
2. Add controlled payment collection, voids, returns and refunds with reversing stock and journal entries.
3. Add purchase/supplier workflows so inventory and payables use the same transaction and journal foundation.
4. Add PostgreSQL integration tests for cross-tenant access, concurrent final-stock sales, idempotent retries and balanced journals.
5. Replace local filed-return storage with a tenant-authorized object-storage abstraction before offering document retention.
