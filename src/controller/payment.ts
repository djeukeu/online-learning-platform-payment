/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from 'express';
import { validationResult } from 'express-validator';

import { BAD_REQUEST } from 'src/constants';
import { readAllPayment, readPaymentById } from 'src/model/payment';

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

export const postPaymentController = async (_req: any, res: Response) => {
    res.json({ message: 'ok' });
};

export const patchPaymentController = async (_req: any, res: Response) => {
    res.json({ message: 'ok' });
};
