# Olowo Product and Engineering Direction

## Product definition

Build **Olowo** as a production-grade, multi-tenant Business Operating System (Business OS) for SMEs.

Positioning: **The Digital Operating System for Your Business.** Olowo is for the people who own, manage, and grow businesses. It is not a tax, inventory, POS, or accounting product. Tax and digital receipts are capabilities within Olowo, not separate product identities.

The objective is to give business owners visibility, accountability, and control from one connected platform. Enter business data once and propagate its effects to every relevant area. Do not build isolated modules that maintain conflicting copies of business or financial facts.

The existing SmartTax Receipt application is the starting point, not a disposable codebase. Preserve and improve working receipt, tax, and business functionality as it is integrated into Olowo. Keep legacy identifiers and routes when they are implementation details; remove obsolete SmartTax Receipt branding from user-facing surfaces as those surfaces are changed. Do not brand tax as a standalone product.

## Audit before major changes

For substantial platform work, inspect the actual repository and establish what works, what is simulated, where data persists, and how pages, APIs, server actions, schema, authentication, storage, validation, integrations, tests, and deployment fit together. Do not infer capabilities from UI labels or assume an architecture.

Before major architectural changes, produce an internal gap analysis that records current status, production readiness, data/API dependencies, validation and security gaps, and a recommended action for each relevant feature. Categorize actions as keep, improve, refactor, replace, remove, or new feature. Use findings to implement the requested work incrementally; do not stop at an analysis when implementation was requested.

## Implementation principles

- Treat `business_id` as a security boundary. Scope database reads and writes, APIs, permissions, and file access to the authenticated user's authorized business; never rely on frontend filtering.
- Use business membership and business-scoped roles/permissions so a user can work with multiple businesses without leaking access or conflating their data.
- Model shared concepts once and reference their source of truth. Avoid duplicating balances, totals, and other derived financial values when they can be computed from authoritative transactions and ledger entries.
- Route sales, purchases, expenses, payroll, adjustments, and transfers through a shared transaction workflow. Each workflow must update its related operational records, accounting entries, reports, and audit history consistently.
- Implement double-entry accounting as the financial source of truth: transactions post balanced journal entries, including sales revenue/receivables and cost-of-goods-sold/inventory where applicable. Preserve traceability from each posting to its source transaction.
- Maintain an append-only, tenant-scoped transaction event history for reporting, analytics, and auditability. Keep it distinct from the accounting journal: events record business activity; journals record balanced financial postings.
- Keep core entities connected and tenant-scoped: businesses, users, roles, permissions; customers, suppliers, products, categories, warehouses, and stock movements; sales and purchases with line items, expenses, and payments; accounts, journals, and journal entries; employees, attendance, leave, and payroll; tax rules and tax transactions; and documents, attachments, notifications, approvals, and audit logs.
- Build generic, tenant-scoped capabilities for approvals, documents/attachments, notifications, and automation rather than reimplementing them independently in each module.
- Include role- and permission-based access, audit trails, and documented API behavior in feature design. Validate inputs and authorization server-side; apply secure session, rate-limit, and file-validation practices.
- Treat APIs as first-class integration surfaces. Make transaction processing idempotent and suitable for payment, messaging, banking, commerce, tax, and mobile integrations.
- Design for intermittent connectivity. Keep offline workflows, queued synchronization, idempotency, and explicit conflict resolution in view, but do not add speculative complexity before the MVP requires it.
- Provide portable imports and exports, starting with Excel-friendly formats, so businesses retain access to their data.
- Add subscription and billing models for plans (such as Starter, Growth, Business, and Enterprise), subscriptions, invoices, and payments without mixing platform billing records with business transactions. Do not invent prices or entitlements.
- Store business documents with an explicit business, module, and record relationship. Use validated uploads and an object-storage abstraction suitable for S3-compatible storage.
- Prepare operational health visibility for backups, sync, storage, active users, failed imports, and errors. Never imply a backup or security control exists until it is implemented and verified.
- Keep data structured for future analytics and AI, but do not add AI features or claim predictions without validated data and behavior.

## Connected product scope

