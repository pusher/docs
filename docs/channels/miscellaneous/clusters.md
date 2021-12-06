---
date: 2021-12-06
title: Pusher Channels Docs | Cluster Configuration
description: Channels has 9 public clusters worldwide. Find out how to choose the location which works best for you and achieve lower network latency.
layout: channels.njk
eleventyNavigation:
  parent: Miscellaneous
  key: Clusters
  order: 1
---

# Cluster Configuration

A "cluster" represents the physical location of the servers that handle requests from your Channels app. For example, the Channels cluster `mt1` is in Northern Virginia in the United States. When you create a Channels app, you can choose which cluster it exists in. You might choose this to achieve lower latency or to comply with data protection regulations.

## What clusters exist?

Channels has the following public clusters:

- `mt1` in N. Virginia
- `us2` in Ohio
- `us3` in Oregon
- `eu` in Ireland
- `ap1` in Singapore
- `ap2` in Mumbai
- `ap3` in Tokyo
- `ap4` in Sydney
- `sa1` in São Paulo

If you require other locations, we can create dedicated Channels clusters in custom locations on request: [talk to us](https://pusher.com/contact).

## How should I choose a cluster?

- **To achieve lower network latency.**
  - Depending on your use case, having your Channels app hosted close to its customers or your servers may help improve the latency when sending and receiving messages.
  - We recommend that you test on multiple clusters and pick the one that works best for your app.
- **To comply with data protection regulations.**
  - European data protection regulations specify that personal user data should not leave the EU borders.
  - For this use-case, Channels offers a cluster in `eu-west-1`, an AWS datacenter located in Ireland.

## How do you configure the cluster option?

Where it says `APP_CLUSTER` you'll need to insert the relevant cluster shortcode (e.g. `mt1` ).

### On the client-side:

{% snippets ['js', 'swift', 'objc', 'java', 'laravelecho', 'c'] %}

```js
var pusher = new Pusher("APP_KEY", {
  cluster: "APP_CLUSTER",
});
```

```swift
let options = PusherClientOptions(
  host: .cluster("eu")
)

let pusher = Pusher(key: "YOUR_APP_KEY", options: options)
pusher.connect()
```

```objc
OCAuthMethod *authMethod = [[OCAuthMethod alloc] initWithAuthEndpoint:@"https://your.authendpoint/pusher/auth"];
          OCPusherHost *host = [[OCPusherHost alloc] initWithCluster:@"eu"];
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

```java
import com.pusher.client.Pusher;

PusherOptions options = new PusherOptions();
options.setCluster("APP_CLUSTER");

Pusher pusher = new Pusher("APP_KEY", options);

pusher.connect();
```

```js
window.Echo = new Echo({
  broadcaster: "pusher",
  key: "APP_KEY",
  cluster: "APP_CLUSTER",
});
```

```c
using PusherClient;

public class Program
{
  private static Pusher pusher;

  public static void Main(string[] args)
  {
    pusher = new Pusher("APP_KEY", new PusherOptions()
    {
        Cluster = "APP_CLUSTER",
        Encrypted = true
    });
  }
}
```

{% endsnippets %}

### On the server-side:

{% snippets ['rb', 'php', 'laravel', 'node', 'c', 'py', 'go', 'java'] %}

```rb
require 'pusher'

pusher = Pusher::Client.new(
  app_id: 'APP_ID',
  key: 'APP_KEY',
  secret: 'APP_SECRET',
  cluster: 'APP_CLUSTER'
);
```

```php
require __DIR__ . '/vendor/autoload.php';

$pusher = new Pusher\\Pusher(APP_KEY, APP_SECRET, APP_ID, array(
  'cluster' => 'APP_CLUSTER'
));
```

```php
// In config/broadcasting.php

'options' => [
  'cluster' => 'APP_CLUSTER'
],
```

```js
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "APP_ID",
  key: "APP_KEY",
  secret: "APP_SECRET",
  cluster: "APP_CLUSTER",
});
```

```c
using PusherServer;
using System.Web.Mvc;
using System.Net;
using Your.Config;

public class HelloWorldController : Controller {
  [httpPost]
  public ActionResult HelloWorld() {
    var options = new PusherOptions();
    options.Cluster = Config.AppCluster;
    var pusher = new Pusher(Config.AppId, Config.AppKey, Config.AppSecret, options);
  }
}
```

```py
import pusher

pusher_client = pusher.Pusher(
  app_id=u'APP_ID',
  key=u'APP_KEY',
  secret=u'APP_SECRET',
  cluster=u'APP_CLUSTER'
)
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
}
```

```java
Pusher pusher = new Pusher("APP_ID", "APP_KEY", "APP_SECRET");

pusher.setCluster("APP_CLUSTER");
```

{% endsnippets %}

## Details

- Setting the `cluster` option will change the `host` parameter of the Channels library you are using. This happens only when the `host` option is not set, in which case, `cluster` is ignored.
- For client libraries, the default host is `ws.pusherapp.com` (and `sockjs.pusherapp.com` for fallback transports). With `cluster` set, the host becomes `ws-cluster.pusher.com` (and `sockjs-cluster.pusher.com` respectively).
- For server libraries, the default host is `api.pusherapp.com`. With `cluster` set, the host becomes `api-cluster.pusher.com`.

## How to debug it?

- First make sure your app is created in the intended cluster and that all the Channels libraries you are using in your project are configured correctly.
- Make sure your app makes requests to the correct endpoints. On the server-side, use a traffic sniffing tool like [tcpdump](http://www.tcpdump.org/). On the client-side, open your browser's developer tools and inspect the network requests.
- [Contact support](https://support.pusher.com/hc/en-us/requests/new)
