/*
  Warnings:

  - You are about to drop the `Organisation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserOrganisation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOrganisation" DROP CONSTRAINT "UserOrganisation_orgId_fkey";

-- DropForeignKey
ALTER TABLE "UserOrganisation" DROP CONSTRAINT "UserOrganisation_userId_fkey";

-- DropTable
DROP TABLE "Organisation";

-- DropTable
DROP TABLE "UserOrganisation";

-- CreateTable
CREATE TABLE "organisation" (
    "orgId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "organisation_pkey" PRIMARY KEY ("orgId")
);

-- CreateTable
CREATE TABLE "userOrganisation" (
    "userId" INTEGER NOT NULL,
    "orgId" INTEGER NOT NULL,

    CONSTRAINT "userOrganisation_pkey" PRIMARY KEY ("userId","orgId")
);

-- AddForeignKey
ALTER TABLE "userOrganisation" ADD CONSTRAINT "userOrganisation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userOrganisation" ADD CONSTRAINT "userOrganisation_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "organisation"("orgId") ON DELETE RESTRICT ON UPDATE CASCADE;