Build modules around shared business records and transaction flows, not unrelated CRUD screens. The eventual platform may include:

- Business dashboard and settings; business membership, branches, roles, and permissions.
- Sales, quotations/orders, invoices, receipts, customers, payment collection, receivables, returns, refunds, and discounts.
- Products, categories, warehouses, stock counts, stock movements, transfers, and adjustments.
- Suppliers, purchase orders, goods received, purchases, supplier payments, returns, and payables.
- Expenses, categories, payment accounts, attachments, recurring expenses, and approvals.
- Finance, chart of accounts, cash and bank accounts, journals, journal entries, financial statements, and reports.
- Employees, departments, attendance, leave, payroll, advances, loans, and assets.
- Configurable tax rules and tax records; documents; notifications; approvals; automation; audit logs; imports, exports, backups, and SaaS billing.

This is a target capability map, not a commitment to build every module at once. Reuse shared models and infrastructure, and implement modules in dependency order. Keep regulatory settings configurable; design first for Nigerian SME workflows, including Naira, local contact details, cash, bank transfers, POS, and applicable business/tax requirements. Do not hard-code frequently changing regulatory rules.

### Transaction and record integrity

- A completed sale should validate products and stock, record sale items, reduce inventory with movement history, record payment or receivable, update customer balances from transactions, calculate cost of goods sold, post finance and applicable tax records, generate the receipt/invoice, and record audit events. These changes must succeed or fail together where supported.
- Receiving a purchase updates stock and supplier balances; supplier payments affect payables. Expenses record amount, date, category, payment account, actor, attachment, and approval state and feed finance. Payroll, transfers, returns, refunds, and adjustments need appropriate accounting and controlled reversal flows.
- Never physically delete a completed financial transaction. Use voids, reversals, refunds, returns, and adjustments with traceable history. Do not let side effects fail silently after a transaction appears successful.
- Maintain a reconstructable stock movement ledger for purchases, sales, returns, adjustments, damage/loss, transfers, opening balances, and stock counts. Do not update quantity without recording its movement.
- Protect concurrent stock, payment, approval, and payroll operations using appropriate database transactions, constraints/locking, and idempotency. Prevent duplicate execution after repeated clicks, refreshes, and API/network retries.
- Keep sales, purchases, expenses, payments, payroll, adjustments, and transfers traceable through the unified transaction/event workflow and balanced accounting entries. Do not claim full statutory accounting compliance unless implemented and verified.

### Roles, approvals, documents, and data operations

Use centralized, business-scoped permissions rather than checks scattered through components. Support appropriate owner, administrator, manager, accountant, sales, inventory, HR/payroll, and employee access. Permissions should distinguish viewing, creating, editing, voiding/deleting, approving, exporting, and settings management as relevant.

Use reusable approval flows for expenses, purchases, stock adjustments, discounts, refunds, leave, and payroll. Store documents against a business, module, and record; validate file type, size, name, and access, and avoid predictable public URLs for private files. Provide business data export and authorized imports with header/row validation, preview, explicit confirmation, per-row outcomes, and no silent discard or partial corruption. Backups must preserve relational data and documents; document actual restore procedures and deployment responsibilities.

Audit sensitive activity such as authentication, creation/changes/voids, approvals, payments/refunds, stock adjustments, payroll, role changes, imports/exports, and backup/restore. Record the actor, business, action, entity, timestamp, and suitable before/after or request metadata. Treat audit history as immutable or tightly controlled.

## UX, reporting, and operational honesty

Prioritize quick data entry, clear navigation and terminology, accessible responsive layouts, confirmation and error feedback, search, filters, pagination, loading and empty states. Every visible control must work, be disabled with an explanation, or be removed.

Dashboards and reports must use authorized persisted data and clearly defined accounting logic, with date/period and relevant business/branch filters. Useful views may include sales, revenue, gross/net profit, expenses, cash, receivables/payables, inventory value/low stock, recent activity, approvals, payroll, tax deadlines, and import/backup status. Do not fabricate figures or add numbers from unrelated tables.

