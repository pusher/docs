---
date: 2021-08-01
title: Pusher Channels Docs | How to authorize users
description: Find out how to implement authorization endpoints in your app and ensure that only authorized users can access sensitive info in private and presence channels.
layout: channels.njk
eleventyNavigation:
  parent: Server api
  key: Authorizing users
  order: 5
---

# Authorizing users

Pusher provides mechanisms for both authenticating and authorizing users. Our definition of this is that the former identifies who a user is, while the latter controls access by a given user to certain resources.

Since your servers are the authority on who your users are, and what they can access, our clients libraries are able to make callbacks to endpoints of your choice to supply signed authentication and authorization tokens for the bearing user.

This page discusses implementing a user authorization endpoint using the Pusher Channels server libraries. If you're looking for information on implemeting a user authentication endpoint, check the [Authenticating users page](/docs/channels/server_api/authenticating-users).

> Pusher Channels originally supported pure authorization in private channels. With these authorization tokens it was not evident who the bearer was, but their token allowed them access to certain private channels. In presence channels, we added user info to the authorization token to provide extra information about who was connected (so that it could be distributed to other members of a channel). These tokens function as authentication and authorization within the scope of the presence channel.
>
> We now support [User authentication](docs/channels/server_api/authenticating-users) to extend this scheme and to add more functionality. We’ve made this backwards compatible with the old presence channel authorization mechanism, but we do encourage users to adopt the newer styles that will be used in future to add additional features.
>
> Note that in libraries that haven't been updated yet, the authorization function is still called `authenticate`.


## Channel subscription authorization

