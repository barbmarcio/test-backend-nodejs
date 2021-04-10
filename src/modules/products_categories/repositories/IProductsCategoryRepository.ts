import ICreateProductCategoryDTO from '@modules/products_categories/dtos/ICreateProductCategoryDTO';
import ProductCategory from '@modules/products_categories/infra/typeorm/entities/ProductCategory';

export default interface IProductsCategoriesRepository {
  create(data: ICreateProductCategoryDTO): Promise<ProductCategory>;
  update(id: string, data: ICreateProductCategoryDTO): Promise<ProductCategory>;
  delete(id: string): Promise<any>;
  getAll(): Promise<any>;
  getById(id: string): Promise<ProductCategory | undefined>;
}
