import { Endpoint } from 'express-custom';

export const loginEndpoint = new Endpoint({
  name: 'Login',
  description: 'Login to your account',
  path: '/login',
  method: 'GET',
  /**
   * Handler for the endpoint.
   * @param req The request.
   * @param res The response.
   */
  controller: (req, res) => {
    res.json({ user: 'ok' });
  },
});
