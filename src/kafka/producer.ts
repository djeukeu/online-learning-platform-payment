/* eslint-disable @typescript-eslint/no-explicit-any */
import { SchemaRegistry, SchemaType } from '@kafkajs/confluent-schema-registry';

import kafka from 'src/services/kafka';
import config from 'src/config';

const producer = kafka.producer({
    idempotent: true,
});
const registry = new SchemaRegistry({ host: config.kafka_registry });

const kafkaProducer = async (topic: string, payload: any, schema: string) => {
    await producer.connect();

    const { id } = await registry.register({
        type: SchemaType.AVRO,
        schema,
    });

    const encodedPayload = await registry.encode(id, payload);

    producer.send({
        topic,
        messages: [{ value: encodedPayload }],
    });

    await producer.disconnect();
};

export default kafkaProducer;
