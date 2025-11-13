// src/middleware/validateJoi.ts
import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export const validateJoi = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const formattedErrors = error.details.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        errors: formattedErrors,
      });
    }
    next();
  };
};
