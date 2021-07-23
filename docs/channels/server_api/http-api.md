---
title: HTTP API
layout: channels.njk
eleventyNavigation:
  parent: Server api
  key: Http api
  order: 2
  title: HTTP API interaction
---

# Interacting with our HTTP API

Channels provides a HTTP API as the main point of interaction with your servers. [Publishing events](#publishing-events) is the most important aspect of this, but there are other methods for querying the state of your Channels applications. These are documented in our [API reference](/docs/channels/library_auth_reference/rest-api).

All interactions with the Channels HTTP API must contain an authentication signature that is generated with your secret key. Using one of our libraries means you generally don't need to worry about this, but more information can be found [here](/docs/channels/library_auth_reference/rest-api#authentication).

Many of our libraries allow requests to be made asynchronously. Please consult the individual documentation for more information.

## Publishing events

Because it is such a fundamental part of the service, most of our libraries have special methods for triggering events. Behind the scenes this is just a simple call to our HTTP API. We recommend using serialised JSON to keep message sizes down.

Please bear in mind the following when publishing events:

- Event names (and the channels they are sent to) can only contain characters which are alphanumeric, '-' or '\_' (see [naming channels](/docs/channels/using_channels/channels#channel-naming-conventions))
- The data content (POST body) of events must be smaller than 10kB.
- Exceeding your quota will return a 413 HTTP error code
- An event can be published to between 1 and 100 channel names in a single request
- Often it is useful to exclude the sender from the recipients of the event ([read more](/docs/channels/server_api/excluding-event-recipients))

For full details about the HTTP API including resource endpoints, allowed attributes, server responses, and error codes please consult our [HTTP API reference.](/docs/channels/library_auth_reference/rest-api)

{% methodwrap %}
{% snippets ['rb', 'php', 'laravel', 'c', 'node', 'py', 'go'], true %}

```rb
require 'pusher'

pusher_client = Pusher::Client.new(
  app_id: 'APP_ID',
  key: 'APP_KEY',
  secret: 'APP_SECRET',
  cluster: 'APP_CLUSTER'
)

pusher_client.trigger(channels, event, data)
```

```php
require __DIR__ . '/vendor/autoload.php';

$pusher = new Pusher\\Pusher('APP_KEY', 'APP_SECRET', 'APP_ID', array('cluster' => 'APP_CLUSTER'));

$response = $pusher->trigger($channels, $event, $data);`,
```

```php
// Events are defined like this
  <?php

use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class MyEvent implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $data;

  public function __construct($data)
  {
      $this->data = $data;
  }

  public function broadcastOn()
  {
      return ['my-channel'];
  }
}

// Events are published like this
event(new MyEvent($data));
```

```c
using PusherServer;

var options = new PusherOptions();
options.Cluster = "APP_CLUSTER";
var pusher = new Pusher("APP_ID", "APP_KEY", "APP_SECRET", options);

ITriggerResult result = await pusher.TriggerAsync(
  string[] channels,
  string event,
  object data,
  ITriggerOptions options);
```

```js
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "APP_ID",
  key: "APP_KEY",
  secret: "APP_SECRET",
  cluster: "APP_CLUSTER",
  useTLS: true,
});

pusher.trigger(channels, event, data, socketId).catch((error) => {
  console.log(error);
});
```

```py
import pusher

pusher_client = pusher.Pusher(app_id=u'APP_ID', key=u'APP_KEY', secret=u'APP_SECRET', cluster=u'APP_CLUSTER')
pusher_client.trigger(channels, event, {u'some': u'data'})
```

```go
import "github.com/pusher/pusher-http-go/v5"

pusherClient := pusher.Client{
  AppID: "APP_ID",
  Key: "APP_KEY",
  Secret: "APP_SECRET",
  Cluster: "APP_CLUSTER",
}

