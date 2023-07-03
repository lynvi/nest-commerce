/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Setting` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "SettingType" AS ENUM ('BOOLEAN', 'STRING', 'NUMBER');

-- AlterTable
ALTER TABLE "Setting" ADD COLUMN     "type" "SettingType" NOT NULL DEFAULT 'NUMBER';

-- CreateIndex
CREATE UNIQUE INDEX "Setting_name_key" ON "Setting"("name");
