/*
  Warnings:

  - Made the column `phone` on table `GuestlistEntry` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "GuestlistEntry_email_key";

-- AlterTable
ALTER TABLE "GuestlistEntry" ADD COLUMN     "howHeard" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "specialRequests" TEXT,
ALTER COLUMN "phone" SET NOT NULL;
