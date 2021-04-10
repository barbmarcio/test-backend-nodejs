import Router from 'express';
import ProductController from '../controllers/ProductController';

const productRouter = Router();
const productController = new ProductController();

// Get all products
productRouter.get('/', productController.index);

// Get product by ID
productRouter.get('/:id', productController.show);

// Create product
productRouter.post('/', productController.create);

// Update product
productRouter.put('/:id', productController.update);

// Delete product
productRouter.delete('/:id', productController.delete);

export default productRouter;
