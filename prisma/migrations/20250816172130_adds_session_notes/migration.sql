/*
  Warnings:

  - You are about to drop the `Attendance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Attendance" DROP CONSTRAINT "Attendance_studentId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Attendance" DROP CONSTRAINT "Attendance_therapistId_fkey";

-- DropTable
DROP TABLE "public"."Attendance";

-- CreateTable
CREATE TABLE "public"."Session" (
    "id" TEXT NOT NULL,
    "sessionDate" TEXT NOT NULL,
    "sessionType" "public"."SessionType" NOT NULL,
    "sessionDuration" INTEGER NOT NULL,
    "sessionNotes" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "therapistId" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Session_studentId_sessionDate_idx" ON "public"."Session"("studentId", "sessionDate");

-- CreateIndex
CREATE INDEX "Session_therapistId_idx" ON "public"."Session"("therapistId");

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_therapistId_fkey" FOREIGN KEY ("therapistId") REFERENCES "public"."Therapist"("therapistId") ON DELETE RESTRICT ON UPDATE CASCADE;