Never show success unless the operation was verified. Do not claim an integration is connected, a backup complete, tax filed, or payment successful unless that state is confirmed. Expose honest unavailable, failed, pending, and demo states. Keep demo/sample data separate from production and never seed fake data automatically in production.

## MVP boundary

Prioritize the connected foundation and the first end-to-end workflows: business setup; products and inventory; suppliers and purchases; customers and sales; payments; expenses; dashboard and basic reports; invoices and receipts; audit logs; backup; and import/export.

Do not attempt to build every possible module at once. Payroll, HR, advanced tax, complex automation, integrations, and AI should follow the MVP unless a task explicitly prioritizes them. Tax remains one capability within Olowo.

## Repository guidance

The existing repository is a Next.js and TypeScript application with PostgreSQL and Prisma. Its current SmartTax implementation includes a browser-based demo and is not yet a production-grade, multi-tenant Business OS. Treat the product and architecture above as target-state requirements, not as features that already exist.

- Preserve existing routes and compatibility unless a task explicitly calls for a migration.
- Before implementing a business-data feature, inspect the current schema and workflows, then introduce tenant ownership and authorization as part of the design; do not bolt them on after frontend work.
- Use the existing stack and conventions. Do not replace the framework, ORM, authentication provider, or infrastructure without an explicit requirement and a migration plan.
- Prefer the existing Next.js, TypeScript, PostgreSQL, and Prisma stack for current work. Introduce queues, caches, search services, or infrastructure only when a concrete requirement justifies them.
- Make database changes through reviewed Prisma schema changes and migrations. Do not make financial or tenant-isolation changes without tests covering the relevant invariants.
- Implement connected workflows transactionally where possible. For external side effects, use retry-safe/idempotent handling and preserve an auditable outcome.
- Keep user-facing language clear that Olowo is the Business OS and tax is one of its capabilities. Do not present planned modules or controls as available until implemented.
- Update directly related tests and documentation with each change. Prefer small, complete changes over speculative scaffolding.

## Security, reliability, and quality

- Validate all input and ownership server-side; never trust client-side validation or IDs. Use parameterized database access and protect against cross-tenant IDOR, injection, XSS, CSRF where relevant, unsafe uploads, session abuse, and rate-limit bypass.
- Keep secrets and environment-specific values out of source. Document required environment variables and keep development, test, staging, and production behavior separate. Never expose stack traces or sensitive technical details to users; log failures securely and return consistent, actionable errors.
- Paginate bounded queries and exports; avoid N+1 queries and unbounded dashboard/file operations. Add indexes, aggregation, caching, or background jobs only where justified by measured needs.
- Use real application data for reports and business insights. Never invent business figures; future AI must answer from authorized records and communicate uncertainty.
- Test critical authentication and authorization, tenant isolation, financial invariants, transaction atomicity/idempotency, stock movements, receipts, reports, imports, and audit behavior. Test failures and reversals as well as happy paths.
- Preserve current data during schema changes. Review migration impact, provide explicit transformations for incompatible legacy data, and require a backup before destructive changes.
- Review the actual deployment setup, migrations, storage, environment, logging, and production build. Do not claim production readiness until these relevant checks have succeeded.

## Execution and completion

Work incrementally and in dependency order: (0) audit; (1) stabilize schema, identity, and tenant boundaries; (2) build shared business/transaction foundations; (3) connect sales, inventory, customers, suppliers, payments, and finance; (4) add people/payroll; (5) tax and reporting; (6) documents, approvals, notifications, and automation; (7) backups, imports/exports, and operational controls; (8) security, tests, and performance; (9) deployment preparation. Adjust the phases to the actual repository and requested scope; do not add UI ahead of foundational data integrity.

Reuse working code and preserve existing data and behavior. Avoid rewrites for style, fabricated integrations, hidden feature removal, and temporary frontend workarounds for backend/security problems. Run relevant tests and builds as changes warrant, fix regressions before proceeding, and state exactly what was and was not verified.

For a completed platform-upgrade deliverable, report the initial audit, resulting architecture and schema/migrations, implemented features, security controls, tests/build results, data-migration approach, production setup, known limitations, and the recommended next phase. Do not call the system complete or deployment-ready unless the stated requirements have actually been verified.
