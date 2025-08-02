-- CreateEnum
CREATE TYPE "public"."SessionType" AS ENUM ('SPEECH', 'OCCUPATIONAL', 'PSYCHOLOGICAL', 'BEHAVIORAL');

-- CreateTable
CREATE TABLE "public"."Attendance" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,
    "therapistId" TEXT NOT NULL,
    "sessionType" "public"."SessionType" NOT NULL,
    "sessionDuration" INTEGER NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Attendance_studentId_date_idx" ON "public"."Attendance"("studentId", "date");

-- CreateIndex
CREATE INDEX "Attendance_therapistId_idx" ON "public"."Attendance"("therapistId");

-- AddForeignKey
ALTER TABLE "public"."Attendance" ADD CONSTRAINT "Attendance_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
