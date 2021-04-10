import Router from 'express';
import ProductController from '../controllers/ProductController';

const productRouter = Router();
const productController = new ProductController();

// Get all products
productRouter.get('/', productController.index);

// Get product by ID
productRouter.get('/:id', productController.index);

// Create product
productRouter.post('/', productController.index);

// Update product
productRouter.put('/:id', productController.index);

// Delete product
productRouter.delete('/:id', productController.index);

export default productRouter;
