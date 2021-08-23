---
date: 2021-08-01
title: Pusher Channels Docs | WebSocket Fallbacks
description: Some networks still cause problems when using WebSockets, so pusher-js provides fallback mechanisms to allow realtime connectivity in almost any circumstances.
layout: channels.njk
eleventyNavigation:
  parent: Using channels
  key: Websocket fallbacks
  order: 11
---

# Websocket fallbacks

Some browsers and networks still cause problems when using WebSockets, hence pusher-js provides fallback mechanisms allowing realtime connectivity in almost any circumstances.

## HTTP

Additional JavaScript is required for the HTTP support. This is loaded dynamically (and asynchronously). HTTP streaming and polling are the two forms of HTTP fallbacks supported by the latest version of [pusher-js](https://github.com/pusher/pusher-js).

## Connection strategy

We wrote an extensive [series of blog posts](https://blog.pusher.com/how-we-built-pusher-js-2-0-part-3-metrics/) about the strategy pusher-js uses to establish a connection, which covers [problems with WebSockets](https://blog.pusher.com/how-we-built-pusher20-part-1/), [pusher-js strategy implementation](https://blog.pusher.com/how-we-built-pusher-js-2-0-part-2-implementation/) and [metric collection](https://blog.pusher.com/how-we-built-pusher-js-2-0-part-3-metrics/).

## SockJS compatibility

Most browsers have a limit of 6 simultaneous connections to a single domain, but Internet Explorer 6 and 7 have a limit of just 2. This means that you can only use a single Channels connection in these browsers, because SockJS requires an HTTP connection for incoming data and another one for sending. Opening the second connection will break the first one as the client won't be able to respond to ping messages and get disconnected eventually.

All other browsers work fine with two or three connections.
