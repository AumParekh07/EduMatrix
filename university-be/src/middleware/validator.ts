import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const validateInput = (schema: Joi.ObjectSchema, what: 'body' | 'query' | 'params') => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req[what], { abortEarly: false });
            next();
        } catch (err: any) {
            res.status(400).json({
                success: false,
                message: `Validation Failed:${err.details.map((d: any) => d.message)}`,
                errors: err.details.map((d: any) => d.message),
            });
        }
    };
};