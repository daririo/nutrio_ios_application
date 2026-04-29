import Router from 'express';
import { productRecommendation } from '../conroller/controller.recommendations'

const recommendationRouter = Router();

recommendationRouter.post('/recommendation', productRecommendation);

export default recommendationRouter;