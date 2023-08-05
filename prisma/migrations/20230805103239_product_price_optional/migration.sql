-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Language" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionTranslation" (
    "id" TEXT NOT NULL,
    "languageId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "position" INTEGER DEFAULT 0,
    "seoContent" TEXT,

    CONSTRAINT "CollectionTranslation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Language_code_key" ON "Language"("code");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionTranslation_name_key" ON "CollectionTranslation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionTranslation_slug_key" ON "CollectionTranslation"("slug");

-- AddForeignKey
ALTER TABLE "CollectionTranslation" ADD CONSTRAINT "CollectionTranslation_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
