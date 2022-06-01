---
date: 2021-08-01
title: Pusher Channels Docs | Sending events to authenticated users
description: How to send events to authenticated users with their user id
layout: channels.njk
eleventyNavigation:
  parent: Server api
  key: Sending events to authenticated users
  order: 6
---

# Sending events to authenticated users

When your application client authenticates users on their Pusher Channels connection, your application server is able to send events to users knowing their user id without them having to subscribe to channels in advance. An example follows.

Check:
- The [Client user authentication docs](/docs/channels/using_channels/user-authentication) for information on how to authenticate a user on the client.
- The [Events docs](/docs/channels/using_channels/events/#binding-on-the-user-object) for information on how to handle events sent to authenticated users on the client.
- The [Server user authentication docs](/docs/channels/server_api/authenticating-users) for information on how to create a user authentication endpoint.

{% methodwrap %}
{% snippets ['js', 'php'], true %}

```js
pusher.sendToUser("user-id", "event-name", { message: "hello world" });
```

```php
$pusher->sendToUser('user-id', 'event-name', [ 'message' => 'hello world' ]);
```

{% endsnippets %}
{% endmethodwrap %}
