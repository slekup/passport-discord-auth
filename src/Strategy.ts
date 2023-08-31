import {
  InternalOAuthError,
  Strategy as OAuth2Strategy,
  StrategyOptions as OAuth2StrategyOptions,
  VerifyCallback,
} from 'passport-oauth2';
import {
  Profile,
  ProfileConnection,
  ProfileGuild,
  ScopeType,
  SingleScopeType,
  StrategyOptions,
} from 'typings';

type VerifyFunction = (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  verified: VerifyCallback
) => void;

/**
 * Passport strategy for authenticating with Discord using the OAuth 2.0 API.
 */
export class Strategy extends OAuth2Strategy {
  public override name = 'discord';
  private scope: ScopeType;

  /**
   * Passport strategy for authenticating with Discord using the OAuth 2.0 API.
   * @param options The strategy options.
   * @param verify The verify callback function.
   * @throws An `Error`. If the options, especially credentials, are not valid.
   */
  public constructor(options: StrategyOptions, verify: VerifyFunction) {
    super(
      {
        clientID: options.clientId,
        callbackURL: options.callbackUrl,
        authorizationURL:
          options.authorizationUrl ??
          'https://discord.com/api/oauth2/authorize',
        tokenURL: options.tokenUrl ?? 'https://discord.com/api/oauth2/token',
        scopeSeparator: ' ',
        ...options,
      } as OAuth2StrategyOptions,
      verify
    );

    this.scope = options.scope ?? [];

    // eslint-disable-next-line no-underscore-dangle
    this._oauth2.useAuthorizationHeaderforGET(true);
  }

  /**
   * Retrieve user profile from Discord.
   * @param accessToken The access token.
   * @param done The done callback function.
   */
  public override userProfile(
    accessToken: string,
    done: (err?: Error | null, profile?: Profile | null) => void
  ): void {
    // eslint-disable-next-line no-underscore-dangle
    this._oauth2.get(
      'https://discord.com/api/users/@me',
      accessToken,
      (err, body) => {
        if (err) {
          return done(
            new InternalOAuthError('Failed to fetch the user profile.', err)
          );
        }

        let profile: Profile = {} as Profile;

        try {
          if (typeof body !== 'string')
            return done(new Error('Failed to parse the user profile.'));

          const json = JSON.parse(body) as Profile;

          profile = {
            provider: 'discord',
            id: json.id,
            username: json.username,
            displayName: json.displayName,
            discriminator: json.discriminator,
            avatar: json.avatar,
            banner: json.banner,
            email: json.email,
            verified: json.verified,
            mfa_enabled: json.mfa_enabled,
            access_token: accessToken,
            public_flags: json.public_flags,
            flags: json.flags,
            locale: json.locale,
            global_name: json.global_name,
            premium_type: json.premium_type,
            connections: json.connections,
            guilds: json.guilds,
            fetchedAt: new Date(),
            _raw: body,
            _json: json as unknown as Record<string, unknown>,
          };

          this.fetchScope('connections', accessToken, (err, data) => {
            if (err) return done(err);
            json.connections = data as ProfileConnection[];
            this.fetchScope('guilds', accessToken, (err, data) => {
              if (err) return done(err);
              json.guilds = data as ProfileGuild[];
              json.fetchedAt = new Date();
              done(null, profile);
            });
          });
        } catch (err) {
          return done(new Error('Failed to parse the user profile.'));
        }
      }
    );
  }

  /**
   * Fetch a scope from Discord.
   * @param scope The scope to fetch.
   * @param accessToken The access token.
   * @param cb The callback function.
   * @returns The fetched scope data.
   * @throws An `Error`. If the scope is invalid.
   */
  public fetchScope(
    scope: SingleScopeType,
    accessToken: string,
    cb: (err?: Error | null, data?: unknown) => void
  ): void {
    if (!this.scope.includes(scope)) return cb(null, null);

    // eslint-disable-next-line no-underscore-dangle
    this._oauth2.get(
      `https://discord.com/api/users/@me/${scope}`,
      accessToken,
      (err, body) => {
        if (err)
          return cb(
            new InternalOAuthError(`Failed to fetch the scope: ${scope}`, err)
          );

        try {
          if (typeof body !== 'string')
            return cb(
              new Error(`Failed to parse the returned scope data: ${scope}`)
            );

          const json = JSON.parse(body) as Record<string, unknown>;
          cb(null, json);
        } catch (error) {
          cb(new Error(`Failed to parse the returned scope data: ${scope}`));
        }
      }
    );
  }

  /**
   * Return extra parameters to be included in the authorization request.
   * @param options The options.
   * @returns The extra parameters.
   */
  public override authorizationParams(
    options: Record<string, unknown>
  ): Record<string, unknown> {
    const params: Record<string, unknown> = super.authorizationParams(
      options
    ) as Record<string, unknown>;

    if ('permissions' in options) {
      params.permissions = options.permissions;
    }

    if ('prompt' in options) {
      params.prompt = options.prompt;
    }

    return params;
  }
}
