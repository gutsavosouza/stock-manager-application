import { PrismaClient } from "@prisma/client";

const productClient = new PrismaClient().product;

// get all products
export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await productClient.findMany({
            include: {
                sales: true
            }
        });

        res.status(200).json({ 
            data: allProducts 
        });
    } catch(e) {
        console.log('Error while retrieving all products data from database: ', e);
        res.status(500).json({
            error: 'Error while retrieving all products data from database'
        });
    }
}

// get a product by id
export const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productClient.findUnique({
            where: {
                product_id: productId
            },
            include: {
                sales: true
            }
        });

        if(!product) {
            res.status(404).json({
                error: 'No product found for the id provided'
            });
        } 

        res.status(200).json({ 
            data: product 
        });
    } catch(e) {
        console.log('Error while retrieving product by id from database', e);
        res.status(500).json({
            error: 'Error while retrieving product by id from database'
        });
    }
}

// create product
export const createProduct = async (req, res) => {
    try {
        const productData = req.body;
        const product = await productClient.create({
            data: productData
        });

        res.status(201).json({ 
            data: product 
        });
    } catch(e) {
        console.log('Error while creating product', e);
        res.status(500).json({
            error: 'Error while creating product'
        });
    }
}

// update product by id
export const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const productData = req.body;
        const product = await productClient.update({
            where: {
                product_id: productId
            },
            data: productData
        });

        res.status(200).json({ 
            data: product 
        });
    } catch(e) {
        console.log('Error while updating product', e);
        res.status(500).json({
            error: 'Error while updating product'
        });
    }
}

// delete product by id
export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productClient.delete({
            where: {
                product_id: productId,
            },
        });

        res.status(200).json({ 
            data: {}
        });
    } catch(e) {
        console.log('Error while deleting product', e);
        res.status(500).json({
            error: 'Error while deleting product'
        });
    }
}