pusherClient.Trigger(channels, event, data)
```

{% endsnippets %}
{% conditionalContent 'js' %}

#### Parameters

{% parameter 'channels', 'String or Array', true %}

Either a single channel name as a `String` or an `Array` of channel names that the event is to be published on

{% endparameter %}

{% parameter 'event', 'String', true %}

The name of the event to be triggered

{% endparameter %}

{% parameter 'data', 'JSON', false %}

The data to be sent with the event. This will be converted to JSON by the library.

{% endparameter %}

{% parameter 'socket_id', null, false %}

The socket ID of a client to be excluded from receiving the event. See [excluding recipients.](/docs/channels/server_api/excluding-event-recipients).

{% endparameter %}

For more information see the [pusher-http-ruby](https://github.com/pusher/pusher-http-ruby) README.

{% endconditionalContent %}
{% conditionalContent 'php', false %}

#### Parameters

{% parameter '$channels', 'String or Array', true %}

Either a single channel name as a `String` or an `Array` of channel names that the event is to be published on

{% endparameter %}

{% parameter '$event', 'String', true %}

The name of the event to be triggered

{% endparameter %}

{% parameter '$data', 'JSON', false %}

The data to be sent with the event. This will be converted to JSON by the library.

{% endparameter %}

{% parameter '$socket_id', null, false %}

The socket ID of a client to be excluded from receiving the event. See [excluding recipients.](/docs/channels/server_api/excluding-event-recipients).

For more information see the [pusher-http-ruby](https://github.com/pusher/pusher-http-ruby) README.

{% endparameter %}

{% parameter '$response', 'Boolean', false %}

`$response` is `true` if the event was successfully triggered, otherwise `false`.

If debug is enabled (see the library README for more information) the `$response` is an associative array with the following elements:

- **status** - the HTTP status code from the response
- **body** - the body of the response. If an error occurs the body can provide additional information.

{% endparameter %}

For more information see the [pusher-http-php](https://github.com/pusher/pusher-http-php) README.
{% endconditionalContent %}

{% conditionalContent 'laravel', false %}

Refer to the [official Laravel docs](https://laravel.com/docs/master/broadcasting) for more information.

{% endconditionalContent %}
{% conditionalContent 'c', false %}

#### Parameters

{% parameter 'channels', 'String or Array', true %}

A array of channel names to trigger the event on. There is an overload available which takes a single channel name string.

{% endparameter %}

{% parameter 'event', 'String', true %}

The name of the event to be triggered

{% endparameter %}

{% parameter 'data', 'JSON' %}

The data to be sent with the event. This will be converted to JSON by the library.

{% endparameter %}

{% parameter 'options' %}

Optional via an overloaded method. Additional options when triggering an event.

{% endparameter %}

You can exclude a client from receiving an event by passing in an object that implements the `ITriggerOptions` interface, or a `TriggerObjects` instance, with a `SocketId` value set. For more information see the [excluding recipients documentation.](/docs/channels/server_api/excluding-event-recipients)

The `result` is an object which implements the `ITriggerResult` interface. The interface provides the following properties which expose information about the result of the call.:

- **StatusCode** - An `HttpStatusCode` indicating the status request.
- **Body** - the `string` body of the response. If an error occurs the body can provide additional information.
- **Response** - The original response from the REST client
- **OriginalContent** - If the `HttpStatusCode` was not `200 OK`, then the content is copied into this property

For more information see the [pusher-http-dotnet](https://github.com/pusher/pusher-http-dotnet) README.

{% endconditionalContent %}
{% conditionalContent 'node', false %}

#### Parameters

{% parameter 'channels', 'String or Array', true %}

A string identifying a single channel or an array of strings for multiple channels.

{% endparameter %}

{% parameter 'event', 'String', true %}

The name of the event to be triggered.

{% endparameter %}

{% parameter 'data', 'JSON' %}

The data to be sent with the event. This will be converted to JSON by the library.

{% endparameter %}

{% parameter 'socket_id', null, false %}

The socket ID of a client to be excluded from receiving the event. See [excluding recipients.](/docs/channels/server_api/excluding-event-recipients)

{% endparameter %}

For more information see the [pusher-http-node](https://github.com/pusher/pusher-http-node) README.

{% endconditionalContent %}
{% conditionalContent 'py', false %}

For more information see the [Channels python server library](https://github.com/pusher/pusher-http-python) README.

{% endconditionalContent %}
{% conditionalContent 'go', false %}

For more information see the [Go HTTP library README](https://github.com/pusher/pusher-http-go).

{% endconditionalContent %}
{% endmethodwrap %}

### Examples: Publish an event on a single channel

In the examples below an event called `my-event` is being triggered on a channel named `my-channel`. The message payload ultimately ends up as a simple JSON message `${'{"message":"hello world"}'}`.

{% snippets ['rb', 'php', 'laravel', 'c', 'node', 'py', 'go'] %}

```rb
require 'pusher'

