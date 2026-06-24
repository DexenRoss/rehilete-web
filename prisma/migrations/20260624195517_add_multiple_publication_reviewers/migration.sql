-- CreateTable
CREATE TABLE "PublicationReviewer" (
    "publicationId" TEXT NOT NULL,
    "contributorId" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PublicationReviewer_pkey" PRIMARY KEY ("publicationId","contributorId")
);

-- Backfill existing legacy reviewers into the new pivot table.
INSERT INTO "PublicationReviewer" ("publicationId", "contributorId", "position")
SELECT "id", "reviewerId", 0
FROM "Publication"
WHERE "reviewerId" IS NOT NULL
ON CONFLICT ("publicationId", "contributorId") DO NOTHING;

-- CreateIndex
CREATE INDEX "PublicationReviewer_contributorId_idx" ON "PublicationReviewer"("contributorId");

-- AddForeignKey
ALTER TABLE "PublicationReviewer" ADD CONSTRAINT "PublicationReviewer_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationReviewer" ADD CONSTRAINT "PublicationReviewer_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "Contributor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
