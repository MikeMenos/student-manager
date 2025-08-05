/*
  Warnings:

  - The values [SPEECH,OCCUPATIONAL,PSYCHOLOGICAL,BEHAVIORAL] on the enum `SessionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."SessionType_new" AS ENUM ('Speech', 'Occupational', 'Psychological', 'Behavioral');
ALTER TABLE "public"."Attendance" ALTER COLUMN "sessionType" TYPE "public"."SessionType_new" USING ("sessionType"::text::"public"."SessionType_new");
ALTER TYPE "public"."SessionType" RENAME TO "SessionType_old";
ALTER TYPE "public"."SessionType_new" RENAME TO "SessionType";
DROP TYPE "public"."SessionType_old";
COMMIT;
