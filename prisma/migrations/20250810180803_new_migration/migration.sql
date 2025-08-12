/*
  Warnings:

  - Added the required column `therapistId` to the `Therapist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ParentInfo" DROP CONSTRAINT "ParentInfo_studentId_fkey";

-- AlterTable
ALTER TABLE "public"."Therapist" ADD COLUMN     "therapistId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."ParentInfo" ADD CONSTRAINT "ParentInfo_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;
