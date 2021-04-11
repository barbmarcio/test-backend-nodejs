import 'reflect-metadata';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ProductService from '@modules/products/services/ProductService';

class ProductController {
  public async index(req: Request, res: Response): Promise<Response> {
    const productService = container.resolve(ProductService);
    const products = await productService.getAll();

    return res.json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const title = req.params.id;
    const productService = container.resolve(ProductService);
    const foundProduct = await productService.getByName(title);

    return res.json(foundProduct);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const productService = container.resolve(ProductService);
    const newProduct = await productService.create(data);

    return res.json(newProduct);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const data = req.body;

    const productService = container.resolve(ProductService);
    const updatedProduct = await productService.update(id, data);

    return res.json(updatedProduct);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const productService = container.resolve(ProductService);
    const deletedProduct = await productService.delete(id);

    return res.json(deletedProduct);
  }
}

export default ProductController;
