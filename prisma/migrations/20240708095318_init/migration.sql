/*
  Warnings:

  - You are about to drop the `UserOrganisation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOrganisation" DROP CONSTRAINT "UserOrganisation_organisationId_fkey";

-- DropForeignKey
ALTER TABLE "UserOrganisation" DROP CONSTRAINT "UserOrganisation_userId_fkey";

-- AlterTable
ALTER TABLE "organisation" ADD COLUMN     "users" INTEGER[];

-- DropTable
DROP TABLE "UserOrganisation";
