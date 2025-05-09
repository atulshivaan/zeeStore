import express from 'express';
import { addProduct, deleteProduct, editProduct, getAllProducts, getProductById, searchProducts } from '../controllers/products.controller.js';


const productRouter = express.Router();

// Routes for products
productRouter.post('/add', addProduct);
productRouter.get('/all', getAllProducts);
productRouter.get('/:id', getProductById);
productRouter.get('/search', searchProducts);
productRouter.put('/edit/:id', editProduct);
productRouter.delete('/delete/:id', deleteProduct);

export default productRouter;
