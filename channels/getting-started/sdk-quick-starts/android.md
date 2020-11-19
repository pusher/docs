---
title: Android quick start — Channels — Pusher Docs
layout: channels.njk
eleventyNavigation:
  parent: SDK quick starts
  key: Android quick start
---

# Android quick start

Getting started with Channels is very easy. However, if you have any questions [get in touch](https://pusher.com/support) . This guide uses the [pusher-websocket-java](https://github.com/pusher/pusher-websocket-java) library and a selection of [Server API libraries](/docs/channels/channels_libraries/libraries). We also have a guide for our [JavaScript client.](/docs/channels/getting_started/javascript)

## Get your free API keys

[Create an account](https://dashboard.pusher.com/accounts/sign_up) , and make a note of your `app_id`, `app_key`, `app_secret` and `app_cluster`.

## Install the library

### Gradle

In your `build.gradle` script for your application module, add the library as a dependency:

```java
dependencies {
    compile 'com.pusher:pusher-java-client:2.2.1'
}
```

### Maven

Add the following as a child of `dependencies` in your `pom.xml`:

```xml
<dependency>
  <groupId>com.pusher</groupId>
  <artifactId>pusher-java-client</artifactId>
  <version>2.2.1</version>
</dependency>
```

## Create a connection

```java
import com.pusher.client.Pusher;
...

PusherOptions options = new PusherOptions();
options.setCluster("APP_CLUSTER");

Pusher pusher = new Pusher("APP_KEY", options);
pusher.connect();
```

See more about configuring [the java library](https://github.com/pusher/pusher-websocket-java)

### Subscribe to a public channel

```java
import com.pusher.client.channel.Channel;
...

Channel channel = pusher.subscribe("my-channel");
```

## Listen for events

Once you have created an instance of `Channel`, you can set up event bindings.

```java
import com.pusher.client.channel.SubscriptionEventListener;
...

channel.bind("my-event", new SubscriptionEventListener() {
  @Override
  public void onEvent(String channelName, String eventName, String data) {
    System.out.println(data);
  }
});
```

## Trigger events from your server

In the examples below we trigger an event named `my-event` to Channels on a channel called `my-channel`. For each example below a [server library](/docs/channels/channels_libraries/libraries) deals with the server communication.

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
