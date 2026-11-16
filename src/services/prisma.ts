import { PrismaClient } from '@prisma/client';

import config from 'src/config';
import log from 'src/logger';

export class Prisma {
    private static prisma = new PrismaClient();

    static async start() {
        try {
            await Prisma.prisma.$connect();
            log.info(`🛠️ ${config.app_name} db connected!`);
        } catch (err) {
            log.error(err);
        }
    }

    static async health() {
        try {
            await Prisma.prisma.$queryRaw`SELECT 1`;
            log.info(`🛠️ ${config.app_name} db healthy!`);
        } catch (err) {
            log.error(err);
            throw err;
        }
    }

    static context(): PrismaClient {
        return Prisma.prisma;
    }
}
