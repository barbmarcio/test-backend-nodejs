import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import Product from '@modules/products/infra/typeorm/entities/Product';

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  update(id: string, data: ICreateProductDTO): Promise<Product>;
  delete(id: string): Promise<any>;
  getAll(): Promise<any>;
  getById(id: string): Promise<Product | undefined>;
  getByName(title: string): Promise<Product | undefined>;
  getByCategory(category_name: string): Promise<Product | undefined>;
}
