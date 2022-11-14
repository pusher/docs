---
date: 2021-08-01
title: Pusher Channels Protocol
description: This documentation describes the current JSON based protocol used by clients to communicate with Channels, mainly over a WebSocket connection.
layout: channels.njk
eleventyNavigation:
  parent: Library auth reference
  key: Pusher websockets protocol
  title: Pusher Channels Protocol
  order: 3
---

# Pusher Channels Protocol

Describes the JSON based protocol used by clients to communicate with Pusher Channels, mainly over a WebSocket connection.

Changes to this protocol are handled by incrementing an integer version number. The current protocol, version 7, is documented here.

> **Important**: Protocols 1, 2, and 3 are no longer supported. Clients are encouraged to keep up to date with changes.

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).

# WebSocket connection

Clients should make a WebSocket connection to

```bash
[scheme]://ws-[cluster_name].pusher.com:[port]/app/[key]
```

- **scheme**
  - `ws` - for a normal WebSocket connection
  - `wss` - for a secure WebSocket connection
- **cluster_name**
  - The name of the cluster that you're using
- **port**
  - Default WebSocket ports: `80` (`ws`) or `443` (`wss`)
- **key**
  - The app key for the application connecting to Pusher Channels

The following query parameters should be supplied:

- **protocol** [integer]
  - The protocol version to use. If this is not supplied the protocol version to use is inferred from the version parameter (to support old javascript clients which relied on this behaviour). Failing that protocol 1 is used (this behaviour is deprecated and will in future be replaced by a 4008 error code)
- **client** [string]
  - Identifies the client which is connecting. This string should be of the form `platform-library` - for example the iOS library identifies itself as `iOS-libPusher`.
- **version** [string]
  - The version of the library which is connecting, for example `1.9.3`.

For example

```bash
ws://ws-ap1.pusher.com:80/app/APP_KEY?client=js&version=7.0.3&protocol=5
```

## WebSocket data messages

Data is sent bidirectionally over a WebSocket as text data containing UTF8 encoded JSON.

> Note: Binary WebSocket frames are not supported.

