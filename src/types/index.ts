import { Express } from 'express';

export type TImageFiles = { [fieldname: string]: Express.Multer.File[] };
