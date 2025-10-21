/*
  Warnings:

  - You are about to drop the `JW_Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."JW_Post";

-- CreateTable
CREATE TABLE "PJH_Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "PJH_Post_pkey" PRIMARY KEY ("id")
);
