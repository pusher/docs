---
title: Authenticating users - Channels - Pusher Docs
layout: channels.njk
eleventyNavigation:
  parent: Server api
  key: Authenticating users
  order: 4
---

# Authenticating users

Pusher Channels will only allow a connection to subscribe to a [private channel](/docs/channels/using_channels/private-channels) or [presence channel](/docs/channels/using_channels/presence-channels) if the connection provides an auth token signed by your server. This lets you restrict access. For example, if only your user Bob should be able to see the events in the channel `private-user-bob`, your server should only give Bob an auth token for this channel. Your server can also add user data to the auth token, which is used by [presence channels](/docs/channels/using_channels/presence-channels) to [tell all subscribers who else is subscribed](/docs/channels/using_channels/presence-channels#events) . When your client subscribes to a private or presence channel, the Channels client library requests an auth token from your server:
<Image src="/docs/static/channels/media/private-channel-auth-process.png" alt="Auth Process" />

# Server-side: implementing authentication endpoints

You can start with an authentication endpoint that authorizes every request it receives. You can do that with [pusher-channels-auth-example](https://github.com/pusher/pusher-channels-auth-example) , or by copy-pasting one of the examples below. (If you don't see your language listed, you can [implement your own authentication endpoint](/docs/channels/library_auth_reference/auth-signatures) or [get in touch](https://pusher.com/support).)

## Implementing the auth endpoint for a private channel

{% snippets ['rb', 'php', 'php', 'php', 'bash', 'js', 'c', 'py', 'go', 'bash'] %}

```rb
class PusherController < ApplicationController def auth if current_user response = Pusher.authenticate(params[:channel_name], params[:socket_id]) render json: response else render text: 'Forbidden', status: '403' end end end
```

```php
global $user; if ($user->uid) { echo $pusher->socket_auth($_POST['channel_name'], $_POST['socket_id']); } else { header('', true, 403); echo "Forbidden"; }
```

```php
// More information: https://laravel.com/docs/master/broadcasting#authorizing-channels // // The user will have already been authenticated by Laravel. In the // below callback, we can check whether the user is _authorized_ to // subscribe to the channel. // // In routes/channels.php Broadcast::channel('user.{userId}', function ($user, $userId) { return $user->id === $userId; });
```

```php
if ( is_user_logged_in() ) { echo $pusher->socket_auth($_POST['channel_name'], $_POST['socket_id']); } else { header('', true, 403); echo "Forbidden"; }
```

```bash
npm install pusher npm install express npm install body-parser npm install cors
```

```js
const express = require("express");
const bodyParser = require("body-parser");
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.post("/pusher/auth", function (req, res) {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});
const port = process.env.PORT || 5000;
app.listen(port);
```

```c
using PusherServer; public class MyController : Controller { public ActionResult Auth(string channel_name, string socket_id) { var auth = pusher.Authenticate( channel_name, socketId ); var json = auth.ToJson(); return new ContentResult { Content = json, ContentType = "application/json" }; } }
```

```py
@app.route("/pusher/auth", methods=['POST']) def pusher_authentication(): # pusher_client is obtained through pusher.Pusher( ... ) auth = pusher_client.authenticate( channel=request.form['channel_name'], socket_id=request.form['socket_id'] ) return json.dumps(auth)
```

```go
func pusherAuth(res http.ResponseWriter, req *http.Request) { params, _ := ioutil.ReadAll(req.Body) response, err := pusherClient.AuthenticatePrivateChannel(params) if err != nil { panic(err) } fmt.Fprintf(res, string(response)) } func main() { http.HandleFunc("/pusher/auth", pusherAuth) http.ListenAndServe(":5000", nil) }
```

```bash
#This will authorize _all_ users. Only use for debugging! pusher channels generate auth-server --app-id APP_ID
```

{% endsnippets %}

## Implementing the auth endpoint for a presence channel

{% snippets ['rb', 'php', 'php', 'php', 'bash', 'js', 'c', 'py', 'go'] %}

```rb
class PusherController < ApplicationController def auth if current_user response = Pusher.authenticate(params[:channel_name], params[:socket_id], { user_id: current_user.id, # => required user_info: { # => optional - for example name: current_user.name, email: current_user.email } }) render json: response else render text: 'Forbidden', status: '403' end end end
```

```php
global $user; if ($user->uid) { $presence_data = array('name' => $user->name); echo $pusher->presence_auth($_POST['channel_name'], $_POST['socket_id'], $user->uid, $presence_data); } else { header('', true, 403); echo( "Forbidden" ); }
```

```php
// More information: https://laravel.com/docs/master/broadcasting#authorizing-channels // // The user will have already been authenticated by Laravel. In the // below callback, we can check whether the user is _authorized_ to // subscribe to the channel. // // In routes/channels.php Broadcast::channel('user.{userId}', function ($user, $userId) { if ($user->id === $userId) { return array('name' => $user->name); } });
```

```php
if ( is_user_logged_in() ) { global $current_user; get_currentuserinfo(); $presence_data = array('name' => $current_user->display_name); echo $pusher->presence_auth($_POST['channel_name'], $_POST['socket_id'], $current_user->ID, $presence_data); } else { header('', true, 403); echo( "Forbidden" ); }
```

```bash
npm install pusher npm install express npm install body-parser npm install cors
```

```js
const express = require("express");
const bodyParser = require("body-parser");
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.post("/pusher/auth", function (req, res) {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const presenceData = {
    user_id: "unique_user_id",
    user_info: { name: "Mr Channels", twitter_id: "@pusher" },
  };
  const auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
});
const port = process.env.PORT || 5000;
app.listen(port);
```

```c
using PusherServer; public class MyController : Controller { public ActionResult Auth(string channel_name, string socket_id) { var channelData = new PresenceChannelData() { user_id: "unique_user_id", user_info: new { name = "Mr Channels", twitter_id = "@pusher" } }; var auth = pusher.Authenticate( channelName, socketId, channelData ); var json = auth.ToJson(); return new ContentResult { Content = json, ContentType = "application/json" }; } }
```

```py
@app.route("/pusher/auth", methods=['POST']) def pusher_authentication(): # pusher_client is obtained through pusher_client = pusher.Pusher( ... ) auth = pusher_client.authenticate( channel=request.form['channel_name'], socket_id=request.form['socket_id'], custom_data={ u'user_id': u'1', u'user_info': { u'twitter': u'@pusher' } } ) return json.dumps(auth)
```

```go
params, _ := ioutil.ReadAll(req.Body) presenceData := pusher.MemberData{ UserId: "1", UserInfo: map[string]string{ "twitter": "pusher", }, } response, err := pusherClient.AuthenticatePresenceChannel(params, presenceData) if err != nil { panic(err) } fmt.Fprintf(res, response)
```

{% endsnippets %}

## General notes

In all cases, the format of the response is very similar:

- **Unsuccessful** responses from an authentication endpoint should serve a `403 Forbidden` HTTP status. \* **Successful** responses from an authentication endpoint should carry a `200 OK` HTTP status and a body of the form <InlineCode language="json"> {'{ "auth": "$AUTHORIZATION_STRING" }'} `. Authentication of a presence channel is performed in exactly the same way as a private channel but the JSON response must also have a`channel_data` property containing information that you wish to share about the current user. For more details of this format, see [generating the authentication string](/docs/channels/library_auth_reference/auth-signatures) .

# Client-side: setting the Channel Authentication endpoint

The destination of the authentication request can be configured.

{% snippets ['js', 'objc', 'objc', 'java', 'js'] %}

```js
new Pusher("app_key", { authEndpoint: "/pusher_auth.php" });
```

The default value for this is: `/pusher/auth`

In order to connect to a private or presence channel using libPusher, you first need to configure your server authorisation URL.

```objc
self.pusher.authorizationURL = [NSURL URLWithString:@"http://www.yourserver.com/authorize"];
```

When you attempt to connect to a private or presence channel, libPusher will make a form-encoded POST request to the above URL, passing along the `socket_id` and `channel_name` as parameters. Prior to sending the request, the `PTPusherDelegate` will be notified. The delegate function is passed an `operation` parameter, which allows you to access the `NSMutableURLRequest` instance that will be sent.

It is up to you to configure the request to handle whatever authentication mechanism you are using. In this example, we set a custom header with a token which the server will use to authenticate the user before proceeding with authorisation.

```objc
- (void)pusher:(PTPusher *)pusher willAuthorizeChannel:(PTPusherChannel *)channel withAuthOperation:(PTPusherChannelAuthorizationOperation *)operation { [operation.mutableURLRequest setValue:@"some-authentication-token" forHTTPHeaderField:@"X-MyCustom-AuthTokenHeader"]; }
```

```java
HttpAuthorizer authorizer = new HttpAuthorizer("http://example.com/some_auth_endpoint"); PusherOptions options = new PusherOptions().setAuthorizer(authorizer); Pusher pusher = new Pusher(YOUR_APP_KEY, options);
```

```js
window.Echo = new Echo({
  broadcaster: "pusher",
  key: "APP_KEY",
  forceTLS: true,
  authEndpoint: "/broadcasting/auth",
});
```

The default value for this is: `/pusher/auth`

{% endsnippets %}

# CSRF-protected authentication endpoints

If the authentication endpoint is protected by a CSRF filter, then you can pass in a CSRF token via the `auth` hash under `headers`.

```js
var pusher = new Pusher("app_key", {
  authEndpoint: "/pusher_auth.php",
  auth: { headers: { "X-CSRF-Token": "SOME_CSRF_TOKEN" } },
});
```

Note that you should change the name of the CSRF token key to the convention you prefer.

As an example, in Rails, you can inject the CSRF token into Javacript like this using ERB

```rb
<script> var pusher = new Pusher('app_key', { authEndpoint: '/pusher/auth', auth: { headers: { 'X-CSRF-Token': "<%= form_authenticity_token %>" } } }); </script>
```

# Batching auth requests (aka multi-auth)

Currently, pusher-js itself does not support authenticating multiple channels in one HTTP request. However, thanks to [Dirk Bonhomme](https://github.com/dirkbonhomme) you can use the [pusher-js-auth](https://github.com/dirkbonhomme/pusher-js-auth) plugin that buffers subscription requests and sends auth requests to your endpoint in batches.

# Using JSONP in pusher-js

In the browser, if your authentication endpoint is on a different domain to the web application, you need to work around [the browser's same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) . For modern browsers, you should use [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) ; however, for older clients, pusher-js also supports [JSONP](https://en.wikipedia.org/wiki/JSONP). To enable this, set `authTransport: 'jsonp'`:

```html
<script src="//js.pusher.com/${process.env.CURRENT_JS_VERSION}/pusher.min.js"></script>
<script>
  var pusher = new Pusher("MY_PUSHER_KEY", {
    authTransport: "jsonp",
    authEndpoint: "http://myserver.com/pusher_jsonp_auth",
  });
</script>
```

With this set, the auth request parameters are passed in the query string, and an additional parameter called `callback` will be passed to the authentication endpoint. The authentication response must then be JavaScript that calls the named `callback` function with the authentication response. Here are some examples of generating this response for private channels:

{% snippets ['rb', 'js', 'php', 'php'] %}

```rb
class PusherController < ApplicationController

      def auth
        if current_user
          auth = Pusher.authenticate(params[:channel_name], params[:socket_id])

          render(
            text: params[:callback] + "(" + auth.to_json + ")",
            content_type: 'application/javascript'
          )
        else
          render text: 'Forbidden', status: '403'
        end
      end
    end
```

```js
// Express.js setup
    // http://expressjs.com/

    ...

    app.get("/pusher/auth", function(req, res) {
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
        pusher.authenticate(socketId, channel, presenceData)
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
      $auth = $pusher->socket_auth($_GET['channel_name'], $_GET['socket_id']);

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
      $auth = $pusher->socket_auth($_GET['channel_name'], $_GET['socket_id']);

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