pusher_client = Pusher::Client.new(
  app_id: 'APP_ID',
  key: 'APP_KEY',
  secret: 'APP_SECRET',
  cluster: 'APP_CLUSTER'
)

pusher_client.trigger('my-channel', 'my-event', {:message => 'hello world'})
```

```php
require __DIR__ . '/vendor/autoload.php';

$pusher = new Pusher\\Pusher('APP_KEY', 'APP_SECRET', 'APP_ID', array('cluster' => 'APP_CLUSTER'));

$response = $pusher->trigger('my-channel', 'my-event', array( 'message' => 'hello world'));
```

```php
// In the class implementing ShouldBroadcast
public function broadcastOn()
{
  return ['my-channel'];
}
```

```c
using PusherServer;

var options = new PusherOptions();
options.Cluster = "APP_CLUSTER";
var pusher = new Pusher("APP_ID", "APP_KEY", "APP_SECRET", options);

ITriggerResult result = await pusher.TriggerAsync(
  "my-channel",
  "my-event",
  new { message = "hello world" });
```

```js
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "APP_ID",
  key: "APP_KEY",
  secret: "APP_SECRET",
  cluster: "APP_CLUSTER",
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world",
});
```

```py
import pusher

pusher_client = pusher.Pusher(app_id=u'APP_ID', key=u'APP_KEY', secret=u'APP_SECRET', cluster=u'APP_CLUSTER')

pusher_client.trigger(u'my-channel', u'my-event', {u'some': u'data'})
```

```go
import "github.com/pusher/pusher-http-go/v5"

pusherClient := pusher.Client{
  AppID: "APP_ID",
  Key: "APP_KEY",
  Secret: "APP_SECRET",
  Cluster: "APP_CLUSTER",
}

data := map[string]string{"message": "hello world"}

pusherClient.Trigger("my-channel", "my-event", data)
```

{% endsnippets %}

### Example: Publish an event on multiple channels

In the examples below an event called `my-event` is being triggered multiple channels; `my-channel-1`, `my-channel-2` and `my-channel-3`. The message payload is converted to a simple JSON message `${'{"message":"hello world"}'}`.

{% snippets ['rb', 'php', 'laravel', 'c', 'node', 'py', 'go'] %}

```rb
require 'pusher'

pusher_client = Pusher::Client.new(
  app_id: 'APP_ID',
  key: 'APP_KEY',
  secret: 'APP_SECRET',
  cluster: 'APP_CLUSTER'
)

pusher_client.trigger(['my-channel-1', 'my-channel-2', 'my-channel-3'], 'my-event', {
  message: 'hello world'
})
```

```php
require __DIR__ . '/vendor/autoload.php';

$pusher = new Pusher\\Pusher('APP_KEY', 'APP_SECRET', 'APP_ID', array('cluster' => 'APP_CLUSTER'));

$pusher->trigger(
  ['my-channel-1', 'my-channel-2', 'my-channel-3'],
  'my-event',
  array( 'message' => 'hello world')
);
```

```php
// In the class implementing ShouldBroadcast
public function broadcastOn()
{
  return ['my-channel-1', 'my-channel-2', 'my-channel-3'];
}
```

```c
using PusherServer;

