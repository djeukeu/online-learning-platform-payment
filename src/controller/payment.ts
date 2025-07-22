/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from 'express';
import { validationResult } from 'express-validator';

import { BAD_REQUEST } from 'src/constants';
import {
    createPayment,
    readAllPayment,
    readPaymentById,
} from 'src/model/payment';
import { paymentReference } from 'src/utils';

export const getAllPaymentController = async (_req: Request, res: Response) => {
    const payments = await readAllPayment();
    res.status(200).json({ payments });
};

export const getPaymentController = async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({ errcode: BAD_REQUEST, message: result.array() });
        return;
    }

    const id = req.params['id'];
    const payment = await readPaymentById(id as string);
    res.status(200).json({ payment });
};

export const postPaymentController = async (req: any, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        res.status(400).json({ errcode: BAD_REQUEST, message: result.array() });
        return;
    }

    const newPayment = {
        ref: paymentReference(),
        user_id: req.user.id,
        amount: req.body.amount,
        payment_method: req.body.payment_method.toUpperCase(),
    };
    const payment = await createPayment(newPayment as any);

    // Notify the course service about the payment and enroll the student

    res.status(200).json({ payment });
};
