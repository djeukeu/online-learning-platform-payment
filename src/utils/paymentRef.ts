import { generate, charset, Charset } from 'referral-codes';
import dayjs from 'dayjs';

const paymentReference = () => {
    const date = dayjs();
    const code = generate({
        length: 6,
        count: 1,
        charset: charset(Charset.ALPHABETIC),
        prefix: `${date.format('YYYYMM')}-`,
        postfix: `-${date.format('DDhhmm')}`,
    });

    return code[0].toUpperCase();
};

export default paymentReference;
