import jwt, { type JwtPayload } from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongoose";


// export interface AuthenticatedRequest extends Request {
//     user?: JwtPayload & { userId: ObjectId; };
// }

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Unauthorized! Access denied' });
        return
    }

    try {
        //verified token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;

        res.locals.userId = decoded.userId;

        next();
    } catch (err) {
        res.status(401).send({ message: 'Error: Please Log-in Again.' });
        return
    }
};


