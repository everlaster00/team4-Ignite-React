/*
  Warnings:

  - You are about to drop the column `isPublic` on the `ContactAnswer` table. All the data in the column will be lost.
  - Made the column `adminName` on table `ContactAnswer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `adminEmail` on table `ContactAnswer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ContactAnswer" DROP COLUMN "isPublic",
ALTER COLUMN "adminName" SET NOT NULL,
ALTER COLUMN "adminEmail" SET NOT NULL;
