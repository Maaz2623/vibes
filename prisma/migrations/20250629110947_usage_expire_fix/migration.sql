/*
  Warnings:

  - You are about to drop the column `exprire` on the `Usage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usage" DROP COLUMN "exprire",
ADD COLUMN     "expire" TIMESTAMP(3);
