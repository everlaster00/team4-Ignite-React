/*
  Warnings:

  - You are about to drop the `NC_Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."NC_Post";

-- CreateTable
CREATE TABLE "JH_Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "JH_Post_pkey" PRIMARY KEY ("id")
);
