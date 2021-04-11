import 'reflect-metadata';

import { uuid } from 'uuidv4';
import ICreateProductCategoryDTO from '@modules/products_categories/dtos/ICreateProductCategoryDTO';
import ProductCategory from '@modules/products_categories/infra/typeorm/entities/ProductCategory';
import FakeProductsCategoryRepository from '@modules/products_categories/repositories/fakes/FakeProductsCategoryRepository';
import ProductCategoryService from '@modules/products_categories/services/ProductCategoryService';
import AppError from '@shared/errors/AppError';

describe('Product Tests', () => {
  it('should be able to create a new product category', async () => {
    const fakeProductsCategoryRepository = new FakeProductsCategoryRepository();
    const productCategoryService = new ProductCategoryService(
      fakeProductsCategoryRepository,
    );

    const data: ICreateProductCategoryDTO = {
      title: 'Test Category',
    };

    const newProduct = await productCategoryService.create(data);

    expect(newProduct).toHaveProperty('id');
    expect(newProduct.title).toBe('Test Category');
  });

  it('should be able to show all the products categories', async () => {
    const fakeProductsCategoryRepository = new FakeProductsCategoryRepository();
    const productCategoryService = new ProductCategoryService(
      fakeProductsCategoryRepository,
    );

    const products = await productCategoryService.getAll();

    expect(products).toStrictEqual([]);
  });

  it('should be able to show a product filtered by the id', async () => {
    const fakeProductsCategoryRepository = new FakeProductsCategoryRepository();
    const productCategoryService = new ProductCategoryService(
      fakeProductsCategoryRepository,
    );

    // Necessito da criação da categoria pois o tipo do campo category_id é ProductCategory
    const category: ProductCategory = {
      id: uuid(),
      title: 'Test category',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const data: ICreateProductCategoryDTO = {
      title: 'Test category',
    };

    const newProduct = await productCategoryService.create(data);
    const foundProduct = await productCategoryService.getById(newProduct.id);

    expect(foundProduct).toHaveProperty('id');
  });

  it('should be able to update a existing product', async () => {
    const fakeProductsCategoryRepository = new FakeProductsCategoryRepository();
    const productCategoryService = new ProductCategoryService(
      fakeProductsCategoryRepository,
    );

    const data: ICreateProductCategoryDTO = {
      title: 'Test category',
    };

    const newProduct = await productCategoryService.create(data);
    data.title = 'Test category altered';
    const foundProduct = await productCategoryService.update(
      newProduct.id,
      data,
    );

    expect(foundProduct.title).toBe('Test category altered');
  });

  it('should not be able to update a non existing product', async () => {
    const fakeProductsCategoryRepository = new FakeProductsCategoryRepository();
    const productCategoryService = new ProductCategoryService(
      fakeProductsCategoryRepository,
    );

    const data: ICreateProductCategoryDTO = {
      title: 'Test category',
    };

    expect(productCategoryService.update('100', data)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should be able to delete a product', async () => {
    const fakeProductsCategoryRepository = new FakeProductsCategoryRepository();
    const productCategoryService = new ProductCategoryService(
      fakeProductsCategoryRepository,
    );

    const data: ICreateProductCategoryDTO = {
      title: 'Test category',
    };

    const newProduct = await productCategoryService.create(data);
    const deletedEmployee = await productCategoryService.delete(newProduct.id);

    expect(deletedEmployee).toBe('Product category successfully deleted');
  });

  it('should not be able to delete a non existing product', async () => {
    const fakeProductsCategoryRepository = new FakeProductsCategoryRepository();
    const productCategoryService = new ProductCategoryService(
      fakeProductsCategoryRepository,
    );

    expect(productCategoryService.delete('100')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
