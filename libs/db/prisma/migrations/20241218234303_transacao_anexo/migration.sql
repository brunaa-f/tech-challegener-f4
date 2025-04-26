/*
  Warnings:

  - Added the required column `anexo` to the `Transacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transacao" ADD COLUMN     "anexo" BYTEA NOT NULL;
