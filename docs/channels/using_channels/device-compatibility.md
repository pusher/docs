---
title: Device compatibility
layout: channels.njk
eleventyNavigation:
  parent: Using channels
  key: Device compatibility
  order: 12
---

# Device compatibility

Channels connections are designed to work with a very wide array of devices through a range of [client libraries](/docs/channels/channels_libraries/libraries).

There are 3 broad categories of devices that we support:

- Web browsers - desktop and mobile
- Native mobile frameworks (iOS and Android)
- Other clients (Arduino, Java, .NET etc)

A client’s ability to connect is determined by the functionality of the platform, and the quality of the network (whether there are firewalls or proxies that interfere).

## Web browser compatibility

Browsers establish a connection to the Channels network using our pusher-js library.

Our available transports are:

- WebSockets
- HTTP-based transports (streaming and polling)
- Flash sockets (pusher-js < 3.0.0)

In the vast majority of cases, modern browsers will connect using WebSockets. For legacy browsers that do not support this API, we offer fallback mechanisms that either use Flash sockets, or an HTTP based transport. These alternative transports may also be used in scenarios where network connectivity is sub-optimal.

Channels works on all major desktop and mobile browsers.

Channels can also work in any framework that uses HTML views such as:

- Titanium
- PhoneGap
- Trigger.io

## Native mobile compatibility

Channels WebSocket connections can be used by the mobile libraries available [here](/docs/channels/channels_libraries/libraries). In particular, we have native libraries for iOS and Android.

These libraries only use the WebSocket connection, and don’t make use of the HTTP based transports.

Due to the minefield that exists around cellular networks, and the proxies that big providers use, we always recommend that you use SSL connections in your mobile apps.

As mentioned above, Channels can be also used in any mobile browser or within a webview.

## Other clients

Because WebSocket connections are basically just TCP, any language or framework that supports TCP can connect to Channels.

Whether you want a server to subscribe to notifications, or you want to create an army of remotely controlled Arduinos, you can use Channels to maintain open communications with them.
