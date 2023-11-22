import { Route } from 'express-custom';

import * as user from '@controllers/user';
import { authMiddleware } from '@middleware/auth';

const userRoute = new Route({
  name: 'User Endpoints',
  description: 'Endpoints for user data',
  path: '/user',
})
  .addMiddleware(authMiddleware)
  .addEndpointFile(user);

export default userRoute;
