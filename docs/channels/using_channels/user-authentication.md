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


{% snippets ['js','java'], true %}

```js
const pusher = new Pusher(APP_KEY, {
  userAuthentication: {
    endpoint: "/pusher/user-auth",
    transport: "ajax",
    params: {},
    headers: {},
    customHandler: null,
  },
});
```

```java
PusherOptions options =
  new PusherOptions()
    .setUserAuthenticator(new HttpUserAuthenticator("/pusher/user-auth"));

Pusher pusher = new Pusher(APP_KEY, options);
```

{% endsnippets %}

## Sign in

When the `signin` method is called, the [user authentication process](/docs/channels/server_api/authenticating-users) will be triggered.

{% methodwrap %}
{% snippets ['js', 'java'], true %}

```js
pusher.signin();
```

```java
pusher.signin();
```

{% endsnippets %}
{% endmethodwrap %}

This will cause the client library to call the user authentication endpoint on your application server or to use your custom handler if that was provided to retrieve a signed authentication token and user information. These are then sent to Pusher servers for sign in. A successful sign in will result in the client receiving a `pusher:signin_success` event. In case of error, the client receives a `pusher:error` event.

## Events

See [binding to events](/docs/channels/using_channels/events#binding-to-events) for general information about how to bind to events on the connection or on the user object.
