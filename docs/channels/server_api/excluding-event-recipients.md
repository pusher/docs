---
date: 2021-08-01
title: Pusher Channels Docs | How to exclude event recipients
description: In some situations, you may want to stop the client that broadcasts a realtime event from receiving it. Check out our docs to find out how.
layout: channels.njk
eleventyNavigation:
  parent: Server api
  key: Excluding event recipients
  order: 8
---

# Excluding event recipients

In some situations, you want to stop the client that broadcasts an event from receiving it. The method for doing this is described here.

## Problem

The most common way to push data into Channels is via an AJAX call to your own server which then triggers an appropriate event using the Channels HTTP API, or via one of our [server libraries](/docs/channels/channels_libraries/libraries). This event is then distributed to all connected clients. If the client that made the AJAX call is also subscribed to that channel it will also receive the event. In some cases this can be unexpected and can results in things such as duplicate entries within the UI.

## Solution

Each pusher connection is assigned a unique `socket_id` which can be accessed via

```js
pusher.connection.socket_id;
```

The `socket_id` is set once the client has connected to Channels. The following code extract shows how to access the `socket_id` once the client has connected by binding to the `connected` `state_change` event. For more information on connection states see the [connection states documentation](/docs/channels/using_channels/connection#connection-states).

```js
var pusher = new Pusher("APP_KEY");
var socketId = null;
pusher.connection.bind("connected", () => {
  socketId = pusher.connection.socket_id;
});
```

Once the `socket_id` has been accessed it can be used when triggering an event on the server by passing it to the server. The following examples shows how this can be done and uses the [jQuery ajax](http://api.jquery.com/jQuery.ajax/) function.

```js
var pusher = new Pusher("APP_KEY");
var socketId = null;
pusher.connection.bind("connected", () => {
  socketId = pusher.connection.socket_id;

  jQuery.ajax({
    url: "/trigger_event",
    type: "post",
    data: {
      id: "some_id",
      updated_value: "some_value",
      socket_id: socketId, // pass socket_id parameter to be used by server
    },
  });
});
```

When you trigger an event from the server passing a `socket_id`, the Channels connection (client) with that `socket_id` will be excluded from receiving the event.

The `socket_id` parameter is an optional parameter when triggering events via the API. For example:

{% methodwrap %}
{% snippets ['rb', 'php', 'c', 'laravel', 'node', 'go'], true %}

```rb
def update
  @obj = Obj.find(params[:id])
  @obj.update_attributes!(params[:updated_value])

  pusher.trigger("my-channel", "my-event", @obj, {
    socket_id: params[:socket_id]
  })
  render json: @obj
end
```

```php
pusher = new Pusher(APP_KEY, APP_SECRET, APP_ID);
$update_info = update_object($_POST['id'], $_POST['updated_value']);
$pusher->trigger(
  'my-channel', 'my-event', $update_info, array('socket_id' => $_POST['socket_id'])
);
```

```c
using PusherServer;

public class MyController : Controller {
  public ActionResult Trigger(string socket_id) {
    var pusher = new Pusher(APP_ID, APP_KEY, APP_SECRET);
    var result = pusher.Trigger(
      "my-channel",
      "my-event",
      new { message = "hello world" },
      new TriggerOptions() { SocketId = socket_id}
    );
  return new HttpStatusCodeResult(200);
  }
}
```

```php
broadcast(new MyEvent($update))->toOthers();
```

```js
const express = require("express");
const Pusher = require("pusher");

const app = express.createServer(express.logger());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const pusher = new Pusher({
  appId: APP_ID,
  key: APP_KEY,
  secret: APP_SECRET,
  useTLS: true,
});

app.post("/trigger", (req, res) => {
  const socketId = req.body.socket_id;
  pusher.trigger(
    "my-channel",
    "my-event",
    {
      message: "hello world",
    },
    {
      socket_id: socketId,
    }
  );
});

const port = process.env.PORT || 5000;
app.listen(port);
```

```go
pusherClient := pusher.Client{
  AppID: "APP_ID",
  Key: "APP_KEY",
  Secret: "APP_KEY",
}

socketID := "1234.12"
params := pusher.TriggerParams{SocketID: &socketID}
pusherClient.TriggerWithParams("my-channel", "my-event", data, params)
```

{% endsnippets %}

{% conditionalContent 'laravel', false %}

See the [official Laravel docs](https://laravel.com/docs/master/broadcasting#broadcasting-events) for more information.

{% endconditionalContent %}
{% endmethodwrap %}
