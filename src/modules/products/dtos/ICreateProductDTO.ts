import ProductCategory from '@modules/products_categories/infra/typeorm/entities/ProductCategory';

export default interface ICreateProductDTO {
  title: string;
  description: string;
  price: number;
  category_id: ProductCategory;
}
