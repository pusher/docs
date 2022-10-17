---
date: 2021-08-01
title: Pusher Channels Docs | JavaScript Quick Start Guide
description: Use our JavaScript quick start guide to get set up with Channels and publish the first event to your web app.
layout: channels.njk
eleventyNavigation:
  parent: Sdk quick starts
  key: JavaScript quick start
  order: 1
---

# JavaScript quick start

To publish an event to your web app using Pusher Channels, follow this guide. 
If you need any help, get in [get in touch](https://support.pusher.com/hc/en-us/requests/new).

## Get your free API keys

[Create an account](https://dashboard.pusher.com/accounts/sign_up) and then create a Channels app. To get API keys, from the Pusher Dashboard, navigate to **App Keys**. Copy your `app_id`, `key`, `secret`, and `cluster`.

## Include the Channels Client

Include the [pusher-js](https://github.com/pusher/pusher-js) script tag on your page.

```html
<script src="https://js.pusher.com/{{ env.pusherJSVersion }}/pusher.min.js"></script>
```

## Open a connection to Channels

Open a connection to Channels using the `key` and `cluster` you copied earlier.

```js
var pusher = new Pusher("APP_KEY", {
  cluster: "APP_CLUSTER",
});
```

## Subscribe to a channel

Before your web app can receive the event you publish, your web app needs to subscribe to the `my-channel` channel channel. Do this with `pusher.subscribe`.

```js
var channel = pusher.subscribe("my-channel");
```

## Listen for events on your channel

Every published event has an "event name". The event you will publish will have the event name `my-event`. For your web app to do something when it receives an event called `my-event`, your web app must first "bind" a function to this event name. Do this using the channel’s `bind` method:

```js
channel.bind("my-event", (data) => {
  // Method to be dispatched on trigger.
});
```

## Trigger events from your server

In the examples below, we trigger an event named `my-event` to Channels on a channel called `my-channel`. For each example below, a server library deals with the server communication.

{% snippets ['rb', 'js', 'php', 'c', 'py', 'go', 'java', 'bash'] %}

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

If there isn’t an example in a language that you are familiar with then check out [Channels server libraries](https://pusher.com/docs/channels/channels_libraries/libraries/) to see if anyone has created one in your language.

## Where next?

If you published an event and it triggered your `alert(...)` call, well done! If you had any trouble, [get in touch](https://support.pusher.com/hc/en-us/requests/new). Otherwise, check out more advanced features of the JavaScript client library.
