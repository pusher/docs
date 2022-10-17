---
date: 2022-06-30
title: Pusher Channels Docs | React Native Quick Start Guide
description: Use our React Native quick start guide to get set up with Channels and publish the first event to your IOS and Android app.
layout: channels.njk
eleventyNavigation:
  parent: Sdk quick starts
  key: React Native quick start
  order: 4
---
# React Native quick start

Use the following instructions to get started with Channels. If you have any questions [get in touch](https://support.pusher.com/hc/en-us/requests/new). 

This guide uses the [pusher-websocket-react-native](https://github.com/pusher/pusher-websocket-react-native) library and a selection of [Server API libraries](/docs/channels/channels_libraries/libraries). Additionally, we have a guide for our [Java client](/docs/channels/getting_started/android) for Android and [Swift client](/docs/channels/getting_started/ios) for IOS.

## Get your free API keys

[Create a free account](https://dashboard.pusher.com/accounts/sign_up) and log in. On the dashboard, under [**Channels**](https://dashboard.pusher.com/channels), click **Manage** > **Create app**. then create a Channels app. From the left-side navigation, click **App Keys** and make a note of your `app_id`, `key`, `secret`, and `cluster`.

## Install the library

Add the library as a dependency to your project.

```bash
yarn add @pusher/pusher-websocket-react-native
```

or 

```bash
npm install @pusher/pusher-websocket-react-native
```

## Create a connection

Open a connection to Channels using the `key` and `cluster` you noted down earlier.

```typescript
const pusher = Pusher.getInstance();

await pusher.init({
  apiKey: API_KEY,
  cluster: API_CLUSTER
});

await pusher.connect();
```

### Subscribe to a public channel

You will soon publish an event to a channel called `my-channel`, and your app will receive this event. But to receive this event, your app first needs to subscribe to the `my-channel` channel. Do this with `pusher.subscribe`:

```typescript
let myChannel = await pusher.subscribe({
  channelName: "my-channel",
  onEvent: (event: PusherEvent) => {
    console.log(`onEvent: ${event}`);
  };
});
```

## Listen for events

Once you have created an instance of `Channel`, you can set up the event listener.

```typescript
void onEvent(event: PusherEvent) {
  console.log("onEvent: $event");
}
```

It is possible to listen to events on any channel or globally. Refer to the complete list of [available parameters and listeners](https://github.com/pusher/pusher-websocket-react-native#table-of-contents).

## Trigger events from your server

In the examples below, we trigger an event named `my-event` to Channels on a channel called `my-channel`. For each example, a server library deals with server communication.

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

If there isn’t an example in a language that you are familiar with then have a look on our server libraries page to see if anyone has created one in your language.

## Where next?

Check out the source code of a [sample application](https://github.com/pusher/pusher-websocket-react-native/tree/master/example) to see how the React Native library for Pusher can be used to build multi-platform applications for IOS and Android.
