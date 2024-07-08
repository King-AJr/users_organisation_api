/*
  Warnings:

  - You are about to drop the `organisation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOrganisation" DROP CONSTRAINT "UserOrganisation_orgId_fkey";

-- DropTable
DROP TABLE "organisation";

-- CreateTable
CREATE TABLE "Organisation" (
    "orgId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Organisation_pkey" PRIMARY KEY ("orgId")
);

-- AddForeignKey
ALTER TABLE "UserOrganisation" ADD CONSTRAINT "UserOrganisation_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organisation"("orgId") ON DELETE RESTRICT ON UPDATE CASCADE;
