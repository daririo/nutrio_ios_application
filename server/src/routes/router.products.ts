import Router from 'express';
import {
  getAllProducts,
  postNewProduct,
  deleteProduct,
} from '../conroller/controller.products';

const productRouter = Router();

productRouter.route('/products').get(getAllProducts).post(postNewProduct);

productRouter.delete('/products/:id', deleteProduct);

export default productRouter;
