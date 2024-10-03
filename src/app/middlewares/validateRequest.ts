import { AnyZodObject, ZodEffects } from 'zod';
import handleAsync from '../utils/handleAsync';
import { NextFunction, Request, Response } from 'express';

const validateRequest = (schema: AnyZodObject | ZodEffects<AnyZodObject>) => {
  return handleAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await schema.parseAsync(req.body);

      next();
    },
  );
};

export default validateRequest;
