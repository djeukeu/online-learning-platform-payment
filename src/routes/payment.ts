import { Router } from 'express';

import {
    getAllPaymentController,
    getPaymentController,
    postPaymentController,
} from 'src/controller/payment';
import { getPaymentSchema, postPaymentSchema } from 'src/schema/payment';

const paymentRouter = Router();

paymentRouter.get('/', getAllPaymentController);
paymentRouter.get('/:id', getPaymentSchema, getPaymentController);
paymentRouter.post('/', postPaymentSchema, postPaymentController);

export default paymentRouter;
