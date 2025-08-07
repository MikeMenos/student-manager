/*
  Warnings:

  - You are about to drop the column `date` on the `Attendance` table. All the data in the column will be lost.
  - Added the required column `sessionDate` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Attendance_studentId_date_idx";

-- AlterTable
ALTER TABLE "public"."Attendance" DROP COLUMN "date",
ADD COLUMN     "sessionDate" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Attendance_studentId_sessionDate_idx" ON "public"."Attendance"("studentId", "sessionDate");
