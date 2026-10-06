CREATE TYPE "BusinessRole" AS ENUM (
    'OWNER',
    'ADMINISTRATOR',
    'MANAGER',
    'ACCOUNTANT',
    'SALES_STAFF',
    'INVENTORY_STAFF',
    'HR_PAYROLL',
    'EMPLOYEE'
);

CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "businessType" TEXT,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "BusinessMembership" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "authUserId" TEXT NOT NULL,
    "role" "BusinessRole" NOT NULL DEFAULT 'OWNER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "BusinessMembership_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "actorAuthUserId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "BusinessMembership_businessId_authUserId_key"
    ON "BusinessMembership"("businessId", "authUserId");
CREATE INDEX "BusinessMembership_authUserId_businessId_idx"
    ON "BusinessMembership"("authUserId", "businessId");
CREATE INDEX "AuditLog_businessId_createdAt_idx"
    ON "AuditLog"("businessId", "createdAt");
CREATE INDEX "AuditLog_actorAuthUserId_createdAt_idx"
    ON "AuditLog"("actorAuthUserId", "createdAt");

ALTER TABLE "BusinessMembership"
    ADD CONSTRAINT "BusinessMembership_businessId_fkey"
    FOREIGN KEY ("businessId") REFERENCES "Business"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AuditLog"
    ADD CONSTRAINT "AuditLog_businessId_fkey"
    FOREIGN KEY ("businessId") REFERENCES "Business"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;
