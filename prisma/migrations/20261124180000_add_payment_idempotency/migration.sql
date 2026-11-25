ALTER TABLE "Payment"
ADD COLUMN "idempotencyKey" TEXT,
ADD COLUMN "requestFingerprint" TEXT;

UPDATE "Payment"
SET "idempotencyKey" = 'legacy-' || "id",
    "requestFingerprint" = 'legacy';

ALTER TABLE "Payment"
ALTER COLUMN "idempotencyKey" SET NOT NULL,
ALTER COLUMN "requestFingerprint" SET NOT NULL;

CREATE UNIQUE INDEX "Payment_businessId_idempotencyKey_key"
ON "Payment"("businessId", "idempotencyKey");