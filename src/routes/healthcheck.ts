import { Response, Request } from 'express';

import { Prisma } from 'src/services/prisma';

export const serverHealth = async (_req: Request, res: Response) => {
    res.status(200).json({
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
    });
};

export const databaseHealthcheck = async (_req: Request, res: Response) => {
    try {
        await Prisma.health();
        res.status(200).json({
            uptime: process.uptime(),
            message: 'OK',
            timestamp: Date.now(),
            db: true,
        });
    } catch (error: unknown) {
        res.status(503).json({
            uptime: process.uptime(),
            message: error,
            timestamp: Date.now(),
            db: false,
        });
    }
};
