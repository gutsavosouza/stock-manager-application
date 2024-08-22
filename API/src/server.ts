import express from 'express';
import productRouter from './routes/product.router';

const application = express();
const PORT = process.env.PORT || 8080;

application.use(express.json());

application.use('/products', productRouter);

application.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}.`);
});