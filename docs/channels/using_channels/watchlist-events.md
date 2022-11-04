---
date: 2022-10-17
title: Pusher Channels Docs | Watchlist events
description: Users can get notified of the online status of their watchlist.
layout: channels.njk
eleventyNavigation:
  parent: Using channels
  key: Watchlist events
  order: 2
---

# Watchlist events

## What is a Watchlist?

A watchlist is a property associated with a user and provided during user authentication. A watchlist is an array of user IDs. These user IDs in the watchlist represent the circle of interest for the user (e.g., friends). Users then get notified about the online status of users they "watch".

## Using Watchlist events

In order to use Watchlist events, here are the prerequisites:

1. [Provide a Watchlist](#providing-a-watchlist)
2. [Enable Watchlist events](#enabling-watchlist-events)
3. [Subscribe to Watchlist events](#subscribing-to-watchlist-events)

## Provide a Watchlist

Providing a `watchlist` for a user is optional. However, in order to receive Watchlist events, you need to provide the Watchlist during [User Authentication](/docs/channels/server_api/authenticating-users).

## Enable Watchlist events

For Watchlist events to work, you must enable them for your application. To do that, go to the Channels dashboard, navigate to your app and **App Settings**, and turn on the **Watchlist events** toggle.

## Subscribe to Watchlist events

The client-side can subscribe to Watchlist events by using [Client SDKs](/docs/channels/channels_libraries/libraries/#client-libraries). The client-side needs to call `pusher.signin()` to start the user authentication process. Then, you can use `pusher.user.watchlist.bind()` to bind to Watchlist events. Example:


{% methodwrap %}
{% snippets ['js', 'java'], true %}

```js
pusher.signin();

const watchlistEventHandler = (event) => {
    // event.user_ids
    // event.name
};
pusher.user.watchlist.bind('online', watchlistEventHandler);
pusher.user.watchlist.bind('offline', watchlistEventHandler);
```

{% endsnippets %}
{% endmethodwrap %}


## Watchlist Online Status

Watchlist Online Status is a feature that allows a user to get notified about the online status of their `watchlist`. It indicates whether a user ID is online or offline for each user ID in the `watchlist`.

Once the user is authenticated, the user will receive events indicating the current online status of each user in the `watchlist`. From that moment forward, the user will receive events for any further changes to the online status of users in the `watchlist`.

Getting notified about users from the Watchlist going online and offline is important for many use cases to drive engagement.

The events associated with Watchlist Online Status are:

- `online`
- `offline`

A user is considered `online` if that user is authenticated on at least one connection. A user can be authenticated on many connections and is still considered `online`. If a user is not authenticated on any connections, the user is considered `offline`.

Here's a sequence diagram to showcase how the Watchlist Online Status works.

![Watchlist Online - Status Sequence Diagram](./img/watchlist-online-status.png)
