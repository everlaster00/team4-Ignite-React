/*
  Warnings:

  - You are about to drop the `JH_Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."JH_Post";

-- CreateTable
CREATE TABLE "JW_Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "JW_Post_pkey" PRIMARY KEY ("id")
);
