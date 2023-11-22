import { Endpoint } from 'express-custom';

import { User } from '@models/User';

export const login = new Endpoint({
  name: 'Login Endpoint',
  description: 'Logs the user in',
  path: '/',
  method: 'GET',
}).setController((req, res) => {
  console.info('Authenticating User');
  res.send(200);
});

export const redirect = new Endpoint({
  name: 'Redirect User',
  description: 'Redirects the user to the discord login page',
  path: '/redirect',
  method: 'GET',
}).setController<{ user: User; token: string }>((req, res) => {
  console.info('Redirecting to dashboard');
  res.redirect(`${process.env.PUBLIC_WEB_URL}/dashboard`);
});

interface LogoutReq {
  user?: User;
  session: { destroy: (error: unknown) => void };
}

export const logout = new Endpoint({
  name: 'Logout User',
  description: 'Logs the user out',
  path: '/logout',
  method: 'DELETE',
}).setController<LogoutReq>((req, res) => {
  if (!req.user) {
    return res.status(401).json({ status: 401, error: 'Unauthorized' });
  }
  console.debug(
    `Logging out user: ${req.user.profile.username} (${req.user.profile.id})`
  );
  try {
    res.clearCookie('sessionToken');
    req.session.destroy((error: unknown) => {
      if (error) throw error;
    });
    // req.logout((error) => {
    //   if (error) throw error;
    // });
    res.status(200).json({ status: 200, message: 'Successfully logged out' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, error: error as Error });
  }
});
