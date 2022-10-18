---
date: 2022-10-17
title: Pusher Channels Docs | Watchlist Events
description: Users can get notified of the online status of their watchlist.
layout: channels.njk
eleventyNavigation:
  parent: Using channels
  key: Watchlist Events
  order: 2
---

# Watchlist Events

## What is a watchlist?

A `watchlist` is a property associated with a user and provided during user authentication. A `watchlist` is an array of user ids. These user ids in the `watchlist` represent the circle of interest for the user (e.g. friends) for which the user will get notified about their status.

## Using Watchlist Events

In order to use Watchlist Events, the following things need to happen:

1. [Providing a Watchlist](#providing-a-watchlist)
2. [Enabling Watchlist Events](#enabling-watchlist-events)
3. [Subscribing to Watchlist Events](#subscribing-to-watchlist-events)

## Providing a Watchlist

Providing a `watchlist` for a user is optional. However, in order to receive watchlist events, the watchlist has to be provided during [User Authentication](/docs/channels/server_api/authenticating-users).

## Enabling Watchlist Events

For Watchlist Events to work, it must be enabled for the application. You can do this in the *Settings* tab for your app within the Channels dashboard.


## Subscribing to Watchlist Events

The client-side can subscribe to watchlist events by using Client SDKs. The client-side needs to call `pusher.signin()` to start the User Authentication process. Then, you can use `pusher.user.watchlist.bind()` to bind to watchlist events. See examples below:


{% methodwrap %}
{% snippets ['js', 'java'], true %}

```js
pusher.signin();

const watchlistEventHandler = (event) => {
    // event.user_ids
    // event.action
};
pusher.user.watchlist.bind('online', watchlistEventHandler);
pusher.user.watchlist.bind('offline', watchlistEventHandler);
```

{% endsnippets %}
{% endmethodwrap %}


## Watchlist Online Status

Online Status is one of the things a user can be notified of about their `watchlist`. It indicates whether a user id is online or offline for each user id in the `watchlist`.

Once the user is authenticated, the user will receive events indicating the current online status of each user in the `watchlist`. From that moment forward, the user will receive events for any further changes to the online status of users in the `watchlist`.

Getting notified about users going online and offline in the user's circle of interest (`watchlist`) is important for many use cases to drive engagement.

The events associated with Watchlist Online Status are:

- `online`
- `offline`

A user is considered `online` if that user is authenticated on at least one connection. A user can be authenticated on many connections and is still considered online. If a user is not authenticated on any connections, the user is considered offline.

Here is a sequence diagram to elaborate the flow with different scenarios.


![Watchlist Online - Status Sequence Diagram](./img/watchlist-online-status.png)
