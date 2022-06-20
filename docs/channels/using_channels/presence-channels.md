---
date: 2021-08-01
title: Pusher Channels Docs | How to build presence channels
description: Presence channels allow you to provide info on which subscribers are present in a private channel. Use presence for chat rooms, collaborators, gaming and more.
layout: channels.njk
eleventyNavigation:
  parent: Using channels
  key: Presence channels
  order: 9
---

# Presence channels

Presence channels build on the security of Private channels and expose the additional feature of an **awareness of who is subscribed to that channel**. This makes it extremely easy to build chat room and "who's online" type functionality to your application. Think chat rooms, collaborators on a document, people viewing the same web page, competitors in a game, that kind of thing.

Presence channels are subscribed to from the client API in the same way as [private channels](/docs/channels/using_channels/private-channels#subscribe) but the channel name must be prefixed with `presence-`. As with private channels a HTTP Request is made to a configurable authorization URL to determine if the current user has permissions to access the channel (see [Authorizing Users](/docs/channels/server_api/authorizing-users) ). The main difference is that within the response to the HTTP authorization request the developer can provide additional information about that user, which can then be used within your application.

Information on users subscribing to, and unsubscribing from a channel can then be accessed by [binding to events on the presence channel](/docs/channels/using_channels/presence-channels#events) and the current state of users subscribed to the channel is available via the <a href="/docs/channels/using_channels/presence-channels#accessing-channel-members"> <inlinecode>channel.members</inlinecode> property </a> .

> Presence channels must be prefixed with `presence-` . See [channel naming conventions](/docs/channels/using_channels/channels#channel-naming-conventions).

> Presence channel subscriptions must be authorized. See [Authorizing Users](/docs/channels/server_api/authorizing-users).

> Presence channels have some limits associated with them: 100 members maximum, 1KB limit for user object, and maximum 128 characters for user id. If you use a numeric user id, remember that the maximum size integer that is representable in JavaScript is 2^53.

## Subscribe

When subscribing the [user authorization process](/docs/channels/server_api/authorizing-users) will be triggered.

{% methodwrap %}
{% snippets ['js', 'swift', 'laravelecho'], true %}

```js
var presenceChannel = pusher.subscribe(presenceChannelName);
```

```swift
let presence = pusher.subscribeToPresenceChannel(channelName: "presence-chat")
```

```js
var presenceChannel = Echo.join(presenceChannelName);
```

{% endsnippets %}

{% parameter 'presenceChannelName', 'String', true, 'js,laravelecho' %}

The name of the channel to subscribe to. Since it is a presence channel the name must be prefixed with `presence-`.

##### Returns

An object which events can be bound to. See [binding to events](/docs/channels/using_channels/events#binding-to-events) for more information.

{% endparameter %}
{% parameter 'presenceChannelName', 'String', true, 'swift', false %}

The name of the channel to subscribe to. Since it is a presence channel the name must be prefixed with `presence-`.

##### Returns

An object which events can be bound to. See [binding to events](/docs/channels/using_channels/events#binding-to-events) for more information.

{% endparameter %}
{% endmethodwrap %}

## Unsubscribe

See [unsubscribing from channels](/docs/channels/using_channels/public-channels#unsubscribe).

## Accessing channel members

> Documentation for accessing channel members is only presently available for the Channels JavaScript library. For other libraries please see the README file.

A Presence channel has a `members` property. This object represents the state of the users that are subscribed to the presence channel. The `members` object has the following properties and methods:

{% parameter 'members.count', 'Number' %}

```js
var count = presenceChannel.members.count;
```

A property with a value that indicates how many members are subscribed to the presence channel.

{% endparameter %}
{% parameter 'members.each(function)', 'Function' %}

```js
presenceChannel.members.each(function (member) {
  var userId = member.id;
  var userInfo = member.info;
});
```

The `members.each` function is used to iterate the members who are subscribed to the presence channel. The method takes a single function parameter which is called for each member that is subscribed to the presence channel. The function will be pass a `member` object representing each subscribed member.

{% endparameter %}
{% parameter 'members.get(userId)', 'Function' %}

```js
var user = presenceChannel.members.get("some_user_id");
```

The `get(userId)` method can be used to get a `member` with a specified `userId`.

#### Returns

A `member` object with a `member.id` and `member.info` property.

{% endparameter %}
{% parameter 'members.me', 'Object' %}

```js
var me = presenceChannel.members.me;
```

Once a user has had their subscription request authorized (see [Authorizing Users](/docs/channels/server_api/authorizing-users) ) and the subscription has succeeded (see [pusher:subscription_succeeded](/docs/channels/using_channels/presence-channels#pusher-subscription-succeeded) ) it is possible to access information about the local user on the presence channel.

The `me` property represents a `member` object and has an `id` and `info` property. For more information on the `member` object see [Presence channel events section](/docs/channels/using_channels/presence-channels#events).

#### Example

```js
var pusher = new Pusher("app_key");
var presenceChannel = pusher.subscribe("presence-example");
presenceChannel.bind("pusher:subscription_succeeded", function () {
  var me = presenceChannel.members.me;
  var userId = me.id;
  var userInfo = me.info;
});
```

{% endparameter %}

## Events

> Documentation for Presence events is only presently available for the Channels JavaScript library. For other libraries please see the README file.

See [binding to events](/docs/channels/using_channels/events#binding-to-events) for general information about how to bind to events on a channel object.

After a subscripting to a presence channel you can subscribe to presence events on that channel. Presence channels have a number of pre-defined events that can be bound to in order to notify a connected client about users joining or leaving the channel.

{% parameter 'pusher:subscription_succeeded', 'Function' %}

Once a subscription has been made to a presence channel, an event is triggered with a members iterator. You could use this for example to build a user list.

#### Example

{% snippets ['js', 'laravelecho'] %}

```js
var channel = pusher.subscribe("presence-meeting-11");
channel.bind("pusher:subscription_succeeded", (members) => {
  // For example
  update_member_count(members.count);

  members.each((member) => {
    // For example
    add_member(member.id, member.info);
  });
});
```

```js
var channel = Echo.join(presenceChannelName);
channel.here((members) => {
  // For example
  update_member_count(members.count);

  members.each((member) => {
    // For example
    add_member(member.id, member.info);
  });
});
```

{% endsnippets %}
{% endparameter %}

## The members parameter

When the `pusher:subscription_succeeded` event is triggered a `members` parameter is passed to the callback. The parameter is the <a href="#accessing-channel-members"> <inlinecode>channel.members</inlinecode> property </a> .

{% parameter 'pusher:subscription_error', 'Function' %}

For more information on the `pusher:subscription_error` event please see the [subscription error section](/docs/channels/using_channels/events#pusher-subscription-error) of the client event docs.

{% endparameter %}
{% parameter 'pusher:member_added', 'Function' %}

The `pusher:member_added` event is triggered when a user joins a channel. It's quite possible that a user can have multiple connections to the same channel (for example by having multiple browser tabs open) and in this case the events will only be triggered when the first tab is opened.

#### Example

{% snippets ['js', 'laravelecho'] %}

```js
channel.bind("pusher:member_added", (member) => {
  // For example
  add_member(member.id, member.info);
});
```

```js
channel.joining((member) => {
  // For example
  add_member(member.id, member.info);
});
```

{% endsnippets %}

When the event is triggered and `member` object is passed to the callback. The `member` object has the following properties:

- `id` (String)
  A unique identifier of the user. The value for this depends on the server authentication.
- `info` (Object)
  An object that can have any number of properties on it. The properties depend on the server authentication.

{% endparameter %}
{% parameter 'pusher:member_removed', 'Function' %}

The `pusher:member_removed` is triggered when a user leaves a channel. It's quite possible that a user can have multiple connections to the same channel (for example by having multiple browser tabs open) and in this case the events will only be triggered when the last one is closed.

#### Example

{% snippets ['js', 'laravelecho'] %}

```js
channel.bind("pusher:member_removed", (member) => {
  // For example
  remove_member(member.id, member.info);
});
```

```js
channel.leaving((member) => {
  // For example
  remove_member(member.id, member.info);
});
```

{% endsnippets %}

- id (String)
  A unique identifier of the user. The value for this depends on the server authentication.
- info (Object)
  An object that can have any number of properties on it. The properties depend on the server authentication.

{% endparameter %}

## user_id in client events

When you bind to client events on presence channels, your bound callback will be called with a metadata object which contains a `user_id` key. [See the client events docs for more detail](/docs/channels/using_channels/events#user-id-in-client-events).

## Subscription counting

Presence channels provide information about members, including the number of members. However, it is currently limited to channels with less than 100 members.

If you are interested in knowing the total number of members in large channels, and do not need to know who has joined or left, you can use the [subscription counting event](/docs/channels/using_channels/events/#subscription_count).
