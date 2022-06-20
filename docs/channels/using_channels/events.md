---
date: 2022-04-05
title: Pusher Channels Docs | What is an event?
description: Events are the primary method of packaging messages in the Channels system. They form the basis of all communication. Read about binding and triggering events.
layout: channels.njk
eleventyNavigation:
  parent: Using channels
  key: Events
  order: 10
---

# Events

Events are the primary method of packaging messages in the Channels system. They form the basis of all communication.

They are essentially 'named messages' which means you can set up 'handlers' in your client code to deal with the various types. As such they are used for 'client-side' routing, and should not be used as filters (channels can do this much more efficiently on the server side).

Events can be seen as a notification of something happening on your system, and they are often named in the past tense. For example: `message-created`, `todo-finished`.

## Binding to events

Most **binding** and **triggering** behaviour is attached to channels the client is subscribed to (see binding on the channel below). It is also possible to bind to the user object to handle messages addressed to the authenticated user. All published messages can be bound to in aggregate via the connection object itself. This aggregated binding triggers for both channel messages and user messages (for the currently authenticated user).

### Binding on the channel

Events can be bound to directly on a channel which means you will only received an event if it is sent on that specific channel.

{% methodwrap %}
{% snippets ['js', 'swift', 'laravelecho'], true %}

```js
channel.bind(eventName, callback);
```

```swift
let myChannel = pusher.subscribe("chat")
myChannel.bind(eventName: "new-message", eventCallback: { (event: PusherEvent) -> Void in
    if let data: String = event.data {
        // `data` is a string that you can parse if necessary.
    }
})
```

```js
channel.listen(eventName, callback);
```

{% endsnippets %}

{% parameter 'eventName', 'String', true, 'js' %}

The name of the event to bind to.

{% endparameter %}
{% parameter 'callback', 'Function', true, 'js' %}

A function to be called whenever the event is triggered.

##### Example

The following might be an example of a stock tracking app where several channels are opened for different companies:

```js
var pusher = new Pusher("APP_KEY");
var channel = pusher.subscribe("APPL");
channel.bind("new-price", (data) => {
  // add new price into the APPL widget
});
```

##### Binding with optional `this` context

It is possible to provide a third, optional parameter that is used as the `this` value when calling a handler.

```js
var context = { title: "Pusher" };
var handler = () => {
  console.log(`My name is ${this.title}`);
};
channel.bind("new-comment", handler, context);
```

{% endparameter %}
{% parameter 'PusherChannel', 'String', true, 'swift', false %}

Once you have created an instance of `PusherChannel`, you can set up event bindings. There is no need to wait for the `PusherSwift` client connection to be established.

When you bind to events on a single channel, you will only receive events with that name if they are sent over this channel.

{% endparameter %}
{% parameter 'eventName', 'String', true, 'laravelecho', false %}

The name of the event to bind to.

{% endparameter %}
{% parameter 'callback', 'Function', true, 'laravelecho', false %}

A function to be called whenever the event is triggered.

##### Example

The following might be an example of a stock tracking app where several channels are opened for different companies:

```js
window.Echo = new Echo({
  broadcaster: "pusher",
  key: "APP_KEY",
  cluster: "eu",
  forceTLS: true,
});
var channel = Echo.channel("APPL");
channel.listen("new-price", (data) => {
  // add new price into the APPL widget
});
```

{% endparameter %}
{% endmethodwrap %}

### Binding on the user object

It is possible to bind to events on the `pusher.user` object. That means you will receive events sent to the user that has authenticated on that connection. Check the [User authentication docs](/docs/channels/using_channels/user-authentication) for more information on authenticating the user and the [Sending events to users docs](/docs/channels/server_api/server-to-user-messages) for more information on how to send events to specific users based on user id.

{% methodwrap %}
{% snippets ['js'], true %}

```js
pusher.user.bind(eventName, callback);
```

{% endsnippets %}
{% endmethodwrap %}

### Binding on the client

You can also bind to events regardless of the channel the event is broadcast to. By using the `pusher.bind()` method rather than `channel.bind()`, you can listen for an event on all the channels that you are currently subscribed to.

The following is an example of an app that binds to a `new-comment` event from all channels that we're currently subscribed to:

