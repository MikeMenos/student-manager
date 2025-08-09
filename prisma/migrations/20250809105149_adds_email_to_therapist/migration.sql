/*
  Warnings:

  - Added the required column `email` to the `Therapist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Therapist" ADD COLUMN     "email" TEXT NOT NULL;
