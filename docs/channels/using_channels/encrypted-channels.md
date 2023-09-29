---
date: 2021-08-27
title: Pusher Channels Docs | End-to-end Encryption
description: The data published to E2EE channels is encrypted and cannot be read by any unauthorized party, including Pusher. E2EE channels also provide full authenticity.
layout: channels.njk
eleventyNavigation:
  parent: Using channels
  key: Encrypted channels
  order: 8
---

# End-to-end encrypted channels

End-to-end encrypted channels provide the same subscription restrictions as private channels. In addition, the `data` field of events published to end-to-end encrypted channels is encrypted using an implementation of the [Secretbox encryption standard defined in NaCl](https://nacl.cr.yp.to/secretbox.html) before it leaves your server. Only authorized subscribers have access to the channel specific decryption key. This means that nobody except authorized subscribers can read the payload data, **not even Pusher**. End-to-end encrypted channels also provide end-to-end authenticity; that is your messages are protected from forgery, and that they are guaranteed to come from someone who holds the encryption master key.

Clients subscribing to encrypted channels must perform the same [HTTP authentication step](/docs/channels/server_api/authenticating-users) as private and presence channels.

> Encrypted channels must be prefixed with `private-encrypted-`. See [channel naming conventions](/docs/channels/using_channels/channels#channel-naming-conventions). Currently, only private channels can be encrypted.

After enabling this feature, you can verify that it is working by visiting the debug console for the app where you enabled the feature and seeing the ciphertext. You'll know that it is working if the messages you send over the channel are unreadable in the debug console.

>**NOTE:** Encrypting messages increases their data content size.

## Authenticate

Encrypted channel subscriptions must be authenticated in the exact same way as private channels. See [Authenticating Users](/docs/channels/server_api/authenticating-users).

For encryption and decryption to work the server library **must** be instantiated with a 32 byte encryption key, encoded as base64.

{% snippets ['js', 'go', 'php', 'laravel', 'py'] %}

```js
const pusher = new Pusher({
  appId: "APP_ID",
  key: "APP_KEY",
  secret: "SECRET_KEY",
  useTLS: true,
  encryptionMasterKeyBase64: "YOUR_MASTER_KEY", // generate this with, e.g. 'openssl rand -base64 32'
});
```

```go
pusherClient := pusher.Client{
  AppID: appID,
  Key: key,
  Secret: secret,
  Secure: true,
  EncryptionMasterKeyBase64: "YOUR_MASTER_KEY", // generate this with, e.g. 'openssl rand -base64 32'
}
```

```php
pusher = new Pusher\Pusher(
  key,
  secret,
  app_id,
  array(
    'encrypted' => true,
   'encryption_master_key_base64' => "YOUR_MASTER_KEY", # generate this with, e.g. 'openssl rand -base64 32'
  )
);
```

```php
// in config/broadcasting.php
'options' => [
  'useTLS' => true,
  'encryption_master_key_base64' => 'YOUR_MASTER_KEY', # generate this with, e.g. 'openssl rand -base64 32'
],
```

```py
pusher_client = pusher.Pusher(
  app_id = 'your-app-id',
  key = 'your-key',
  secret = 'your-secret',
  ssl = True,
  encryption_master_key_base64 = 'YOUR_MASTER_KEY' # generate this with, e.g. 'openssl rand -base64 32'
)
```

{% endsnippets %}

This master encryption key is never sent to pusher and should be something difficult to guess. We suggest using something like the `openssl` command below to generate a random key and keeping it somewhere secure.

```bash
openssl rand -base64 32
```

> The base64 encoding of a 32 byte key will be 44 bytes long.<br /> The key is encoded like this to ensure that the full range of values can be used for each byte, while the key can still be stored and passed to the library as an ASCII safe string.

## Subscribe

When a subscription takes place the [user authentication process](/docs/channels/server_api/authenticating-users) will be triggered. In addition to providing an auth token, the authentication process to an encrypted channel provides an encryption/decryption key which is used by the client to decrypt events. This happens automatically and if you are using a supported library you do not need to do anything.

```js
var encryptedChannel = pusher.subscribe(encryptedChannelName);
```

{% parameter 'encryptedChannelName', 'String', true %}

The name of the channel to subscribe to. Since it is an encrypted channel the name must be prefixed with `private-encrypted-`

#### Returns

A `Channel` object which events can be bound to. See [binding to events](/docs/channels/using_channels/events#binding-to-events) for more information on the `Channel` object.

{% endparameter %}

## Unsubscribe

See [unsubscribing from channels](/docs/channels/using_channels/public-channels#unsubscribe).

## Events

See [binding to events](/docs/channels/using_channels/events#binding-to-events) for general information about how to bind to events on a channel object.

You can bind to the following `pusher:` events on an encrypted channel:

- [pusher:subscription_succeeded](/docs/channels/using_channels/events#pusher-subscription-succeeded)
- [pusher:subscription_error](/docs/channels/using_channels/events#pusher-subscription-error)

## Limitations

This feature hides the sensitive `data` field of your messages. However, by design, there are many things which this feature does not do, and it is important that you are aware of these. They include:

- **Only Private channels are supported**
  Public and presence channels cannot currently be encrypted. Public channels will never support encryption, because by definition they carry only publicly accessible data. If you have a use case for encryption of your data in presence channels, please let us know by contacting support.

- **Channel names are not encrypted.**
  Pusher needs to inspect the message's channel name to determine which clients to send it to.

- **Event names are not encrypted.**
  Pusher needs to inspect the message's event name to restrict namespaces (for example, only Pusher can publish events with the prefix `pusher:`).

- It is not possible to publish to multiple encrypted channels in a single API request (using the `channels` parameter). Publishes to encrypted channels should be made individually, using the `channel` parameter. 

- Client libraries do not support triggering events to `private-encrypted-` channels.
  We may lift this restriction in future, please get in touch if this would be valuable to you.

- It does not encrypt messages published to channels without the `private-encrypted-` prefix, even if you have set a master encryption key.

- It does not encrypt messages published by server libraries which do not have this feature implemented.
  Check that your library version [supports E2E encryption.](/docs/channels/using_channels/encrypted-channels#library-support)

The debug console in your dashboard may help demonstrate which things are encrypted, and which are not.

## Library Support

Library support is limited to those listed below. If you want to use encrypted channels and your library isn't listed, [please let us know!](mailto:support@pusher.com)

### Client

[pusher-js](https://github.com/pusher/pusher-js)

- Supported from version 4.3.0

[pusher-angular](https://github.com/pusher/pusher-angular)

- Supported as long as the pusher-js version used with it is >= 4.3.0.

[pusher-websocket-java](https://github.com/pusher/pusher-websocket-java)

- Supported from version 2.1.0

[pusher-websocket-swift](https://github.com/pusher/pusher-websocket-swift)

- Supported from version 8.0

[pusher-websocket-dotnet](https://github.com/pusher/pusher-websocket-dotnet)

- Supported from version 2.1.0

### Server

[pusher-http-node](https://github.com/pusher/pusher-http-node)

- Supported from version 4.3 onwards.

[pusher-http-go](https://github.com/pusher/pusher-http-go)

- Supported from version 1.1.0 onwards.

[pusher-http-php](https://github.com/pusher/pusher-http-php)

- Supported from version 3.2.0 onwards.

[pusher-http-python](https://github.com/pusher/pusher-http-python)

- Supported from version 2.1.1 onwards.

[pusher-http-ruby](https://github.com/pusher/pusher-http-ruby)

- Supported from version 1.4.0 onwards.

[pusher-http-java](https://github.com/pusher/pusher-http-java)

- Supported from version 1.3.0 onwards.

[pusher-http-dotnet](https://github.com/pusher/pusher-http-dotnet)

- Supported from version 4.5.0 onwards.

[Client events](/docs/channels/using_channels/events) are not currently supported.

## Key rotation

Because Pusher has no access to your encryption keys, key rotation is under your control. The client libraries make a best effort attempt to handle key rotation gracefully, but it is not guaranteed to be lossless.

Your encryption keys are held in your instance of the Pusher HTTP library which you run on your server. From here they are distributed to clients when they authenticate.

In order to rotate your encryption keys, change the master encryption key you pass to the Pusher HTTP library in your server.

Your clients will respond to any failure to decrypt an event by making one request per failed event to refresh their key. This is not guaranteed to work if you have multiple instances of your server running, because it will take some time for them to roll out. During the roll-out there may be a mix of keys in operation, for both encryption and decryption.

During this period, clients may fail to decrypt some events, even after requesting a new key (if, for example, that request is served by a server which is not yet updated). In this case, the client libraries provide a callback which you can register to be notified about events which failed.

Once the key rotation is complete, all servers and clients will converge on the new keys, and events will flow without loss again.

## Technical Description

The authentication process for encrypted channels is very similar to that of [private and presence channels](/docs/channels/server_api/authenticating-users). When clients are authenticated to access an encrypted channel, they receive a channel specific encryption/decryption key in addition to the authentication token.

![Encrypted Channels Process](./img/encrypted-channels-process.png)

- When a new instance of the `Pusher` object is created a new WebSocket object is created.
- The WebSocket object connects to the Channels WebSocket endpoint.
- Once the connection has been established a universally unique `socket_id` is returned to the Channels JavaScript library.
- A subscription is made to a `private-encrypted`.
- The `private-encrypted` prefix identifies the channel as requiring authentication so a request is made to an authentication endpoint via AJAX.
- If successful your application returns an authentication string to the Channels JavaScript library signed with your Channels secret and a channel specific `shared_secret` used to encrypt/decrypt payload data. The `shared_secret` is stored by the Channels JavaScript library.
- The `channel_name` and authentication signature is sent to Channels over the WebSocket, which completes the authentication if the authentication string has been correctly signed.
- When events are triggered using the Channels Server Library, they're encrypted by the library using the channel specific encryption key.
- The encrypted events are sent to the Pusher API.
- The encrypted events are delivered to subscribers.
- The Channels JavaScript library decrypts the event payload with the `shared_secret` from step 6.
- The Channels JavaScript library emits decrypted events as normal
