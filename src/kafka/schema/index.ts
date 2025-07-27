const enroll = {
    type: 'record',
    name: 'Enroll',
    namespace: 'com.online',
    fields: [
        { name: 'user_id', type: 'string', default: '' },
        { name: 'course_id', type: 'string', default: '' },
        { name: 'payment_id', type: 'string', default: '' },
    ],
};

export const enrollSchema = JSON.stringify(enroll);
