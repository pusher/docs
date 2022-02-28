---
date: 2021-08-01
title: Pusher Channels Docs | What is a connection?
description: A Channels connection is the fundamental means of communication with the service. It is a bi-directional connection which receives and emits messages.
layout: channels.njk
eleventyNavigation:
  parent: Using channels
  key: Connection
  order: 2
---

# Connection

The Channels connection is the fundamental means of communication with the service. It is a bi-directional connection and is able to receive messages as well as emit messages from the server.

## Connecting to Channels

When you create a new `Pusher` object you are automatically connected to Channels.

```js
var pusher = new Pusher("APP_KEY", options);
```

#### Parameters

{% parameter 'applicationKey', 'String', true %}

The application key is a string which is globally unique to your application. It can be found in the API Access section of your application within the Channels user dashboard.

{% endparameter %}
{% parameter 'options', 'Object', false %}

See Channels `options` parameter [below](/docs/channels/using_channels/connection/#channels-options-parameter).

{% endparameter %}

### Channels 'options' parameter

The `options` parameter on the `Pusher` constructor is an optional parameter used to apply configuration on a newly created `Pusher` instance.

```js
{
  cluster: 'APP_CLUSTER',
  forceTLS: true,
  userAuth: {
    params: {
      param1: 'value1',
      param2: 'value2'
    },
    headers: {
      header1: 'value1',
      header2: 'value2'
    }
  }
  channelAuth: {
    params: {
      param1: 'value1',
      param2: 'value2'
    },
    headers: {
      header1: 'value1',
      header2: 'value2'
    }
  }
}
```

The options are:

{% parameter 'forceTLS', 'Boolean' %}

It’s possible to define if the connection should be made over TLS. For more information see Encrypting connections

{% endparameter %}

{% parameter 'userAuth', 'Object' %}

Object containing the configuration for user authentication. Valid keys are `endpoint`, `transport`, `params`, `headers`, and `customHandler`.

Default values are:

```js
var pusher = new Pusher("app_key", {
  endpoint: "/pusher/user-auth",
  transport: "ajax",
  params: {},
  headers: {},
  customHandler: null,
});
```

{% endparameter %}
{% parameter 'userAuth.endpoint', 'String' %}

Endpoint on your server that will return the authentication signature needed for private and presence channels. Defaults to `'/pusher/user-auth'`.

For more information see the [authenticating users docs](/docs/channels/server_api/authenticating-users).

> If authentication fails a `pusher:error` event is triggered on the channel. For more information see handling authentication problems.

{% endparameter %}
{% parameter 'userAuth.transport', 'String' %}

Defines how the authentication endpoint, defined using `userAuth.endpoint`, will be called. There are two options available:

- **ajax** - The **default** option where an `XMLHttpRequest` object will be used to make a request. The parameters will be passed as `POST` parameters.
- **jsonp** - The authentication endpoint will be called by a `<script>` tag being dynamically created pointing to the endpoint defined by `userAuth.endpoint`. This can be used when the authentication endpoint is on a different domain to the web application. The endpoint will therefore be requested as a `GET` and parameters passed in the query string.

For more information see the [authenticating users docs](/docs/channels/server_api/authenticating-users).

{% endparameter %}
{% parameter 'userAuth.params', 'Object' %}

Additional parameters to be sent when the user authentication endpoint is called. When using ajax authentication the parameters are passed as additional `POST` parameters. When using jsonp authentication the parameters are passed as `GET` parameters. This can be useful with web application frameworks that guard against [CSRF (Cross-site request forgery)](http://en.wikipedia.org/wiki/Cross-site_request_forgery).

{% endparameter %}
{% parameter 'userAuth.headers', 'Object' %}

**Only applied when using ajax as authentication `transport`**

Provides the ability to pass additional HTTP Headers to the user authentication endpoint. This can be useful with some web application frameworks that guard against CSRF [CSRF (Cross-site request forgery)](http://en.wikipedia.org/wiki/Cross-site_request_forgery).

```js
var pusher = new Pusher("app_key", {
  userAuth: {
    headers: {
      "X-CSRF-Token": "some_csrf_token",
    },
  },
});
```

{% endparameter %}
{% parameter 'UserAuth.customHandler', 'Function' %}

When present, this function is called instead of a request being made to the endpoint specified by `userAuth.endpoint'.

The function gets two parameters:

- An object with a `socketId` property with a string value
- A callback function that takes two arguments
  - An error value or null
  - An object with the following fields or null
    - `auth`: `String`
    - `user_data`: Optional `String`

For more information check [authenticating users](/docs/channels/server_api/authenticating-users).

{% endparameter %}
{
{% parameter 'channelAuth', 'Object' %}

Object containing the configuration for user authorization. Valid keys are `endpoint`, `transport`, `params`, `headers`, and `customHandler`.

Default values are:

```js
var pusher = new Pusher("app_key", {
  endpoint: "/pusher/auth",
  transport: "ajax",
  params: {},
  headers: {},
  customHandler: null,
});
```

{% endparameter %}
{% parameter 'channelAuth.endpoint', 'String' %}

Endpoint on your server that will return the authorization signature needed for private and presence channels. Defaults to `'/pusher/auth'`.

For more information see the [authorizing users docs](/docs/channels/server_api/authorizing-users).

> If authorization fails a `subscription_error` event is triggered on the channel. For more information see handling authorization problems.

{% endparameter %}
{% parameter 'channelAuth.transport', 'String' %}

Defines how the authorization endpoint, defined using `channelAuth.endpoint`, will be called. There are two options available:

- **ajax** - The **default** option where an `XMLHttpRequest` object will be used to make a request. The parameters will be passed as `POST` parameters.
- **jsonp** - The authorization endpoint will be called by a `<script>` tag being dynamically created pointing to the endpoint defined by `channelAuth.endpoint`. This can be used when the authorization endpoint is on a different domain to the web application. The endpoint will therefore be requested as a `GET` and parameters passed in the query string.

For more information see the [authorizing users docs](/docs/channels/server_api/authorizing-users).

{% endparameter %}
{% parameter 'channelAuth.params', 'Object' %}

Additional parameters to be sent when the channel authorization endpoint is called. When using ajax authorization the parameters are passed as additional `POST` parameters. When using jsonp authorization the parameters are passed as `GET` parameters. This can be useful with web application frameworks that guard against [CSRF (Cross-site request forgery)](http://en.wikipedia.org/wiki/Cross-site_request_forgery).

{% endparameter %}
{% parameter 'channelAuth.headers', 'Object' %}

**Only applied when using ajax as authorization `transport`**

Provides the ability to pass additional HTTP Headers to the channel authorization endpoint when authorizing a channel. This can be useful with some web application frameworks that guard against CSRF [CSRF (Cross-site request forgery)](http://en.wikipedia.org/wiki/Cross-site_request_forgery).

```js
var pusher = new Pusher("app_key", {
  channelAuth: {
    headers: {
      "X-CSRF-Token": "some_csrf_token",
    },
  },
});
```

{% endparameter %}
{% parameter 'channelAuth.customHandler', 'Function' %}

When present, this function is called instead of a request being made to the endpoint specified by `channelAuth.endpoint'.

The function gets two parameters:

- An object with `socketId` and `channelName` properties with string values
- A callback function that takes two arguments
  - An error value or null
  - An object with the following fields or null
    - `auth`: `String`
    - `channel_data`: Optional `String`
    - `shared_secret`: Optional `String`

For more information check [authorizing users](/docs/channels/server_api/authorizing-users).

{% endparameter %}
{% parameter 'cluster', 'String', true %}

The identifier of the cluster your application was created in. When not supplied, will connect to the `mt1` (`us-east-1`) cluster.

```js
// will connect to the 'eu' cluster
var pusher = new Pusher("app_key", { cluster: "eu" });
```

This parameter is mandatory when the app is created in a any cluster except `mt1` (`us-east-1`). Read more about configuring clusters.
{% endparameter %}
{% parameter 'disableStats', 'Boolean' %}

Disables stats collection, so that connection metrics are not submitted to Pusher’s servers.

{% endparameter %}
{% parameter 'enabledTransports', 'Array' %}

Specifies which transports should be used by Channels to establish a connection. Useful for applications running in controlled, well-behaving environments. Available transports: `ws`, `wss`, `xhr_streaming`,` xhr_polling`, `sockjs`. Additional transports may be added in the future and without adding them to this list, they will be disabled.

{% endparameter %}
{% parameter 'disabledTransports', 'Array' %}

Specifies which transports must not be used by Channels to establish a connection. Useful for applications running in controlled, well-behaving environments. Available transports: `ws`, `wss`, `xhr_streaming`,` xhr_polling`, `sockjs`. Additional transports may be added in the future and without adding them to this list, they will be disabled.

{% endparameter %}
{% parameter 'wsHost, wsPort, wssPort, httpHost, httpPort, httpsPort', 'Boolean' %}
These can be changed to point to alternative Channels URLs (used internally for our staging server).

{% endparameter %}
{% parameter 'ignoreNullOrigin', 'Boolean' %}

Ignores null origin checks for HTTP fallbacks. Use with care, it should be disabled only if necessary (i.e. PhoneGap).

{% endparameter %}
{% parameter 'activityTimeout', 'Integer' %}

After this time (in milliseconds) without any messages received from the server, a ping message will be sent to check if the connection is still working. Default value is supplied by the server, low values will result in unnecessary traffic.

{% endparameter %}
{% parameter 'pongTimeout', 'Integer' %}

After sending a ping message to the server, the client waits `pongTimeout` milliseconds for a response before assuming the connection is dead and closing it. Default value is supplied by the server.

{% endparameter %}

### TLS connections

A Channels client can be configured to only connect over TLS connections. An application that uses TLS should use this option to ensure connection traffic is encrypted. It is also possible to force connections to use TLS by enabling the **Force TLS** setting within an application's dashboard settings.

The option to force TLS is available on all plans.

```js
var pusher = new Pusher("app_key", { forceTLS: true });
```

### Detecting Connection Limits

> Connection limits are currently only strictly enforced on Sandbox plans. In practical terms this means that when you hit your connection limits and you’re on a Sandbox plan then you will be limited immediately. If you’re on a paid plan then we will not hard limit you until you’ve reached 120% of your plan’s connection limits. You will receive an email if your account exceeds your connection limit. If you are on a Sandbox plan and want to avoid connection limits upgrade your account. For more information on plan limits see pricing.

When connection limits are reached additional connections over the limit will be rejected. You can capture the rejection by binding to the `error` event on the `pusher.connection` object.

```js
var pusher = new Pusher("app_key");
pusher.connection.bind("error", function (err) {
  if (err.error.data.code === 4004) {
    log(">>> detected limit error");
  }
});
```

## Disconnecting from Channels

It is also possible to disconnect from Channels.

```js
pusher.disconnect();
```

> Connections automatically close when a user navigates to another web page or closes their web browser so there is no need to do this manually.

## Connection States

When working with our Channels client library, you can monitor the state of the connection so that you can notify users about expected behaviour.

> This document refers to version 1.9.0 of our library and above. Previous versions used the following events which have now been removed: `pusher:connection_established` and `pusher:connection_failed`.

There are multiple ways to use the connection state API:

- Bind to individual state change events
- Bind to all state change events
- Query the state directly

Additionally, the reconnect mechanism is now more transparent. This means that you can display messages that tell the user when the service might be connected.

### Available states

You can access the current state as `pusher.connection.state` and bind to a state change using `pusher.connection.bind('connected', function() {...})`

| State          | Note                                                                                                                                                                                                                                                                                    |
| :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `initialized`  | Initial state. No event is emitted in this state.                                                                                                                                                                                                                                       |
| `connecting`   | All dependencies have been loaded and Channels is trying to connect. The connection will also enter this state when it is trying to reconnect after a connection failure.                                                                                                               |
| `connected`    | The connection to Channels is open and authenticated with your app.                                                                                                                                                                                                                     |
| `unavailable`  | The connection is temporarily unavailable. In most cases this means that there is no internet connection. It could also mean that Channels is down, or some intermediary is blocking the connection. In this state, pusher-js will automatically retry the connection every 15 seconds. |
| `failed`       | Channels is not supported by the browser. This implies that WebSockets are not natively available and an HTTP-based transport could not be found.                                                                                                                                       |
| `disconnected` | The Channels connection was previously connected and has now intentionally been closed.                                                                                                                                                                                                 |

#### Example state changes

Given a supported browser and functioning internet connection, the following states are expected:

`initialized -> connecting -> connected`

Temporary failure of the Channels connection will cause

`connected -> connecting -> connected`

If an internet connection disappears

`connected -> connecting -> unavailable (after ~ 30s)`

When the internet connection becomes available again

`unavailable -> connected`

In the case that Channels is not supported:

`initialized -> failed`

#### Binding to connection events

Each Channels instance now has a `connection` object which manages the current state of the Channels connection and allows binding to state changes:

```js
var pusher = new Pusher("_APP_KEY");

pusher.connection.bind("connected", function () {
  $("div#status").text("Realtime is go!");
});
```

You can also bind to the `error` event, which is emitted whenever a connection error occurs:

```js
pusher.connection.bind("error", function (error) {
  console.error("connection error", error);
  $("div#status").text("Error!");
});
```

#### Binding to all state changes

There’s an extra `state_change` utility event that fires for all state changes:

```js
pusher.connection.bind("state_change", function (states) {
  // states = {previous: 'oldState', current: 'newState'}
  $("div#status").text("Channels current state is " + states.current);
});
```

### Querying the connection state

```js
const state = pusher.connection.state;
```
