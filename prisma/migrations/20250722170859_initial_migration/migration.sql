-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "grade" TEXT NOT NULL,
    "homeAddress" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParentInfo" (
    "id" TEXT NOT NULL,
    "parentName" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "studentId" TEXT,

    CONSTRAINT "ParentInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ParentInfo" ADD CONSTRAINT "ParentInfo_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
