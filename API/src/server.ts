import express from 'express';
import productRouter from './routes/product.router';
import saleRouter from './routes/sale.router';

const application = express();
const PORT = process.env.PORT || 8080;

application.use(express.json());

application.use('/products', productRouter);
application.use('/sales', saleRouter);

application.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}.`);
});