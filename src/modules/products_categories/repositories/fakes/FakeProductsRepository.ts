import { uuid } from 'uuidv4';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import Product from '@modules/products/infra/typeorm/entities/Product';

class ProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async create(data: ICreateProductDTO): Promise<Product> {
    const newProduct = new Product();

    Object.assign(
      newProduct,
      {
        id: uuid(),
      },
      data,
    );

    this.products.push(newProduct);

    return newProduct;
  }

  public async getAll(): Promise<any> {
    return this.products;
  }

  public async getByName(title: string): Promise<any> {
    const foundProduct = this.products.find(product => product.title === title);
    return foundProduct;
  }

  public async getByCategory(): Promise<any> {
    return this.products;
  }

  public async getById(id: string): Promise<Product | undefined> {
    const foundProduct = this.products.find(product => product.id === id);
    return foundProduct;
  }

  public async update(id: string, data: ICreateProductDTO): Promise<Product> {
    const foundIndex = this.products.findIndex(
      foundProduct => foundProduct.id === id,
    );
    const foundProduct = this.products[foundIndex];
    this.products[foundIndex].title = data.title;
    return foundProduct;
  }

  public async delete(id: string): Promise<void> {
    const foundIndex = this.products.findIndex(
      foundProduct => foundProduct.id === id,
    );

    this.products.splice(foundIndex, 1);
  }
}

export default ProductsRepository;
