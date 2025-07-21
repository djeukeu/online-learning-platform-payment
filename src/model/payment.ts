import { Payment } from '@prisma/client';

import prismaContext from 'src/prisma';

const { payment } = prismaContext.prisma;

export const readAllPayment = async (): Promise<Payment[]> => {
    const response = await payment.findMany();
    return response;
};

export const readPaymentById = async (id: string): Promise<Payment | null> => {
    const response = await payment.findUnique({
        where: { id },
    });
    return response;
};

export const createPayment = async (data: Payment): Promise<Payment> => {
    const response = await payment.create({ data });
    return response;
};

export const updatePayment = async (data: Payment): Promise<Payment> => {
    const response = await payment.update({
        data,
        where: { id: data.id },
    });
    return response;
};
