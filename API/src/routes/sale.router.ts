import { Router } from "express";
import { createSale, deleteSale, getAllSales, getSaleById, updateSale } from "../controllers/sale.controller";

const saleRouter = Router();

saleRouter.get('/', getAllSales);
saleRouter.get('/:id', getSaleById);
saleRouter.post('/', createSale);
saleRouter.put('/:id', updateSale);
saleRouter.delete('/:id', deleteSale);

export default saleRouter;