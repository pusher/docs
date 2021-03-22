---
title: Global config - Channels - Pusher Docs
layout: channels.njk
eleventyNavigation:
  parent: Using channels
  key: Global config
  title: Global configuration
  order: 10
---

# Global configuration

{% parameter 'Pusher.host', 'String' %}

This can be changed to point to alternative Channels URLs (used internally for our staging server or if you’d like to try out beta features).

{% endparameter %}

{% parameter 'Pusher.channel_auth_endpoint', 'String' %}

Endpoint on your server that will return the authentication signature needed for private and presence channels. Defaults to `'/pusher/auth'`.

For more information see [authenticating users](/docs/channels/server_api/authenticating-users).

** _Note:_ ** If authentication fails a `subscription_error` event is triggered on the channel. For more information see [handling authentication problems](/docs/channels/using_channels/events#pusher-subscription-error).

{% endparameter %}

{% parameter 'Pusher.channel_auth_transport', 'String' %}

Defines how the authentication endpoint, defined using `Pusher.channel_auth_endpoint`, will be called. There are two options available:

- **ajax** - The **default** option where an `XMLHttpRequest` object will be used to make a request. The parameters will be passed as `POST` parameters.
- **jsonp** - The authentication endpoint will be called by a `{'<script>'}` tag being dynamically created pointing to the endpoint defined by `Pusher.channel_auth_endpoint`. This can be used when the authentication endpoint is on a different domain to the web application. The endpoint will therefore be requested as a `GET` and parameters passed in the query string.
  For more information see the [Channel authentication transport section](/docs/channels/server_api/authenticating-users#setting-the-channel-authentication-transport) of the [authenticating users docs](/docs/channels/server_api/authenticating-users).

{% endparameter %}

{% parameter 'Pusher.log', 'Function' %}

By default we don’t log anything. If you want to debug your application and see what’s going on within Channels then you can assign a global logging function.

The Pusher.log value should be set with a function with the following signature:

```js
function (message) {};
```

#### Example

```js
Pusher.log = (message) => {
  if (window.console && window.console.log) {
    window.console.log(message);
  }
};
```

{% endparameter %}
