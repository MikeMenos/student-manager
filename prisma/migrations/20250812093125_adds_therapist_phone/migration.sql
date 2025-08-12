/*
  Warnings:

  - A unique constraint covering the columns `[therapistId]` on the table `Therapist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `center` to the `Therapist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Therapist` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."TherapyCenters" AS ENUM ('Patras', 'Amaliada', 'Aigio');

-- DropForeignKey
ALTER TABLE "public"."Attendance" DROP CONSTRAINT "Attendance_therapistId_fkey";

-- AlterTable (safe, backfill before enforcing NOT NULL)
-- 1) Add columns as NULLABLE first so existing rows don't violate constraints
ALTER TABLE "public"."Therapist"
  ADD COLUMN IF NOT EXISTS "center" "public"."TherapyCenters",
  ADD COLUMN IF NOT EXISTS "phone" TEXT;

-- 2) Backfill existing NULLs to valid values
--    Pick a sensible default center; adjust if needed
UPDATE "public"."Therapist" SET "center" = 'Patras' WHERE "center" IS NULL;
UPDATE "public"."Therapist" SET "phone"  = ''       WHERE "phone"  IS NULL;

-- 3) Now enforce NOT NULL and make email optional
ALTER TABLE "public"."Therapist"
  ALTER COLUMN "center" SET NOT NULL,
  ALTER COLUMN "phone"  SET NOT NULL,
  ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Therapist_therapistId_key" ON "public"."Therapist"("therapistId");

-- AddForeignKey
ALTER TABLE "public"."Attendance" ADD CONSTRAINT "Attendance_therapistId_fkey" FOREIGN KEY ("therapistId") REFERENCES "public"."Therapist"("therapistId") ON DELETE RESTRICT ON UPDATE CASCADE;
