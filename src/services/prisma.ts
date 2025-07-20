import { PrismaClient } from '@prisma/client';

import config from 'src/config';
import log from 'src/logger';

export class Prisma {
    async start() {
        try {
            const prisma = new PrismaClient();
            await prisma.$connect();
            log.info(`🛠️ ${config.app_name} db connected!`);
        } catch (err) {
            log.error(err);
        }
    }
}
