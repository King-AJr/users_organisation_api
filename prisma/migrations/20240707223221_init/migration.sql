/*
  Warnings:

  - You are about to drop the `_UserToorganization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `organization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserToorganization" DROP CONSTRAINT "_UserToorganization_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserToorganization" DROP CONSTRAINT "_UserToorganization_B_fkey";

-- DropTable
DROP TABLE "_UserToorganization";

-- DropTable
DROP TABLE "organization";

-- CreateTable
CREATE TABLE "organisation" (
    "orgId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "organisation_pkey" PRIMARY KEY ("orgId")
);

-- CreateTable
CREATE TABLE "UserOrganisation" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "organisationId" INTEGER NOT NULL,

    CONSTRAINT "UserOrganisation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserOrganisation_userId_organisationId_key" ON "UserOrganisation"("userId", "organisationId");

-- AddForeignKey
ALTER TABLE "UserOrganisation" ADD CONSTRAINT "UserOrganisation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrganisation" ADD CONSTRAINT "UserOrganisation_organisationId_fkey" FOREIGN KEY ("organisationId") REFERENCES "organisation"("orgId") ON DELETE RESTRICT ON UPDATE CASCADE;