var options = new PusherOptions();
options.Cluster = "APP_CLUSTER";
var pusher = new Pusher("APP_ID", "APP_KEY", "APP_SECRET", options);

ITriggerResult result = await pusher.TriggerAsync(
  new string[]{"my-channel-1", "my-channel-2", "my-channel-3"},
  "my-event",
  new { message: "hello world" });
```

```js
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "APP_ID",
  key: "APP_KEY",
  secret: "APP_SECRET",
  cluster: "APP_CLUSTER",
});

const channels = ["my-channel-1", "my-channel-2", "my-channel-3"];
pusher.trigger(channels, "my-event", {
  message: "hello world",
});
```

```py
import pusher

pusher_client = pusher.Pusher(app_id=u'APP_ID', key=u'APP_KEY', secret=u'APP_SECRET', cluster=u'APP_CLUSTER')

pusher_client.trigger([u'my-channel-1', u'my-channel-2', u'my-channel-3'], u'my-event', {u'some': u'data'})
```

```go
import "github.com/pusher/pusher-http-go/v5"

pusherClient := pusher.Client{
  AppID: "APP_ID",
  Key: "APP_KEY",
  Secret: "APP_SECRET",
  Cluster: "APP_CLUSTER",
}

pusherClient.TriggerMulti([]string{"my-channel-1", "my-channel-2", "my-channel-3"}, "my-event", data)
```

{% endsnippets %}

### Example: Fetch subscriber and user counts at the time of publish

**[[EXPERIMENTAL]](/docs/lab#experimental-program)**

For the channels that were published to, you can request for the number of subscribers or users to be returned in the response body.

This is currently only supported in the PHP, Node.js and Go SDKs.

{% snippets ['php', 'node', 'go'] %}

```php
require __DIR__ . '/vendor/autoload.php';

$pusher = new Pusher\Pusher('APP_KEY', 'APP_SECRET', 'APP_ID', array('cluster' => 'APP_CLUSTER'));

$channels = $pusher->trigger(
  'my-channel',
  'my_event',
  'hello world',
  array('info' => 'subscription_count')
);
```

```js
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "APP_ID",
  key: "APP_KEY",
  secret: "APP_SECRET",
  cluster: "APP_CLUSTER",
});

const attributes = "subscription_count,user_count";
const res = await pusher.trigger(
  channels,
  "my-event",
  {
    message: "hello world",
  },
  {
    info: attributes,
  }
);

if (res.status === 200) {
  const body = await res.json();
  const channelsInfo = body.channels;
}
```

```go
import "github.com/pusher/pusher-http-go/v5"

pusherClient := pusher.Client{
  AppID: "APP_ID",
  Key: "APP_KEY",
  Secret: "APP_SECRET",
  Cluster: "APP_CLUSTER",
}

attributes := "subscription_count,user_count"
params := pusher.TriggerParams{Info: &attributes}

