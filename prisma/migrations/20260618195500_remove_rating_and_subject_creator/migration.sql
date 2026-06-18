-- DropForeignKey
ALTER TABLE "Publication" DROP CONSTRAINT IF EXISTS "Publication_subjectCreatorId_fkey";

-- DropIndex
DROP INDEX IF EXISTS "Publication_subjectCreatorId_idx";

-- AlterTable
ALTER TABLE "Publication"
DROP COLUMN IF EXISTS "rating",
DROP COLUMN IF EXISTS "subjectCreatorId";

-- DropTable
DROP TABLE IF EXISTS "SubjectCreator";
