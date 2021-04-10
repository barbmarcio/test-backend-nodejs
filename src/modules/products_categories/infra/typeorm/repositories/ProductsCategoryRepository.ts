import { Repository, getRepository } from 'typeorm';

import ICreateProductCategoryDTO from '@modules/products_categories/dtos/ICreateProductCategoryDTO';
import IProductsCategoryRepository from '@modules/products_categories/repositories/IProductsCategoryRepository';
import ProductCategory from '@modules/products_categories/infra/typeorm/entities/ProductCategory';

class ProductsRepository implements IProductsCategoryRepository {
  private productsCategoriesRepository: Repository<ProductCategory>;

  constructor() {
    this.productsCategoriesRepository = getRepository(ProductCategory);
  }

  public async create(
    data: ICreateProductCategoryDTO,
  ): Promise<ProductCategory> {
    const newProduct = this.productsCategoriesRepository.create(data);
    await this.productsCategoriesRepository.save(newProduct);

    return newProduct;
  }

  public async update(
    id: string,
    data: ICreateProductCategoryDTO,
  ): Promise<ProductCategory> {
    const updatedProduct = await this.productsCategoriesRepository.save({
      id,
      title: data.title,
    });

    return updatedProduct;
  }

  public async delete(id: string): Promise<any> {
    const deletedProduct = await this.productsCategoriesRepository.delete(id);
  }

  public async getAll(): Promise<any> {
    const products = await this.productsCategoriesRepository.find();
    return products;
  }

  public async getById(id: string): Promise<ProductCategory | undefined> {
    const foundProduct = await this.productsCategoriesRepository.findOne(id);
    return foundProduct;
  }
}

export default ProductsRepository;
