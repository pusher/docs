---
title: Pusher Channels Docs
description: Channels provides realtime communication between servers, apps and devices. Build live charts, user lists, maps, multiplayer gaming, and other UI updates.
layout: channels.njk
hideTOC: true
eleventyNavigation:
  parent: Docs
  key: Channels
  order: 2
---

# Channels overview

Pusher Channels provides realtime communication between servers, apps and devices. Channels is used for realtime charts, realtime user lists, realtime maps, multiplayer gaming, and many other kinds of UI updates.

When something happens in your system, it can update web-pages, apps and devices. When an event happens on an app, the app can notify all other apps and your system. For example, if the price of Bitcoin changes, your system could update the display of all open apps and web-pages. Or if Bob starts typing a message, his app could tell Alice's app to display "Bob is typing ...".

Pusher Channels has libraries for everything: web browsers, iOS and Android apps, PHP frameworks, cloud functions, bash scripts, IoT devices. Pusher Channels works everywhere because it uses [WebSockets](https://pusher.com/websockets) and HTTP, and provides fallbacks for devices that don't support WebSockets.

![A diagram showing devices sharing data in realtime with Pusher Channels](./img/hero_howitworks.png)

Pusher Channels has a publish/subscribe model. A mobile app interested in the current Bitcoin price can **subscribe** to the channel named `bitcoin`. When the price of Bitcoin changes, your system can **publish** the new price to the channel named `bitcoin`. All subscribers to the `bitcoin` channel will receive the update.

You can publish sensitive data via private channels. Apps must get permission to subscribe to a private channel. For example, you can restrict channel `private-user-alice` so that only Alice's apps can subscribe to it. For public data, you can use public channels.

Presence channels show who is online. Apps can use presence channels to show user lists with an "online/offline" status. When Bob's app subscribes to a presence channel, the app provides the user id `bob`. Alice's app can subscribe to the same presence channel, then show Alice that Bob is online.

Pusher Channels tells you everything that's happening, so you can debug, analyze and record your application's activity. You can see every connection, publish, and subscribe. Realtime activity is shown in your Channels dashboard and can be sent to your system via webhooks. You can query the current connections and subscriptions via the API and libraries. Metrics are shown in your dashboard and can be exported to your Datadog or Librato account.

## Getting started

To get started, we recommend the JavaScript quick start or [our many tutorials](https://pusher.com/tutorials).
