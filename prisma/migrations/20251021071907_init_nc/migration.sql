/*
  Warnings:

  - You are about to drop the `PJH_Post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."PJH_Post";

-- CreateTable
CREATE TABLE "NC_Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "NC_Post_pkey" PRIMARY KEY ("id")
);
