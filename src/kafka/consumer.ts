/* eslint-disable @typescript-eslint/no-explicit-any */
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';

import kafka from 'src/services/kafka';
import config from 'src/config';
import log from 'src/logger';

const consumer = kafka.consumer({ groupId: config.app_name });
const registry = new SchemaRegistry({ host: config.kafka_registry });

const kafkaConsumer = async () => {
    await consumer.connect();

    consumer.subscribe({ topic: config.kafka_topic, fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ message }) => {
            const payload = await registry.decode(message.value as any);
            log.info(payload);
        },
    });
};

export default kafkaConsumer;
