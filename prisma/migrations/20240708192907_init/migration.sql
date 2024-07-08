/*
  Warnings:

  - You are about to drop the `Organisation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOrganisation" DROP CONSTRAINT "UserOrganisation_orgId_fkey";

-- DropTable
DROP TABLE "Organisation";

-- CreateTable
CREATE TABLE "organisation" (
    "orgId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "organisation_pkey" PRIMARY KEY ("orgId")
);

-- AddForeignKey
ALTER TABLE "UserOrganisation" ADD CONSTRAINT "UserOrganisation_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "organisation"("orgId") ON DELETE RESTRICT ON UPDATE CASCADE;
