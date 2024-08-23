/*
  Warnings:

  - Added the required column `sale_id` to the `SaleProducts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SaleProducts" ADD COLUMN     "sale_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SaleProducts" ADD CONSTRAINT "SaleProducts_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sale"("sale_id") ON DELETE CASCADE ON UPDATE CASCADE;
