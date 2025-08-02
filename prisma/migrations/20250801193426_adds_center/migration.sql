/*
  Warnings:

  - Added the required column `center` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Student" ADD COLUMN     "center" TEXT NOT NULL;
