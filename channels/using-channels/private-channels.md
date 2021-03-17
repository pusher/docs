---
title: Private channels - Channels - Pusher Docs
layout: channels.njk
eleventyNavigation:
  parent: Using channels
  key: Private channels
  order: 6
---

# Private channels

Private channels should be used when access to the channel needs to be restricted in some way. In order for a user to subscribe to a private channel permission must be authorized. The authentication occurs via a HTTP Request to a configurable authentication url when the `subscribe` method is called with a `private-` channel name. In the JavaScript client library the HTTP Request is executed via AJAX (see [ Authenticating Users ](/docs/channels/server_api/authenticating-users) ).

> - Private channels must be prefixed with `private-`. See [channel naming conventions](/docs/channels/using_channels/channels#channel-naming-conventions)
> - Private channel subscriptions must be authenticated. See [Authenticating Users](/docs/channels/server_api/authenticating-users)

# Subscribe

When a subscription takes place the [ user authentication process ](/docs/channels/server_api/authenticating-users) will be triggered.

```js
var privateChannel = pusher.subscribe(privateChannelName);
```

- privateChannelName (String) _ The name of the channel to subscribe to. Since it is a private channel the name must be prefixed with `private-` _ Returns \* A `Channel` object which events can be bound to. See [ binding to events ](/docs/channels/using_channels/events#binding-to-events) for more information on the `Channel` object.

```swift
PTPusherPrivateChannel *private = [self.pusher subscribeToPrivateChannelNamed:privateChannelName];
```

- privateChannelName (String) * The name of the channel to subscribe to. *This method will add the appropriate `private-` prefix to the channel name for you.\* _ Returns _ A channel cast to the correct `PTPusherChannel` subclass `PTPusherPrivateChannel` which events can be bound to. See [ binding to events ](/docs/channels/using_channels/events#binding-to-events) .

# Unsubscribe

See [ unsubscribing from channels ](/docs/channels/using_channels/public-channels#unsubscribe)

# Events

See [ binding to events ](/docs/channels/using_channels/events#binding-to-events) for general information about how to bind to events on a channel object.

You can bind to the following `pusher:` events on a private channel:

      *  [ pusher:subscription\_succeeded ](/docs/channels/using_channels/events#pusher-subscription-succeeded)
      *  [ pusher:subscription\_error ](/docs/channels/using_channels/events#pusher-subscription-error)
