---
date: 2022-02-15
title: Pusher Channels Docs | User Authentication
description: Authenticating users allow you to identify users on your Channels app and send them events based on user id
layout: channels.njk
eleventyNavigation:
  parent: Using channels
  key: User authentication
  order: 2
---

# User authentication

Pusher provides mechanisms for both authenticating and authorizing users. Our definition of this is that the former identifies who a user is, while the latter controls access by a given user to certain resources.

Since your servers are the authority on who your users are, and what they can access, our client libraries will make requests to endpoints of your choice to supply signed authentication and authorization tokens for the bearing user.

This page discusses how to use the user authentication functionality from the Pusher Channels client libraries.

We authenticate a user once per connection session. Authenticating a user gives your application access to user based features such as sending events to a user based on user id or terminating a user's connections immediately.

Authentication happens when your application calls the `signin` method. It's behaviour depends on the configuration provided to the Pusher object constructor through the `userAuthentication` parameter object. Below are the available configuration options with their default values. Check the [Connection page](/docs/channels/using_channels/connection) for an overview of the parameters.


{% snippets ['js','java', 'c'], true %}

```js
const pusher = new Pusher(APP_KEY, {
  userAuthentication: {
    endpoint: "/pusher/user-auth",
    transport: "ajax",
    params: {},
    headers: {},
    paramsProvider: null,
    headersProvider: null,
    customHandler: null,
  },
});
```

```java
PusherOptions options =
  new PusherOptions()
    .setUserAuthenticator(new HttpUserAuthenticator("https://example.com/pusher/user-auth"));

Pusher pusher = new Pusher(APP_KEY, options);
```

```c
pusher = new Pusher(APP_KEY, new PusherOptions()
  {
    Cluster = APP_CLUSTER,
    UserAuthenticator = new HttpUserAuthenticator("http://example.com/pusher/user-auth")
  });
```

{% endsnippets %}

## Sign in

When the `signin` method is called, the [user authentication process](/docs/channels/server_api/authenticating-users) will be triggered.

{% methodwrap %}
{% snippets ['js', 'java', 'c'], true %}

```js
pusher.signin();
```

```java
pusher.signin();
```

```c
pusher.User.Signin();
```

{% endsnippets %}
{% endmethodwrap %}

This will cause the client library to call the user authentication endpoint on your application server or to use your custom handler if that was provided to retrieve a signed authentication token and user information. These are then sent to Pusher servers for sign in. A successful sign in will result in the client receiving a `pusher:signin_success` event. In case of error, the client receives a `pusher:error` event.

## Additional headers and parameters in the user authentication request

Depending on your application's needs, you might need to add more information to the user authentication request made to your server's endpoint. This can be done by adding extra parameters or headers to the request. These are set up when initializing the Pusher object.

{% methodwrap %}
{% snippets ['js'], true %}

```js
const pusher = new Pusher(APP_KEY, {
  userAuthentication: {

    // Parameters to be added to every request
    params: { param1: 'example-1' },

    // Headers to be added to every request
    headers: { header1: 'example-2' },

    // This function is called on every request and the parameters returned are
    // added to the request
    paramsProvider: () => { return { param2: 'example-3' }; },

    // This function is called on every request and the headers returned are
    // added to the request
    headersProvider: () => { return { header2: 'example-4' }; },
  },
});
```

{% endsnippets %}
{% endmethodwrap %}


## Events

See [binding to events](/docs/channels/using_channels/events#binding-to-events) for general information about how to bind to events on the connection or on the user object.
