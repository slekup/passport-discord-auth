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
   * Allows your app to use commands in a guild.
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
   * The delay in milliseconds between requests for the same scope.
   */
  scopeDelay?: number | undefined;
  /**
   * Whether to fetch data for the specified scope.
   */
  fetchScope?: boolean | undefined;
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

export interface DiscordUser {
  /**
   * The user's Discord ID.
   * Required scope: `identify`.
   * @see https://discord.com/developers/docs/reference#snowflakes
   * @example '896657711104667719'
   */
  id: string;
  /**
   * The user's username, unique across the platform.
   * Required scope: `identify`.
   * @see https://discord.com/developers/docs/resources/user#user-object-user-structure
   * @example 'slekup'
   */

  username: string;
  /**
   * The user's 4-digit discord-tag.This is currently being replaced by the pomelo username system.
   * Required scope: `identify`.
   * @see https://discord.com/developers/docs/resources/user#user-object-user-structure
   * @example 'slekup#6682'
   */
  discriminator?: string | undefined; // TODO: Remove this when Discord removes it from their API.
  /**
   * The user's display name, if it is set. For bots, this is it's application name.
   * Required scope: `identify`.
   * @see https://discord.com/developers/docs/resources/user#user-object-user-structure
   * @example 'Slekup'
   */
  global_name?: string | undefined;
  /**
   * The user's avatar hash.
   * Required scope: `identify`.
   * @see https://discord.com/developers/docs/reference#image-formatting
   * @example 'a_6de1eeba46e97e2ca9e2fgb1ae99c2b6'
   */
  avatar: string;
  /**
   * Whether the user belongs to an OAuth2 application.
   * Required scope: `identify`.
   * @see https://discord.com/developers/docs/resources/user#user-object-user-structure
   * @example false
   */
  bot?: string | undefined;
  /**
   * Whether the user is an Official Discord System user (part of the urgent message system).
   * Required scope: `identify`.
   * @see https://discord.com/developers/docs/resources/user#user-object-user-structure
   * @example false
   */
  system?: boolean | undefined;
  /**
   * Whether the user has two factor enabled on their account.
   * Required scope: `identify`.
   * @see https://discord.com/developers/docs/resources/user#user-object-user-structure
   * @example false
   */
  mfa_enabled?: boolean | undefined;
  /**
   * The user's banner hash.
   * Required scope: `identify`.
   * @see https://discord.com/developers/docs/resources/user#user-object-user-structure
   * @example 'a_6de1eeba36e97e2cf9e2fgb1ae99c2b3'
   */
  banner?: string | undefined;
  /**
   * The user's banner color encoded as an integer representation of hexadecimal color code.
   * Required scope: `identify`.
   * @see https://discord.com/developers/docs/reference#image-formatting
   * @example 0
   */
  banner_color?: number | undefined;
  /**
   * The user's banner color encoded as an integer representation of hexadecimal color code.
   * Required scope: `identify`.
   * @see https://discord.com/developers/docs/resources/user#user-object-user-structure
   * @example 0
   */
  accent_color?: number | undefined;
  /**
   * The user's chosen language option.
   * Required scope: `identify`.
   * @see https://discord.com/developers/docs/resources/user#user-object-user-structure
   * @example 'en-US'
   */
  locale?: string | undefined;
  /**
   * Whether the email on this account has been verified.
   * Required scope: `email`.
   * @see https://discord.com/developers/docs/resources/user#user-object-user-structure
   * @example true
   */
  verified?: boolean | undefined;
  /**
   * The user's email.
   * Required scope: `email`.
   * @see https://discord.com/developers/docs/resources/user#user-object-user-structure
   * @example user@example.com
   */
  email?: string | undefined;
  /**
   * The flags on a user's account.
   * Required scope: `identify`.
   * @see https://discord.com/developers/docs/resources/user#user-object-user-structure
   * @example 0
   */
  flags?: number | undefined;
  /**
   * The type of Nitro subscription on a user's account.
   * Required scope: `identify`.
   * @see https://discord.com/developers/docs/resources/user#user-object-user-structure
   * @example 0
   */
  premium_type?: number | undefined;
  /**
   * The public flags on a user's account.
   * Required scope: `identify`.
   * @see https://discord.com/developers/docs/resources/user#user-object-user-structure
   * @example 0
   */
  public_flags?: number | undefined;
  /**
   * The user's avatar decoration hash.
   * Required scope: `identify`.
   * @see https://discord.com/developers/docs/reference#image-formatting
   * @example 'a_6de1eeba46e97e2ca9e2fgb1ae99c2b6'
   */
  avatar_decoration?: string | undefined;
}

