CREATE TYPE "PurchaseStatus" AS ENUM ('DRAFT', 'COMPLETED', 'VOIDED');
CREATE TYPE "ExpenseStatus" AS ENUM ('DRAFT', 'APPROVED', 'PAID', 'VOIDED');
CREATE TYPE "ApprovalStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED');
CREATE TYPE "DocumentStatus" AS ENUM ('UPLOADED', 'ARCHIVED');
CREATE TYPE "NotificationStatus" AS ENUM ('PENDING', 'READ', 'ARCHIVED');
CREATE TYPE "PermissionScope" AS ENUM ('BUSINESS', 'MODULE', 'RECORD');

CREATE TABLE "Supplier" (
  "id" TEXT NOT NULL,
  "businessId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT,
  "phone" TEXT,
  "address" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Supplier_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Purchase" (
  "id" TEXT NOT NULL,
  "businessId" TEXT NOT NULL,
  "supplierId" TEXT NOT NULL,
  "warehouseId" TEXT NOT NULL,
  "reference" TEXT NOT NULL,
  "status" "PurchaseStatus" NOT NULL DEFAULT 'DRAFT',
  "subtotal" DECIMAL(12,2) NOT NULL,
  "taxAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
  "totalAmount" DECIMAL(12,2) NOT NULL,
  "idempotencyKey" TEXT NOT NULL,
  "requestFingerprint" TEXT NOT NULL,
  "actorAuthUserId" TEXT NOT NULL,
  "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "voidedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PurchaseItem" (
  "id" TEXT NOT NULL,
  "businessId" TEXT NOT NULL,
  "purchaseId" TEXT NOT NULL,
  "productId" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "quantity" DECIMAL(12,3) NOT NULL,
  "unitCost" DECIMAL(12,2) NOT NULL,
  "lineTotal" DECIMAL(12,2) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PurchaseItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ExpenseCategory" (
  "id" TEXT NOT NULL,
  "businessId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ExpenseCategory_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Expense" (
  "id" TEXT NOT NULL,
  "businessId" TEXT NOT NULL,
  "categoryId" TEXT NOT NULL,
  "amount" DECIMAL(12,2) NOT NULL,
  "status" "ExpenseStatus" NOT NULL DEFAULT 'DRAFT',
  "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'CASH',
  "description" TEXT NOT NULL,
  "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "idempotencyKey" TEXT NOT NULL,
  "actorAuthUserId" TEXT NOT NULL,
  "approvedByAuthUserId" TEXT,
  "paidAt" TIMESTAMP(3),
  "voidedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "BusinessPermission" (
  "id" TEXT NOT NULL,
  "businessId" TEXT NOT NULL,
  "role" "BusinessRole" NOT NULL,
  "capability" TEXT NOT NULL,
  "scope" "PermissionScope" NOT NULL DEFAULT 'MODULE',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "BusinessPermission_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ApprovalRequest" (
  "id" TEXT NOT NULL,
  "businessId" TEXT NOT NULL,
  "module" TEXT NOT NULL,
  "entityType" TEXT NOT NULL,
  "entityId" TEXT NOT NULL,
  "status" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
  "requestedByAuthUserId" TEXT NOT NULL,
  "resolvedByAuthUserId" TEXT,
  "resolvedAt" TIMESTAMP(3),
  "reason" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ApprovalRequest_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Document" (
  "id" TEXT NOT NULL,
  "businessId" TEXT NOT NULL,
  "module" TEXT NOT NULL,
  "entityType" TEXT NOT NULL,
  "entityId" TEXT NOT NULL,
  "status" "DocumentStatus" NOT NULL DEFAULT 'UPLOADED',
  "name" TEXT NOT NULL,
  "contentType" TEXT NOT NULL,
  "size" INTEGER NOT NULL,
  "storageKey" TEXT NOT NULL,
  "actorAuthUserId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "archivedAt" TIMESTAMP(3),
  CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Notification" (
  "id" TEXT NOT NULL,
  "businessId" TEXT NOT NULL,
  "authUserId" TEXT NOT NULL,
  "status" "NotificationStatus" NOT NULL DEFAULT 'PENDING',
  "type" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "entityType" TEXT,
  "entityId" TEXT,
  "readAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Supplier_businessId_id_key" ON "Supplier"("businessId", "id");
CREATE UNIQUE INDEX "Supplier_businessId_name_key" ON "Supplier"("businessId", "name");
CREATE INDEX "Supplier_businessId_name_idx" ON "Supplier"("businessId", "name");
CREATE UNIQUE INDEX "Purchase_businessId_id_key" ON "Purchase"("businessId", "id");
CREATE UNIQUE INDEX "Purchase_businessId_reference_key" ON "Purchase"("businessId", "reference");
CREATE UNIQUE INDEX "Purchase_businessId_idempotencyKey_key" ON "Purchase"("businessId", "idempotencyKey");
CREATE INDEX "Purchase_businessId_occurredAt_idx" ON "Purchase"("businessId", "occurredAt");
CREATE UNIQUE INDEX "ExpenseCategory_businessId_id_key" ON "ExpenseCategory"("businessId", "id");
CREATE UNIQUE INDEX "ExpenseCategory_businessId_name_key" ON "ExpenseCategory"("businessId", "name");
CREATE UNIQUE INDEX "Expense_businessId_id_key" ON "Expense"("businessId", "id");
CREATE UNIQUE INDEX "Expense_businessId_idempotencyKey_key" ON "Expense"("businessId", "idempotencyKey");
CREATE UNIQUE INDEX "BusinessPermission_businessId_role_capability_scope_key"
  ON "BusinessPermission"("businessId", "role", "capability", "scope");
CREATE UNIQUE INDEX "ApprovalRequest_businessId_id_key" ON "ApprovalRequest"("businessId", "id");
CREATE UNIQUE INDEX "Document_businessId_id_key" ON "Document"("businessId", "id");
CREATE UNIQUE INDEX "Document_storageKey_key" ON "Document"("storageKey");
CREATE UNIQUE INDEX "Notification_businessId_id_key" ON "Notification"("businessId", "id");

ALTER TABLE "Supplier" ADD CONSTRAINT "Supplier_businessId_fkey"
  FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_businessId_fkey"
  FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_businessId_supplierId_fkey"
  FOREIGN KEY ("businessId", "supplierId") REFERENCES "Supplier"("businessId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_businessId_warehouseId_fkey"
  FOREIGN KEY ("businessId", "warehouseId") REFERENCES "Warehouse"("businessId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_nonnegative_amounts"
  CHECK ("subtotal" >= 0 AND "taxAmount" >= 0 AND "totalAmount" >= 0);

ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_businessId_fkey"
  FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_businessId_purchaseId_fkey"
  FOREIGN KEY ("businessId", "purchaseId") REFERENCES "Purchase"("businessId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_businessId_productId_fkey"
  FOREIGN KEY ("businessId", "productId") REFERENCES "Product"("businessId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_positive_amounts"
  CHECK ("quantity" > 0 AND "unitCost" >= 0 AND "lineTotal" >= 0);

ALTER TABLE "ExpenseCategory" ADD CONSTRAINT "ExpenseCategory_businessId_fkey"
  FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_businessId_fkey"
  FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_businessId_categoryId_fkey"
  FOREIGN KEY ("businessId", "categoryId") REFERENCES "ExpenseCategory"("businessId", "id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_positive_amount" CHECK ("amount" > 0);

ALTER TABLE "BusinessPermission" ADD CONSTRAINT "BusinessPermission_businessId_fkey"
  FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ApprovalRequest" ADD CONSTRAINT "ApprovalRequest_businessId_fkey"
  FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Document" ADD CONSTRAINT "Document_businessId_fkey"
  FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Document" ADD CONSTRAINT "Document_positive_size" CHECK ("size" >= 0);
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_businessId_fkey"
  FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;
