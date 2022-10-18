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

Each authenticated user has a `watchlist` which is an array of user ids. These user ids represent the circle of interest for the user (e.g. friends) for which the user will get notified about their status.


- **Watchlist Online Status**: Providing the user with the online status of their friends or circle of interest (`watchlist`) is important for many use cases to drive engagement. Pusher makes this easy through Watchlist Online Status. Pusher keeps the user informed about the online status of the users in the `watchlist` by sending Watchlist Events to the client whenever the online status of any user in the `watchlist` changes.

## Providing a Watchlist

Your application server can use Server SDKs to provide a watchlist for each authenticated user via [User Authentication](/docs/channels/server_api/authenticating-users).

## Subscribing to Watchlist Events

The client-side can subscribe to watchlist events by using Client SDKs. The client-side needs to call `pusher.signin()` to start the User Authentication process. Then, you can use `pusher.user.watchlist.bind()` to bind to watchlist events. Here are the actions you can bind to:
- `online`
- `offline`

Each received `event` has an `action` property to indicate that as well. See examples below:


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


Once the user is authenticated, the user will receive the events indicating the current online status of each user in the `watchlist`. From that moment forward, the user will receive events for any further changes to the online status of users in the `watchlist`.
