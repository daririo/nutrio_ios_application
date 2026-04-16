import { Request, Response } from 'express';

export async function getAllProducts(req: Request, res: Response) {
    res.send('get all products')
}
export async function postNewProduct(req: Request, res: Response) {
    res.send('post new products')
}
export async function deleteProduct(req: Request, res: Response) {
    res.send('delete all products')
}
