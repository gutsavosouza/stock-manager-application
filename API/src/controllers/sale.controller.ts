import { PrismaClient } from "@prisma/client";

const saleClient = new PrismaClient().sale;


// get all sales
export const getAllSales = async (req, res) => {
    try {
        const allSAles = await saleClient.findMany();

        res.status(200).json({
            data: allSAles
        });
    } catch(e) {
        console.log('Error while retrieving all sales data from database', e);
        res.status(500).json({
            error: 'Error while retrieving all sales data from database'
        });
    }
}

// get a sale by id
export const getSaleById = async (req, res) => {
    try {
        const saleId = req.params.id;
        const sale = await saleClient.findUnique({
            where: {
                sale_id: saleId,
            },
        });

        if(!sale) {
            res.status(404).json({
                error: 'No product found for the id provided'
            });
        } else {
            res.status(200).json({
                data: sale
            });
        }
    } catch(e) {
        console.log('Error while retrieving sale by id from database: ', e);
        res.status(500).json({
            error: 'Error while retrieving sale by id from database'
        });
    }
}

// create a sale
export const createSale = async (req, res) => {
    try {
        const { sale_buyer_description, sale_date, products } = req.body;
        const transaction = await new PrismaClient().$transaction(async (prisma) => {
            for (const product of products) {
                const { product_id, sale_product_quantity } = product;
                const currentProduct = await prisma.product.findUnique({
                    where: { 
                        product_id: product_id
                    },
                    select: { 
                        product_quantity_in_stock: true 
                    }
                });

                if (currentProduct.product_quantity_in_stock < sale_product_quantity) {
                    return res.status(401).json({
                        error: 'Not possible to sell more products than the stock has'
                    });
                }
            }
            const sale = await prisma.sale.create({
                data: {
                    sale_buyer_description: sale_buyer_description,
                    sale_date: sale_date,
                }
            });
            
            for (const product of products) {
                const { product_id, sale_product_quantity, sale_unit_price } = product;

                await prisma.saleProducts.create({
                    data: {
                        sale_id: sale.sale_id,
                        product_id: product_id,
                        sale_product_quantity: sale_product_quantity,
                        sale_unit_price: sale_unit_price
                    }
                });

                await prisma.product.update({
                    where: { 
                        product_id: product_id
                    },
                    data: {
                        product_quantity_in_stock: {
                            decrement: sale_product_quantity
                        }
                    }
                });
            }

            return sale;
        });

        res.status(201).json({ 
            data: transaction 
        });
    } catch (e) {
        console.log("Error while creating sale: ", e);
        res.status(500).json({ error: "Error while creating sale" });
    }
}



// update a sale
export const updateSale = async (req, res) => {
    try {
        const saleId = req.params.id;
        const saleData = req.body;
        const sale = await saleClient.update({
            where: {
                sale_id: saleId
            },
            data: saleData
        });

        res.status(200).json({ 
            data: sale 
        });
    } catch(e) {
        console.log('Error while updating sale: ', e);
        res.status(500).json({
            error: 'Error while updating sale'
        });
    }
}

// delete a sale
export const deleteSale = async (req, res) => {
    try {
        const saleId = req.params.id;
        const sale = await saleClient.delete({
            where: {
                sale_id: saleId,
            },
        });

        res.status(200).json({ 
            message: "Sale deleted"
        });
    } catch(e) {
        console.log('Error while deleting sale: ', e);
        res.status(500).json({
            error: 'Error while deleting sale'
        });
    }
}