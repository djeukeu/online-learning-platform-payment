import { Response, Request } from 'express';
import { PrismaClient } from '@prisma/client';

const healthcheck = async (_req: Request, res: Response) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
    };
    try {
        const prisma = new PrismaClient();
        await prisma.$connect();
        res.status(200).json(healthcheck);
    } catch (error: unknown) {
        healthcheck.message = error as string;
        res.status(503).send(error);
    }
};

export default healthcheck;
