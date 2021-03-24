---
title: JavaScript quick start — Channels — Pusher Docs
layout: channels.njk
eleventyNavigation:
  parent: Sdk quick starts
  key: JavaScript quick start
  order: 1
---

# JavaScript quick start

After following this guide you will have published an event to your web app using Channels. If you have any questions [get in touch](https://pusher.com/support).

## Get your free API keys

[Create an account](https://dashboard.pusher.com/accounts/sign_up), then create a Channels app. Go to the "Keys" page for that app, and make a note of your `app_id`, `key`, `secret` and `cluster`.

## Include the Channels Client

Include the [pusher-js](https://github.com/pusher/pusher-js) script tag on your page.

```html
<script src="https://js.pusher.com/7.0/pusher.min.js"></script>
```

## Open a connection to Channels

Open a connection to Channels using the `key` and `cluster` you noted down earlier.

```js
var pusher = new Pusher("APP_KEY", {
  cluster: "APP_CLUSTER",
});
```

## Subscribe to a channel

You will soon publish an event to a channel called `my-channel`, and your web app will receive this event. But to receive this event, your web app first needs to subscribe to the `my-channel` channel. Do this with `pusher.subscribe`:

```js
var channel = pusher.subscribe("my-channel");
```

## Listen for events on your channel

Every published event has an "event name". The event you will publish will have the event name `my-event`. For your web app to do something when it receives an event called `my-event`, your web app must first "bind" a function to this event name. Do this using the channel’s `bind` method:

## Trigger events from your server

In the examples below we trigger an event named `my-event` to Channels on a channel called `my-channel`. For each example below a server library deals with the server communication.

{% snippets ['rb', 'js', 'php', 'c', 'go', 'py', 'java', 'bash'] %}

```rb
# First, run 'gem install pusher'
require 'pusher'

pusher = Pusher::Client.new(
  app_id: 'APP_ID',
  key: 'APP_KEY',
  secret: 'APP_SECRET',
  cluster: 'APP_CLUSTER'
)

pusher.trigger('my-channel', 'my-event', {:message => 'hello world'})
```

```js
// First, run 'npm install pusher'

var Pusher = require("pusher");

var pusher = new Pusher({
  appId: "APP_ID",
  key: "APP_KEY",
  secret: "APP_SECRET",
  cluster: "APP_CLUSTER",
});

pusher.trigger("my-channel", "my-event", { message: "hello world" });
```

```php
// First, run 'composer require pusher/pusher-php-server'

require __DIR__ . '/vendor/autoload.php';

$pusher = new Pusher\Pusher("APP_KEY", "APP_SECRET", "APP_ID", array('cluster' => 'APP_CLUSTER'));

$pusher->trigger('my-channel', 'my-event', array('message' => 'hello world'));

```

```c
// First, run 'Install-Package PusherServer'

using PusherServer;
using System.Web.Mvc;
using System.Net;
using Your.Config;

public class HelloWorldController : Controller {
  [httpPost]
  public async Task<ActionResult> HelloWorld() {
    var options = new PusherOptions();
    options.Cluster = 'APP_CLUSTER';

    var pusher = new Pusher('APP_ID', 'APP_KEY', 'APP_SECRET', options);
    var result = await pusher.TriggerAsync("my-channel", "my-event", new { message = "hello world" });
    return new HttpStatusCodeResult((int)HttpStatusCode.OK);
  }
}
```

```py
# First, run 'pip install pusher'

import pusher

pusher_client = pusher.Pusher(
  app_id=u'APP_ID',
  key=u'APP_KEY',
  secret=u'APP_SECRET',
  cluster=u'APP_CLUSTER'
)

pusher_client.trigger(u'my-channel', u'my-event', {u'message': u'hello world'})
```

```go
// First, run 'go get github.com/pusher/pusher-http-go'

package main

import "github.com/pusher/pusher-http-go"

func main(){

  pusherClient := pusher.Client{
    AppId: "APP_ID",
    Key: "APP_KEY",
    Secret: "APP_SECRET",
    Cluster: "APP_CLUSTER",
  }

  data := map[string]string{"message": "hello world"}
  pusherClient.Trigger("my-channel", "my-event", data)
}
```

```java
/*
  First, add this Maven dependency:

  <dependency>
    <groupId>com.pusher</groupId>
    <artifactId>pusher-http-java</artifactId>
    <version>1.0.0</version>
  </dependency>
*/

Pusher pusher = new Pusher("APP_ID", "APP_KEY", "APP_SECRET");
pusher.setCluster("APP_CLUSTER");

pusher.trigger("my-channel", "my-event", Collections.singletonMap("message", "Hello World"));
```

```bash
$ pusher channels apps trigger --app-id APP_ID --channel "my-channel" --event "my-event" --message "hello world"
```

{% endsnippets %}

If there isn’t an example in a language that you are familiar with then have a look on our server libraries page to see if anyone has created one in your language.

## Where next?

If you published an event and it triggered your `alert(...)` call, well done! If you had any trouble, [get in touch](https://pusher.com/support). Otherwise, you could look at the more advanced features of the JavaScript client library.
