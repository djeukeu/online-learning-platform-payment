/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';

import config from 'src/config';
import { UNAUTHENTICATED } from 'src/constants';

type Payload = { id: string; role: string } & JwtPayload;

const authorizeRequest = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        res.status(401).json({
            errcode: UNAUTHENTICATED,
            message: 'user is not authenticated',
        });
        return;
    }
    const token = authorization.replace('Bearer ', '');
    try {
        const decoded = verify(token, config.secret_key as string) as Payload;
        req.user = { id: decoded.id, role: decoded.role };
        next();
    } catch (err: any) {
        res.status(401).json({
            errcode: UNAUTHENTICATED,
            message: err.message,
        });
    }
};

export default authorizeRequest;
