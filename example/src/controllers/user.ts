import { Endpoint } from 'express-custom';

import { User } from '@models/User';

export const getUser = new Endpoint({
  name: 'Get User',
  description: 'Gets the user',
  path: '/',
  method: 'GET',
}).setController<{ user: User }>((req, res) => {
  const { profile } = req.user;

  const user = {
    id: profile.id,
    username: profile.username,
    avatar: profile.avatar,
    global_name: profile.global_name,
  };

  res.send({
    user,
  });
});

export const getUserProfile = new Endpoint({
  name: 'Get User Profile',
  description: 'Gets the user profile',
  path: '/profile',
  method: 'GET',
}).setController<{ user: User }>((req, res) => {
  const { profile } = req.user;

  const userProfile = {
    id: profile.id,
    username: profile.username,
    avatar: profile.avatar,
    global_name: profile.global_name,
    public_flags: profile.public_flags,
    flags: profile.flags,
    banner: profile.banner,
    locale: profile.locale,
    premium_type: profile.premium_type,
    guilds: {
      total: profile.guilds?.length ?? 0,
      owner: profile.guilds?.filter((guild) => guild.owner).length ?? 0,
    },
  };

  res.send({
    user: userProfile,
  });
});