Every JSON message contains a single **event** and has an `event` property which is known as the event name. See [events](#events) below for a description of the event types.

## Ping and pong messages

If the WebSocket connection supports ping & pong (i.e. advertises itself as draft 01 or above), Pusher Channels will send ping messages to the client in order to verify that it is active.

In protocol versions 5 and above, when using an old version of the WebSocket protocol, Pusher Channels will send `pusher:ping` event (see [events](#events)) to the client). The client should respond with a `pusher:pong` event.

#### Detecting that the connection is alive

Both Pusher Channels and clients require a mechanism for establishing that the connection is alive.

The basic design pattern is described in the [ZeroMQ Wiki](http://www.zeromq.org/deleted:topics:heartbeating) and is symmetric for the client and Pusher Channels.

Essentially any messages received from the other party are considered to mean that the connection is alive. In the absence of any messages either party may check that the other side is responding by sending a ping message, to which the other party should respond with a pong.

In recent WebSocket drafts ping & pong are supported as part of the protocol. Unfortunately this was not the case in earlier drafts, and unfortunately it is still not possible to trigger sending a ping, or binding to a pong from JavaScript using the [W3C API](http://dev.w3.org/html5/websockets/#ping-and-pong-frames). For both these reasons, Pusher Channels supports both protocol level ping-pong, and an emulated one. This means that Pusher Channels will respond to a WebSocket protocol ping message with a pong message, and also it will respond to a `pusher:ping` event with a `pusher:pong` event (both have empty data).

#### Recommendations for client libraries

If the WebSocket draft supports protocol level ping-pong, then on receipt of a ping message, the client MUST respond with a pong message.

If the client does not support protocol level pings and advertises (on connect) that it implements a protocol version >= 5 then the client MUST respond to a `pusher:ping` event with a `pusher.pong` event.

Clients SHOULD send a ping to Pusher Channels when the connection has been inactive for some time in order to check that the connection is alive. They MUST then wait some time for receipt of a pong message before closing the connection / reconnecting. Clients SHOULD send a protocol ping if supported (sending a `pusher:ping` event will also work).

Clients MAY use platform specific APIs to trigger a ping check at an appropriate time (for example when network conditions change).

The precise timeouts before sending a ping and how long to wait for a pong MAY be configurable by the user of the library, but sensible defaults SHOULD be specified. The recommended values are:

- Activity timeout before sending ping: 120s \* Time to wait for pong response before closing: 30s
  If the client supports protocol version 7, the server will send an `activity_timeout` value in the data hash of the `pusher:connection_established` event (see <a href="#connection-events">Connection Events</a> ). The client SHOULD set the timeout before sending a ping to be the minimum of the value it has chosen though configuration and the value supplied by the server.

The following example code is taken from the `pusher-js` library. This function is called whenever a message is received

```js
function resetActivityCheck() {
  if (self._activityTimer) {
    clearTimeout(self._activityTimer);
  }
  // Send ping after inactivity
  self._activityTimer = setTimeout(function() {
    self.send_event('pusher:ping', {})
    // Wait for pong response
    self._activityTimer = setTimeout(function() {
      self.socket.close();
    }, (self.options.pong_timeout || Pusher.pong_timeout))
  }, (self.options.activity_timeout || Pusher.activity_timeout))
}
```

## Connection closure

Clients may close the WebSocket connection at any time.

The Pusher Channels server may choose to close the WebSocket connection, in which case a close code and reason will be sent.

Clients SHOULD support the following 3 ranges

**4000-4099**: The connection SHOULD NOT be re-established unchanged.

**4100-4199**: The connection SHOULD be re-established after backing off. The back-off time SHOULD be at least 1 second in duration and MAY be exponential in nature on consecutive failures.

**4200-4299**: The connection SHOULD be re-established immediately.

Clients MAY handle specific close codes in particular way, but this is generally not necessary. See [error codes](#error-codes) below for a list of errors.

> **Old WebSocket drafts**: If the underlying WebSocket does not support close codes then a `pusher:error` event will be sent with an appropriate code before the WebSocket connection is closed (see [below](#system-events)).

> **Legacy protocols**: When using protocol versions {'< 6'}, a `pusher:error` event is also sent before the connection is closed (regardless of the WebSocket draft).

# Events

Every message on a Pusher Channels WebSocket connection is packaged as an 'event', whether it is user-generated, or if it is a message from the system. There is always an event name that can be used to determine what should happen to the payload.

Every event must contain an `event` property containing the event name.

In the docs below "(Pusher Channels -> Client)" indicates that this event is sent from the Pusher Channels server to to client, and similarly vice versa.

## Double encoding

All events received and sent by clients can contain a `data` field. While all `pusher:` -prefixed events contain only JSON-serializable hashes, it is possible for publishers to trigger messages containing arbitrarily-encoded data. In order to keep the protocol consistent, Pusher Channels tries to send the `data` field as a string. In case of `pusher:` events data may be JSON-serialized first (see our documentation on individual `pusher:` events). As an example of one of these 'double-encoded' events, Pusher Channels will send:

```json
{
  "event": "pusher:connection_established",
  "data": "{\"socket_id\":\"123.456\"}"
}
```

instead of:

```json
{ "event": "pusher:connection_established", "data": { "socket_id": "123.456" } }
```

## Connection events

#### `pusher:connection_established` (Pusher Channels -> Client)

When the client has connected to the Channel service a `pusher:connection_established` event is triggered. Once this event has been triggered subscriptions can be made to Pusher Channels using the WebSocket connection.

```json
{ "event": "pusher:connection_established", "data": String }
```

Where the `data` field is a JSON-encoded hash of following format:

```json
{ "socket_id": String "activity_timeout": Number }
```

- data.socket_id (String)
  - A unique identifier for the connected client
- data.activity_timeout (Number) (Protocol 7 and above)
  - The number of seconds of server inactivity after which the client should initiate a ping message

Within the client libraries the connection is normally established when the constructor is called.

```js
var pusher = new Pusher("APP_KEY");
```

![Connection and connection event](./img/connect.png)


#### `pusher:signin` (Client -> Pusher Channels)

The `pusher:signin` event is generated on the client and sent to Pusher Channels to associate the connection with the user id referred to by the authentication signature. It fails if the connection is already associated with a different user id.

A `pusher:signin` event will result in either a `pusher:signin_success` or a `pusher:error` event being sent back from Pusher Channels to the client. The `pusher:error` event will contain relevant information for why the operation failed.

```json
{ "event": String, "data": { "auth": String, "user_data": String } }
```

- data.auth (String)
  - The authentication signature. The value will be generated on the application server.
- data.user_data (String)
  - A JSON-encoded hash generated at the application server. It must contain at least an `id` field as a `String` containing the user ID. It can also have the following optional fields:
    - `user_info` (optional) in which you can provide more information about the user. This information will be shared with other members of Presence channels that this user is authorized to join. Read more on that in [Presence channels](/docs/channels/using_channels/presence-channels)
    - `watchlist` (optional) which is an array of user IDs. These user IDs represent the circle of interest for the user (e.g., friends) for which the user will get notified about their online status. Read more on that in [Watchlist events](/docs/channels/using_channels/watchlist-events). Each user can have a default maximum of 100 user IDs in their Watchlist. If you'd like to request an increase for these limits, [contact support](https://support.pusher.com/).

> Note: If the provided Watchlist exceeds the limit of 100, the first 100 user IDs will be accepted and the sign-in operation will succeed with `pusher:signin_success` event. In addition to that, an `pusher:error` event will be sent with code `4302` indicating the accepted user IDs.

#### Example JSON

```json
{
  "event": "pusher:signin",
  "data": {
    "auth": "<APP_KEY>::user::<server_generated_signature>",
    "user_data": "{ \"id\": \"<user_id>\", \"name\": \"Phil Leggetter\", \"twitter\": \"@leggetter\", \"blogUrl\":\"http://blog.pusher.com\" }"
  }
}
```

For more information see [authenticating users](/docs/channels/server_api/authenticating-users).

#### `pusher:signin_success` (Pusher Channels -> Client)

When the client sends a `pusher:signin` event that is processed succesfully, a `pusher:signin_success` event is triggered. Once this event has been triggered, the connection has access to features that require a user to be authenticated.

```json
{ "event": "pusher:signin_success", "data": { "user_data": String } }
```

- data.user_data (String)
  - A JSON-encoded hash generated at the application server and validated at the Pusher Channels server. It contains at least an `id` field as a `String` containing the user id.

## System Events

#### `pusher:error` (Pusher Channels -> Client)

When an error occurs a `pusher:error` event will be triggered. An error may be sent from Pusher Channels in response to invalid authentication, an invalid command, etc.

> **Old WebSocket drafts**: Some errors result in the WebSocket connection being closed by Pusher Channels. If the WebSocket connection does not support close codes then a `pusher:error` event will be sent with an appropriate code before the WebSocket connection is closed.

```json
{ "event": "pusher:error", "data": { "message": String, "code": Integer } }
```

- data.message (String)
  - A textual description of the error
- data.code (Integer)
  - optional - A code that identifies the error that has occurred.

See [error codes](#error-codes) below.

## Subscription Events

#### `pusher:subscribe` (Client -> Pusher Channels)

The `pusher:subscribe` event is generated on the client and sent to Pusher Channels when a subscription is made. For more information on channel names see the [channels documentation](/docs/channels/using_channels/channels).

```json
{
  "event": "pusher:subscribe",
  "data": { "channel": String, "auth": String, "channel_data": String }
}
```

Where the `data` members are as follows:

- data.channel (String)
  - The name of the channel that is being subscribed to.
- data.auth (String) [optional]
  - If the channel is a presence or private channel then the subscription needs to be authorized. The authorization string should be provided on this property if required. The value will be generated on the application server. For more information see [auth signatures](/docs/channels/library_auth_reference/auth-signatures).
- data.channel_data (String) [optional]
  - This property should be populated with additional information about the channel if the channel is a presence channel. The JSON for the `channel_data` will be generated on the application server and should be encoded as a string and assigned to this property. The format of the object is as follows:

#### Example JSON

```json
{
  "event": "pusher:subscribe",
  "data": {
    "channel": "presence-example-channel",
    "auth": "<APP_KEY>:<server_generated_signature>",
    "channel_data": "{ \"user_id\": \"<unique_user_id>\", \"user_info\": { \"name\": \"Phil Leggetter\", \"twitter\": \"@leggetter\", \"blogUrl\":\"http://blog.pusher.com\" } }"
  }
}
```

For more information see [authorizing users](/docs/channels/server_api/authorizing-users).

From the API users point of view the subscription is made the moment that the `subscribe` method is called. However, the actual moment within the client library that a `pusher:subscribe` event is triggered depends on the type of channel that is being subscribed to.

```js
var pusher = new Pusher("APP_KEY");
var channel = pusher.subscribe("public-channel");
```

#### Public channel subscription

Since no authorization must take place when subscribing to a public channel the `pusher:subscribe` event can be sent from the client to Pusher Channels as soon as the call to `subscribe` is made.

![Subscribing to a public channel](./img/subscribe.png)

#### Private and Presence channel subscription

Private, Encrypted and Presence channels require authorization so an additional call needs to be made to the application server hosting the web application in order to make sure the current user can subscribe to the given channel.

![Subscribing to a private channel](./img/subscribe-private-channel.png)

For more information on authorization of channel subscription see the [Authorizing users docs](/docs/channels/server_api/authorizing-users).

#### `pusher:unsubscribe` (Client -> Pusher Channels)

The `pusher:unsubscribe` event is generated on the client and sent to Pusher Channels when a client wishes to unsubscribe from a channel.

```json
{ "event": "pusher:unsubscribe", "data": Object }
```

Where the `data` field is a hash of following format:

```json
{ "channel": String }
```

- data.channel (String)
  - The name of the channel to be unsubscribed from.

Unsubscribing works in the same way as subscribing to a channel with the only difference being that the event name is `pusher:unsubscribe`.

```js
var pusher = new Pusher("APP_KEY");
var channel = pusher.subscribe("public-channel");
// ...
pusher.unsubscribe("my-channel");
```

![Unsubscribing](./img/unsubscribe.png)

## Channel Events (Pusher Channels -> Client)

Channel events are associated with a single channel.

```json
{ "event": String, "channel": String, "data": String, "user_id"?: String }
```

- event (String)
  - The name of the event
- channel (String)
  - The name of the channel that the event is associated with e.g. `my-channel`
- data (String)
  - The data associated with the event. It is strongly recommended that this be a JSON-serialized hash (e.g. `{'{"hello":"world", "foo": {"bar": 1000}}'}` ), although it is possible to send any type of payload, for example a simple string.
- user_id (optional, String)
  - The `user_id` key is only present if this is a client event on a [presence channel](/docs/channels/using_channels/presence-channels). The value is the `user_id` of the client that triggered the event. This value is taken from the [authorization token](/docs/channels/server_api/authorizing-users) generated by your server for that client's subscription to this channel.

> Note: The following code shows how to receive an event and not how to trigger one

```js
var pusher = new Pusher("APP_KEY");
var channel = pusher.subscribe("my-channel");
channel.bind("my-event", (data) => {
  // handle event
});
```

![Receiving events](./img/receive-events.png)

## Encrypted Channel Events (Pusher Channels -> Client)

Encrypted channel events are similar to plain Channel Events, but the `data`payload is encrypted with a shared per-channel key to ensure that even Pusher cannot see the contents of the event.

Encrypted channel events are only sent to channels where the name is prefixed `private-encrypted-`.

> **Only events published via a Pusher HTTP library are encrypted.**
> Pusher WebSocket libraries do not support encryption of client events, and so do not include the facility to send them on encrypted channels.

```json
{ "event": String, "channel": String, "data": String }
```

- event (String)
  - The name of the event (plaintext)
- channel (String)
  - The name of the channel that the event is associated with e.g. `private-encrypted-my-channel` (plaintext).
- data (String)
  - A string which encodes a JSON object with the following two keys:
- ciphertext (String)
  - The base64 encoded, encrypted payload which would usually appear in the `data`field of a regular Channel Event
- nonce (String)
  - The base64 encoded "Number used ONCE" which must be used together with the per-channel shared secret retrieved from the auth endpoint to decrypt the contents of the `ciphertext` field

## Presence Channel Events

Some events are related only to presence channels.

#### pusher_internal:subscription_succeeded (Pusher Channels -> Client)

The `pusher_internal:subscription_succeeded` event is sent when a subscription to a presence channel is successful.

```json
{
  "event": "pusher_internal:subscription_succeeded",
  "channel": "presence-example-channel",
  "data": String
}
```

Where the `data` field is a JSON-encoded hash of following format:

```json
{ "presence": { "ids": Array, "hash": Hash, "count": Integer } }
```

- channel (String)
  - The presence channel name
- data.presence.ids (Array)
  - An array of unique user identifiers who are subscribe to the channel.
- data.presence.hash (Hash)
  - A hash of user IDs to object literals containing information about that user.
- data.presence.count (Integer)
  - The number of users subscribed to the presence channel

#### Example JSON

```json
{
  "event": "pusher_internal:subscription_succeeded",
  "channel": "presence-example-channel",
  "data": "{ \"presence\": { \"ids\": [\"11814b369700141b222a3f3791cec2d9\",\"71dd6a29da2a4833336d2a964becf820\"], \"hash\": { \"11814b369700141b222a3f3791cec2d9\": { \"name\":\"Phil Leggetter\", \"twitter\": \"@leggetter\" }, \"71dd6a29da2a4833336d2a964becf820\": { \"name\":\"Max Williams\", \"twitter\": \"@maxthelion\" } }, \"count\": 2 }"
}
```

#### pusher_internal:member_added (Pusher Channels -> Client)

When a user subscribes to a presence channel the `pusher_internal:member_added` is triggered on the channel. The different event name is used to differentiate a public event from an internal one.

```json
{
  "event": "pusher_internal:member_added",
  "channel": "presence-example-channel",
  "data": String
}
```

Where the `data` field is a JSON-encoded hash of following format:

```json
{ "user_id": String, "user_info": Object }
```

- channel (String)
  - The presence channel name
- data.user_id (String)
  - The ID of a user who has just subscribed to the presence channel.
- data.user_info (Object)
  - An object containing information about that user who has just subscribed to the channel. The contents of the `user_info` property depends on what the application server replied with when the access to the presence channel was authorized.

#### Example JSON

```json
{
  "event": "pusher_internal:member_added",
  "channel": "presence-example-channel",
  "data": "{ \"user_id\": \"11814b369700141b222a3f3791cec2d9\", \"user_info\": { \"name\": \"Phil Leggetter\", \"twitter\": \"@leggetter\", \"blogUrl\": \"http://blog.pusher.com\" } }"
}
```

For more about the `user_info` object literal see `user_info` in the [authenticating and authorizing users](/docs/channels/server_api/authenticating-users) section.

#### pusher_internal:member_removed (Pusher Channels -> Client)

When a user unsubscribes from a presence channel by either actually unsubscribing or their WebSocket connection closing the `pusher_internal:member_removed` is triggered on the from Pusher Channels. The different event name is used to differentiate a public event from an internal one.

```json
{
  "event": "pusher_internal:member_removed",
  "channel": "presence-example-channel",
  "data": String
}
```

Where the `data` field is a JSON-encoded hash of following format:

```json
{ "user_id": String }
```

- channel (String)
  - The presence channel name
- data.user_id (String)
  - The ID of a user who has just unsubscribed from the presence channel.

## Triggering Channel Client Events

It is possible to trigger events from a client when the application that the client has connected to has had client events enabled, the event name must be prefixed with `client-` and the channel must be an authorized channel (private or presence). For more information on this see the [Triggering Client Events docs](/docs/channels/using_channels/events#trigger-events).

> Client events are not currently prohibited in encrypted channels by the protocol, but existing Pusher WebSocket libraries are not capable of encryption and so omit the functionality to trigger client events in encrypted channels.

```json
{ "event": String, "channel": String, "data": String / Object }
```

- event (String)
  - The name of the event which must be prefixed with `client-` to be accepted. For example, `client-event` or `client-something-updated`
- channel (String)
  - The channel for the event to be triggered on. To be accepted the channel must be either a private (`private-`) or a presence (`presence-`) channel.
- data (String/Object)
  - The data to be sent and associated with the event. It is strongly recommended that this be a hash of key/value pairs ( `{'{"hello":"world", "foo": {"bar": 1000}}'}`) although it is possible to send any type of payload, for example a simple string.

```js
var pusher = new Pusher("APP_KEY");
var channel = pusher.subscribe("private-channel");
var data = { some: "data" };
channel.trigger("client-event", data);
```

![Triggering a client event](./img/client-events.png)

## Client Library Considerations

A client library does much more than just proxy information between The Pusher Channels servers and clients. It adds functionality to make using Pusher Channels even easier. It does things such as reconnection, provides information and feedback about the connection state, performs subscription management (keeps track of what channels have been subscribed to) and routes events to the correct event listeners.

### Class Structure

We don't want to dictate the structure of code but it's definitely easier if the libraries across different technologies have a similar class structure. The following diagram shows the structure of the JavaScript client library:

![client library UML](./img/client-library-uml.png)

The following sections explain the purpose of each class shown within the diagram, what they represent and their interaction with other classes.

#### EventEmitter

A number of classes inherit from the `EventEmitter` which makes it easy for events to be bound to and ensures that binding is performed in a consistent way between all classes.

#### Pusher

The `Pusher` class is the main class which is created when connecting to Pusher Channels. It creates a connection object which then established the connection to Pusher Channels.

#### Connection

The `Connection` class represents the connection to Pusher Channels and abstracts away the underlying connection mechanism. The recommended approach for connection is to use a `WebSocket`. In the JavaScript implementation there are HTTP streaming and polling fallbacks if the browser cannot establish a WebSocket connection.

#### WebSocket

The diagram shows a `WebSocket` object which is the native object used to connect to Pusher Channels.

#### Channel

A `Channel` represents a source of data from Pusher Channels and a subscription. A `Pusher` instance can have more than one channel associated with it, and thus have many subscriptions.

#### PrivateChannel

A `PrivateChannel` inherits from `Channel` and represents an authorized subscription for channel data from Pusher Channels.

#### PresenceChannel

A `PresenceChannel` represents an authorized subscription and thus inherits from `PrivateChannel`. Additional presence-only events can be subscribed to on the `PresenceChannel` object that notify the library user of the members that are subscribed to the channel and when members are subscribe or unsubscribe from the channel.

## Client Only Events

Client Only Events are events that transition from the client library to the API user only. They are generated within the library to provide the developer with additional information about the state or actions that occurring within the library. In keeping with the event paradigm that we use in Pusher Channels it is recommended that client libraries also use events when communicating change within the library with the library user.

#### Connection States

Understanding and having access to information about the connection status to Pusher Channels is very important, especially when developing for applications to run on mobile devices where network connectivity might not be very reliable. For this reasons we've spent a lot of time thinking about how to manage this and how best to keep a developer informed about the connection state. We have implemented functionality for this within the JavaScript library and we recommend that other client libraries copy, or follow, this functionality very closely.

For more information see our [connection states documentation](/docs/channels/using_channels/connection).

#### pusher:subscription_succeeded

The `pusher:subscription_succeeded` event is triggered following the receipt of a `pusher_internal:subscription_succeeded` event. The different event name is used to differentiate a public event from an internal one.

```json
{ "event": "pusher:subscription_succeeded", "members": Object }
```

- members (Object) \* The members object contains information on the members that are subscribed to the presence channel.
  The `members` object interface is as follows:

```js
function Members() {}
// For each member call the 'iterator' function
Members.prototype.each = function (
  iterator // Function
) {};
Members.prototype.count = 0;
Members.prototype.get = function (userId) {};
```

> Note: The members object is structured in this way because in future versions the members may be accessed through **lazy loading** within the `each` function.

For more information on the members object see the `pusher:subscription_succeeded` section of the [presence events docs](/docs/channels/using_channels/events).

## Error Codes

### 4000-4099

Indicates an error resulting in the connection being closed by Pusher Channels, and that attempting to reconnect using the same parameters will not succeed.

- `4000`: Application only accepts SSL connections, reconnect using wss://
- `4001`: Application does not exist
- `4003`: Application disabled
- `4004`: Application is over connection quota
- `4005`: Path not found
- `4006`: Invalid version string format
- `4007`: Unsupported protocol version
- `4008`: No protocol version supplied
- `4009`: Connection is unauthorized

### 4100-4199

Indicates an error resulting in the connection being closed by Pusher Channels, and that the client may reconnect after 1s or more.

- `4100`: Over capacity

### 4200-4299

Indicates an error resulting in the connection being closed by Pusher Channels, and that the client may reconnect immediately.

- `4200`: Generic reconnect immediately
- `4201`: Pong reply not received: ping was sent to the client, but no reply was received - see [ping and pong messages](#ping-and-pong-messages)
- `4202`: Closed after inactivity: Client has been inactive for a long time (currently 24 hours) and client does not support ping. Please upgrade to a newer WebSocket draft or implement version 5 or above of this protocol.

### 4300-4399

Any other type of error.

- `4301`: Client event rejected due to rate limit
- `4302`: Watchlist limit exceeded. Only the first 100 user IDs are accepted.

## CHANGELOG

> **Important**: Protocols 1, 2, and 3 are no longer supported

### Version 7 (2017-11)

No changes to the Protocol - simply a name change from Pusher to Channels. No code changes required.

### Version 6 (2013-03)

When the server closes connections due to an error, a `pusher:error` event is only sent if and old WebSocket draft is in use which does not support close codes. Clients SHOULD therefore expose the close code and reason in some way to the developer.

### Version 5 (2012-01)

Pusher Channels expects the client to respond to ping messages [[docs]](#ping-and-pong-messages)

### Version 4 (2011-12)

Added a confirmation message after subscribing to public and private channels (already sent for presence channels)

### Version 3 (2011-02)

Significant change to presence events [[docs]](#presence-channel-events)

### Version 2

Renamed `connection_established` event to `pusher:connection_established`

### Version 1

Initial release
