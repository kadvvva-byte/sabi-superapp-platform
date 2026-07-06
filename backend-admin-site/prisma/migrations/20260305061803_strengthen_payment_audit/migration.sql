/*
  Warnings:

  - Added the required column `hash` to the `PaymentAudit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentAudit" ADD COLUMN     "hash" TEXT NOT NULL,
ADD COLUMN     "previousHash" TEXT;
