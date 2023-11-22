import { Api } from 'express-custom';

import { initializePassportStrategy } from '@services/discordStrategy';
import databaseConnection from '@utils/databaseConnection';
import { RequestHandler } from 'express';
import passport from 'passport';
import routes from './routes';

// Database connection
databaseConnection();

// Create the API instance
const api = new Api({
  url: 'http://localhost:5000',
  port: 5000,
  path: '/api',
});

// Global rate limit
api.setRateLimit({
  windowMs: 5 * 1000, // 5s window
  max: 1, // Limit each IP to x requests per window
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  /**
   * Handler for when the max number of requests per window is exceeded.
   * @param req The request.
   * @param res The response.
   */
  handler: (req, res) => {
    res.status(429).json({
      error: {
        code: 429,
        message: 'Too many requests, please try again later.',
      },
    });
  },
});

// Passport middleware
api.addMiddleware(passport.initialize());
api.addMiddleware(passport.session() as RequestHandler);
initializePassportStrategy(passport);

api.addGroup(routes);

export default api;
