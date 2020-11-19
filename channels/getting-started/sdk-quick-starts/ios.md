---
title: iOS quick start — Channels — Pusher Docs
layout: channels.njk
eleventyNavigation:
  parent: SDK quick starts
  key: iOS quick start
  order: 2
---

# iOS quick start

Getting started with Channels is very easy. However, if you have any questions [get in touch](https://pusher.com/support). This guide uses the [PusherSwift client API](https://github.com/pusher/pusher-websocket-swift) and a selection of [Server API libraries](/docs/channels/channels_libraries/libraries). We also have a guide for our [JavaScript](/docs/channels/getting_started/javascript) and [Android](/docs/channels/getting_started/android).

## Get your free API keys

[Create an account](https://dashboard.pusher.com/accounts/sign_up), and make a note of your `app_id`, `app_key`, `app_secret` and `app_cluster`.

## Install the library

Install using CocoaPods.

```
pod 'PusherSwift'
```

Import Pusher into the class that wants to make use of the library.

{% snippets ['swift', 'objc'] %}

```swift
import PusherSwift
```

```objc
#import "PusherSwift/PusherSwift-Swift.h"
```

{% endsnippets %}

Here is a step-by-step guide on how to [install and setup CocoaPods](http://www.raywenderlich.com/12139/introduction-to-cocoapods) if you are using it for the first time.

## Create a connection

{% snippets ['swift', 'objc'] %}

```swift
let options = PusherClientOptions(
  host: .cluster("YOUR_CLUSTER")
)

let pusher = Pusher(key: "YOUR_APP_KEY", options: options)
pusher.connect()
```

```objc
OCAuthMethod *authMethod = [[OCAuthMethod alloc] initWithAuthEndpoint:@"https://your.authendpoint/pusher/auth"];
OCPusherHost *host = [[OCPusherHost alloc] initWithCluster:@"YOUR_CLUSTER"];
PusherClientOptions *options = [[PusherClientOptions alloc]
                              initWithOcAuthMethod:authMethod
                              attemptToReturnJSONObject:YES
                              autoReconnect:YES
                              ocHost:host
                              port:nil
                              encrypted:YES];

self.pusher = [[Pusher alloc] initWithAppKey:@"YOUR_APP_KEY" options:options];
[self.pusher connect];
```

{% endsnippets %}

For detailed information see the [connection docs](/docs/channels/using_channels/connection) and the [PusherSwift documentation](https://github.com/pusher/pusher-websocket-swift/blob/master/README.md).

### Subscribe to a public channel

{% snippets ['swift', 'objc'] %}

```swift
let myChannel = pusher.subscribe("my-channel")
```

```objc
PusherChannel *myChannel = [pusher subscribeWithChannelName:@"my-channel"];
```

{% endsnippets %}

## Listen for events

Once you have created a channel instance, you can set up event bindings. There is no need to wait for the connection to be established. The following example just receives and prints a hello world message.

{% snippets ['swift', 'objc'] %}

```swift
let _ = myChannel.bind(eventName: "my-event", callback: { (data: Any?) -> Void in
  if let data = data as? [String : AnyObject] {
    if let message = data["message"] as? String {
        print(message)
    }
  }
})
```

```objc
[myChannel bindWithEventName:@"my-event" callback:^void (NSDictionary *data) {
  NSString *message = data[@"message"];
  NSLog(message);
}];
```

{% endsnippets %}

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

If there isn’t an example in a language that you are familiar with then have a look on our [server libraries](/docs/channels/channels_libraries/libraries) page to see if anyone has created one in your language.

## Where next?

Find out about all the cool stuff you can do with [channels](/docs/channels/using_channels/channels). Learn how to [exclude event recipients](/docs/channels/server_api/excluding-event-recipients) when publishing events.
