---
date: 2021-08-01
title: Pusher Channels Docs | How to authenticate users
description: Find out how to implement an authentication endpoint in your app.
layout: channels.njk
eleventyNavigation:
  parent: Server api
  key: Authenticating users
  order: 4
---

# Authenticating users

Pusher provides mechanisms for both authenticating and authorizing users. Our definition of this is that the former identifies who a user is, while the latter controls access by a given user to certain resources.

Since your servers are the authority on who your users are, and what they can access, our [client libraries are able to make calls to endpoints of your choice](/docs/channels/using_channels/user-authentication) to supply signed authentication and authorization tokens for the bearing user.

This page discusses implementing a user authentication endpoint using the Pusher Channels server libraries. If you're looking for information on implemeting a user authorization endpoint, check the [Authorizing users page](/docs/channels/server_api/authorizing-users).


## User authentication

We authenticate a user once per connection session. Authenticating a user gives your application access to user based features such as sending events to a user based on user id on terminating a user's connections immediately.

When your client calls the `signin` method on a established conenction, the Channels client library requests an authentication token from your server. By default, the Pusher Channels client library expects this endpoint to be at `/pusher/user-auth`, but this can be configured by the client.

You can start with an authentication endpoint that authenticates every request it receives. You can do that by copy-pasting one of the examples below. Note, however, that in order to make this useful, you'll have to change the example to use the actual user id of the correct user. The user object passed to the `authenticateUser` method must include an `id` field with a non-empty string. Your server can also add more user data to the authentication token by adding other properties to the user object.

If you don't see your language listed, you can [implement your own authentication endpoint](/docs/channels/library_auth_reference/auth-signatures) or [get in touch](https://pusher.com/support).

{% snippets ['node'] %}

```js
// First install the dependencies:
// npm install pusher express cors

const express = require("express");
const cors = require("cors");
const Pusher = require("pusher");
const pusher = new Pusher({
  appId: "APP_ID",
  key: "APP_KEY",
  secret: "APP_SECRET",
  cluster: "APP_CLUSTER",
  useTLS: true,
});
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.post("/pusher/user-auth", (req, res) => {
  const socketId = req.body.socket_id;
  const user = {id: 12345}; // Replace this with code to retrieve the actual user id
  const authResponse = pusher.authenticateUser(socketId, user);
  res.send(authResponse);
});

const port = process.env.PORT || 5000;
app.listen(port);

```
{% endsnippets %}


## Response

- **Unsuccessful** responses from an authentication endpoint should serve a `403 Forbidden` HTTP status.
- **Successful** responses from an authentication endpoint should carry a `200 OK` HTTP status and a body of the form
  ```json
  { "auth": "$AUTHORIZATION_STRING", "user_info": "$USER_INFO" }
  ```
## Client-side: setting the authentication endpoint

The destination of the authentication requests can be configured.

{% methodwrap %}
{% snippets ['js'], true %}

```js
new Pusher("app_key", { userAuthentication: { endpoint: "/pusher_user_auth.php"}));
```

{% endsnippets %}

{% conditionalContent ['js'] %}

The default value for this is `/pusher/user-auth`,

{% endconditionalContent %}

{% endmethodwrap %}

### CSRF-protected authentication endpoint

If the endpoint is protected by a CSRF filter, then you can pass in a CSRF token via the `userAuthentication` hash under `headers`.

```js
var pusher = new Pusher("app_key", {
  userAuthentication: {
    endpoint: "/pusher_auth.php",
    headers: { "X-CSRF-Token": "SOME_CSRF_TOKEN" },
  },
});
```

> Note that you should change the name of the CSRF token key to the convention you prefer.

As an example, in Rails, you can inject the CSRF token into Javacript like this using ERB

```erb
<script>
  var pusher = new Pusher("app_key", {
    userAuthentication: {
      endpoint: "/pusher/user-auth",
      headers: { "X-CSRF-Token": "<%= form_authenticity_token %>" },
    },
  });
</script>
```

## Using JSONP in pusher-js

In the browser, if your authentication endpoint is on a different domain to the web application, you need to work around [the browser's same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). For modern browsers, you should use [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) ; however, for older clients, pusher-js also supports [JSONP](https://en.wikipedia.org/wiki/JSONP). To enable this, set `userAuthentication.transport: 'jsonp'`:

```html
<script src="//js.pusher.com/{{ env.pusherJSVersion }}/pusher.min.js"></script>
<script>
  var pusher = new Pusher("MY_PUSHER_KEY", {
    userAuthentication: {
      transport: "jsonp",
      endpoint: "http://myserver.com/pusher_jsonp_user_auth",
    },
  });
</script>
```

With this set, the authentication request parameters are passed in the query string, and an additional parameter called `callback` will be passed to the authentication endpoint. The authentication response must then be JavaScript that calls the named `callback` function with the authentication response. Here are some examples of generating this response for private channels:

{% snippets ['js'] %}

```js
// Express.js setup
// http://expressjs.com/

...

app.get("/pusher/user-auth", (req, res) => {
  const query = req.query;
  const socketId = query.socket_id;
  const callback = query.callback;

  const userInfo = {
    id: "some_id",
    name: "John Smith",
  };

  const auth = JSON.stringify(
    pusher.authenticateUser(socketId, userInfo)
  );
  const cb = callback.replace(/\\"/g,"") + "(" + auth + ");";

  res.set({
    "Content-Type": "application/javascript"
  });

  res.send(cb);
});
```

{% endsnippets %}
