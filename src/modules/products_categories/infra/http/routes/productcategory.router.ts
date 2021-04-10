import { uuid } from 'uuidv4';
import Router from 'express';
import ProductCategoryController from '../controllers/ProductCategoryController';

const productCategoryRouter = Router();
const productCategoryController = new ProductCategoryController();

// Get all products
productCategoryRouter.get('/', productCategoryController.index);

// Get product by ID
productCategoryRouter.get('/:id', productCategoryController.show);

// Create product
productCategoryRouter.post('/', productCategoryController.create);

// Update product
productCategoryRouter.put('/:id', productCategoryController.update);

// Delete product
productCategoryRouter.delete('/:id', productCategoryController.delete);

export default productCategoryRouter;