export interface DiscordAccount {
  /**
   * The id of the account.
   */
  id: string;
  /**
   * The name of the account.
   */
  name: string;
}

export interface DiscordApplication {
  /**
   * The ID of the application.
   */
  id: string;
  /**
   * The name of the application.
   */
  name: string;
  /**
   * The icon hash of the application.
   */
  icon?: string | undefined;
  /**
   * The description of the application.
   */
  description: string;
  /**
   * The bot associated with this application.
   */
  bot?: DiscordUser;
}

export interface DiscordIntegration {
  /**
   * Integration id.
   */
  id: string;
  /**
   * Integration name.
   */
  name: string;
  /**
   * Integration type (twitch, youtube, or discord).
   */
  type: string;
  /**
   * Is this integration enabled.
   */
  enabled: boolean;
  /**
   * Is this integration syncing.
   */
  syncing?: boolean | undefined;
  /**
   * ID that this integration uses for "subscribers".
   */
  role_id?: string | undefined;
  /**
   * Whether emoticons should be synced for this integration (twitch only currently).
   */
  enable_emoticons?: boolean | undefined;
  /**
   * The behavior of expiring subscribers.
   */
  expire_behavior?: number | undefined;
  /**
   * The grace period (in days) before expiring subscribers.
   */
  expire_grace_period?: number | undefined;
  /**
   * User for this integration.
   */
  user?: DiscordUser | undefined;
  /**
   * Integration account information.
   */
  account: DiscordAccount;
  /**
   * When this integration was last synced.
   */
  synced_at?: Date | undefined;
  /**
   * How many subscribers this integration has.
   */
  subscriber_count?: number | undefined;
  /**
   * Has this integration been revoked.
   */
  revoked?: boolean | undefined;
  /**
   * The bot/OAuth2 application for discord integrations.
   */
  application?: DiscordApplication | undefined;
  /**
   * The scopes the application has been authorized for.
   */
  scopes?: ScopeType | undefined;
}

export interface ProfileConnection {
  /**
   * The id of the connection account.
   */
  id: string;
  /**
   * The username of the connection account.
   */
  name: string;
  /**
   * The service of the connection (twitch, youtube).
   */
  type: string;
  /**
   * Whether the connection is revoked.
   */
  revoked?: boolean | undefined;
  /**
   * An array of partial server integrations.
   */
  integrations?: DiscordIntegration[] | undefined;
  /**
   * Whether the connection is verified.
   */
  verified: boolean;
  /**
   * Whether friend sync is enabled for this connection.
   */
  friend_sync: boolean;
  /**
   * Whether activities related to this connection will be shown in presence updates.
   */
  show_activity: boolean;
  /**
   * Visibility of this connection.
   */
  two_way_link: boolean;
  /**
   * The visibility of this connection.
   */
  visibility: number;
}

export interface DiscordRoleTag {
  /**
   * The id of the bot this role belongs to.
   */
  bot_id?: string | undefined;
  /**
   * The id of the integration this role belongs to.
   */
  integration_id?: string | undefined;
  /**
   * Whether this is the guild's booster role.
   */
  premium_subscriber?: null | undefined;
  /**
   * The id of this role's subscription sku and listing.
   */
  subscription_listing_id?: string | undefined;
  /**
   * Whether this role is available for purchase.
   */
  available_for_purchase?: null | undefined;
  /**
   * Whether this role is a guild's linked role.
   */
  guild_connections?: null | undefined;
}

export interface DiscordRole {
  /**
   * The id of the role.
   */
  id: string;
  /**
   * The name of the role.
   */
  name: string;
  /**
   * The color of the role.
   */
  color: number;
  /**
   * Whether the role is hoisted.
   */
  hoist: boolean;
  /**
   * The position of the role.
   */
  icon?: string | undefined;
  /**
   * The unicode emoji for the role.
   */
  unicode_emoji?: string | undefined;
  /**
   * The id of the role's guild.
   */
  position: number;
  /**
   * The permissions of the role.
   */
  permissions: string;
  /**
   * Whether the role is managed.
   */
  managed: boolean;
  /**
   * Whether the role is mentionable.
   */
  mentionable: boolean;
  /**
   * The tags this role has.
   */
  tags?: DiscordRoleTag | undefined;
  /**
   * The permissions of the role.
   */
  flags: number;
}

