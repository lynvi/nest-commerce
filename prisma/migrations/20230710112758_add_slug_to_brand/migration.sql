/*
  Warnings:

  - Added the required column `slug` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "slug" TEXT NOT NULL;
