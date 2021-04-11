import { Repository, getRepository } from 'typeorm';

import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';
import { differenceInQuarters } from 'date-fns';

class ProductsRepository implements IProductsRepository {
  private productsRepository: Repository<Product>;

  constructor() {
    this.productsRepository = getRepository(Product);
  }

  public async create(data: ICreateProductDTO): Promise<Product> {
    const newProduct = this.productsRepository.create(data);
    await this.productsRepository.save(newProduct);

    return newProduct;
  }

  public async update(id: string, data: ICreateProductDTO): Promise<Product> {
    const updatedProduct = await this.productsRepository.save({
      id,
      title: data.title,
      description: data.description,
      price: data.price,
      category_id: data.category_id,
    });

    return updatedProduct;
  }

  public async delete(id: string): Promise<any> {
    const deletedProduct = await this.productsRepository.delete(id);
  }

  public async getAll(): Promise<any> {
    const products = await this.productsRepository.find();
    return products;
  }

  public async getById(id: string): Promise<Product | undefined> {
    const foundProduct = await this.productsRepository.findOne(id);
    return foundProduct;
  }

  public async getByName(title: string): Promise<Product | undefined> {
    const foundProduct = await this.productsRepository.findOne({
      where: { title },
    });

    return foundProduct;
  }

  public async getByCategory(category_name: string): Promise<any> {
    // terminar essa pesquisa
    const foundProducts = await this.productsRepository.find();
    return foundProducts;
  }
}

export default ProductsRepository;
