import 'reflect-metadata';

import IProductsCategoriesRepository from '@modules/products_categories/repositories/IProductsCategoryRepository';
import ICreateProductCategoryDTO from '@modules/products_categories/dtos/ICreateProductCategoryDTO';
import ProductCategory from '@modules/products_categories/infra/typeorm/entities/ProductCategory';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

@injectable()
class ProductCategoryService {
  constructor(
    @inject('ProductsCategoriesRepository')
    private productCategoryRepository: IProductsCategoriesRepository,
  ) {}

  public async create(
    data: ICreateProductCategoryDTO,
  ): Promise<ProductCategory> {
    const newProductCategory = await this.productCategoryRepository.create(
      data,
    );

    return newProductCategory;
  }

  public async update(
    id: string,
    data: ICreateProductCategoryDTO,
  ): Promise<ProductCategory> {
    const checkIfExists = await this.productCategoryRepository.getById(id);
    if (!checkIfExists)
      throw new AppError('The product with provided ID does not exist', 400);

    const updatedProduct = await this.productCategoryRepository.update(
      id,
      data,
    );
    return updatedProduct;
  }

  public async delete(id: string): Promise<any> {
    const checkIfExists = await this.productCategoryRepository.getById(id);
    if (!checkIfExists)
      throw new AppError(
        'The product with provided ID is not registered.',
        400,
      );

    const deleteEmployee = await this.productCategoryRepository.delete(id);

    return 'Product successfully deleted';
  }

  public async getAll(): Promise<any> {
    const products = await this.productCategoryRepository.getAll();

    return products;
  }

  public async getById(id: string): Promise<ProductCategory | undefined> {
    const foundProductCategory = await this.productCategoryRepository.getById(
      id,
    );
    return foundProductCategory;
  }
}

export default ProductCategoryService;
