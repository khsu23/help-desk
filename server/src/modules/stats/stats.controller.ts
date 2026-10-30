import { Request, Response, NextFunction } from 'express';
import * as statsService from './stats.service.js';
import { ValidationError } from '../../shared/errors.js';

export const getStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await statsService.getStats();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const getRecent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 🔴 TODO: Read the optional ?limit= query param (default 5). It must be a whole number from 1 to 10, otherwise throw a ValidationError (400). Pass it to the service.
    let limit = 5
    if (req.query.limit) {
      limit = parseInt(req.query.limit as string, 10);
      if (isNaN(limit) || limit < 1 || limit > 10 ) {
        throw new ValidationError("limit must between 1 to 10")
      }
    }
    const result = await statsService.getRecent();
    res.json(result);
  } catch (error) {
    next(error);
  }
};
