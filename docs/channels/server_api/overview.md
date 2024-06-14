---
date: 2021-08-01
title: Pusher Channels Docs | Server API Overview
description: The Server API Overview provides information on how to perform specific actions using our Server libraries for Pusher Channels.
layout: channels.njk
eleventyNavigation:
  parent: Server api
  key: Overview
  order: 1
---

# Server API overview

The Server API Overview provides information on how to perform specific actions using our [Server libraries](/docs/channels/channels_libraries/libraries).

Where possible each section provides an overview of the action, a reference-style guide to the constructor, property or method and an example of how it is used

The reference-style guide and examples may contain information for different languages. You can choose which language you wish to view by clicking on the appropriate tab as below.

{% snippets ['rb', 'Rails', 'php', 'laravel', 'node', 'ASP.NET', 'py', 'go', 'java', 'bash'] %}

```rb
# First, run 'gem install pusher'
require 'pusher'

pusher = Pusher::Client.new(
  app_id: 'APP_ID',
  key: 'APP_KEY',
  secret: 'APP_SECRET',
  cluster: 'APP_CLUSTER'
)

class HelloWorldController < ApplicationController
  def hello_world
    pusher.trigger('my-channel', 'my-event', {:message => 'hello world'})
  end
end
```

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

```php
// First, run 'composer require pusher/pusher-php-server'
require __DIR__ . '/vendor/autoload.php';

$pusher = new Pusher\Pusher(
  "APP_KEY",
  "APP_SECRET",
  "APP_ID",
  array('cluster' => 'APP_CLUSTER')
);

$pusher->trigger('my-channel', 'my-event', array('message' => 'hello world'));
```

```php
// First, run 'composer require pusher/pusher-php-server'

// Second, define the options in config/broadcasting.php
'options' => [
  'cluster' => 'APP_CLUSTER',
  'useTLS' => true
],

// Third, define events in your code like this
<?php

use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class MyEvent implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $message;

  public function __construct($message)
  {
      $this->message = $message;
  }

  public function broadcastOn()
  {
      return ['my-channel'];
  }
}

// Fourth, publish events like this
event(new MyEvent('hello world'));
```

```js
// First, run 'npm install pusher'
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "APP_ID",
  key: "APP_KEY",
  secret: "APP_SECRET",
  cluster: "APP_CLUSTER",
  useTLS: true,
});

pusher.trigger("my-channel", "my-event", {
  message: "hello world",
});
```

```csharp
// First, run 'Install-Package PusherServer'
using PusherServer;
using System.Web.Mvc;
using System.Net;
//using Your.Config;

public class HelloWorldController : Controller {
  [HttpPost]
  public async Task<ActionResult> HelloWorld() {
    var options = new PusherOptions();
    options.Cluster = "APP_CLUSTER";

    var pusher = new Pusher("APP_ID", "APP_KEY", "APP_SECRET", options);
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
package main

import "github.com/pusher/pusher-http-go/v5"

func main(){
  pusherClient := pusher.Client{
    AppID: "APP_ID",
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
pusher channels apps trigger --app-id APP_ID --channel "my-channel" --event "my-event" --message "hello world"
```

{% endsnippets %}


# The Guide

- [Interacting with our HTTP API](/docs/channels/server_api/http-api)

  - [Publishing events](/docs/channels/server_api/http-api#publishing-events)
  - [Querying application state](/docs/channels/server_api/http-api#querying-application-state)

- [Receiving webhooks](/docs/channels/server_api/webhooks)
- [Authenticating users](/docs/channels/server_api/authenticating-users)
