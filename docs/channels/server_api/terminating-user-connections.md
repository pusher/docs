---
date: 2021-08-01
title: Pusher Channels Docs | How to terminate user connections
description: In some situations, you may want to terminate a user's connections. Check out our docs to find out how.
layout: channels.njk
eleventyNavigation:
  parent: Server api
  key: Terminating user connections
  order: 7
---

# Terminating user connections

In some situations, you may want to terminate a user's connections. For example, you might have a misbehaving user that you want to kick out of your application. This page describes how to achieve that.

> In order to terminate a user's connection, the user must have authenticated. Check the [Server user authentication docs](/docs/channels/server_api/authenticating-users) for information on how to create a user authentication endpoint.


How to terminate all connections established by a given user knowing their user id is shown below. This should be done by your application server using one of our server SDKs. Note that this only terminates the user's active connections. This means that, if nothing else is done, the user will be able to reconnect.

{% methodwrap %}
{% snippets ['js', 'php'], true %}

```js
pusher.terminateUserConnections("user-id");
```

```php
$pusher->terminateUserConnections('user-id');
```

{% endsnippets %}
{% endmethodwrap %}

>Note that this will only terminate connections that have successfully completed the [user authentication flow](/docs/channels/server_api/authenticating-users). Connnections for users subscribed to presence channels but that have not been authenticated via this flow will not be terminated.

## Banning users

As mentioned, the example above only terminates the user's active connections. In order to disallow a user to reconnect, your application needs to reject further attempts to authenticate as that user. This is easily done, because, as described in the [user authentication documentation](/docs/channels/server_api/authenticating-users), it is your application that is in control of user authentication. Therefore, banning a user is a two step process that must be done in your application server.

1. Ensure authentication requests for the user to be banned are rejected.
2. Issue the call to terminate the user's connections as shown in the previous section.
