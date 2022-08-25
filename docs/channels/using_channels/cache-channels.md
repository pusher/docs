---
date: 2022-04-05
title: Pusher Channels Docs | How to set up cache channels
description: A cache channel remembers the last triggered event, and sends this as the first event to new subscribers.
layout: channels.njk
eleventyNavigation:
  parent: Using channels
  key: Cache channels
  order: 10
---

# Cache channels

> Cache channels is in beta. [Learn more](https://pusher.com/docs/lab)

A cache channel remembers the last triggered event, and sends this as the first event to new subscribers.

When an event is triggered on a cache channel, Pusher Channels caches this event. Then when a client subscribes to a cache channel, if a cached value exists, it's sent to the client as the first event on that channel. This behavior helps developers provide the initial state without adding additional logic to fetch it from elsewhere.

> Cache channels must be prefixed with `cache-` . Refer to [Channel naming conventions](/docs/channels/using_channels/channels#channel-naming-conventions).

> Private cache channel subscriptions must be authorized. Refer to [Authorizing users](/docs/channels/server_api/authorizing-users).

## Subscribe

{% methodwrap %}
{% snippets ['js', 'swift', 'laravelecho'], true %}

```js
var cacheChannel = pusher.subscribe(cacheChannelName);
```

```swift
let cacheChannel = pusher.subscribe(channelName: "cache-location")
```

```js
var cacheChannel = Echo.join(cacheChannelName);
```

{% endsnippets %}

{% parameter 'cacheChannelName', 'String', true, 'js,laravelecho' %}

The name of the channel to subscribe to. Because it's a cache channel, the channel name must be prefixed with `cache-`.

Other types of channels can also use the cache feature. For private channels, prefix the channel name with `private-cache-`. For encrypted channels, prefix it with `private-encrypted-cache-`. For presence channels, use the `presence-cache-` prefix.

| Channel type | Cache channel version |
| ----------- | ----------- |
| [Public](/docs/channels/using_channels/public-channels) | cache-channel-name |
| [Private](/docs/channels/using_channels/private-channels) | private-cache-channel-name |
| [Encrypted](/docs/channels/using_channels/encrypted-channels) | private-encrypted-cache-channel-name |
| [Presence](/docs/channels/using_channels/presence-channels) | presence-cache-channel-name |


##### Returns

An object to which you can bind events. Refer to [Binding to events](/docs/channels/using_channels/events#binding-to-events) for more information.

{% endparameter %}
{% endmethodwrap %}

## Unsubscribe

Refer to [unsubscribing from channels](/docs/channels/using_channels/public-channels#unsubscribe).

## Events

Refer to [Binding to events](/docs/channels/using_channels/events#binding-to-events) for general information about how to bind to events on a channel object.

## Handling cache misses

Cache channel is a feature which can be added to public, private, and presence channels. All its behaviors are similar to regular channels. In addition to the fact that a cache channel remembers the last triggered event, it provides two ways for developers to deal with cache misses.

### cache_miss webhook event

When a client subscribes to a cache channel and there is no value available, Pusher Channels will notify your server by sending a `cache_miss` event to your webhook destination. When your server receives a `cache_miss` webhook, you can decide to trigger a new event on this channel. It will re-populate the cache.

Refer to [the Cache_miss webhooks](/docs/channels/server_api/webhooks/#cache_miss) for more information on how you can configure this on your dashboard.

### pusher:cache_miss client event

In addition to the webhook event, the client can also use the event binding feature to subscribe to `pusher:cache_miss` event. This can be used by the client to request your server to get the initial data.

{% parameter 'pusher:cache_miss', 'Event', null %}

```js
channel.bind("pusher:cache_miss", () => {
    fetch('/trigger/car-location-123');
});
```

{% endparameter %}

Refer to [Events](/docs/channels/using_channels/events) for more information on how you can use events.

> Which approach is better? The answer depends on your implementation. In most scenarios, relying on the webhook event is more efficient. Because Pusher handles de-duplication when multiple clients are subscribed to an empty channel. So your server does not have to deal with requests per client when they subscribe to a channel with empty cache.

## FAQ

### How to determine cache age?

We do not add any attribute like `age` to your messages. You can add a timestamp attribute to your message if it is important for you to track that.

### How long does the message stay in cache?

The time to live (TTL) of an event stored in cache is up to 30 minutes. If you do not publish any event, the cached event expires after TTL has elapsed. > NOTE: TTL is up to 30 minutes. This means that in some cases, cache messages might expire sooner.

### Where is data stored?

Cached messages are temporarily stored in memory in the same cluster you selected for your application. Pusher does not create a backup or a snapshot of this data. And we do not distribute it to other regions. Refer to [Cluster configuration](/docs/channels/miscellaneous/clusters) to find out how you can comply with data protection regulations when using Pusher Channels.

### Are client events also supported?

No, [client events](/docs/channels/using_channels/events/#triggering-client-events) are not currently supported. You can use client events in cache channels like regular channels, but we do not cache client events. If you find this feature useful for client events, we'd love to hear about it. Contect our [support team](https://support.pusher.com/hc/en-us/requests/new).