channels, err := pusherClient.TriggerMultiWithParams(
  []string{"my-channel-1", "my-channel-2", "presence-my-channel-3"},
  "my-event",
  data,
  params,
)
```

{% endsnippets %}

> **Note:** when the `info` parameter is specified, the publish will count as two "messages" for the purposes of billing.

> **Note:** the counts are computed independently of broadcasting the message to connections. This means the counts do not necessarily match the number of subscribers/users that were published to.

## Publishing batches of events

You might also find yourself wanting to publish many non-identical events in a short space of time. To reduce the number of HTTP requests you need to make in this case, the Channels HTTP API [supports batches](/docs/channels/library_auth_reference/rest-api#post-batch-events-trigger-multiple-events-) of up to ten events in one request. Our server libraries provide a **_trigger batch_** method that wraps this API call. In the examples below an event called `my-event-1` is being triggered on channel `my-channel-1`, and an event called `my-event-2` is being triggered on channel `my-channel-2`.

{% snippets ['rb', 'php', 'c', 'node', 'py', 'go'] %}

```rb
pusher_client.trigger_batch([
  {channel: 'my-channel-1', name: 'my-event-1', data: { foo: 'bar' }}
  {channel: 'my-channel-2', name: 'my-event-2', data: { hello: 'world' }}
])
```

```php
$batch = array();
$batch[] = array('channel' => 'my-channel-1', 'name' => 'my-event-1', 'data' => array('hello' => 'world'));
$batch[] = array('channel' => 'my-channel-2', 'name' => 'my-event-2', 'data' => array('myname' => 'bob'));
$pusher->triggerBatch($batch);
```

```c
var events = new List[]{
  new Event(){ EventName = "my-event-1", Channel = "my-channel-1", Data = "hello world" },
  new Event(){ EventName = "my-event-2", Channel = "my-channel-2", Data = "my name is bob" },
}

  ITriggerResult result = await pusher.TriggerAsync(events);
```

For more information see the [pusher-http-dotnet](https://github.com/pusher/pusher-http-dotnet) README.

```js
const events = [
  {
    channel: "my-channel-1",
    name: "my-event-1",
    data: { message: "hello world" },
  },
  {
    channel: "my-channel-2",
    name: "my-event-2",
    data: { message: "hello another world" },
  },
];

pusher.triggerBatch(events);
```

```py
# pusher_client is obtained through pusher_client = pusher.Pusher( ... )
pusher_client.trigger_batch([
  { u'channel': u'my-channel-1', u'name': u'my-event-1', u'data': {u'some': u'data'}, u'socket_id': '1234.12'},
  { u'channel': u'my-channel-2', u'name': u'my-event-2', u'data': {u'some': u'other data'}}
])
```

```go
pusherClient.TriggerBatch([]pusher.Event{
  { Channel: "my-channel-1", Name: "my-event-1", Data: "hello world", nil },
  { Channel: "my-channel-2", Name: "my-event-2", Data: "hi my name is bob", nil },
})
```

{% endsnippets %}

### Example: Fetch subscriber and user counts at the time of batch publish

**[[EXPERIMENTAL](/docs/lab#experimental-program)]**

For the channels that were published to, you can request for the number of subscribers or users to be returned in the response body.

This is currently only supported in the PHP, Node.js and Go SDKs.

{% snippets ['php', 'js', 'go'] %}

```php
$batch = array();
$batch[] = array(
  'channel' => 'my-channel',
  'name' => 'my_event',
  'data' => array('hello' => 'world'),
  'info' => 'subscription_count'
);
$batch[] = array(
  'channel' => 'presence-my-channel',
  'name' => 'my_event',
  'data' => array('myname' => 'bob'),
  'info' => 'user_count,subscription_count'
);
$result = $pusher->triggerBatch($batch);

foreach ($result->batch as $i => $attributes) {
  echo "channel: {$batch[$i]['channel']}, name: {$batch[$i]['name']}";
  if (isset($attributes->subscription_count)) {
    echo ", subscription_count: {$attributes->subscription_count}";
  }
  if (isset($attributes->user_count)) {
    echo ", user_count: {$attributes->user_count}";
  }
  echo PHP_EOL;
}
```

```js
const batch = [
  {
    channel: "my-channel",
    name: "event",
    data: "test1",
    info: "subscription_count",
  },
  {
    channel: "presence-my-channel",
    name: "event",
    data: "test2",
    info: "user_count,subscription_count",
  },
];
pusher
  .triggerBatch(batch)
  .then((response) => {
    if (response.status !== 200) {
      throw Error("unexpected status");
    }
    // Parse the response body as JSON
    return response.json();
  })
  .then((body) => {
    body.batch.forEach((attributes, i) => {
      process.stdout.write(
        `channel: ${batch[i].channel}, name: ${batch[i].name}, subscription_count:${attributes.subscription_count}`
      );
      if ("user_count" in attributes) {
        process.stdout.write(`, user_count: ${attributes.user_count}`);
      }
      process.stdout.write("\n");
    });
  })
  .catch((error) => {
    console.error(error);
  });
