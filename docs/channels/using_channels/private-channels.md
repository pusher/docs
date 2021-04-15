---
title: Private channels
layout: channels.njk
eleventyNavigation:
  parent: Using channels
  key: Private channels
  order: 6
---

# Private channels

Private channels should be used when access to the channel needs to be restricted in some way. In order for a user to subscribe to a private channel permission must be authorized. The authentication occurs via a HTTP Request to a configurable authentication url when the `subscribe` method is called with a `private-` channel name. In the JavaScript client library the HTTP Request is executed via AJAX (see [Authenticating Users](/docs/channels/server_api/authenticating-users)).

> - Private channels must be prefixed with `private-`. See [channel naming conventions](/docs/channels/using_channels/channels#channel-naming-conventions)
> - Private channel subscriptions must be authenticated. See [Authenticating Users](/docs/channels/server_api/authenticating-users)

## Subscribe

When a subscription takes place the [user authentication process](/docs/channels/server_api/authenticating-users) will be triggered.

{% methodwrap %}
{% snippets ['js', 'swift'], true %}

```js
var privateChannel = pusher.subscribe("privateChannelName");
```

```swift
PTPusherPrivateChannel *private = [self.pusher subscribeToPrivateChannelNamed:privateChannelName];
```

{% endsnippets %}

{% parameter 'privateChannelName', "String", true, 'js' %}

The name of the channel to subscribe to. Since it is a private channel the name must be prefixed with `private-`

##### Returns

A `Channel` object which events can be bound to. See [binding to events](/docs/channels/using_channels/events#binding-to-events) for more information on the `Channel` object.

{% endparameter %}
{% parameter 'privateChannelName', "String", true, 'swift', false %}

The name of the channel to subscribe to. _This method will add the appropriate `private-` prefix to the channel name for you_.

##### Returns

A channel cast to the correct `PTPusherChannel` subclass `PTPusherPrivateChannel` which events can be bound to. See [binding to events](/docs/channels/using_channels/events#binding-to-events).

{% endparameter %}
{% endmethodwrap %}

## Unsubscribe

See [unsubscribing from channels](/docs/channels/using_channels/public-channels#unsubscribe)

## Events

See [binding to events](/docs/channels/using_channels/events#binding-to-events) for general information about how to bind to events on a channel object.

You can bind to the following `pusher:` events on a private channel:

- [pusher:subscription_succeeded](/docs/channels/using_channels/events#pusher-subscription-succeeded)
- [pusher:subscription_error](/docs/channels/using_channels/events#pusher-subscription-error)
