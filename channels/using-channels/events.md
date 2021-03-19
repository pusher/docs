---
title: Events - Channels - Pusher Docs
layout: channels.njk
eleventyNavigation:
  parent: Using channels
  key: Events
  order: 9
---

# Events

Events are the primary method of packaging messages in the Channels system. they form the basis of all communication.

They are essentially 'named messages' which means you can set up 'handlers' in your client code to deal with the various types. As such they are used for 'client-side' routing, and should not be used as filters (channels can do this much more efficiently on the server side).

Events can be seen as a notification of something happening on your system, and they are often named in the past tense. For example: `message-created`, `todo-finished`.

## Binding to events

Most **binding** and **triggering** behaviour is attached to channels the client is subscribed to, though it is also possible to bind to all events on the Channels connection regardless of the channel.

### Binding on the channel

Events can be bound to directly on a channel which means you will only received an event if it is sent on that specific channel.

{% methodwrap %}
{% snippets ['js', 'swift', 'laravelecho'], true %}

```js
channel.bind(eventName, callback);
```

```swift
PTPusherChannel *channel = [self.pusher subscribeToChannelNamed:@"chat"];
[channel bindToEventNamed:@"new-message" handleWithBlock:^(PTPusherEvent *channelEvent) {
  // channelEvent.data is a NSDictianary of the JSON object received
}];
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
{% parameter 'PTPusherChannel', 'String', true, 'swift', false %}

Once you have created an instance of PTPusherChannel, you can set up event bindings. There is no need to wait for the PTPusher client connection to be established.

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

### Binding on the client

You can also bind to events regardless of the channel the event is broadcast to. By using the `pusher.bind()` method rather than `channel.bind()`, you can listen for an event on all the channels that you are currently subscribed to.

The following is an example of an app that binds to a `new-comment` event from all channels that we're currently subscribed to:

{% methodwrap %}
{% snippets ['js', 'swift'], true %}

```js
pusher.bind(eventName, callback);
```

```swift
_binding = [self.pusher bindToEventNamed:@"new-comment" handleWithBlock:^(PTPusherEvent *event) {
  // event.data is a NSDictianary of the JSON object received
}];
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
{% parameter 'PTPusher', 'PTPusher', true, 'swift', false %}

Once you have created an instance of the `PTPusher` client, you can set up event bindings. There is no need to wait for the connection to be established.

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
[self.pusher removeBinding:binding];
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
{% parameter 'binding', 'PTPusherEventBinding', true, 'swift', false %}

Represents the binding to be removed.

##### Example

If you no longer want to receive events with a specific name, you can remove the binding. Removing a binding is as simple as storing a reference to the binding object, then passing that as an argument to `removeBinding:` at a later point.

