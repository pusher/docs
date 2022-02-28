---
date: 2021-08-01
title: Pusher Channels Docs | Authorized Connections
description: Our Authorized Connections feature allows you to authorize every single connection to your Channels app so your connection limit is protected from attackers.
layout: channels.njk
eleventyNavigation:
  parent: Using channels
  key: Authorized connections
  order: 4
---

# Authorized connections

By default, anyone who knows your public app key can open a connection to your Channels app. This is by design: it allows you to use Channels without first setting up an authentication or authorization endpoint on your server. This design does not introduce a security flaw, since connections can only access data on channels you authorize them to subscribe to.

For more advanced use, this design has downsides. First, it makes it hard to see who is connected to your Channels app. Second, since Pusher limits you by the number of concurrent connections, you may be concerned about attackers consuming your connection quota.

Our "Authorized Connections" feature fixes these problems by enabling you to authorize every single connection to your Channels app. This feature makes it so that an attacker can't connect to your Channels app to exhaust your connection limit, as we do not count unauthorized connections towards your quota.

This feature uses constructs already in place that you probably already know about: user authentication and authorization. We categorize an authorized connection as one that has an authenticated user or has subscribed to at least one authorized channel (`private-` or `presence-`). If you have this feature enabled and a connection does not subscribe to at least one `private-` or `presence-` channel, it will be kicked off after a timeout.

If your clients already promptly authenticate or subscribe to a `private-` or `presence-` channel, the only step you need to take is to activate Authorized Connections on the Channels dashboard by selecting the Channels app you want to activate this on, going to "App Settings" and then checking the "Enable Authorized Connections" box. (All connections established prior to enabling the feature will **not** be kicked.)

If your application does not already promptly authenticate or subscribe to a `private-` or
`presence-` channel, you should first set up an [authentication](/docs/channels/server_api/authenticating-users) or [authorization](/docs/channels/server_api/authorizing-users) endpoint, then ensure your client code includes one of the following accordingly.

- Relying on user authentication (the preferred approach): `pusher.signin()`
- Relying on user authorization: `pusher.subscribe("private-<channel-name>")`
