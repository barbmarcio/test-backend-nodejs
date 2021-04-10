import productsRouter from '@modules/products/infra/http/routes/product.router';

import Router from 'express';

const router = Router();

router.use('/products', productsRouter);

export default router;
