---
date: 2021-08-01
title: Pusher Channels Docs | How to build private channels
description: Use Pusher to build private channels which restrict access to authorized users only, providing your app with a secure medium for publishing messages.
layout: channels.njk
eleventyNavigation:
  parent: Using channels
  key: Private channels
  order: 7
---

# Private channels

Private channels should be used when access to the channel needs to be restricted in some way. In order for a user to subscribe to a private channel permission must be authorized. The authorization occurs via a HTTP Request to a configurable authorization url when the `subscribe` method is called with a `private-` channel name. In the JavaScript client library the HTTP Request is executed via AJAX (see [Authorizing Users](/docs/channels/server_api/authorizing-users)).

> - Private channels must be prefixed with `private-`. See [channel naming conventions](/docs/channels/using_channels/channels#channel-naming-conventions)
> - Private channel subscriptions must be authorized. See [Authorizing Users](/docs/channels/server_api/authorizing-users)

## Subscribe

When a subscription takes place the [user authorization process](/docs/channels/server_api/authorizing-users) will be triggered.

{% methodwrap %}
{% snippets ['js', 'swift', 'java'], true %}

```js
var privateChannel = pusher.subscribe("privateChannelName");
```

```swift
let privateChannel = pusher.subscribe("private-my-channel")
```

```java
PrivateChannel channel = pusher.subscribePrivate("private-my-channel");
```

{% endsnippets %}

{% parameter 'privateChannelName', "String", true, 'js' %}

The name of the channel to subscribe to. Since it is a private channel the name must be prefixed with `private-`

##### Returns

A `Channel` object which events can be bound to. See [binding to events](/docs/channels/using_channels/events#binding-to-events) for more information on the `Channel` object.

{% endparameter %}
{% parameter 'channelName', "String", true, 'swift', false %}

The name of the channel to subscribe to. Since it is a private channel the name must be prefixed with `private-`

##### Returns

A `PusherChannel` object which events can be bound to. See [binding to events](/docs/channels/using_channels/events#binding-to-events).

{% endparameter %}
{% endmethodwrap %}

## Unsubscribe

See [unsubscribing from channels](/docs/channels/using_channels/public-channels#unsubscribe)

## Events

See [binding to events](/docs/channels/using_channels/events#binding-to-events) for general information about how to bind to events on a channel object.

You can bind to the following `pusher:` events on a private channel:

- [pusher:subscription_succeeded](/docs/channels/using_channels/events#pusher-subscription-succeeded)
- [pusher:subscription_error](/docs/channels/using_channels/events#pusher-subscription-error)
