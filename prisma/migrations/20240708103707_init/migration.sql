/*
  Warnings:

  - You are about to drop the column `users` on the `organisation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "organisations" INTEGER[];

-- AlterTable
ALTER TABLE "organisation" DROP COLUMN "users";
