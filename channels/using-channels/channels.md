---
title: Channels - Channels - Pusher Docs
layout: channels.njk
eleventyNavigation:
  parent: Using channels
  key: Channels info
  title: Channels
  order: 4
---

# Channels

Each application can have one channel or many, and each client can choose which channels it subscribes to.

Channels provide:

- A way of **filtering data** For example, in a chat application there may be a channel for people who want to discuss 'dogs' \* A way of **controlling access** to different streams of information. For example, a project management application would want to authorize people to get updates about 'secret-projectX'  
  We strongly recommend that channels are used to filter your data and that it is **not achieved using events**. This is because all events published to a channel are sent to all subscribers, regardless of their [event binding](/docs/channels/using_channels/events).

Channels don't need to be explicitly created, and are **instantiated on client demand**. This means that creating a channel is easy. Just tell a client to subscribe to it.

# Channel Types

There are 4 types of channels at the moment:

- [ Public channels ](/docs/channels/using_channels/public-channels) can be subscribed to by anyone who knows their name _ [ Private channels ](/docs/channels/using_channels/private-channels) should have a `private-` prefix. They introduce a mechanism which lets your server control access to the data you are broadcasting _ [ Private encrypted channels ](/docs/channels/using_channels/encrypted-channels) should have a `private-encrypted-` prefix. They extend the auth mechanism of private channels, adding encryption of the data payloads so that not even Pusher can get access to it without authentication. \* [ Presence channels ](/docs/channels/using_channels/presence-channels) should have a `presence-` prefix and are an extension of private channels. They let you 'register' user information on subscription, and let other members of the channel know who's online

# Channel Naming Conventions

> Channel names may contain a maximum of 164 characters. This limit includes channel prefixes (i.e. `private-` and `presence-` are included in the character count).

Channel names should only include lower and uppercase letters, numbers and the following punctuation `_ - = @ , . ;` As an example this is a valid channel name:

```bash
foo-bar_1234@=,.;
```

# Accessing channels

If a channel has been subscribed to already it is possible to access channels by name, through the `pusher.channel` function:

```js
var channel = pusher.channel(channelName);
```

      * channelName (String)

        * The name of the channel to retrieve

