---
title: Public channels
layout: channels.njk
eleventyNavigation:
  parent: Using channels
  key: Public channels
  order: 5
---

# Public channels

Public channels should be used for publicly accessible data as they do not require any form authorisation in order to be subscribed to.

You can subscribe and unsubscribe from channels at any time. There's no need to wait for the Channels to finish connecting first.

## Subscribe

{% snippets ['js', 'swift', 'laravelecho'] %}

```js
var channel = pusher.subscribe(channelName);
```

```swift
let channel = pusher.subscribe(channelName)
```

```js
var channel = Echo.channel(channelName);
```

{% endsnippets %}

#### Parameters

{% parameter 'channelName', 'string', true %}

The name of the channel to subscribe to.

{% endparameter %}

#### Returns

A channel object which events can be bound to. See [binding to events](/docs/channels/using_channels/events).

## Unsubscribe

{% methodwrap %}

{% snippets ['js', 'swift', 'laravelecho'], true %}

```js
pusher.unsubscribe(channelName);
```

```swift
pusher.unsubscribe(channel.name)
```

```js
Echo.leaveChannel(channelName);
```

{% endsnippets %}

#### Parameters

{% parameter 'channelName', 'string', true, 'js,laravelecho' %}

The name of the channel to unsubscribe from.

{% endparameter %}

{% parameter 'channel', 'PTPusherChannel', true, 'swift', false %}

The name of the channel to unsubscribe from.

{% endparameter %}
{% endmethodwrap %}

## Events

See [binding to events](/docs/channels/using_channels/events) for general information about how to bind to events on a channel object.

You can bind to the following `pusher:` events on a public channel:

- [pusher:subscription_succeeded](/docs/channels/using_channels/events)
