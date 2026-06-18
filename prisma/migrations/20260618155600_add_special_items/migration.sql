-- CreateTable
CREATE TABLE "SpecialItem" (
    "id" TEXT NOT NULL,
    "specialId" TEXT NOT NULL,
    "reviewId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "label" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SpecialItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SpecialItem_specialId_idx" ON "SpecialItem"("specialId");

-- CreateIndex
CREATE INDEX "SpecialItem_reviewId_idx" ON "SpecialItem"("reviewId");

-- CreateIndex
CREATE UNIQUE INDEX "SpecialItem_specialId_reviewId_key" ON "SpecialItem"("specialId", "reviewId");

-- AddForeignKey
ALTER TABLE "SpecialItem" ADD CONSTRAINT "SpecialItem_specialId_fkey" FOREIGN KEY ("specialId") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecialItem" ADD CONSTRAINT "SpecialItem_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Publication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