Pusher Channels will only allow a connection to subscribe to a [private channel](/docs/channels/using_channels/private-channels) or [presence channel](/docs/channels/using_channels/presence-channels) if the connection provides an authorization token signed by your server. This lets you restrict access. For example, if only your user Bob should be able to see the events in the channel `private-user-bob`, your server should only give Bob an auth token for this channel. Your server can also add user data to the auth token, which is used by [presence channels](/docs/channels/using_channels/presence-channels) to [tell all subscribers who else is subscribed](/docs/channels/using_channels/presence-channels#events). When your client subscribes to a private or presence channel, the Channels client library requests an authorization token from your server:

![Authorization Process](./img/private-channel-auth-process.png)

You can start with an authorization endpoint that authorizes every request it receives. You can do that with [pusher-channels-auth-example](https://github.com/pusher/pusher-channels-auth-example) , or by copy-pasting one of the examples below. (If you don't see your language listed, you can [implement your own authorization endpoint](/docs/channels/library_auth_reference/auth-signatures) or [get in touch](https://pusher.com/support).)

#### Implementing the authorization endpoint for a private channel

{% snippets ['rb', 'Drupal', 'laravel', 'Wordpress', 'node', 'c', 'py', 'go', 'bash'] %}

```rb
class PusherController < ApplicationController
  def auth
    if current_user
      response = Pusher.authenticate(params[:channel_name], params[:socket_id])
      render json: response
    else
      render text: 'Forbidden', status: '403'
    end
  end
end
```

```php
global $user;
if ($user->uid) {
  echo $pusher->authorizeChannel($_POST['channel_name'], $_POST['socket_id']);
} else {
  header('', true, 403);
  echo "Forbidden";
}
```

```php
// More information: https://laravel.com/docs/master/broadcasting#authorizing-channels

// The user will have already been authenticated by Laravel. In the
// below callback, we can check whether the user is _authorized_ to
// subscribe to the channel.

// In routes/channels.php
Broadcast::channel('user.{userId}', function ($user, $userId) {
  return $user->id === $userId;
});
```

```php
if ( is_user_logged_in() ) {
  echo $pusher->authorizeChannel($_POST['channel_name'], $_POST['socket_id']);
} else {
  header('', true, 403);
  echo "Forbidden";
}
```

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
app.post("/pusher/auth", (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const authReponse = pusher.authorizeChannel(socketId, channel);
  res.send(authResponse);
});

const port = process.env.PORT || 5000;
app.listen(port);
```

```c
using PusherServer;
public class MyController : Controller {
  public ActionResult Auth(string channel_name, string socket_id) {
    var auth = pusher.Authenticate( channel_name, socketId );
    var json = auth.ToJson();
    return new ContentResult { Content = json, ContentType = "application/json" };
  }
}
```

```py
@app.route("/pusher/auth", methods=['POST'])
def pusher_authentication():

  # pusher_client is obtained through pusher.Pusher( ... )
  auth = pusher_client.authenticate(
    channel=request.form['channel_name'],
    socket_id=request.form['socket_id']
  )
  return json.dumps(auth)
```

```go
func pusherAuth(res http.ResponseWriter, req *http.Request) {
  params, _ := ioutil.ReadAll(req.Body)
  response, err := pusherClient.AuthenticatePrivateChannel(params)

  if err != nil {
    panic(err)
  }

  fmt.Fprintf(res, string(response))
}

func main() {
  http.HandleFunc("/pusher/auth", pusherAuth)
  http.ListenAndServe(":5000", nil)
}
```

```bash
#This will authorize _all_ users. Only use for debugging!
pusher channels generate auth-server --app-id APP_ID
```

{% endsnippets %}

#### Implementing the authorization endpoint for a presence channel

{% snippets ['rb', 'Drupal', 'laravel', 'Wordpress', 'js', 'c', 'py', 'go'] %}

```rb
class PusherController < ApplicationController
  def auth
    if current_user
      response = Pusher.authenticate(params[:channel_name], params[:socket_id], {
        user_id: current_user.id, # => required
        user_info: { # => optional - for example
          name: current_user.name,
          email: current_user.email
        }
      })
      render json: response
    else
      render text: 'Forbidden', status: '403'
    end
  end
end
```

```php
global $user;
if ($user->uid) {
  $presence_data = array('name' => $user->name);
  echo $pusher->presence_auth($_POST['channel_name'], $_POST['socket_id'], $user->uid, $presence_data);
} else {
  header('', true, 403);
  echo( "Forbidden" );
}
```

```php
// More information: https://laravel.com/docs/master/broadcasting#authorizing-channels
//
// The user will have already been authenticated by Laravel. In the
// below callback, we can check whether the user is _authorized_ to
// subscribe to the channel.
//
// In routes/channels.php
Broadcast::channel('user.{userId}', function ($user, $userId) {
  if ($user->id === $userId) {
    return array('name' => $user->name);
  }
});
```

```php
if ( is_user_logged_in() ) {
  global $current_user;
  get_currentuserinfo();
  $presence_data = array('name' => $current_user->display_name);
  echo $pusher->presence_auth($_POST['channel_name'], $_POST['socket_id'], $current_user->ID, $presence_data);
} else {
  header('', true, 403);
  echo( "Forbidden" );
}
```

```js
// npm install pusher
// npm install express
// npm install cors

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
app.post("/pusher/auth", function (req, res) {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const presenceData = {
    user_id: "unique_user_id",
    user_info: { name: "Mr Channels", twitter_id: "@pusher" },
  };
  const authResponse = pusher.authorizeChannel(socketId, channel, presenceData);
  res.send(authResponse);
});
const port = process.env.PORT || 5000;
app.listen(port);
```

```c
using PusherServer;

public class MyController : Controller {
  public ActionResult Auth(string channel_name, string socket_id) {
    var channelData = new PresenceChannelData() {
      user_id: "unique_user_id",
      user_info: new {
        name = "Mr Channels",
        twitter_id = "@pusher"
      }
    };
    var auth = pusher.Authenticate( channelName, socketId, channelData );
    var json = auth.ToJson();
    return new ContentResult { Content = json, ContentType = "application/json" };
  }
}
```

```py
@app.route("/pusher/auth", methods=['POST'])
def pusher_authentication():

  # pusher_client is obtained through pusher_client = pusher.Pusher( ... )
  auth = pusher_client.authenticate(
    channel=request.form['channel_name'],
    socket_id=request.form['socket_id'],
    custom_data={
      u'user_id': u'1',
      u'user_info': {
        u'twitter':
        u'@pusher'
      }
    }
  )
  return json.dumps(auth)
```

```go
params, _ := ioutil.ReadAll(req.Body)
presenceData := pusher.MemberData{
  UserId: "1",
  UserInfo: map[string]string{
    "twitter": "pusher",
  },
}
response, err := pusherClient.AuthenticatePresenceChannel(params, presenceData)

if err != nil {
  panic(err)
}

fmt.Fprintf(res, response)
```

{% endsnippets %}

## Response

In all cases, the format of the response is very similar:

- **Unsuccessful** responses from an authorization endpoint should serve a `403 Forbidden` HTTP status.
- **Successful** responses from an authorization endpoint should carry a `200 OK` HTTP status and a body of the form
  ```json
  { "auth": "$AUTHORIZATION_STRING" }
  ```
  Authorization of a presence channel is performed in exactly the same way as a private channel but the JSON response must also have a `channel_data` property containing information that you wish to share about the current user. For more details of this format, see [generating the authorization string](/docs/channels/library_auth_reference/auth-signatures).

## Client-side: setting the authorization endpoint

The destination of the authentication and authorization requests can be configured.

{% methodwrap %}
{% snippets ['js', 'objc', 'java', 'laravelecho'], true %}

```js
new Pusher("app_key", { channelAuthorization: { endpoint: "/pusher_auth.php"}  });
```

```objc
self.pusher.authorizationURL = [NSURL URLWithString:@"http://www.yourserver.com/authorize"];
```

```java
HttpAuthorizer authorizer = new HttpAuthorizer("http://example.com/some_auth_endpoint");
PusherOptions options = new PusherOptions().setAuthorizer(authorizer);
Pusher pusher = new Pusher(YOUR_APP_KEY, options);
```

```js
window.Echo = new Echo({
  broadcaster: "pusher",
  key: "APP_KEY",
  forceTLS: true,
  authEndpoint: "/broadcasting/auth",
});
```

{% endsnippets %}

{% conditionalContent ['js', 'laravelecho'] %}

The default value for this is `/pusher/auth`.

{% endconditionalContent %}

{% conditionalContent 'objc', false %}

In order to connect to a private or presence channel using libPusher, you first need to configure your server authorisation URL.

When you attempt to connect to a private or presence channel, libPusher will make a form-encoded POST request to the above URL, passing along the `socket_id` and `channel_name` as parameters. Prior to sending the request, the `PTPusherDelegate` will be notified. The delegate function is passed an `operation` parameter, which allows you to access the `NSMutableURLRequest` instance that will be sent.

It is up to you to configure the request to handle whatever authentication mechanism you are using. In this example, we set a custom header with a token which the server will use to authenticate the user before proceeding with authorisation.

```objc
- (void)pusher:(PTPusher *)pusher willAuthorizeChannel:(PTPusherChannel *)channel withAuthOperation:(PTPusherChannelAuthorizationOperation *)operation {
  [operation.mutableURLRequest setValue:@"some-authentication-token" forHTTPHeaderField:@"X-MyCustom-AuthTokenHeader"];
}
```

{% endconditionalContent %}
{% endmethodwrap %}

### CSRF-protected authorization endpoint

If the endpoint is protected by a CSRF filter, then you can pass in a CSRF token via the `channelAuthorization` hash under `headers`.

```js
var pusher = new Pusher("app_key", {
  channelAuthorization: {
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
    channelAuthorization: {
      endpoint: "/pusher/auth",
      headers: { "X-CSRF-Token": "<%= form_authenticity_token %>" },
    },
  });
</script>
```

## Batching authorization requests (aka multi-auth)

Currently, pusher-js itself does not support authorizing multiple channels in one HTTP request. However, thanks to [Dirk Bonhomme](https://github.com/dirkbonhomme) you can use the [pusher-js-auth](https://github.com/dirkbonhomme/pusher-js-auth) plugin that buffers subscription requests and sends authorization requests to your endpoint in batches.

## Using JSONP in pusher-js

In the browser, if your authorization endpoint is on a different domain to the web application, you need to work around [the browser's same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). For modern browsers, you should use [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) ; however, for older clients, pusher-js also supports [JSONP](https://en.wikipedia.org/wiki/JSONP). To enable this, set `channelAuthorization.transport: 'jsonp'`:

```html
<script src="//js.pusher.com/{{ env.pusherJSVersion }}/pusher.min.js"></script>
<script>
  var pusher = new Pusher("MY_PUSHER_KEY", {
    channelAuthorization: {
      transport: "jsonp",
      endpoint: "http://myserver.com/pusher_jsonp_auth",
    },
  });
</script>
```

With this set, the authorization request parameters are passed in the query string, and an additional parameter called `callback` will be passed to the authorization endpoint. The authorization response must then be JavaScript that calls the named `callback` function with the authorization response. Here are some examples of generating this response for private channels:

{% snippets ['rb', 'js', 'PHP/Drupal', 'PHP/Wordpress'] %}

```rb
class PusherController < ApplicationController

  def auth
    if current_user
      auth = Pusher.authenticate(params[:channel_name], params[:socket_id])

      render(
        text: "#{params[:callback]} (#{auth.to_json})",
        content_type: 'application/javascript'
      )
    else
      render text: 'Forbidden', status: '403'
    end
  en

end
```

```js
// Express.js setup
// http://expressjs.com/

...

app.get("/pusher/auth", (req, res) => {
  const query = req.query;
  const socketId = query.socket_id;
  const channel = query.channel_name;
  const callback = query.callback;

  const presenceData = {
    user_id: "some_id",
    user_info: {
      name: "John Smith"
    }
  };

  const auth = JSON.stringify(
    pusher.authorizeChannel(socketId, channel, presenceData)
  );
  const cb = callback.replace(/\\"/g,"") + "(" + auth + ");";

  res.set({
    "Content-Type": "application/javascript"
  });

  res.send(cb);
});
```

```php
global $user;
    if ($user->uid)
    {
      $pusher = new Pusher(APP_KEY, APP_SECRET, APP_ID);
      $auth = $pusher->authorizeChannel($_GET['channel_name'], $_GET['socket_id']);

      $callback = str_replace('\\', '', $_GET['callback']);
      header('Content-Type: application/javascript');
      echo($callback . '(' . $auth . ');');
    }
    else
    {
      header('', true, 403);
      echo "Forbidden";
    }
```

```php
if ( is_user_logged_in() )
    {
      $pusher = new Pusher(APP_KEY, APP_SECRET, APP_ID);
      $auth = $pusher->authorizeChannel($_GET['channel_name'], $_GET['socket_id']);

      $callback = str_replace('\\', '', $_GET['callback']);
      header('Content-Type: application/javascript');
      echo($callback . '(' . $auth . ');');
    }
    else
    {
      header('', true, 403);
      echo "Forbidden";
    }
```

{% endsnippets %}
