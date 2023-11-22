import { RequestHandler } from 'express';
import { Route } from 'express-custom';
import passport from 'passport';

import * as auth from '@controllers/auth';

const authRoute = new Route({
  name: 'User Authentication Endpoints',
  description: 'Endpoints for user authentication',
  path: '/auth',
})
  .addMiddleware(((req, res, next) => {
    // Do not use middleware for the logout endpoint
    if (req.path === '/logout') return next();
    (
      passport.authenticate('discord', {
        failureRedirect: `${process.env.PUBLIC_WEB_URL}/404`,
        successRedirect: `${process.env.PUBLIC_WEB_URL}/dashboard`,
      }) as RequestHandler
    )(req, res, next);
  }) as RequestHandler)
  .addEndpointFile(auth);

export default authRoute;
