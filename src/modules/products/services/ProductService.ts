import 'reflect-metadata';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import Product from '@modules/products/infra/typeorm/entities/Product';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

@injectable()
class ProductService {
  constructor(
    @inject('ProductsRepository')
    private productRepository: IProductsRepository,
  ) {}

  public async create(data: ICreateProductDTO): Promise<Product> {
    const newEmployee = await this.productRepository.create(data);

    return newEmployee;
  }

  public async update(id: string, data: ICreateProductDTO): Promise<Product> {
    const checkIfExists = await this.productRepository.getById(id);
    if (!checkIfExists)
      throw new AppError('The product with provided ID does not exist', 400);

    const updatedProduct = await this.productRepository.update(id, data);
    return updatedProduct;
  }

  public async delete(id: string): Promise<any> {
    const checkIfExists = await this.productRepository.getById(id);
    if (!checkIfExists)
      throw new AppError(
        'The product with provided ID is not registered.',
        400,
      );

    const deleteEmployee = await this.productRepository.delete(id);

    return 'Product successfully deleted';
  }

  public async getAll(): Promise<any> {
    const products = await this.productRepository.getAll();

    return products;
  }

  public async getByName(title: string): Promise<Product | undefined> {
    const foundProduct = await this.productRepository.getByName(title);
    if (!foundProduct)
      throw new AppError(
        'The product with provided ID is not registered.',
        400,
      );

    return foundProduct;
  }

  /* public async getByCategory(
    category_name: string,
  ): Promise<Product | undefined> {} */
}

export default ProductService;
