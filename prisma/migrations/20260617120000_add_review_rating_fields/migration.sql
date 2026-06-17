-- CreateEnum
CREATE TYPE "PublicationReviewTier" AS ENUM ('RECOMENDADO', 'FAVORITO', 'ESENCIAL');

-- AlterTable
ALTER TABLE "Publication"
ADD COLUMN "rating" DOUBLE PRECISION,
ADD COLUMN "reviewTier" "PublicationReviewTier";
