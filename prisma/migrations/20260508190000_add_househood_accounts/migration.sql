CREATE TYPE "HousehoodRole" AS ENUM ('resident', 'manager', 'operations');

CREATE TABLE "HousehoodAccount" (
    "userId" TEXT NOT NULL,
    "role" "HousehoodRole" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HousehoodAccount_pkey" PRIMARY KEY ("userId"),
    CONSTRAINT "HousehoodAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX "HousehoodAccount_role_idx" ON "HousehoodAccount"("role");
