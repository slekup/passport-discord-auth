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
      clientId: 'CLIENT_ID',
      clientSecret: 'CLIENT_SECRET',
      callbackUrl: 'http://localhost:3000/auth/discord/callback',
      scope: ['identify', 'guilds'],
    },
    // Do something with the profile
    (accessToken, refreshToken, profile, done) => {
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

**Example endpoint that returns the authenticated user:**

```ts
app.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});
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

- `Scope.ActivitiesRead` or `activities.read` - Allows your app to fetch data from a user's "Now Playing/Recently Played" list — not currently available for apps.
- `Scope.ActivitiesWrite` or `activities.write` - Allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER).
- `Scope.ApplicationBuildsRead` or `applications.builds.read` - Allows your app to read build data for a user's applications.
- `Scope.ApplicationBuildsUpload` or `applications.builds.upload` - Allows your app to upload/update builds for a user's applications - requires Discord approval.
- `Scope.ApplicationsCommands` or `applications.commands` - Allows your app to use commands in a guild.
- `Scope.ApplicationsCommandsUpdate` or `applications.commands.update` - Allows your app to update its commands using a Bearer token - client credentials grant only.
- `Scope.ApplicationsCommandsPermissionsUpdate` or `applications.commands.permissions.update` - Allows your app to update permissions for its commands in a guild a user has permissions to.
- `Scope.ApplicationsEntitlements` or `applications.entitlements` - Allows your app to read entitlements for a user's applications.
- `Scope.ApplicationsStoreUpdate` or `applications.store.update` - Allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications.
- `Scope.Bot` or `bot` - For oauth2 bots, this puts the bot in the user's selected guild by default.
- `Scope.Connections` or `connections` - Allows /users/@me/connections to return linked third-party accounts.
- `Scope.DmRead` or `dm_channels.read` - Allows your app to see information about the user's DMs and group DMs - requires Discord approval.
- `Scope.Email` or `email` - Enables /users/@me to return an `email`.
- `Scope.GdmJoin` or `gdm.join` - Allows your app to join users to a group dm.
- `Scope.Guilds` or `guilds` - Allows /users/@me/guilds to return basic information about all of a user's guilds.
- `Scope.GuildsJoin` or `guilds.join` - Allows /guilds/{guild.id}/members/{user.id} to be used for joining users to a guild.
- `Scope.GuildMembersRead` or `guilds.members.read` - Allows /users/@me/guilds/{guild.id}/member to return a user's member information in a guild.
- `Scope.Identify` or `identify` - Allows /users/@me without email.
- `Scope.MessagesRead` or `messages.read` - For local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates).
- `Scope.RelationshipsRead` or `relationships.read` - Allows your app to know a user's friends and implicit relationships - requires Discord approval.
- `Scope.RoleConnectionsWrite` or `role_connections.write` - Allows your app to update a user's connection and metadata for the app.
- `Scope.Rpc` or `rpc` - For local rpc server access, this allows you to control a user's local Discord client - requires Discord approval.
- `Scope.RpcActivitiesUpdate` or `rpc.activities.update` - For local rpc server access, this allows you to update a user's activity - requires Discord approval.
- `Scope.RpcNotificationsRead` or `rpc.notifications.read` - For local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval.
- `Scope.RpcVoiceRead` or `rpc.voice.read` - For local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval.
- `Scope.RpcVoiceWrite` or `rpc.voice.write` - For local rpc server access, this allows you to update a user's voice settings - requires Discord approval.
- `Scope.Voice` or `voice` - Allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval.
- `Scope.WebhookIncoming` or `webhook.incoming` - This generates a webhook that is returned in the oauth token response for authorization code grants.
