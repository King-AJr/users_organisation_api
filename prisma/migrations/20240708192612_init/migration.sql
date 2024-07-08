/*
  Warnings:

  - You are about to drop the column `organisation` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `organisation` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "organisation";

-- DropTable
DROP TABLE "organisation";

-- CreateTable
CREATE TABLE "Organisation" (
    "orgId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Organisation_pkey" PRIMARY KEY ("orgId")
);

-- CreateTable
CREATE TABLE "UserOrganisation" (
    "userId" INTEGER NOT NULL,
    "orgId" INTEGER NOT NULL,

    CONSTRAINT "UserOrganisation_pkey" PRIMARY KEY ("userId","orgId")
);

-- AddForeignKey
ALTER TABLE "UserOrganisation" ADD CONSTRAINT "UserOrganisation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrganisation" ADD CONSTRAINT "UserOrganisation_orgId_fkey" FOREIGN KEY ("orgId") REFERENCES "Organisation"("orgId") ON DELETE RESTRICT ON UPDATE CASCADE;
