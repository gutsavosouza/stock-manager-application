import { Router } from "express";
import { createSaleProduct, getAllSaleProducts, getSaleProductById, updateSaleProduct, deleteSaleProduct } from "../controllers/saleproduct.controller";

const saleProductRouter = Router();

saleProductRouter.get('/', getAllSaleProducts);
saleProductRouter.get('/:id', getSaleProductById);
saleProductRouter.post('/', createSaleProduct);
saleProductRouter.put('/:id', updateSaleProduct);
saleProductRouter.delete('/:id', deleteSaleProduct);

export default saleProductRouter;