export interface DiscordEmoji {
  /**
   * The emoji's id.
   */
  id: string | undefined;
  /**
   * The emoji's name.
   */
  name: string | undefined;
  /**
   * Whether this emoji is animated.
   */
  roles: string[] | undefined;
  /**
   * The user that created this emoji.
   */
  user?: DiscordUser | undefined;
  /**
   * Whether this emoji must be wrapped in colons.
   */
  require_colons?: boolean | undefined;
  /**
   * Whether this emoji is managed.
   */
  managed?: boolean | undefined;
  /**
   * Whether this emoji is animated.
   */
  animated?: boolean | undefined;
  /**
   * Whether this emoji can be used, may be false due to loss of Server Boosts.
   */
  available?: boolean | undefined;
}

export interface DiscordWelcomeScreenChannel {
  /**
   * The channel's id.
   */
  channel_id: string;
  /**
   * The description shown for the channel.
   */
  description: string;
  /**
   * The emoji id, if the emoji is custom.
   */
  emoji_id?: string | undefined;
  /**
   * The emoji name if custom, the unicode character if standard, or null if no emoji is set.
   */
  emoji_name?: string | undefined;
}

export interface DiscordWelcomeScreen {
  /**
   * The server description shown in the welcome screen.
   */
  description?: string | undefined;
  /**
   * The channels shown in the welcome screen, up to 5.
   */
  welcome_channels: DiscordWelcomeScreenChannel[];
}

export interface DiscordSticker {
  /**
   * The id of the sticker.
   */
  id: string;
  /**
   * For standard stickers, id of the pack the sticker is from.
   */
  pack_id?: string | undefined;
  /**
   * Name of the sticker.
   */
  name: string;
  /**
   * Description of the sticker.
   */
  description: string;
  /**
   * Autocomplete/suggestion tags for the sticker (max 200 characters).
   */
  tags: string;
  /**
   * The sticker asset hash.
   * @deprecated
   */
  asset?: string | undefined;
  /**
   * The type of sticker.
   */
  type: number;
  /**
   * The format type of sticker.
   */
  format_type: number;
  /**
   * Whether this guild sticker can be used, may be false due to loss of Server Boosts.
   */
  available?: boolean | undefined;
  /**
   * The id of the guild that owns this sticker.
   */
  guild_id?: string | undefined;
  /**
   * The user that uploaded the guild sticker.
   */
  user?: DiscordUser | undefined;
  /**
   * A sticker's sort order within a pack.
   */
  sort_value?: number | undefined;
}