```swift/2-3
_binding = [self.pusher bindToEventNamed:@"new-message" target:self action:@selector(handleEvent:)];

[self.pusher removeBinding:_binding];
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

### pusher:subscription_succeeded

**Note:** this feature was introduced in **version 1.10** of the Channels JavaScript library.

Once you've subscribed to a channel you can bind to the `pusher:subscription_succeeded` event so that you know when the subscription has been registered within Channels.

```js
channel.bind("pusher:subscription_succeeded", function () {});
```

This is particularly useful for private and presence channels if you are using [client events](/docs/channels/using_channels/events#triggering-client-events) because you can only trigger an event once a successful subscription has occurred.

> For example, if the channel is a **Presence Channel** a `members` event argument is also passed to the `pusher:subscription_succeeded` event handler. The presence channel also introduces a number of other events that can be bound to. For information please see the [presence events docs](/docs/channels/using_channels/presence-channels#events) .

### pusher:subscription_error

**Note:** the `pusher:subscription_error` event was introduced without the `pusher` prefix but this is required in **version 1.10** of the Channels JavaScript library and up.

Sometimes things go wrong so we've exposed a `pusher:subscription_error` event that is triggered when an authentication request for a **private** or **presence** channels fails. This event is bound to on the channel that is to be authenticated.

The event is triggered either when the authentication endpoint returns a HTTP status code that is not 200 or if there is a problem parsing the JSON that the endpoint returned.

**Note:** if the library is unable to create a websocket connection at all, this event will **not** be emitted. In order to catch events at the connection level you must bind to `error` events on the connection as described [here](/docs/channels/using_channels/connection#binding-to-connection-events)

```js
channel.bind("pusher:subscription_error", function (err) {});
```

- `err` (Object) An error object with the following properties: _ `type` (String) _ Category of error that occured, e.g. `AuthError` </Item> _ `error` (String) _ Human readable details of error that occurred. </Item> _ `status` (Number) _ The [HTTP Status code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html) of the error response from the authentication call. </Item>

### Example

```js
var pusher = new Pusher('APP_KEY'); var channel = pusher.subscribe('private-channel'); channel.bind('pusher:subscription_error', function(err) { let { status } = err; if(status == 408 || status == 503){ // retry? } });
```

### Additional presence events

Presence comes with a number of presence specific events. For more information please see the [presence events docs](/docs/channels/using_channels/presence-channels#events) .

## Triggering client events

Not all traffic needs to go via your conventional web server when using Channels. Some actions may not need validation or persistence and can go directly via the socket to all the other clients connected to the channel.

** It is important that you apply additional care when using client events, since these originate from other users, and could be subject to tampering by a malicious user of your site. **

> Note that you cannot trigger client events from the debug console.

Client events have a number of **enforced restrictions** to ensure that the user subscribing to the channel is an authenticated user and so that client events can be clearly identified:

- **Client events must be enabled for the application**. You can do this in the ** _Settings_ ** tab for your app within the Channels dashboard _ The user must be subscribed to the channel that the event is being triggered on _ Client events can only be triggered on [private](/docs/channels/using_channels/private-channels) and [presence](/docs/channels/using_channels/presence-channels) channels because they require authentication _ Client events must be prefixed by `client-`. Events with any other prefix will be rejected by the Channels server, as will events sent to channels to which the client is not subscribed. _ You can only trigger a client event once a subscription has been successfully registered with Channels. You can ensure this is the case using the <a href="#pusher-subscription-succeeded"> <inlinecode>pusher:subscription*succeeded</inlinecode> event </a> . * Client events are not delivered to the originator of the event. For more information see [Message Routing](#message-routing). \_ Publish no more than 10 messages per second per client (connection). Any events triggered above this rate limit will be rejected by our API. See [Rate limit your events](#rate-limit-your-events).

```js
var triggered = channel.trigger(eventName, data);
```

- `eventName` (String) * The name of the event to be triggered. A client event must have a name prefixed with \*\* *client-_ \*\* or it will be rejected by the server. _ `data` (Object) _ The object to be converted to JSON and distributed with the event. _ **Returns** (Boolean) \* `true` if the event was successfully triggered, otherwise `false`

### Example

```js
var pusher = new Pusher("YOUR_APP_KEY");
var channel = pusher.subscribe("private-channel");
channel.bind("pusher:subscription_succeeded", function () {
  var triggered = channel.trigger("client-someeventname", { your: data });
});
```

```swift
[private triggerEventNamed:eventName data:data];
```

- `eventName` (String) _ The name of the event to be triggered. If the event name is not prefixed with `client-` the library will prepend it. _ `data` (Object) \* The object to be converted to JSON and distributed with the event.

### Example

```swift
PTPusherPrivateChannel *private = [self.pusher subscribeToPrivateChannelNamed:@"chat"]; [private triggerEventNamed:@"myevent" data:@{@"foo": @"bar"}];
```

```js
channel.whisper(eventName, data);
```

- `eventName` (String) * The name of the event to be triggered. The event name will automatically be prefixed with \*\* *client-_ \*\* or it will be rejected by the server. _ `data` (Object) \* The object to be converted to JSON and distributed with the event.

### Example

```js
window.Echo = new Echo({
  broadcaster: "pusher",
  key: "YOUR_APP_KEY",
  cluster: "eu",
  forceTLS: true,
});
var channel = Echo.channel("private-channel");
var callback = function (data) {};
channel.listen("pusher:subscription_succeeded", function () {
  var triggered = channel.whisper("someeventname", { your: data });
});
```

### Message routing

When you trigger a client event, the event will not be fired in the client which calls `trigger`. This is similar to the case described in the page on [excluding event recipients](/docs/channels/server_api/excluding-event-recipients) .

## Best practice when sending client events

As well as the obvious security implications of sending messages from clients, and in particular web browsers, it's also important to consider what events are sent and when. If the destination client is also a web browser there is only so much data that web browser can handle so there only the required information should be sent at the right time. With this in mind we've come up with a few best practice guidelines to follow when trigger client events.

### Rate limit your events

** Publish no more than 10 messages per second per client (connection). Any events triggered above this rate limit will be rejected by our API. **

This is not a system issue, it is a client issue. 100 clients in a channel sending messages at this rate would each also have to be processing 1,000 messages per second! Whilst some modern browsers might be able to handle this it's most probably not a good idea.

### When to trigger events

The obvious things that result in events being triggered from a client application with a user interface are user actions such as mouse movement or key presses. In this scenario we still need to consider limiting how much information we send. Quite frequently a UI event **should not** lead directly to a client event being published into Channels.

For example, if you have bound the the `mousemove` event and a user is wildly waving their pointer around the screen it's not a good idea to translate each mouse move event into a client event. Instead you should define an interval at which the mouse position should be sent and if the mouse position has moved when the next interval fires send a single client event. The time interval may need to be tuned to suit your requirements.

##### Example

`<span id="client_event_example_log"> Information to appear here </span>`

```js
var outputEl = document.getElementById("client_event_example_log");
var state = { currentX: 0, currentY: 0, lastX: undefined, lastY: undefined };
var pusher = new Pusher("YOUR_APP_KEY");
var channel = pusher.subscribe("private-mousemoves"); // this method should be bound as a 'mousemove' event listener document.body.addEventListener('mousemove', onMouseMove, false); function onMouseMove(ev){ ev = ev || window.event; state.currentX = ev.pageX || ev.clientX; state.currentY = ev.pageY || ev.clientY; } setInterval(function(){ if(state.currentX !== state.lastX || state.currentY !== state.lastY){ state.lastX = state.currentX; state.lastY = state.currentY; var text = document.createTextNode( 'Triggering event due to state change: x: ' + state.currentX + ', y: ' + state.currentY ); outputEl.replaceChild( text, outputEl.firstChild ); channel.trigger("client-mouse-moved", {x:state.currentX, y: state.currentY}); } }, 300); // send every 300 milliseconds if position has changed
```

## user_id in client events

When you bind to client events on presence channels, your bound callback will be called with a metadata object as the second argument. This metadata object contains a `user_id` key, the value of which is the `user_id` of the client that triggered the event, as taken from the [auth token](/docs/channels/server_api/authenticating-users) generated by your server for that client.

```js
const channel = pusher.subscribe("presence-chat");
channel.bind("client-msg", function (data, metadata) {
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

When you bind to client events on presence channels, your bound callback will be called with a `PusherEvent` object as the only argument. This object has a `userId` key, accessible by calling `getUserId()` on the event. The value of this is the `user_id` of the client that triggered the event, as taken from the [auth token](/docs/channels/server_api/authenticating-users) generated by your server for that client.

```java
channel.bind("client-my-event", new SubscriptionEventListener() { @Override public void onEvent(PusherEvent event) { System.out.println("Received event with userId: " + event.getUserId()); } });
```

The `getUserId()` method is useful for displaying the author of an event. You should trust the user ID returned by `getUserId()`, rather than embedding a user ID in the `data` object, which would allow any client to impersonate any user!

When you bind to client events on presence channels, your bound callback will be called with a `PusherEvent` object as the only argument. This object has a `userId` property. The value of this is the `user_id` of the client that triggered the event, as taken from the [auth token](/docs/channels/server_api/authenticating-users) generated by your server for that client.

```swift
channel.bind(eventName: "client-my-event", eventCallback: { (event: PusherEvent) in if let userId = event.userId { print("Received event with userId: \\(userId)") } })
```

The `userId` property is useful for displaying the author of an event. You should trust the `userId` from the `PusherEvent` object, rather than embedding a user ID in the `data` object, which would allow any client to impersonate any user!

## Also see

          *  [Connection status events](/docs/channels/using_channels/connection#connection-status-events)
          *  [Presence events](/docs/channels/using_channels/presence-channels#events)
