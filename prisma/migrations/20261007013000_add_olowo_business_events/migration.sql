-- Operational event history is intentionally distinct from future balanced
-- journal entries. Rows are only created by application workflows; no update
-- or delete endpoint is exposed for this ledger.
CREATE TABLE "BusinessEvent" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "actorAuthUserId" TEXT NOT NULL,
    "data" JSONB,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BusinessEvent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "BusinessEvent_businessId_occurredAt_idx"
    ON "BusinessEvent"("businessId", "occurredAt");
CREATE INDEX "BusinessEvent_businessId_entityType_entityId_idx"
    ON "BusinessEvent"("businessId", "entityType", "entityId");

ALTER TABLE "BusinessEvent"
    ADD CONSTRAINT "BusinessEvent_businessId_fkey"
    FOREIGN KEY ("businessId") REFERENCES "Business"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;
