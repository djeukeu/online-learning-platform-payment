import { createServer } from 'http';

import healthcheck from 'src/routes/healthcheck';
import config from 'src/config';
import { app } from 'src/services/express';
import log from 'src/logger';
import { Prisma } from 'src/services/prisma';
import authorizeRequest from './middleware/authorizeRequest';
import paymentRouter from './routes/payment';
import { kafkaConsumer } from './kafka';

const server = async () => {
    const httpServer = createServer(app);

    const prisma = new Prisma();
    await prisma.start();

    await kafkaConsumer();

    app.get('/health', healthcheck);
    app.use('/api/payment', authorizeRequest, paymentRouter);

    new Promise<void>((resolve) =>
        httpServer.listen({ port: config.port }, resolve)
    )
        .then(() => {
            log.info(
                `🚀 ${config.app_name} Service running on port: ${config.port}`
            );
        })
        .catch((err) => {
            log.error(err);
        });
};

server();