{% methodwrap %}
{% snippets ['js', 'swift'], true %}

```js
pusher.bind(eventName, callback);
```

```swift
// `binding` is a unique string that can be used to unbind the event callback later
let binding = pusher.bind(eventCallback: { (event: PusherEvent) -> Void in
    if event.eventName == "new-comment" {
      // Handle the global event
    }
})
```

{% endsnippets %}

{% parameter 'eventName', 'String', true, 'js' %}

The name of the event to bind to.

##### Example

```js
var pusher = new Pusher("APP_KEY");
var channel1 = pusher.subscribe("my-channel-1");
var channel2 = pusher.subscribe("my-channel-2");
var channel3 = pusher.subscribe("my-channel-3");
var eventName = "new-comment";
var callback = (data) => {
  // add comment into page
};
// listen for 'new-comment' event on channel 1, 2 and 3
pusher.bind(eventName, callback);
```

{% endparameter %}
{% parameter 'callback', 'Function', true, 'js' %}

A function to be called whenever the event is triggered.
{% endparameter %}
{% parameter 'PusherSwift', 'PusherSwift', true, 'swift', false %}

Once you have created an instance of the `PusherSwift` client, you can set up event bindings. There is no need to wait for the connection to be established.

When you bind to events on the client, you will receive all events with that name, regardless of the channel from which they originated.

{% endparameter %}
{% endmethodwrap %}

### Binding to all events from the connection

It is possible to bind to all events at the global level by using the method `bind_global`.

```js
pusher.bind_global(callback);
```

{% parameter 'callback', 'Function', true %}

A function to be called whenever the event is triggered. Your callback will be passed the parameters:

- `eventName` (String) The name of the received event
- `data` (Object) The payload of the received event

{% endparameter %}

##### Example

```js
var pusher = new Pusher("APP_KEY");
var callback = (eventName, data) => {
  console.log(
    `bind global: The event ${eventName} was triggered with data ${JSON.stringify(
      data
    )}`
  );
};
// bind to all events on the connection
pusher.bind_global(callback);
```

You can also use `bind_global` at the channel level to bind to all events on the channel, regardless of the event name.

```js
var pusher = new Pusher("APP_KEY");
var channel = pusher.subscribe("my-channel");
var callback = (eventName, data) => {
  console.log(
    `bind global channel: The event ${eventName} was triggered with data ${JSON.stringify(
      data
    )}`
  );
};
// bind to all events on the channel
channel.bind_global(callback);
```

## Unbinding from events

It's possible to remove a binding to an event on a channel.

{% methodwrap %}
{% snippets ['js', 'swift', 'laravelecho'], true %}

```js
channel.unbind(eventName, callback);
```

```swift
channel.unbind(eventName: eventName, callbackId: binding)
```

```js
channel.stopListening(eventName);
```

{% endsnippets %}
{% parameter 'eventName', 'String', true, 'js' %}

The name of the event that the binding is to be removed from.

{% endparameter %}
{% parameter 'callback', 'Function', true, 'js' %}

A function event handler used when binding to the event. If no callback function is supplied, all handlers on `eventName` will be removed.

##### Example

```js/7-8,10-11,13-14
var pusher = new Pusher("APP_KEY");
var channel = pusher.subscribe("APPL");
var callback = (data) => {
  // Do something with the data here
};
channel.bind("new-price", callback);

// Remove just 'handler' for the 'new-price' event
channel.unbind("new-price", handler);

// Remove all handlers for the 'new-price' event
channel.unbind("new-price");

// Remove all handlers on 'channel'
channel.unbind();
```

{% endparameter %}
{% parameter 'binding', 'String', false, 'swift', false %}

Represents the binding to be removed.

##### Example

If you no longer want to receive events with a specific name, you can remove the binding. Removing a binding is as simple as storing a reference to the binding object, then passing that as an argument to `unbind(callbackId:)` at a later point.

```swift/2-3
let binding = pusher.bind(eventCallback: { (event: PusherEvent) -> Void in
    if event.eventName == "new-message" {
      // Handle the global event
    }
})

pusher.unbind(callbackId: binding)
```

