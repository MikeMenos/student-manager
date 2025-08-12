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

-- AlterTable
ALTER TABLE "public"."Therapist" ADD COLUMN     "center" "public"."TherapyCenters" NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Therapist_therapistId_key" ON "public"."Therapist"("therapistId");

-- AddForeignKey
ALTER TABLE "public"."Attendance" ADD CONSTRAINT "Attendance_therapistId_fkey" FOREIGN KEY ("therapistId") REFERENCES "public"."Therapist"("therapistId") ON DELETE RESTRICT ON UPDATE CASCADE;
