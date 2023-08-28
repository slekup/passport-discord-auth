import passport from 'passport';
import { StrategyOptions as OAuth2StrategyOptions } from 'passport-oauth2';

/**
 * See https://discord.com/developers/docs/topics/oauth2#shared-resources-oauth2-scopes for more information.
 */
export enum Scope {
  /**
   * Allows your app to fetch data from a user's "Now Playing/Recently Played" list — not currently available for apps.
   */
  ActivitiesRead = 'activities.read',
  /**
   * Allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER).
   */
  ActivitiesWrite = 'activities.write',
  /**
   * Allows your app to read build data for a user's applications.
   */
  ApplicationBuildsRead = 'applications.builds.read',
  /**
   * Allows your app to upload/update builds for a user's applications - requires Discord approval.
   */
  ApplicationBuildsUpload = 'applications.builds.upload',
  /**
   *	Allows your app to use commands in a guild.
   */
  ApplicationsCommands = 'applications.commands',
  /**
   * Allows your app to update its commands using a Bearer token - client credentials grant only.
   */
  ApplicationsCommandsUpdate = 'applications.commands.update',
  /**
   * Allows your app to update permissions for its commands in a guild a user has permissions to.
   */
  ApplicationsCommandsPermissionsUpdate = 'applications.commands.permissions.update',
  /**
   * Allows your app to read entitlements for a user's applications.
   */
  ApplicationsEntitlements = 'applications.entitlements',
  /**
   * Allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications.
   */
  ApplicationsStoreUpdate = 'applications.store.update',
  /**
   * For oauth2 bots, this puts the bot in the user's selected guild by default.
   */
  Bot = 'bot',
  /**
   * Allows /users/@me/connections to return linked third-party accounts.
   */
  Connections = 'connections',
  /**
   * Allows your app to see information about the user's DMs and group DMs - requires Discord approval.
   */
  DMRead = 'dm_channels.read',
  /**
   * Enables /users/@me to return an `email`.
   */
  Email = 'email',
  /**
   * Allows your app to join users to a group dm.
   */
  GdmJoin = 'gdm.join',
  /**
   * Allows /users/@me/guilds to return basic information about all of a user's guilds.
   */
  Guilds = 'guilds',
  /**
   * Allows /guilds/{guild.id}/members/{user.id} to be used for joining users to a guild.
   */
  GuildsJoin = 'guilds.join',
  /**
   * Allows /users/@me/guilds/{guild.id}/member to return a user's member information in a guild.
   */
  GuildMembersRead = 'guilds.members.read',
  /**
   * Allows /users/@me without email.
   */
  Identify = 'identify',
  /**
   * For local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates).
   */
  MessagesRead = 'messages.read',
  /**
   * Allows your app to know a user's friends and implicit relationships - requires Discord approval.
   */
  RelationshipsRead = 'relationships.read',
  /**
   * Allows your app to update a user's connection and metadata for the app.
   */
  RoleConnectionsWrite = 'role_connections.write',
  /**
   * For local rpc server access, this allows you to control a user's local Discord client - requires Discord approval.
   */
  RPC = 'rpc',
  /**
   * For local rpc server access, this allows you to update a user's activity - requires Discord approval.
   */
  RPCActivitiesUpdate = 'rpc.activities.update',
  /**
   * For local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval.
   */
  RPCNotificationsRead = 'rpc.notifications.read',
  /**
   * For local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval.
   */
  RPCVoiceRead = 'rpc.voice.read',
  /**
   * For local rpc server access, this allows you to update a user's voice settings - requires Discord approval.
   */
  RPCVoiceWrite = 'rpc.voice.write',
  /**
   * Allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval.
   */
  Voice = 'voice',
  /**
   * This generates a webhook that is returned in the oauth token response for authorization code grants.
   */
  WebhookIncoming = 'webhook.incoming',
}

export type SingleScopeType = `${Scope}`;
export type ScopeType = SingleScopeType[];

export interface StrategyOptions
  extends Omit<
    OAuth2StrategyOptions,
    'clientID' | 'clientSecret' | 'scope' | 'authorizationURL' | 'tokenURL'
  > {
  /**
   * The client ID assigned by Discord.
   */
  clientId: string;
  /**
   * The client secret assigned by Discord.
   */
  clientSecret: string;
  /**
   * The URL to which Discord will redirect the user after granting authorization.
   */
  callbackUrl: string;
  /**
   * An array of permission scopes to request.
   */
  scope: ScopeType;
  /**
   * The base URL for OAuth2 authorization.
   */
  authorizationUrl?: string | undefined;
  /**
   * The base URL for OAuth2 token issuance.
   */
  tokenUrl?: string | undefined;
  /**
   * The separator for the scope values.
   */
  scopeSeparator?: string | undefined;
}

export interface ProfileConnection {
  verified: boolean;
  name: string;
  show_activity: boolean;
  type: string;
  id: string;
  visibility: number;
}

export interface ProfileGuild {
  owner: boolean;
  permissions: number;
  icon?: string | undefined;
  id: string;
  name: string;
  features?: string[] | undefined;
}

export interface Profile extends passport.Profile {
  provider: string;
  id: string;
  username: string;
  displayName: string;
  discriminator: string;
  avatar: string;
  banner: string;
  email: string;
  verified: boolean;
  mfa_enabled: boolean;
  access_token: string;
  public_flags: number;
  flags: number;
  locale: string;
  global_name?: string | undefined;
  premium_type?: number | undefined;
  connections?: ProfileConnection[] | undefined;
  guilds?: ProfileGuild[] | undefined;
  fetchedAt: Date;
  _raw: unknown;
  _json: Record<string, unknown>;
}
