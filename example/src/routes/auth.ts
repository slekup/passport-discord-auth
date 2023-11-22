import { Route } from 'express-custom';

import { loginEndpoint } from '@controllers/user';

const authRoute = new Route({
  name: 'User Authentication Endpoints',
  description: 'Endpoints for user authentication',
  path: '/auth',
});

authRoute.addEndpoint(loginEndpoint);

export default authRoute;
