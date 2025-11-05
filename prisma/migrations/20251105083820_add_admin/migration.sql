-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "status" SET DEFAULT '답변 대기중';

-- CreateTable
CREATE TABLE "ContactAnswer" (
    "id" TEXT NOT NULL,
    "contactId" INTEGER NOT NULL,
    "adminName" TEXT,
    "adminEmail" TEXT,
    "content" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContactAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ContactAnswer_contactId_createdAt_idx" ON "ContactAnswer"("contactId", "createdAt");

-- AddForeignKey
ALTER TABLE "ContactAnswer" ADD CONSTRAINT "ContactAnswer_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;