```

```go
channel1Info := "subscription_count"
channel2Info := "subscription_count,user_count"

batch := []pusher.Event{
  { Channel: "my-channel-1", Name: "my-event-1", Data: "hello world", Info: &channel1Info },
  { Channel: "presence-my-channel-2", Name: "my-event-2", Data: "hi my name is bob", Info: &channel2Info },
  { Channel: "my-channel-3", Name: "my-event-3", Data: "hi my name is alice" },
}
response, err := pusherClient.TriggerBatch(batch)

for i, attributes := range response.Batch {
  fmt.Printf("channel: %s, name: %s", batch[i].Channel, batch[i].Name)
  if attributes.SubscriptionCount != nil {
    fmt.Printf(", subscription_count: %d", *attributes.SubscriptionCount)
  }
  if attributes.UserCount != nil {
    fmt.Printf(", user_count: %d", *attributes.UserCount)
  }
  fmt.Println()
}
```

{% endsnippets %}

> **Note:** when the `info` parameter is specified, the publish will count as two "messages" for the purposes of billing.

> **Note:** the counts are computed independently of broadcasting the message to connections. This means the counts do not necessarily match the number of subscribers/users that were published to.

## Querying application state

Sometimes you may want to know the state of your application to determine things like which channels have active subscribers or which users are currently on a [presence channel](/docs/channels/using_channels/presence-channels). The Channels Server library contains a specific set of calls to query for application state. Alternatively the Channels HTTP API exposes a way of doing that and many of the [Channels server libraries](/docs/channels/channels_libraries/libraries) offer a generic **GET** method for performing such queries.

The **GET** method maps to a `GET` HTTP request to the Channels HTTP API and as such the libraries require:

- A **resource** (or **path**) parameter which is used to identify what you are querying.
- Optional query parameters. These tend to be key/value pairs and vary depending on the resource being queried.

{% methodwrap %}
{% snippets ['rb', 'php', 'c', 'node'], true %}

```rb
pusher.get(resource, params)
```

```php
response = $pusher->get($resource, $params)
```

```c
IGetResult<object> result = await pusher.GetAsync<object>(string resource, object parameters);
```

```js
const res = await pusher.get({ path, params });
```

{% endsnippets %}

{% conditionalContent 'rb' %}

#### Parameters

{% parameter 'resource', 'String', true %}

The resource endpoint to be queried.

{% endparameter %}
{% parameter 'params', 'String', false %}

Additional parameters to be sent as query string parameters with the request. The names and values for these depend on the resource being queried. See examples below and the [HTTP API reference](/docs/channels/library_auth_reference/rest-api) for more information.

{% endparameter %}

For more information see the [pusher-http-ruby](https://github.com/pusher/pusher-http-ruby) README.

{% endconditionalContent %}
{% conditionalContent 'php', false %}

#### Parameters

{% parameter '$resource', 'String', true %}

The resource endpoint to be queried.

{% endparameter %}
{% parameter '$params', 'String', false %}

Additional parameters to be sent as query string parameters with the request. The names and values for these depend on the resource being queried. See examples below and the [HTTP API reference](/docs/channels/library_auth_reference/rest-api) for more information.

{% endparameter %}

For more information see the [pusher-http-php](https://github.com/pusher/pusher-http-php) README.

{% endconditionalContent %}
{% conditionalContent 'c', false %}

The Channels Server library contains a specific wrapper that allows a consuming application to make a simple call specifying the type to deserialise to when making a GET request. `object` has been used above because as yet there isn't a defined class that the information can be serialized into.

For more information see the [pusher-http-dotnet](https://github.com/pusher/pusher-http-dotnet) README.

{% endconditionalContent %}
{% conditionalContent 'node', false %}

#### Parameters

{% parameter 'resource', 'String', true %}

The path to the resource endpoint to be queried.

{% endparameter %}
{% parameter 'params', 'String', false %}

Additional parameters to be sent as query string parameters with the request. The names and values for these depend on the resource being queried. See examples below and the [HTTP API reference](/docs/channels/library_auth_reference/rest-api) for more information.

{% endparameter %}

For more information see the [pusher-http-node](https://github.com/pusher/pusher-http-node) README.

{% endconditionalContent %}
{% endmethodwrap %}

## Application channels

If you would like a list of the channel within an application that have active subscriptions (also referred to as being **occupied**) then you can query the `/channels` resource.

For full parameter information see the [HTTP API channels reference](/docs/channels/library_auth_reference/rest-api#channels).

{% methodwrap %}
{% snippets ['rb', 'php', 'c', 'node', 'py', 'go'], true %}

```rb
response = pusher.get('/channels')
```

```php
response = $pusher->get( '/channels' ); if( $response[ 'status'] == 200 ) {
  // convert to associative array for easier consumption
  $channels = json_decode( $response['body'], true );
}
```

```c
IGetResult<ChannelsList> result = await pusher.GetAsync<ChannelsList>("/channels");
```

```js
const res = await pusher.get({ path: "/channels" });
if (res.status === 200) {
  const body = await res.json();
  const channelsInfo = body.channels;
}
```

```py
# pusher_client is obtained through pusher_client = pusher.Pusher( ... )
pusher_client.channels_info(u"presence-", [u'user_count'])
```

```go
prefixFilter := "presence-"
attributes := "user_count"
params := pusher.ChannelsParams{FilterByPrefix: &prefixFilter, Info: &attributes}
channels, err := pusherClient.Channels(params)
```

{% endsnippets %}
{% conditionalContent 'rb' %}

For more information see the [pusher-http-ruby](https://github.com/pusher/pusher-http-ruby) README.

{% endconditionalContent %}
{% conditionalContent 'php', false %}

For more information see the [pusher-http-php](https://github.com/pusher/pusher-http-php) README.

{% endconditionalContent %}

{% conditionalContent 'c', false %}

The Channels Server library contains a specific wrapper that allows a consuming application to make a simple call specifying the type to deserialise to when requesting Channel Information.

For more information see the [pusher-http-dotnet](https://github.com/pusher/pusher-http-dotnet) README.

{% endconditionalContent %}
{% conditionalContent 'node', false %}

For more information see the [pusher-http-node](https://github.com/pusher/pusher-http-node) README.

{% endconditionalContent %}
{% conditionalContent 'py', false %}

For more information see the [pusher-http-python](https://github.com/pusher/pusher-http-python) README.

{% endconditionalContent %}
{% conditionalContent 'go', false %}

For more information see the [Go HTTP library README](https://github.com/pusher/pusher-http-go).

{% endconditionalContent %}
{% endmethodwrap %}

## Channel information

You can query the state of an individual channel. This is done by querying the `/channels/[channel_name]` resource where `channel_name` is replaced with the actual name of the channel you are requesting information for.

For full parameter information see the [HTTP API channel reference](/docs/channels/library_auth_reference/rest-api).

{% methodwrap %}
{% snippets ['rb', 'c', 'php', 'node', 'py', 'go'], true %}

```rb
response = pusher.get('/channels/channel-name')
```

```c
IGetResult<object> result = await pusher.FetchStateForChannelAsync<object>("my-channel-1");
```

```php
response = $pusher->get('/channels/channel-name');
if( $response[ 'status'] == 200 ) {
  // convert to associative array for easier consumption
  $channel_info = json_decode( $response['body'], true);
}
```

```js
const res = await pusher.get({ path: "/channels/channel-name" });
if (res.status === 200) {
  const body = await res.json();
  const channelInfo = body.channels;
}
```

```py
# pusher_client is obtained through pusher_client = pusher.Pusher( ... )
channel = pusher_client.channel_info(u'presence-chatroom', [u"user_count"])
```

```go
attributes := "user_count,subscription_count"
params := &ChannelParams{Info: &attributes}
channel, err := pusherClient.Channel("presence-chatroom", params)
```

{% endsnippets %}

{% conditionalContent 'rb' %}

For more information see the [pusher-http-ruby](https://github.com/pusher/pusher-http-ruby) README.

{% endconditionalContent %}
{% conditionalContent 'php', false %}

For more information see the [pusher-http-php](https://github.com/pusher/pusher-http-php) README.

{% endconditionalContent %}

{% conditionalContent 'c', false %}

The Channels Server library contains a specific wrapper that allows a consuming application to make a simple call passing in the channel name, and a type to deserialize to when requesting the state of a channel. `object` has been used above because as yet there isn't a defined class that the information can be serialized into.

For more information see the [pusher-http-dotnet](https://github.com/pusher/pusher-http-dotnet) README.

{% endconditionalContent %}
{% conditionalContent 'node', false %}

For more information see the [pusher-http-node](https://github.com/pusher/pusher-http-node) README.

{% endconditionalContent %}
{% conditionalContent 'py', false %}

For more information see the [pusher-http-python](https://github.com/pusher/pusher-http-python) README.

{% endconditionalContent %}
{% conditionalContent 'go', false %}

For more information see the [Go HTTP library README](https://github.com/pusher/pusher-http-go).

{% endconditionalContent %}
{% endmethodwrap %}

## Presence users

A list of users present on a presence channel can be retrieved by querying the `/channels/[channel_name]/users` resource where the `channel_name` is replaced with a valid presence channel name.

For full parameter information see the [HTTP API presence users reference.](/docs/channels/library_auth_reference/rest-api#method-get-users)

{% methodwrap %}
{% snippets ['rb', 'c', 'php', 'node', 'py', 'go'], true %}

```rb
response = pusher.get('/channels/presence-channel-name/users')
```

```c
IGetResult<object> result = await pusher.FetchUsersFromPresenceChannelAsync<object>("my-channel-1");
```

```php
response = $pusher->get( '/channels/presence-channel-name/users' );
if( $response[ 'status'] == 200 ) {
  // convert to associative array for easier consumption
  $users = json_decode( $response['body'], true )['users'];
}
```

```js
const res = await pusher.get({ path: "/channels/presence-channel-name/users" });
if (res.status === 200) {
  const body = await res.json();
  const users = body.users;
}
```

```py
# pusher_client is obtained through pusher_client = pusher.Pusher( ... )
pusher_client.users_info(u'presence-chatroom')
```

```go
users, err := pusherClient.GetChannelUsers("presence-chatroom")
```

{% endsnippets %}

{% conditionalContent 'rb' %}

For more information see the [pusher-http-ruby](https://github.com/pusher/pusher-http-ruby) README.

{% endconditionalContent %}
{% conditionalContent 'php', false %}

For more information see the [pusher-http-php](https://github.com/pusher/pusher-http-php) README.

{% endconditionalContent %}

{% conditionalContent 'c', false %}

The Channels Server library contains a specific wrapper that allows a consuming application to make a simple call passing in the channel name, and a type to deserialize to when requesting Presence Users. `object` has been used above because as yet there isn't a defined class that the information can be serialized into.

For more information see the [pusher-http-dotnet](https://github.com/pusher/pusher-http-dotnet) README.

{% endconditionalContent %}
{% conditionalContent 'node', false %}

For more information see the [pusher-http-node](https://github.com/pusher/pusher-http-node) README.

{% endconditionalContent %}
{% conditionalContent 'py', false %}

For more information see the [pusher-http-python](https://github.com/pusher/pusher-http-python) README.

{% endconditionalContent %}
{% conditionalContent 'go', false %}

For more information see the [Go HTTP library README](https://github.com/pusher/pusher-http-go).

{% endconditionalContent %}
{% endmethodwrap %}
