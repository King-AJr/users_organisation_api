/*
  Warnings:

  - You are about to drop the column `organisations` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "organisations",
ADD COLUMN     "orgIds" INTEGER[];
