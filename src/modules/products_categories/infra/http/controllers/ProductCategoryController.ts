import 'reflect-metadata';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ProductCategoryService from '@modules/products_categories/services/ProductCategoryService';

class ProductController {
  public async index(req: Request, res: Response): Promise<Response> {
    const productCategoryService = container.resolve(ProductCategoryService);
    const productsCategories = await productCategoryService.getAll();

    return res.json(productsCategories);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const productCategoryService = container.resolve(ProductCategoryService);
    const foundProductCategory = await productCategoryService.getById(id);

    return res.json(foundProductCategory);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const productCategoryService = container.resolve(ProductCategoryService);
    const newProductCategory = await productCategoryService.create(data);

    return res.json(newProductCategory);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = req.body;

    const productCategoryService = container.resolve(ProductCategoryService);
    const updatedProductCategory = await productCategoryService.update(
      id,
      data,
    );

    return res.json(updatedProductCategory);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const productCategoryService = container.resolve(ProductCategoryService);
    const deletedProductCategory = await productCategoryService.delete(id);

    return res.json(deletedProductCategory);
  }
}

export default ProductController;