{% endparameter %}
{% parameter 'eventName', 'String', true, 'laravelecho', false %}

The name of the event that the binding is to be removed from.

##### Example

```js/12-13
window.Echo = new Echo({
  broadcaster: "pusher",
  key: "APP_KEY",
  cluster: "eu",
  forceTLS: true,
});
var channel = Echo.channel("APPL");
var callback = (data) => {
  // Do something with the data here
};
channel.listen("new-price", callback);

// Remove all handlers for the 'new-price' event
channel.stopListening("new-price");
```

{% endparameter %}
{% endmethodwrap %}

## Channel events

Some events are triggered by Channels and to clearly indicate this, these are prefixed with `pusher:`.

{% parameter 'pusher:subscription_succeeded', 'Event', null %}

Once you have subscribed to a channel you can bind to the `pusher:subscription_succeeded` event so that you know when the subscription has been registered within Channels.

```js
channel.bind("pusher:subscription_succeeded", () => {});
```

This is particularly useful for private and presence channels if you are using [client events](/docs/channels/using_channels/events#triggering-client-events) because you can only trigger an event once a successful subscription has occurred.

> For example, if the channel is a **Presence Channel** a `members` event argument is also passed to the `pusher:subscription_succeeded` event handler. The presence channel also introduces a number of other events that can be bound to. For information please see the [presence events docs](/docs/channels/using_channels/presence-channels#events).

{% endparameter %}

{% parameter 'pusher:subscription_error', 'Event', null %}

Sometimes things go wrong so we have exposed a `pusher:subscription_error` event that is triggered when an authorization request for a **private** or **presence** channels fails. This event is bound to on the channel that is to be authorized.

The event is triggered either when the authorization endpoint returns a HTTP status code that is not 200 or if there is a problem parsing the JSON that the endpoint returned.

**Note:** if the library is unable to create a websocket connection at all, this event will **not** be emitted. In order to catch events at the connection level you must bind to `error` events on the connection as described [here](/docs/channels/using_channels/connection#binding-to-connection-events)

```js
channel.bind("pusher:subscription_error", (error) => {});
```

{% parameter 'error', 'Object', null %}

An error object with the following properties:

- `type` (String)
  Category of error that occured, e.g. `AuthError`
- `error` (String)
  Human readable details of error that occurred.
- `status` (Number)
  The [HTTP Status code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) of the error response from the authorization call.

{% endparameter %}

#### Example

```js
var pusher = new Pusher("APP_KEY");
var channel = pusher.subscribe("private-channel");
channel.bind("pusher:subscription_error", (error) => {
  var { status } = error;
  if (status == 408 || status == 503) {
    // Retry?
  }
});
```

{% endparameter %}

{% parameter 'pusher:cache_miss', 'Event', null %}

When a client subscribes to a [cache channel](/docs/channels/using_channels/cache-channels), you can bind to the `pusher:cache_miss` event to let the client know if there is no cached message.

```js
channel.bind("pusher:cache_miss", () => {});
```

{% endparameter %}

{% parameter 'pusher:subscription_count', 'Event', null %}

Provides the number of connections that are currently subscribed to a channel.

If you would like to use it, please enable subscription counting on your [Channels dashboard](https://dashboard.pusher.com) app settings page. Once activated, the event will be broadcast on all types of channels, including public, private and presence channels.

Pusher broadcasts the event to all clients connected to a channel whenever a new client subscribes or unsubscribes. On channels with more than 100 connected clients, the event is only sent every 30 seconds, as long as there is activity (subscribe or unsubscribe) on the channel.

```js
channel.bind("pusher:subscription_count", (data) => {
    console.log(data.subscription_count);
    console.log(channel.subscription_count);
});
```

{% endparameter %}

### Additional presence events

Presence comes with a number of presence specific events. For more information please see the [presence events docs](/docs/channels/using_channels/presence-channels#events).

## Triggering client events

Not all traffic needs to go via your conventional web server when using Channels. Some actions may not need validation or persistence and can go directly via the socket to all the other clients connected to the channel.

_It is important that you apply additional care when using client events, since these originate from other users, and could be subject to tampering by a malicious user of your site._

> Note that you cannot trigger client events from the debug console.

Client events have a number of **enforced restrictions** to ensure that the user subscribing to the channel is an authorized user and so that client events can be clearly identified:

- **Client events must be enabled for the application**. You can do this in the _Settings_ tab for your app within the Channels dashboard
- The user must be subscribed to the channel that the event is being triggered on
- Client events can only be triggered on [private](/docs/channels/using_channels/private-channels) and [presence](/docs/channels/using_channels/presence-channels) channels because they require authorization
- Client events must be prefixed by `client-`. Events with any other prefix will be rejected by the Channels server, as will events sent to channels to which the client is not subscribed.
- You can only trigger a client event once a subscription has been successfully registered with Channels. You can ensure this is the case using the `pusher:subscription_succeeded` [event](#pusher-subscription-succeeded).
- Client events are not delivered to the originator of the event. For more information see [Message Routing](#message-routing).
- Publish no more than 10 messages per second per client (connection). Any events triggered above this rate limit will be rejected by our API. See [Rate limit your events](#rate-limit-your-events).

{% methodwrap %}
{% snippets ['js', 'swift', 'laravelecho'], true %}

```js
var triggered = channel.trigger(eventName, data);
```

```swift
channel.trigger(eventName: eventName, data: data)
```

```js
channel.whisper(eventName, data);
```

{% endsnippets %}

{% parameter 'eventName', 'String', true, 'js' %}

The name of the event to be triggered. A client event must have a name prefixed with `client-` or it will be rejected by the server.

{% endparameter %}
{% parameter 'data', 'Object', false, 'js' %}

The object to be converted to JSON and distributed with the event.

{% endparameter %}

##### Returns (Boolean)

`true` if the event was successfully triggered, otherwise `false`

##### Example

```js
var pusher = new Pusher("YOUR_APP_KEY");
var channel = pusher.subscribe("private-channel");
channel.bind("pusher:subscription_succeeded", () => {
  var triggered = channel.trigger("client-someEventName", {
    your: "data",
  });
});
```

{% parameter 'eventName', 'String', true, 'swift', false %}

The name of the event to be triggered. If the event name is not prefixed with `client-` the library will prepend it.

{% endparameter %}
{% parameter 'data', 'Object', false, 'swift', false %}

The object to be converted to JSON and distributed with the event.

##### Example

```swift
let myPrivateChannel = pusher.subscribe("private-chat")
myPrivateChannel.trigger(eventName: "myevent", data: ["foo": "bar"])
```

{% endparameter %}

{% parameter 'eventName', 'String', true, 'laravelecho', false %}

The name of the event to be triggered. A client event must have a name prefixed with `client-` or it will be rejected by the server.

{% endparameter %}
{% parameter 'data', 'Object', false, 'laravelecho', false %}

The object to be converted to JSON and distributed with the event.

##### Example

```js
window.Echo = new Echo({
  broadcaster: "pusher",
  key: "YOUR_APP_KEY",
  cluster: "eu",
  forceTLS: true,
});
var channel = Echo.channel("private-channel");
var callback = (data) => {};
channel.listen("pusher:subscription_succeeded", () => {
  var triggered = channel.whisper("someeventname", {
    your: "data",
  });
});
```

{% endparameter %}
{% endmethodwrap %}

## Message routing

When you trigger a client event, the event will not be fired in the client which calls `trigger`. This is similar to the case described in the page on [excluding event recipients](/docs/channels/server_api/excluding-event-recipients).

## Best practice when sending client events

As well as the obvious security implications of sending messages from clients, and in particular web browsers, it's also important to consider what events are sent and when. If the destination client is also a web browser there is only so much data that web browser can handle so there only the required information should be sent at the right time. With this in mind we've come up with a few best practice guidelines to follow when trigger client events.

### Rate limit your events

** Publish no more than 10 messages per second per client (connection). Any events triggered above this rate limit will be rejected by our API. **

This is not a system issue, it is a client issue. 100 clients in a channel sending messages at this rate would each also have to be processing 1,000 messages per second! Whilst some modern browsers might be able to handle this it's most probably not a good idea.

### When to trigger events

The obvious things that result in events being triggered from a client application with a user interface are user actions such as mouse movement or key presses. In this scenario we still need to consider limiting how much information we send. Quite frequently a UI event **should not** lead directly to a client event being published into Channels.

For example, if you have bound the the `mousemove` event and a user is wildly waving their pointer around the screen it's not a good idea to translate each mouse move event into a client event. Instead you should define an interval at which the mouse position should be sent and if the mouse position has moved when the next interval fires send a single client event. The time interval may need to be tuned to suit your requirements.

##### Example

```js
var outputEl = document.getElementById("client_event_example_log");
var state = { currentX: 0, currentY: 0, lastX: undefined, lastY: undefined };
var pusher = new Pusher("YOUR_APP_KEY");
var channel = pusher.subscribe("private-mousemoves");
// this method should be bound as a 'mousemove' event listener document.body.
addEventListener("mousemove", onMouseMove, false);
var onMouseMove = (ev) => {
  ev = ev || window.event;
  state.currentX = ev.pageX || ev.clientX;
  state.currentY = ev.pageY || ev.clientY;
};
setInterval(() => {
  if (state.currentX !== state.lastX || state.currentY !== state.lastY) {
    state.lastX = state.currentX;
    state.lastY = state.currentY;
    var text = document.createTextNode(
      "Triggering event due to state change: x: " +
        state.currentX +
        ", y: " +
        state.currentY
    );
    outputEl.replaceChild(text, outputEl.firstChild);
    channel.trigger("client-mouse-moved", {
      x: state.currentX,
      y: state.currentY,
    });
  }
}, 300);
// send every 300 milliseconds if position has changed
```

## `user_id` in client events

{% methodwrap %}
{% snippets ['js', 'java', 'swift'], true %}
{% endsnippets %}

{% conditionalContent 'js' %}

When you bind to client events on presence channels, your bound callback will be called with a metadata object as the second argument. This metadata object contains a `user_id` key, the value of which is the `user_id` of the client that triggered the event, as taken from the [authorization token](/docs/channels/server_api/authorizing-users) generated by your server for that client.

```js
const channel = pusher.subscribe("presence-chat");
channel.bind("client-msg", (data, metadata) => {
  console.log(
    "I received",
    data,
    "from user",
    metadata.user_id,
    "with user info",
    channel.members.get(metadata.user_id).info
  );
});
```

The `user_id` field is useful for displaying the author of an event. You should trust the `user_id` from the `metadata` object, rather than embedding a user ID in the `data` object, which would allow any client to impersonate any user!

{% endconditionalContent %}
{% conditionalContent 'java', false %}

When you bind to client events on presence channels, your bound callback will be called with a `PusherEvent` object as the only argument. This object has a `userId` key, accessible by calling `getUserId()` on the event. The value of this is the `user_id` of the client that triggered the event, as taken from the [authorization token](/docs/channels/server_api/authorizing-users) generated by your server for that client.

```java
channel.bind("client-my-event", new SubscriptionEventListener() {
  @Override
  public void onEvent(PusherEvent event) {
    System.out.println("Received event with userId: " + event.getUserId());
  }
});
```

The `getUserId()` method is useful for displaying the author of an event. You should trust the user ID returned by `getUserId()`, rather than embedding a user ID in the `data` object, which would allow any client to impersonate any user!

{% endconditionalContent %}
{% conditionalContent 'swift', false %}

When you bind to client events on presence channels, your bound callback will be called with a `PusherEvent` object as the only argument. This object has a `userId` property. The value of this is the `user_id` of the client that triggered the event, as taken from the [authorization token](/docs/channels/server_api/authorizing-users) generated by your server for that client.

```swift
channel.bind(eventName: "client-my-event", eventCallback: {(event: PusherEvent) in
if let userId = event.userId {
  print("Received event with userId: \(userId)")
  }
})
```

The `userId` property is useful for displaying the author of an event. You should trust the `userId` from the `PusherEvent` object, rather than embedding a user ID in the `data` object, which would allow any client to impersonate any user!

{% endconditionalContent %}

{% endmethodwrap %}

## See also

- [Connection status events](/docs/channels/using_channels/connection#connection-status-events)
- [Presence events](/docs/channels/using_channels/presence-channels#events)
