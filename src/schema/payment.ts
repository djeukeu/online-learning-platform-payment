import { checkSchema } from 'express-validator';

export const getPaymentSchema = checkSchema(
    {
        id: {
            errorMessage: 'Invalid ID',
            isString: true,
        },
    },
    ['params']
);
