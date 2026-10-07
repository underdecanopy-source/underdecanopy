CREATE TYPE "StockMovementType" AS ENUM (
    'OPENING',
    'ADJUSTMENT',
    'PURCHASE',
    'SALE',
    'RETURN',
    'TRANSFER_IN',
    'TRANSFER_OUT',
    'DAMAGE'
);

CREATE TABLE "ProductCategory" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "categoryId" TEXT,
    "name" TEXT NOT NULL,
    "sku" TEXT,
    "unit" TEXT NOT NULL DEFAULT 'each',
    "costPrice" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "sellingPrice" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "trackInventory" BOOLEAN NOT NULL DEFAULT true,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Warehouse" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Warehouse_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "StockMovement" (
    "id" TEXT NOT NULL,
    "businessId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "type" "StockMovementType" NOT NULL,
    "quantity" DECIMAL(12,3) NOT NULL,
    "unitCost" DECIMAL(12,2),
    "reason" TEXT,
    "idempotencyKey" TEXT,
    "actorAuthUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StockMovement_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ProductCategory_businessId_name_key"
    ON "ProductCategory"("businessId", "name");
CREATE UNIQUE INDEX "ProductCategory_businessId_id_key"
    ON "ProductCategory"("businessId", "id");
CREATE INDEX "ProductCategory_businessId_idx"
    ON "ProductCategory"("businessId");
CREATE UNIQUE INDEX "Product_businessId_sku_key"
    ON "Product"("businessId", "sku");
CREATE UNIQUE INDEX "Product_businessId_id_key"
    ON "Product"("businessId", "id");
CREATE INDEX "Product_businessId_name_idx"
    ON "Product"("businessId", "name");
CREATE INDEX "Product_categoryId_idx"
    ON "Product"("categoryId");
CREATE UNIQUE INDEX "Warehouse_businessId_name_key"
    ON "Warehouse"("businessId", "name");
CREATE UNIQUE INDEX "Warehouse_businessId_id_key"
    ON "Warehouse"("businessId", "id");
CREATE INDEX "Warehouse_businessId_idx"
    ON "Warehouse"("businessId");
CREATE UNIQUE INDEX "StockMovement_businessId_idempotencyKey_key"
    ON "StockMovement"("businessId", "idempotencyKey");
CREATE INDEX "StockMovement_businessId_productId_warehouseId_createdAt_idx"
    ON "StockMovement"("businessId", "productId", "warehouseId", "createdAt");
CREATE INDEX "StockMovement_businessId_createdAt_idx"
    ON "StockMovement"("businessId", "createdAt");

ALTER TABLE "ProductCategory"
    ADD CONSTRAINT "ProductCategory_businessId_fkey"
    FOREIGN KEY ("businessId") REFERENCES "Business"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Product"
    ADD CONSTRAINT "Product_businessId_fkey"
    FOREIGN KEY ("businessId") REFERENCES "Business"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "Product"
    ADD CONSTRAINT "Product_businessId_categoryId_fkey"
    FOREIGN KEY ("businessId", "categoryId") REFERENCES "ProductCategory"("businessId", "id")
    ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Warehouse"
    ADD CONSTRAINT "Warehouse_businessId_fkey"
    FOREIGN KEY ("businessId") REFERENCES "Business"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "StockMovement"
    ADD CONSTRAINT "StockMovement_businessId_fkey"
    FOREIGN KEY ("businessId") REFERENCES "Business"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "StockMovement"
    ADD CONSTRAINT "StockMovement_businessId_productId_fkey"
    FOREIGN KEY ("businessId", "productId") REFERENCES "Product"("businessId", "id")
    ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "StockMovement"
    ADD CONSTRAINT "StockMovement_businessId_warehouseId_fkey"
    FOREIGN KEY ("businessId", "warehouseId") REFERENCES "Warehouse"("businessId", "id")
    ON DELETE RESTRICT ON UPDATE CASCADE;
