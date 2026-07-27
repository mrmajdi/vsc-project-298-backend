// @vsc repo:vsc-project-298-backend file:src/middleware/validation.ts task:b14-src-middleware-validation-ts module:backend session:298
import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

/**
 * Middleware factory that validates request.body against a Zod schema.
 * On success calls next(); on failure passes the ZodError to next()
 * to be handled by the errorHandler middleware.
 */
export default function validate<T>(schema: ZodSchema<T>) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const result = schema.safeParse(req.body);
    if (result.success) {
      return next();
    }
    // Pass the ZodError to the error handler for consistent formatting
    return next(result.error);
  };
}
