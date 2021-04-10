import { container } from 'tsyringe';

import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import ProductsCategoriesRepository from '@modules/products_categories/infra/typeorm/repositories/ProductsCategoryRepository';
import IProductsCategoriesRepository from '@modules/products_categories/repositories/IProductsCategoryRepository';

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IProductsCategoriesRepository>(
  'ProductsCategoriesRepository',
  ProductsCategoriesRepository,
);
