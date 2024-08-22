/*
  Warnings:

  - You are about to drop the column `product_max_stock` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `product_min_stock` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "product_max_stock",
DROP COLUMN "product_min_stock";
