-- CreateTable
CREATE TABLE "Product" (
    "product_id" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_description" TEXT NOT NULL,
    "product_quantity_in_stock" INTEGER NOT NULL,
    "product_max_stock" INTEGER NOT NULL,
    "product_min_stock" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "sale_id" TEXT NOT NULL,
    "sale_buyer_description" TEXT NOT NULL,
    "sale_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("sale_id")
);

-- CreateTable
CREATE TABLE "SaleProducts" (
    "sale_products_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "sale_product_quantity" INTEGER NOT NULL,
    "sale_unit_price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "SaleProducts_pkey" PRIMARY KEY ("sale_products_id")
);

-- AddForeignKey
ALTER TABLE "SaleProducts" ADD CONSTRAINT "SaleProducts_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
