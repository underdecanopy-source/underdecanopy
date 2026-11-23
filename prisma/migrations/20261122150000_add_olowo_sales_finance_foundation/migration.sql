-- This additive migration introduces the first connected commercial workflow:
-- customers, completed sales, sale payments and balanced journal postings.
-- It does not alter or delete existing SmartTax/demo data.

CREATE TYPE "SaleStatus" AS ENUM ('COMPLETED', 'VOIDED');
CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'PARTIALLY_PAID', 'PAID');
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'BANK_TRANSFER', 'POS', 'OTHER');
CREATE TYPE "AccountType" AS ENUM ('ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE');

CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Sale" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "customerId" TEXT,
    "warehouseId" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "status" "SaleStatus" NOT NULL DEFAULT 'COMPLETED',
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "subtotal" DECIMAL(12,2) NOT NULL,
    "discountAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "taxAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "totalAmount" DECIMAL(12,2) NOT NULL,
    "idempotencyKey" TEXT NOT NULL,
    "requestFingerprint" TEXT NOT NULL,
    "actorAuthUserId" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "voidedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Sale_nonnegative_amounts" CHECK ("subtotal" >= 0 AND "discountAmount" >= 0 AND "taxAmount" >= 0 AND "totalAmount" >= 0)
);

CREATE TABLE "SaleItem" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" DECIMAL(12,3) NOT NULL,
    "unitPrice" DECIMAL(12,2) NOT NULL,
    "unitCost" DECIMAL(12,2) NOT NULL,
    "lineTotal" DECIMAL(12,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SaleItem_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "SaleItem_positive_quantity" CHECK ("quantity" > 0),
    CONSTRAINT "SaleItem_nonnegative_amounts" CHECK ("unitPrice" >= 0 AND "unitCost" >= 0 AND "lineTotal" >= 0)
);

CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "saleId" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "method" "PaymentMethod" NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorAuthUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Payment_positive_amount" CHECK ("amount" > 0)
);

CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "AccountType" NOT NULL,
    "isSystem" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "JournalEntry" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "memo" TEXT,
    "actorAuthUserId" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "JournalEntry_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "JournalLine" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "journalEntryId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "debit" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "credit" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "JournalLine_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "JournalLine_one_sided_amount" CHECK (("debit" > 0 AND "credit" = 0) OR ("credit" > 0 AND "debit" = 0))
);

CREATE UNIQUE INDEX "Customer_businessId_id_key" ON "Customer"("businessId", "id");
CREATE INDEX "Customer_businessId_name_idx" ON "Customer"("businessId", "name");
CREATE INDEX "Customer_businessId_email_idx" ON "Customer"("businessId", "email");

CREATE UNIQUE INDEX "Sale_businessId_id_key" ON "Sale"("businessId", "id");
CREATE UNIQUE INDEX "Sale_businessId_reference_key" ON "Sale"("businessId", "reference");
CREATE UNIQUE INDEX "Sale_businessId_idempotencyKey_key" ON "Sale"("businessId", "idempotencyKey");
CREATE INDEX "Sale_businessId_occurredAt_idx" ON "Sale"("businessId", "occurredAt");
CREATE INDEX "Sale_businessId_customerId_occurredAt_idx" ON "Sale"("businessId", "customerId", "occurredAt");
CREATE INDEX "SaleItem_businessId_saleId_idx" ON "SaleItem"("businessId", "saleId");
CREATE INDEX "SaleItem_businessId_productId_idx" ON "SaleItem"("businessId", "productId");
CREATE INDEX "Payment_businessId_saleId_receivedAt_idx" ON "Payment"("businessId", "saleId", "receivedAt");

CREATE UNIQUE INDEX "Account_businessId_id_key" ON "Account"("businessId", "id");
CREATE UNIQUE INDEX "Account_businessId_code_key" ON "Account"("businessId", "code");
CREATE INDEX "Account_businessId_type_idx" ON "Account"("businessId", "type");
CREATE UNIQUE INDEX "JournalEntry_businessId_id_key" ON "JournalEntry"("businessId", "id");
CREATE UNIQUE INDEX "JournalEntry_businessId_sourceType_sourceId_key" ON "JournalEntry"("businessId", "sourceType", "sourceId");
CREATE INDEX "JournalEntry_businessId_occurredAt_idx" ON "JournalEntry"("businessId", "occurredAt");
CREATE INDEX "JournalLine_businessId_accountId_createdAt_idx" ON "JournalLine"("businessId", "accountId", "createdAt");
CREATE INDEX "JournalLine_businessId_journalEntryId_idx" ON "JournalLine"("businessId", "journalEntryId");

ALTER TABLE "Customer" ADD CONSTRAINT "Customer_businessId_fkey"
    FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_businessId_fkey"
    FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_businessId_customerId_fkey"
    FOREIGN KEY ("businessId", "customerId") REFERENCES "Customer"("businessId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_businessId_warehouseId_fkey"
    FOREIGN KEY ("businessId", "warehouseId") REFERENCES "Warehouse"("businessId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "SaleItem" ADD CONSTRAINT "SaleItem_businessId_saleId_fkey"
    FOREIGN KEY ("businessId", "saleId") REFERENCES "Sale"("businessId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "SaleItem" ADD CONSTRAINT "SaleItem_businessId_productId_fkey"
    FOREIGN KEY ("businessId", "productId") REFERENCES "Product"("businessId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_businessId_saleId_fkey"
    FOREIGN KEY ("businessId", "saleId") REFERENCES "Sale"("businessId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_businessId_fkey"
    FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Account" ADD CONSTRAINT "Account_businessId_fkey"
    FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "JournalEntry" ADD CONSTRAINT "JournalEntry_businessId_fkey"
    FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "JournalLine" ADD CONSTRAINT "JournalLine_businessId_fkey"
    FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "JournalLine" ADD CONSTRAINT "JournalLine_businessId_journalEntryId_fkey"
    FOREIGN KEY ("businessId", "journalEntryId") REFERENCES "JournalEntry"("businessId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "JournalLine" ADD CONSTRAINT "JournalLine_businessId_accountId_fkey"
    FOREIGN KEY ("businessId", "accountId") REFERENCES "Account"("businessId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
