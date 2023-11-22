<div align="center">

[![Discord Auth Banner](https://i.imgur.com/mnqbOIl.png)](https://github.com/slekup/passport-discord-auth)

---

<a href="https://github.com/slekup/passport-discord-auth/blob/main/example" target="_blank">Example</a> • <a href="https://discord.gg/p5rxxQN7DT" target="_blank">Discord</a> • <a href="https://github.com/slekup/passport-discord-auth" target="_blank">GitHub</a> • <a href="https://npmjs.org/package/passport-discord-auth" target="_blank">NPM</a>

---

An updated passport authentication strategy for Discord.

[![Discord Server](https://img.shields.io/discord/1028009131073880104?color=5865F2&logo=discord&logoColor=white)](https://discord.gg/p5rxxQN7DT)
![NPM Version](https://img.shields.io/npm/v/passport-discord-auth.svg) ![NPM Downloads](https://img.shields.io/npm/dt/passport-discord-auth) ![Test Status](https://github.com/slekup/passport-discord-auth/actions/workflows/tests.yml/badge.svg) ![NPM Size](https://img.shields.io/bundlephobia/min/passport-discord-auth)

</div>

---

Passport strategy for authenticating with Discord using the OAuth 2.0 API. This library lets you authenticate using Discord in your Node.js applications. By plugging into Passport, Discord authentication can be easily and unobtrusively integrated into any application or framework that supports Connect-style middleware, including Express.

> **Note:** Feel free to open an issue if you have any questions or need help with anything.

## Installation

```bash
# Using npm
> npm install passport-discord-auth
# Using yarn or pnpm
> yarn/pnpm add passport-discord-auth
```

## Usage

### Importing

This library supports both typescript and javascript, with ES6 modules and CommonJS.

```ts
// ES6 modules
import { Strategy } from 'passport-discord-auth';
// CommonJS
const { Strategy } = require('passport-discord-auth');
```

```ts
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new Strategy(
    {
      clientID: 'CLIENT_ID',
      clientSecret: 'CLIENT_SECRET',
      callbackURL: 'http://localhost:3000/auth/discord/callback',
      scope: ['identify', 'guilds'],
    },
    (accessToken, refreshToken, profile, done) => {
      // Do something with the profile
      done(null, profile);
    }
  )
);

app.get('/auth/discord', passport.authenticate('discord'));
app.get(
  '/auth/discord/callback',
  passport.authenticate('discord', {
    failureRedirect: '/auth/discord',
  }),
  (req, res) => {
    res.redirect('/');
  }
);
```

### Scope

You can choose to import the `Scope` enum and use it to specify the scopes you want to request from the user or you can use the string literals.

**Example:**

```ts
import { Scope } from 'passport-discord-auth';

// ...

passport.use(
  new Strategy(
    {
      // ...
      scope: [Scope.Identify, Scope.Guilds, Scope.Email],
    }
    // ...
  )
);
```

**Available scopes:**

| Scope (string)                             | Scope (enum)                            | Description                                                                                                                                            |
| ------------------------------------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `activities.read`                          | `ActivitiesRead`                        | Allows your app to fetch data from a user's "Now Playing/Recently Played" list — not currently available for apps.                                     |
| `activities.write`                         | `ActivitiesWrite`                       | Allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER).                                   |
| `applications.builds.read`                 | `ApplicationBuildsRead`                 | Allows your app to read build data for a user's applications.                                                                                          |
| `applications.builds.upload`               | `ApplicationBuildsUpload`               | Allows your app to upload/update builds for a user's applications - requires Discord approval.                                                         |
| `applications.commands`                    | `ApplicationsCommands`                  | Allows your app to use commands in a guild.                                                                                                            |
| `applications.commands.update`             | `ApplicationsCommandsUpdate`            | Allows your app to update its commands using a Bearer token - client credentials grant only.                                                           |
| `applications.commands.permissions.update` | `ApplicationsCommandsPermissionsUpdate` | Allows your app to update permissions for its commands in a guild a user has permissions to.                                                           |
| `applications.entitlements`                | `ApplicationsEntitlements`              | Allows your app to read entitlements for a user's applications.                                                                                        |
| `applications.store.update`                | `ApplicationsStoreUpdate`               | Allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications.                                    |
| `bot`                                      | `Bot`                                   | For oauth2 bots, this puts the bot in the user's selected guild by default.                                                                            |
| `connections`                              | `Connections`                           | Allows /users/@me/connections to return linked third-party accounts.                                                                                   |
| `dm_channels.read`                         | `DMRead`                                | Allows your app to see information about the user's DMs and group DMs - requires Discord approval.                                                     |
| `email`                                    | `Email`                                 | Enables /users/@me to return an `email`.                                                                                                               |
| `gdm.join`                                 | `GdmJoin`                               | Allows your app to join users to a group dm.                                                                                                           |
| `guilds`                                   | `Guilds`                                | Allows /users/@me/guilds to return basic information about all of a user's guilds.                                                                     |
| `guilds.join`                              | `GuildsJoin`                            | Allows /guilds/{guild.id}/members/{user.id} to be used for joining users to a guild.                                                                   |
| `guilds.members.read`                      | `GuildMembersRead`                      | Allows /users/@me/guilds/{guild.id}/member to return a user's member information in a guild.                                                           |
| `identify`                                 | `Identify`                              | Allows /users/@me without email.                                                                                                                       |
| `messages.read`                            | `MessagesRead`                          | For local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates). |
| `relationships.read`                       | `RelationshipsRead`                     | Allows your app to know a user's friends and implicit relationships - requires Discord approval.                                                       |
| `role_connections.write`                   | `RoleConnectionsWrite`                  | Allows your app to update a user's connection and metadata for the app.                                                                                |
| `rpc`                                      | `RPC`                                   | For local rpc server access, this allows you to control a user's local Discord client - requires Discord approval.                                     |
| `rpc.activities.update`                    | `RPCActivitiesUpdate`                   | For local rpc server access, this allows you to update a user's activity - requires Discord approval.                                                  |
| `rpc.notifications.read`                   | `RPCNotificationsRead`                  | For local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval.                              |
| `rpc.voice.read`                           | `RPCVoiceRead`                          | For local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval.                  |
| `rpc.voice.write`                          | `RPCVoiceWrite`                         | For local rpc server access, this allows you to update a user's voice settings - requires Discord approval.                                            |
| `voice`                                    | `Voice`                                 | Allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval.                                        |
| `webhook.incoming`                         | `WebhookIncoming`                       | This generates a webhook that is returned in the oauth token response for authorization code grants.                                                   |
