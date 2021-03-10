---
title: Public channels - Channels - Pusher Docs
layout: channels.njk
eleventyNavigation:
  parent: Using channels
  key: Public channels
  order: 5
---

# Public channels

Public channels should be used for publicly accessible data as they do not require any form authorisation in order to be subscribed to.

You can subscribe and unsubscribe from channels at any time. There's no need to wait for the Channels to finish connecting first.

# Subscribe

{% snippets ['js', 'swift', 'js'] %}

```js
var channel = pusher.subscribe(channelName);
```

```swift
PTPusherChannel *channel = [self.pusher subscribeToChannelNamed:channelName];
```

```js
var channel = Echo.channel(channelName);
```

{% endsnippets %}

- channelName (String) _ The name of the channel to subscribe to. </Item> _ ** _Returns_ ** \* A channel object which events can be bound to. See [ binding to events ](/docs/channels/using_channels/events) . </Item>

# Unsubscribe

{% snippets ['js', 'swift', 'js'] %}

```js
pusher.unsubscribe(channelName);
```

- channelName (String) \* The name of the channel to unsubscribe from.

```swift
[self.pusher unsubscribeFromChannel:channel];
```

- channel (PTPusherChannel) \* The name of the channel to unsubscribe from.

```js
Echo.leaveChannel(channelName);
```

- channelName (String) \* The name of the channel to unsubscribe from.  
  {% endsnippets %}

# Events

See [binding to events](/docs/channels/using_channels/events) for general information about how to bind to events on a channel object.

You can bind to the following `pusher:` events on a public channel:

      *  [ pusher:subscription\_succeeded ](/docs/channels/using_channels/events)
