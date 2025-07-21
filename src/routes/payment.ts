import { Router } from 'express';

import {
    getAllPaymentController,
    getPaymentController,
    patchPaymentController,
    postPaymentController,
} from 'src/controller/payment';
import { getPaymentSchema } from 'src/schema/payment';

const paymentRouter = Router();

paymentRouter.get('/', getAllPaymentController);
paymentRouter.get('/:id', getPaymentSchema, getPaymentController);
paymentRouter.post('/', postPaymentController);
paymentRouter.patch('/', patchPaymentController);

export default paymentRouter;
