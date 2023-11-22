import { PassportStatic } from 'passport';
import { Scope, Strategy } from 'passport-discord-auth';
import refresh from 'passport-oauth2-refresh';

import { User, UserModel } from '@models/User';

/**
 * Initializes the passport strategy.
 * @param passport The passport instance.
 */
export const initializePassportStrategy = (passport: PassportStatic): void => {
  passport.serializeUser((user, cb: (err: unknown, user: string) => void) => {
    const { profile } = user as User;
    console.debug(`Serializing user: ${profile.id}`);
    cb(null, profile.id);
  });

  passport.deserializeUser((id: string, done) => {
    console.debug(`Deserializing user: ${id}`);
    UserModel.findOne({
      discordId: id,
    })
      .then((user) => {
        if (!user) return done(null, null);
        done(null, user);
      })
      .catch((error) => {
        console.error(error);
        done(error, null);
      });
  });

  const discordStrategy = new Strategy(
    {
      clientId: `${process.env.PUBLIC_CLIENT_ID}`,
      clientSecret: `${process.env.CLIENT_SECRET}`,
      callbackUrl: `${process.env.PUBLIC_API_URL}/auth/redirect`,
      scope: [
        Scope.Identify,
        Scope.Email,
        Scope.Guilds,
        Scope.GuildMembersRead,
      ],
    },
    (accessToken, refreshToken, profile, done) => {
      (async () => {
        const { id: discordId } = profile;

        try {
          if (!profile.email || profile.verified !== true) {
            return done(
              new Error('Not verified or no email provided'),
              undefined
            );
          }

          const existingUser = await UserModel.findOneAndUpdate(
            { discordId },
            {
              accessToken,
              refreshToken,
              profile,
            },
            { new: true }
          );

          if (existingUser) {
            return done(null, existingUser);
          }

          const savedUser = await UserModel.create({
            discordId,
            accessToken,
            refreshToken,
            profile,
          });

          return done(null, savedUser);
        } catch (error) {
          console.error(error);
          done(error as Error, undefined);
        }
      })();
    }
  );

  passport.use(discordStrategy);
  refresh.use('discord', discordStrategy);
};
