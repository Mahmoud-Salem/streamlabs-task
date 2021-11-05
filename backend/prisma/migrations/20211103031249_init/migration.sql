/*
  Warnings:

  - You are about to drop the column `channelImage` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Stream` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Stream` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Stream" DROP COLUMN "channelImage",
DROP COLUMN "image",
DROP COLUMN "url";
