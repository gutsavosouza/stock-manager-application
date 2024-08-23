import { PrismaClient } from "@prisma/client";

const saleProductClient = new PrismaClient().saleProducts;

// get all saleproducts relations
export const getAllSaleProducts = async (req, res) => {
    try {
        const allSaleProducts = await saleProductClient.findMany({});

        res.status(200).json({ 
            data: allSaleProducts 
        });
    } catch(e) {
        console.log('Error while retrieving all sale_products data from database: ', e);
        res.status(500).json({
            error: 'Error while retrieving all sale_products data from database'
        });
    }
}

// get a saleproduct relation by id
export const getSaleProductById = async (req, res) => {
    try {
        const saleProductsId = req.params.id;
        const saleProduct = await saleProductClient.findUnique({
            where: {
                sale_products_id: saleProductsId
            }
        });

        if(!saleProduct) {
            res.status(404).json({
                error: 'No sale_product found for the id provided'
            });
        }

        res.status(200).json({ 
            data: saleProduct 
        });
    } catch(e) {
        console.log('Error while retrieving sale_products by id from database', e);
        res.status(500).json({
            error: 'Error while retrieving sale_products by id from database'
        });
    }
}

// create saleproduct relation
export const createSaleProduct = async (req, res) => {
    try {
        const saleProductData = req.body;
        const saleProduct = await saleProductClient.create({
            data: saleProductData
        });

        res.status(201).json({ 
            data: saleProduct 
        });
    } catch(e) {
        console.log('Error while creating sale_product', e);
        res.status(500).json({
            error: 'Error while creating sale_product'
        });
    }
}

// update saleproduct relation by id
export const updateSaleProduct = async (req, res) => {
    try {
        const saleProductsId = req.params.id;
        const saleProductData = req.body;
        const saleProduct = await saleProductClient.update({
            where: {
                sale_products_id: saleProductsId
            },
            data: saleProductData
        });

        res.status(200).json({
            data: saleProduct 
        });
    } catch(e) {
        console.log('Error while updating product', e);
        res.status(500).json({
            error: 'Error while updating product'
        });
    }
}

// delete saleproduct relation by id
export const deleteSaleProduct = async (req, res) => {
    try {
        const saleProductsId = req.params.id;
        const product = await saleProductClient.delete({
            where: {
                sale_products_id: saleProductsId,
            },
        });

        res.status(200).json({
            message: "SaleProduct relation deleted"
        });
    } catch(e) {
        console.log('Error while deleting sale_product', e);
        res.status(500).json({
            error: 'Error while deleting product'
        });
    }
}