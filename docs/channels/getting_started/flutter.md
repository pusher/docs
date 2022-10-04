---
date: 2022-02-16
title: Pusher Channels Docs | Flutter Quick Start Guide
description: Use our Flutter quick start guide to get set up with Channels and publish the first event to your web, IOS, and Android app.
layout: channels.njk
eleventyNavigation:
  parent: Sdk quick starts
  key: Flutter quick start
  order: 4
---

# Flutter quick start

This guide uses the [pusher-channels-flutter](https://github.com/pusher/pusher-channels-flutter) library and a selection of [Server API libraries](/docs/channels/channels_libraries/libraries). We also have a guide for our [JavaScript client](/docs/channels/getting_started/javascript), and building for apps with our [Java client](/docs/channels/getting_started/android) for Android and [Swift client](/docs/channels/getting_started/ios) for IOS.

If you have any questions, [get in touch](https://support.pusher.com/hc/en-us/requests/new).

## Get your free API keys

[Create an account](https://dashboard.pusher.com/accounts/sign_up) and then create a Channels app. To get API keys, from the Pusher Dashboard, navigate to **App Keys**. Copy your `app_id`, `key`, `secret`, and `cluster`.

## Install the library

Add the library as a dependency to your project.

```bash
flutter pub add pusher_channels_flutter
```

## Create a connection

Open a connection to Channels using the `key` and `cluster` you copied earlier.

```dart
await pusher.init(
  apiKey: API_KEY,
  cluster: API_CLUSTER
);
await pusher.connect();
```

### Subscribe to a public channel

Before your web app can receive the event you publish, your web app needs to subscribe to the `my-channel` channel channel. Do this with `pusher.subscribe`.

```dart
final myChannel = await pusher.subscribe(
  channelName: "my-channel"
  onEvent: onEvent
);
```

## Listen for events

Once you have created an instance of `Channel`, set up event listener.

```dart
void onEvent(PusherEvent event) {
  log("onEvent: $event");
}
```

It is possible to listen to events on any channel or globally. Check out the complete [list of available parameters and listeners](https://github.com/pusher/pusher-channels-flutter#table-of-contents).

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
  Add this Maven dependency:

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

If there isn’t an example in a language that you are familiar with then refer to [Channels server libraries](/docs/channels/channels_libraries/libraries) page to check if anyone has created one in your language.

## Where next?

To see how the Flutter library for Pusher can be used to build multi-platform applications for Web, IOS, and Android, refer to the source code of a [sample application](https://github.com/pusher/pusher-channels-flutter/tree/master/example).
