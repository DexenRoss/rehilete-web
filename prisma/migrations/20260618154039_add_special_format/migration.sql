-- CreateEnum
CREATE TYPE "SpecialFormat" AS ENUM ('ARTICLE', 'LIST', 'COLLECTION', 'FEATURE');

-- AlterTable
ALTER TABLE "Publication" ADD COLUMN     "specialFormat" "SpecialFormat";
