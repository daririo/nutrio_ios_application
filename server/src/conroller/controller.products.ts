import { Request, Response } from 'express';
import * as productService from '../services/service.products';

export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await productService.getProducts();
    res.send(products);
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
}
export async function postNewProduct(req: Request, res: Response) {
  try {
    const product = await productService.createProduct(req.body);

    return res.status(201).json({
      message: 'Product has been added',
      data: product,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
}
export async function deleteProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    await productService.deleteProductById(id);

    return res.status(200).json({
      message: 'Product deleted successfully',
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
}
