import productsRouter from '@modules/products/infra/http/routes/product.router';
import productsCategoriesRouter from '@modules/products_categories/infra/http/routes/productcategory.router';

import Router from 'express';

const router = Router();

router.use('/products', productsRouter);
router.use('/productscategories', productsCategoriesRouter);

export default router;