export interface ProfileGuild {
  /**
   * The id of the guild.
   */
  id: string;
  /**
   * The name of the guild.
   */
  name: string;
  /**
   * The icon hash of the guild.
   */
  icon?: string | undefined;
  /**
   * Icon hash, returned when in the template object.
   */
  icon_hash?: string | undefined;
  /**
   * The splash hash of the guild.
   */
  splash?: string | undefined;
  /**
   * Discovery splash hash.
   */
  discovery_splash?: string | undefined;
  /**
   * True if the user is the owner of the guild.
   */
  owner?: boolean | string;
  /**
   * The id of the guild owner.
   */
  owner_id: string;
  /**
   * The permissions of the user in the guild (excludes overwrites and implicit permissiosn).
   */
  permissions?: string | undefined;
  /**
   * Voice region id for the guild.
   * @deprecated
   */
  region?: string | undefined;
  /**
   * The id of the afk channel.
   */
  afk_channel_id?: string | undefined;
  /**
   * The afk timeout in seconds.
   */
  afk_timeout?: number | undefined;
  /**
   * True if the server widget is enabled.
   */
  widget_enabled: boolean | undefined;
  /**
   * The channel id that the widget will generate an invite to, or null if set to no invite.
   */
  widget_channel_id?: string | undefined;
  /**
   * The verification level required for the guild.
   */
  verification_level?: number | undefined;
  /**
   * The default message notifications level.
   */
  default_message_notifications?: number | undefined;
  /**
   * The explicit content filter level.
   */
  explicit_content_filter?: number | undefined;
  /**
   * The roles in the guild.
   */
  roles: DiscordRole[];
  /**
   * The emojis in the guild.
   */
  emojis: DiscordEmoji[];
  /**
   * Enabled guild features.
   */
  features: string[];
  /**
   * Required MFA level for the guild.
   */
  mfa_level?: number | undefined;
  /**
   * The application id of the guild creator if it is bot-created.
   */
  application_id?: string | undefined;
  /**
   * The id of the channel where guild notices such as welcome messages and boost events are posted.
   */
  system_channel_id?: string | undefined;
  /**
   * The system channel flags.
   */
  system_channel_flags?: number | undefined;
  /**
   * The id of the channel where Community guilds can display rules and/or guidelines.
   */
  rules_channel_id?: string | undefined;
  /**
   * The maximum number of presences for the guild (null is always returned, apart from the largest of guilds).
   */
  max_presences?: number | undefined;
  /**
   * The maximum number of members for the guild.
   */
  max_members?: number | undefined;
  /**
   * The vanity url code for the guild.
   */
  vanity_url_code?: string | undefined;
  /**
   * The description of a guild.
   */
  description?: string | undefined;
  /**
   * Banner hash.
   */
  banner?: string | undefined;
  /**
   * Premium tier (Server Boost level).
   */
  premium_tier?: number | undefined;
  /**
   * The number of boosts this guild currently has.
   */
  premium_subscription_count?: number | undefined;
  /**
   * The preferred locale of a Community guild; used in server discovery and notices from Discord; defaults to "en-US".
   */
  preferred_locale?: string | undefined;
  /**
   * The id of the channel where admins and moderators of Community guilds receive notices from Discord.
   */
  public_updates_channel_id?: string | undefined;
  /**
   * The maximum amount of users in a video channel.
   */
  max_video_channel_users?: number | undefined;
  /**
   * The maximum amount of users in a stage video channel.
   */
  max_stage_video_channel_users?: number | undefined;
  /**
   * Approximate number of members in this guild, returned from the GET /guilds/<id> and /users/@me/guilds endpoints when with_counts is true.
   */
  approximate_member_count?: number | undefined;
  /**
   * Approximate number of non-offline members in this guild, returned from the GET /guilds/<id> and /users/@me/guilds endpoints when with_counts is true.
   */
  approximate_presence_count?: number | undefined;
  /**
   * The welcome screen of a Community guild, shown to new members, returned in an Invite's guild object.
   */
  welcome_screen?: DiscordWelcomeScreen | undefined;
  /**
   * The NSFW level of the guild.
   */
  nsfw_level?: number | undefined;
  /**
   * The custom guild stickers.
   */
  stickers?: DiscordSticker[] | undefined;
  /**
   * Whether the guild has the boost progress bar enabled.
   */
  premium_progress_bar_enabled?: boolean | undefined;
  /**
   * The id of the channel where admins and moderators of Community guilds receive safety alerts from Discord.
   */
  safety_alerts_channel_id?: string | undefined;
}

export interface Profile
  extends Omit<passport.Profile, 'username'>,
    DiscordUser {
  /**
   * The provider that issued the profile. Set to `discord`.
   */
  provider: string;
  /**
   * An array of connection objects.
   * Required scope: `connections`.
   * @see https://discord.com/developers/docs/resources/user#connection-object-connection-structure
   * @example [{ verified: true, name: 'Spotify', show_activity: true, type: 'spotify', id: '1234567890', visibility: 1 }]
   */
  connections?: ProfileConnection[] | undefined;
  /**
   * An array of guild objects the user is a member of.
   * Required scope: `guilds`.
   * @see https://discord.com/developers/docs/resources/user#user-object-user-structure
   * @example [{ owner: true, permissions: 2147483647, icon: 'a_6de1eeba46e97e2ca9e2fgb1ae99c2b6', id: '1234567890', name: 'Discord Developers', features: ['ANIMATED_ICON', 'BANNER', 'COMMERCE', 'COMMUNITY', 'DISCOVERABLE', 'FEATURABLE', 'INVITE_SPLASH', 'MEMBER_VERIFICATION_GATE_ENABLED', 'NEWS', 'PARTNERED', 'PREVIEW_ENABLED', 'VANITY_URL', 'VERIFIED', 'VIP_REGIONS', 'WELCOME_SCREEN_ENABLED'], permissions_new: '2147483647' }]
   */
  guilds?: ProfileGuild[] | undefined;
  /**
   * The access token used to access the Discord API on the user's behalf.
   * @example 'mfa.1234567890'
   */
  access_token: string;
  /**
   * The time the user's data was fetched.
   * @example 2023-01-01T18:00:00.000Z
   */
  fetchedAt: Date;
  /**
   * The time the user's account was created. This is derived from the user's ID.
   * @example 2023-01-01T18:00:00.000Z
   */
  createdAt: Date;
  /**
   * The raw data from Discord.
   */
  _raw: unknown;
  /**
   * The raw data from Discord, parsed into a JSON object.
   */
  _json: Record<string, unknown>;
}
