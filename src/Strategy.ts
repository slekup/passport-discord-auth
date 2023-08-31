import { Schema } from 'builder-validation';
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

interface AuthorizationParams {
  permissions?: string;
  prompt?: string;
  disable_guild_select?: string;
  guild_id?: string;
}

/**
 * Passport strategy for authenticating with Discord using the OAuth 2.0 API.
 */
export class Strategy extends OAuth2Strategy {
  public override name = 'discord';
  private scope: ScopeType;
  private scopeDelay: number;
  private fetchScopeEnabled: boolean;

  /**
   * Passport strategy for authenticating with Discord using the OAuth 2.0 API.
   * @param options The strategy options.
   * @param verify The verify callback function.
   * @throws An `Error`. If the options, especially credentials, are not valid.
   */
  public constructor(options: StrategyOptions, verify: VerifyFunction) {
    const constructorSchema = new Schema()
      .addString({
        name: 'clientId',
        description: 'The client ID assigned by Discord.',
        required: true,
      })
      .addString({
        name: 'clientSecret',
        description: 'The client secret assigned by Discord.',
        required: true,
      })
      .addString({
        name: 'callbackUrl',
        description:
          'The URL to which Discord will redirect the user after granting authorization.',
        required: true,
      })
      .addArray({
        name: 'scope',
        description: 'An array of permission scopes to request.',
        required: true,
      })
      .addNumber({
        name: 'scopeDelay',
        description:
          'The delay in milliseconds between requests for the same scope.',
        required: false,
      })
      .addBoolean({
        name: 'fetchScope',
        description: 'Whether to fetch data for the specified scope.',
        required: false,
      })
      .addString({
        name: 'authorizationUrl',
        description: 'The base URL for OAuth2 authorization.',
        required: false,
      })
      .addString({
        name: 'tokenUrl',
        description: 'The base URL for OAuth2 token issuance.',
        required: false,
      })
      .addString({
        name: 'scopeSeparator',
        description: 'The separator for the scope values.',
        required: false,
      });

    // Validate the constructor against the schema.
    constructorSchema
      .validate(options as unknown as Record<string, unknown>)
      .then((result) => {
        if (typeof result === 'string') throw new Error(result);
      });

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
    this.scopeDelay = options.scopeDelay ?? 0;
    this.fetchScopeEnabled = options.fetchScope ?? true;

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

          // Discord epoch (2015-01-01T00:00:00.000Z)
          const EPOCH = 1420070400000;

          // Date is bits 22-63
          const SHIFT = 1 << 22; // eslint-disable-line no-bitwise

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
            createdAt: new Date(+json.id / SHIFT + EPOCH),
            _raw: body,
            _json: json as unknown as Record<string, unknown>,
          };

          if (this.fetchScopeEnabled === false) return done(null, profile);

          this.fetchScope('connections', accessToken, (err, data) => {
            if (err) return done(err);
            profile.connections = data as ProfileConnection[];
            this.fetchScope('guilds', accessToken, (err, data) => {
              if (err) return done(err);
              profile.guilds = data as ProfileGuild[];
              profile.fetchedAt = new Date();
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

    setTimeout(() => {
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
    }, this.scopeDelay ?? 0);
  }

  /**
   * Return extra parameters to be included in the authorization request.
   * @param options The options.
   * @returns The extra parameters.
   */
  public override authorizationParams(
    options: AuthorizationParams
  ): AuthorizationParams & Record<string, unknown> {
    const params: AuthorizationParams & Record<string, unknown> =
      super.authorizationParams(options) as Record<string, unknown>;

    if ('permissions' in options) {
      params.permissions = options.permissions;
    }

    if ('prompt' in options) {
      params.prompt = options.prompt;
    }

    if ('disable_guild_select' in options) {
      params.disable_guild_select = options.disable_guild_select;
    }

    if ('guild_id' in options) {
      params.guild_id = options.guild_id;
    }

    return params;
  }
}
