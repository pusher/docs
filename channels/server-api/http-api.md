---
title: Http api - Channels - Pusher Docs
layout: channels.njk
eleventyNavigation:
  parent: Server api
  key: Http api
  order: 2
  title: HTTP API interaction
---

# Interacting with our HTTP API

Channels provides a HTTP API as the main point of interaction with your servers. [Publishing events](#publishing-events) is the most important aspect of this, but there are other methods for querying the state of your Channels applications. These are documented in our [API reference](/docs/channels/library_auth_reference/rest-api) .

All interactions with the Channels HTTP API must contain an authentication signature that is generated with your secret key. Using one of our libraries means you generally don't need to worry about this, but more information can be found [here](/docs/channels/library_auth_reference/rest-api#authentication) .

Many of our libraries allow requests to be made asynchronously. Please consult the individual documentation for more information.

# Publishing events

Because it is such a fundamental part of the service, most of our libraries have special methods for triggering events. Behind the scenes this is just a simple call to our HTTP API. We recommend using serialised JSON to keep message sizes down.

Please bear in mind the following when publishing events:

- Event names (and the channels they are sent to) can only contain characters which are alphanumeric, '-' or '\_' (see [naming channels](/docs/channels/using_channels/channels#channel-naming-conventions) ) _ The data content (POST body) of events must be smaller than 10kB. _ Exceeding your quota will return a 413 HTTP error code _ An event can be published to between 1 and 100 channel names in a single request _ Often it is useful to exclude the sender from the recipients of the event ( [readmore](/docs/channels/server_api/excluding-event-recipients) )  
  For full details about the HTTP API including resource endpoints, allowed attributes, server responses, and error codes please consult our [ HTTP API reference. ](/docs/channels/library_auth_reference/rest-api)

{% snippets ['rb', 'php', 'php', 'c', 'js', 'py', 'go'] %}

```rb
{publishEvents.ruby}
```

The parameters passed to the `trigger` function are:

- **channels** - either a single channel name as a `string` or an `array` of channel names that the event is to be published on _ **event** - the name of the event to be triggered _ **data** - the data to be sent with the event. This will be converted to JSON by the library. * **socket_id** - \*\* *Optional\* \*\* . The socket ID of a client to be excluded from receiving the event. See [ excluding recipients. ](/docs/channels/server_api/excluding-event-recipients)  
  For more information see the [ pusher-http-ruby ](https://github.com/pusher/pusher-http-ruby) README.

```php
{publishEvents.php}
```

The parameters passed to the `trigger` function are:

- **$channels** - either a single channel name as a `string` or an `array` of channel names that the event is to be published on _ **$event** - the name of the event to be triggered _ **$data** - the data to be sent with the event. This will be converted to JSON by the library. * **$socket_id** - \*\* *Optional\* \*\* . The socket ID of a client to be excluded from receiving the event. See [excluding recipients](/docs/channels/server_api/excluding-event-recipients) .  
  `$response` is `true` if the event was successfully triggered, otherwise `false`.

If debug is enabled (see the library README for more information) the `$response` is an associative array with the following elements:

- **status** - the HTTP status code from the response \* **body** - the body of the response. If an error occurs the body can provide additional information.  
  For more information see the [ pusher-http-php ](https://github.com/pusher/pusher-http-php) README.

```php
{publishEvents.laravel}
```

Refer to the [official Laravel docs](https://laravel.com/docs/master/broadcasting) for more information.

```c
{publishEvents.net}
```

The parameters passed to the `TriggerAsync` method are:

- **channels** - A array of channel names to trigger the event on. There is an overload available which takes a single channel name string. _ **event** - the name of the event to be triggered _ **data** - the data to be sent with the event. This will be converted to JSON by the library. \* **options** - Optional via an overloaded method. Additional options when triggering an event.  
  You can exclude a client from receiving an event by passing in an object that implements the `ITriggerOptions` interface, or a `TriggerObjects` instance, with a `SocketId` value set. For more information see the [ excluding recipients documentation. ](/docs/channels/server_api/excluding-event-recipients)

The `result` is an object which implements the `ITriggerResult` interface. The interface provides the following properties which expose information about the result of the call.:

- **StatusCode** - An `HttpStatusCode` indicating the status request. _ **Body** - the `string` body of the response. If an error occurs the body can provide additional information. _ **Response** - The original response from the REST client \* **OriginalContent** - If the `HttpStatusCode` was not `200 OK`, then the content is copied into this property  
  For more information see the [ pusher-http-dotnet ](https://github.com/pusher/pusher-http-dotnet) README.

```js
{
  publishEvents.node;
}
```

The parameters passed to the `trigger` function are:

- **channels** - a string identifying a single channel or an array of strings for multiple channels. _ **event** - the name of the event to be triggered. _ **data** - the data to be sent with the event. This will be converted to JSON by the library.. * **socket_id** - \*\* *Optional* \*\* . The socket ID of a client to be excluded from receiving the event. See [ excluding recipients. ](/docs/channels/server_api/excluding-event-recipients) * **callback** - ** _Optional_ ** . A callback function which is invoked when the call completes. The function have the signature `function( error, request, response )`.  
  For more information see the [ pusher-http-node ](https://github.com/pusher/pusher-http-node) README.

```py
{publishEvents.python}
```

For more information see the [Channels python server library](https://github.com/pusher/pusher-http-python) README.

```go
{publishEvents.go}
```

For more information see the [Go HTTP library README](https://github.com/pusher/pusher-http-go) .

{% endsnippets %}

## Examples: Publish an event on a single channel

In the examples below an event called `my-event` is being triggered on a channel named `my-channel`. The message payload ultimately ends up as a simple JSON message `${'{"message":"hello world"}'}`.

{% snippets ['rb', 'php', 'php', 'c', 'js', 'py', 'go'] %}

```rb
{singleChannelEvents.ruby}
```

```php
{singleChannelEvents.php}
```

```php
{singleChannelEvents.laravel}
```

```c
{singleChannelEvents.net}
```

```js
{
  singleChannelEvents.node;
}
```

```py
{singleChannelEvents.python}
```

```go
{singleChannelEvents.go}
```

{% endsnippets %}

## Example: Publish an event on multiple channels

In the examples below an event called `my-event` is being triggered multiple channels; `my-channel-1`, `my-channel-2` and `my-channel-3`. The message payload is converted to a simple JSON message `${'{"message":"hello world"}'}`.

{% snippets ['rb', 'php', 'php', 'c', 'js', 'py', 'go'] %}

```rb
{multiChannelEvents.ruby}
```

```php
{multiChannelEvents.php}
```

```php
{multiChannelEvents.laravel}
```

```c
{multiChannelEvents.net}
```

```js
{
  multiChannelEvents.node;
}
```

```py
{multiChannelEvents.python}
```

```go
{multiChannelEvents.go}
```

{% endsnippets %}

## Example: Fetch subscriber and user counts at the time of publish

**[[EXPERIMENTAL](/docs/lab#experimental-program)]**

For the channels that were published to, you can request for the number of subscribers or users to be returned in the response body.

This is currently only supported in the PHP, Node.js and Go SDKs.

{% snippets ['php', 'js', 'go'] %}

```php
{publishEventsWithInfo.php}
```

```js
{
  publishEventsWithInfo.node;
}
```

```go
{publishEventsWithInfo.go}
```

{% endsnippets %}

> **Note:** when the `info` parameter is specified, the publish will count as two "messages" for the purposes of billing.

> **Note:** the counts are computed independently of broadcasting the message to connections. This means the counts do not necessarily match the number of subscribers/users that were published to.

# Publishing batches of events

You might also find yourself wanting to publish many non-identical events in a short space of time. To reduce the number of HTTP requests you need to make in this case, the Channels HTTP API [supports batches](/docs/channels/library_auth_reference/rest-api#post-batch-events-trigger-multiple-events-) of up to ten events in one request. Our server libraries provide a ** _trigger batch_ ** method that wraps this API call. In the examples below an event called `my-event-1` is being triggered on channel `my-channel-1`, and an event called `my-event-2` is being triggered on channel `my-channel-2`.

{% snippets ['rb', 'php', 'c', 'js', 'py', 'go'] %}

```rb
{batchEvents.ruby}
```

```php
{batchEvents.php}
```

```c
{batchEvents.net}
```

For more information see the [ pusher-http-dotnet ](https://github.com/pusher/pusher-http-dotnet) README.

```js
{
  batchEvents.node;
}
```

```py
{batchEvents.python}
```

```go
{batchEvents.go}
```

{% endsnippets %}

## Example: Fetch subscriber and user counts at the time of batch publish

**[[EXPERIMENTAL](/docs/lab#experimental-program)]**

For the channels that were published to, you can request for the number of subscribers or users to be returned in the response body.

This is currently only supported in the PHP, Node.js and Go SDKs.

{% snippets ['php', 'js', 'go'] %}

```php
{batchEventsWithInfo.php}
```

```js
{
  batchEventsWithInfo.node;
}
```

```go
{batchEventsWithInfo.go}
```

{% endsnippets %}

> **Note:** when the `info` parameter is specified, the publish will count as two "messages" for the purposes of billing.

> **Note:** the counts are computed independently of broadcasting the message to connections. This means the counts do not necessarily match the number of subscribers/users that were published to.

# Querying application state

Sometimes you may want to know the state of your application to determine things like which channels have active subscribers or which users are currently on a [presence channel](/docs/channels/using_channels/presence-channels) . The Channels Server library contains a specific set of calls to query for application state. Alternatively the Channels HTTP API exposes a way of doing that and many of the [Channels server libraries](/docs/channels/channels_libraries/libraries) offer a generic **GET** method for performing such queries.

The **GET** method maps to a `GET` HTTP request to the Channels HTTP API and as such the libraries require:

- A **resource** (or **path**) parameter which is used to identify what you are querying. \* Optional query parameters. These tend to be key/value pairs and vary depending on the resource being queried.  
  {% snippets ['rb', 'php', 'c', 'js'] %}

```rb
pusher.get(resource, params)
```

The parameters passed to the `get` function are:

- **resource** - the resource endpoint to be queried. * **params** - \*\* *Optional\* \*\* . Additional parameters to be sent as query string parameters with the request. The names and values for these depend on the resource being queried. See examples below and the [HTTP API reference](/docs/channels/library_auth_reference/rest-api) for more information.  
  For more information see the [ pusher-http-ruby ](https://github.com/pusher/pusher-http-ruby) README.

```php
response = $pusher->get($resource, $params)
```

The parameters passed to the `get` function are:

- **$resource** - the resource endpoint to be queried. * **$params** - \*\* *Optional\* \*\* . Additional parameters to be sent as query string parameters with the request. The names and values for these depend on the resource being queried. See examples below and the [HTTP API reference](/docs/channels/library_auth_reference/rest-api) for more information.  
  For more information see the [ pusher-http-php ](https://github.com/pusher/pusher-http-php) README.

```c
IGetResult<object> result = await pusher.GetAsync<object>(string resource, object parameters);
```

The Channels Server library contains a specific wrapper that allows a consuming application to make a simple call specifying the type to deserialise to when making a GET request. `object` has been used above because as yet there isn't a defined class that the information can be serialized into.

For more information see the [ pusher-http-dotnet ](https://github.com/pusher/pusher-http-dotnet) README.

```js
const res = await pusher.get({ path, params });
```

The parameters passed to the `get` function are:

- **options** _ **path** - the path to the resource endpoint to be queried. _ **params** - ** _Optional_ ** . Additional parameters to be sent as query string parameters with the request. The names and values for these depend on the resource being queried. See examples below and the [HTTP API reference](/docs/channels/library_auth_reference/rest-api) for more information. \* **callback** - the function to be called when the request has completed. The function signature for the callback is `function( error, request, response )`.  
  For more information see the [ pusher-http-node ](https://github.com/pusher/pusher-http-node) README.

{% endsnippets %}

## Application channels

If you would like a list of the channel within an application that have active subscriptions (also referred to as being **occupied**) then you can query the `/channels` resource.

For full parameter information see the [HTTP API channels reference](/docs/channels/library_auth_reference/rest-api#channels) .

{% snippets ['rb', 'php', 'c', 'js', 'py', 'go'] %}

```rb
response = pusher.get('/channels')
```

For more information see the [ pusher-http-ruby ](https://github.com/pusher/pusher-http-ruby) README.

```php
response = $pusher->get( '/channels' ); if( $response[ 'status'] == 200 ) { // convert to associative array for easier consumption $channels = json_decode( $response[ 'body' ], true ); }
```

For more information see the [ pusher-http-php ](https://github.com/pusher/pusher-http-php) README.

```c
IGetResult<ChannelsList> result = await pusher.GetAsync<ChannelsList>("/channels");
```

The Channels Server library contains a specific wrapper that allows a consuming application to make a simple call specifying the type to deserialise to when requesting Channel Information.

For more information see the [ pusher-http-dotnet ](https://github.com/pusher/pusher-http-dotnet) README.

```js
const res = await pusher.get({ path: "/channels" }) if (res.status === 200) { const body = await res.json(); const channelsInfo = body.channels; }
```

For more information see the [ pusher-http-node ](https://github.com/pusher/pusher-http-node) README.

```py
# pusher_client is obtained through pusher_client = pusher.Pusher( ... ) pusher_client.channels_info(u"presence-", [u'user_count'])
```

For more information see the [ pusher-http-python ](https://github.com/pusher/pusher-http-python) README.

```go
prefixFilter := "presence-" attributes := "user_count" params := pusher.ChannelsParams{FilterByPrefix: &prefixFilter, Info: &attributes} channels, err := pusherClient.Channels(params)
```

For more information see the [Go HTTP library README](https://github.com/pusher/pusher-http-go) .

{% endsnippets %}

## Channel information

You can query the state of an individual channel. This is done by querying the `/channels/[channel_name]` resource where `channel_name` is replaced with the actual name of the channel you are requesting information for.

For full parameter information see the [HTTP API channel reference](/docs/channels/library_auth_reference/rest-api) .

{% snippets ['rb', 'c', 'php', 'js', 'py', 'go'] %}

```rb
response = pusher.get('/channels/channel-name')
```

For more information see the [ pusher-http-ruby ](https://github.com/pusher/pusher-http-ruby) README.

```c
IGetResult<object> result = await pusher.FetchStateForChannelAsync<object>("my-channel-1");
```

The Channels Server library contains a specific wrapper that allows a consuming application to make a simple call passing in the channel name, and a type to deserialize to when requesting the state of a channel. `object` has been used above because as yet there isn't a defined class that the information can be serialized into.

For more information see the [ pusher-http-dotnet ](https://github.com/pusher/pusher-http-dotnet) README.

```php
response = $pusher->get('/channels/channel-name'); if( $response[ 'status'] == 200 ) { // convert to associative array for easier consumption $channel_info = json_decode( $response[ 'body' ], true); }
```

For more information see the [ pusher-http-php ](https://github.com/pusher/pusher-http-php) README.

```js
const res = await pusher.get({ path: '/channels/channel-name' }) if (res.status === 200) { const body = await res.json(); const channelInfo = body.channels; }
```

For more information see the [ pusher-http-node ](https://github.com/pusher/pusher-http-node) README.

```py
# pusher_client is obtained through pusher_client = pusher.Pusher( ... ) channel = pusher_client.channel_info(u'presence-chatroom', [u"user_count"])
```

For more information see the [ pusher-http-python ](https://github.com/pusher/pusher-http-python) README.

```go
attributes := "user_count,subscription_count" params := &ChannelParams{Info: &attributes} channel, err := pusherClient.Channel("presence-chatroom", params)
```

For more information see the [Go HTTP library README](https://github.com/pusher/pusher-http-go) .

{% endsnippets %}

## Presence users

A list of users present on a presence channel can be retrieved by querying the `/channels/[channel_name]/users` resource where the `channel_name` is replaced with a valid presence channel name.

For full parameter information see the [ HTTP API presence users reference. ](/docs/channels/library_auth_reference/rest-api#method-get-users)

{% snippets ['rb', 'c', 'php', 'js', 'py', 'go'] %}

```rb
response = pusher.get('/channels/presence-channel-name/users')
```

For more information see the [ pusher-http-ruby ](https://github.com/pusher/pusher-http-ruby) README.

```c
IGetResult<object> result = await pusher.FetchUsersFromPresenceChannelAsync<object>("my-channel-1");
```

The Channels Server library contains a specific wrapper that allows a consuming application to make a simple call passing in the channel name, and a type to deserialize to when requesting Presence Users. `object` has been used above because as yet there isn't a defined class that the information can be serialized into.

For more information see the [ pusher-http-dotnet ](https://github.com/pusher/pusher-http-dotnet) README.

```php
response = $pusher->get( '/channels/presence-channel-name/users' ); if( $response[ 'status'] == 200 ) { // convert to associative array for easier consumption $users = json_decode( $response[ 'body' ], true )[ 'users' ]; }
```

For more information see the [ pusher-http-php ](https://github.com/pusher/pusher-http-php) README.

```js
const res = await pusher.get({ path: '/channels/presence-channel-name/users' }) if (res.status === 200) { const body = await res.json(); const users = body.users; }
```

For more information see the [ pusher-http-node ](https://github.com/pusher/pusher-http-node) README.

```py
# pusher_client is obtained through pusher_client = pusher.Pusher( ... ) pusher_client.users_info(u'presence-chatroom')
```

For more information see the [ pusher-http-python ](https://github.com/pusher/pusher-http-python) README.

```go
users, err := pusherClient.GetChannelUsers("presence-chatroom")
```

For more information see the [Go HTTP library README](https://github.com/pusher/pusher-http-go) .

{% endsnippets %}
