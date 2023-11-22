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
