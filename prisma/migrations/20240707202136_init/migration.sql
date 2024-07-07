/*
  Warnings:

  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OrganizationToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrganizationToUser" DROP CONSTRAINT "_OrganizationToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrganizationToUser" DROP CONSTRAINT "_OrganizationToUser_B_fkey";

-- DropTable
DROP TABLE "Organization";

-- DropTable
DROP TABLE "_OrganizationToUser";

-- CreateTable
CREATE TABLE "organization" (
    "orgId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("orgId")
);

-- CreateTable
CREATE TABLE "_UserToorganization" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToorganization_AB_unique" ON "_UserToorganization"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToorganization_B_index" ON "_UserToorganization"("B");

-- AddForeignKey
ALTER TABLE "_UserToorganization" ADD CONSTRAINT "_UserToorganization_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToorganization" ADD CONSTRAINT "_UserToorganization_B_fkey" FOREIGN KEY ("B") REFERENCES "organization"("orgId") ON DELETE CASCADE ON UPDATE CASCADE;
