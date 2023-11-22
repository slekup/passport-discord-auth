import { Group } from 'express-custom';
import authRoute from './auth';

const userGroup = new Group({
  name: 'User Endpoints',
  path: '/user',
});

userGroup.addRoute(authRoute);

export default userGroup;
