/*
  Warnings:

  - Changed the type of `center` on the `Student` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `email` on table `Therapist` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Student" DROP COLUMN "center",
ADD COLUMN     "center" "public"."TherapyCenters" NOT NULL;

-- AlterTable
ALTER TABLE "public"."Therapist" ALTER COLUMN "email" SET NOT NULL;
