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

export const postPaymentSchema = checkSchema(
    {
        amount: {
            errorMessage: 'Invalid amount',
            isDecimal: true,
        },
        payment_method: {
            isIn: {
                options: [['paypal', 'card']],
                errorMessage: 'Invalid payment method',
            },
        },
        course_id: {
            errorMessage: 'Invalid ID',
            isString: true,
        },
    },
    ['body']
);
