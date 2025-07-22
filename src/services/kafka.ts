import { Kafka, logLevel } from 'kafkajs';

import config from 'src/config';

const kafka = new Kafka({
    clientId: config.kafka_name,
    brokers: [config.kafka_broker],
    logLevel: config.env !== 'production' ? logLevel.INFO : logLevel.NOTHING,
});

export default kafka;
