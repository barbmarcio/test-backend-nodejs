import 'reflect-metadata';

import { uuid } from 'uuidv4';
import ICreateProductCategoryDTO from '@modules/products_categories/dtos/ICreateProductCategoryDTO';
import ProductCategory from '@modules/products_categories/infra/typeorm/entities/ProductCategory';
import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';
import ProductService from '@modules/products/services/ProductService';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import AppError from '@shared/errors/AppError';

describe('Product Tests', () => {
  it('should be able to create a new product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const productService = new ProductService(fakeProductsRepository);

    // Necessito da criação da categoria pois o tipo do campo category_id é ProductCategory
    const category: ProductCategory = {
      id: uuid(),
      title: 'Test category',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const data: ICreateProductDTO = {
      title: 'Test Product',
      description: 'Just a test',
      price: 1,
      category_id: category,
    };

    const newProduct = await productService.create(data);

    expect(newProduct).toHaveProperty('id');
    expect(newProduct.description).toBe('Just a test');
  });

  it('should be able to show all the products', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const productService = new ProductService(fakeProductsRepository);

    const products = await productService.getAll();

    expect(products).toStrictEqual([]);
  });

  it('should be able to show a product filtered by the name', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const productService = new ProductService(fakeProductsRepository);

    // Necessito da criação da categoria pois o tipo do campo category_id é ProductCategory
    const category: ProductCategory = {
      id: uuid(),
      title: 'Test category',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const data: ICreateProductDTO = {
      title: 'Test Product',
      description: 'Just a test',
      price: 1,
      category_id: category,
    };

    const newProduct = await productService.create(data);
    const foundProduct = await productService.getByName(newProduct.title);

    expect(newProduct.title).toBe('Test Product');
  });

  it('should be able to show a product filtered by the id', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const productService = new ProductService(fakeProductsRepository);

    // Necessito da criação da categoria pois o tipo do campo category_id é ProductCategory
    const category: ProductCategory = {
      id: uuid(),
      title: 'Test category',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const data: ICreateProductDTO = {
      title: 'Test Product',
      description: 'Just a test',
      price: 1,
      category_id: category,
    };

    const newProduct = await productService.create(data);
    const foundProduct = await productService.getById(newProduct.id);

    expect(foundProduct).toHaveProperty('id');
  });

  it('should not be able to show a product filtered by the name that does not exists', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const productService = new ProductService(fakeProductsRepository);

    expect(productService.getByName('Test')).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update a existing product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const productService = new ProductService(fakeProductsRepository);

    // Necessito da criação da categoria pois o tipo do campo category_id é ProductCategory
    const category: ProductCategory = {
      id: uuid(),
      title: 'Test category',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const data: ICreateProductDTO = {
      title: 'Test Product',
      description: 'Just a test',
      price: 1,
      category_id: category,
    };

    const newProduct = await productService.create(data);
    data.price = 1;
    const foundProduct = await productService.update(newProduct.id, data);

    expect(foundProduct.price).toBe(1);
  });

  it('should not be able to update a non existing product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const productService = new ProductService(fakeProductsRepository);

    // Necessito da criação da categoria pois o tipo do campo category_id é ProductCategory
    const category: ProductCategory = {
      id: uuid(),
      title: 'Test category',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const data: ICreateProductDTO = {
      title: 'Test Product',
      description: 'Just a test',
      price: 1,
      category_id: category,
    };

    expect(productService.update('100', data)).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete a product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const productService = new ProductService(fakeProductsRepository);

    // Necessito da criação da categoria pois o tipo do campo category_id é ProductCategory
    const category: ProductCategory = {
      id: uuid(),
      title: 'Test category',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const data: ICreateProductDTO = {
      title: 'Test Product',
      description: 'Just a test',
      price: 1,
      category_id: category,
    };

    const newProduct = await productService.create(data);
    const deletedProduct = await productService.delete(newProduct.id);

    expect(deletedProduct).toBe('Product successfully deleted');
  });

  it('should not be able to delete a non existing product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const productService = new ProductService(fakeProductsRepository);

    expect(productService.delete('100')).rejects.toBeInstanceOf(AppError);
  });
});
