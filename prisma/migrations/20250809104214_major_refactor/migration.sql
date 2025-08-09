/*
  Warnings:

  - Made the column `studentId` on table `ParentInfo` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."ParentInfo" DROP CONSTRAINT "ParentInfo_studentId_fkey";

-- AlterTable
ALTER TABLE "public"."ParentInfo" ALTER COLUMN "studentId" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."Therapist" (
    "id" TEXT NOT NULL,
    "therapistRole" "public"."SessionType" NOT NULL,
    "therapistName" TEXT NOT NULL,

    CONSTRAINT "Therapist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_StudentTherapists" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_StudentTherapists_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_StudentTherapists_B_index" ON "public"."_StudentTherapists"("B");

-- AddForeignKey
ALTER TABLE "public"."Attendance" ADD CONSTRAINT "Attendance_therapistId_fkey" FOREIGN KEY ("therapistId") REFERENCES "public"."Therapist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ParentInfo" ADD CONSTRAINT "ParentInfo_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "public"."Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_StudentTherapists" ADD CONSTRAINT "_StudentTherapists_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_StudentTherapists" ADD CONSTRAINT "_StudentTherapists_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Therapist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
