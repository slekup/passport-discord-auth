import { User } from '@models/User';
import { Middleware } from 'express-custom';

/**
 * Middleware for authenticating a user.
 * @param req The request.
 * @param res The response.
 * @param next The next function.
 * @returns The next function or a response.
 */
export const authMiddleware: Middleware = (req, res, next) => {
  const isAuthenticated = (req.user as User | undefined)?.profile;

  if (!isAuthenticated) {
    return res.status(401).json({ status: 401, error: 'Unauthorized' });
  } else next();
};
