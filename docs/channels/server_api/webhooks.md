---
title: Webhooks
layout: channels.njk
eleventyNavigation:
  parent: Server api
  key: Webhooks
  order: 3
---

# Webhooks

Webhooks allow your server to be notified about events occurring within Channels.

You can activate webhooks in your [account dashboard](https://dashboard.pusher.com) on a per app basis. For general information on webhooks, see the [webhooks.org Wiki](https://webhooks.pbworks.com/w/page/13385124/FrontPage).

## Webhook format

A webhook is sent as a HTTP POST request to the url which you specify.

The POST request payload (body) contains a JSON document. If you do not have batch webhooks enabled then the payload follows the following format:

```json
{
  "time_ms": 1327078148132,
  "events": [{ "name": "event_name", "some": "data" }]
}
```

- The `time_ms` key provides the unix timestamp in milliseconds when the webhook was created. This allows you to detect delayed webhooks if necessary.
- The `events` key contains one event only. The event contains a `name`, and event specific data.

You can enable batch webhooks on a per-app basis in the webhooks section of each app on the [dashboard](https://dashboard.pusher.com).

If you do have batch webhooks enabled, then the payload could contain multiple events (depending on the frequency of webhooks being generated for your app), following this format:

```json
{
  "time_ms": 1327078148132,
  "events": [
    { "name": "event_name", "some": "data" },
    { "name": "event_name", "different": "data" },
    ...{ "name": "another_event_name", "more": "data" }
  ]
}
```

The implication of this is that you'll need to iterate through all of the events whereas before you were able to assume that there would only ever be one element in the events array.

If your app is likely to receive a large number of events per webhook then consider handling the webhook events asynchronously. This will ensure that you'll return a 2XX code to our servers before timing out as well as making it less likely that we will overload your server with webhook requests.

We recommend that all users enable this feature once they've ensured that their webhook handling code will work as expected with the new format and potential amount of webhooks being received. You can read the blog post announcing the batch webhooks feature [here](https://blog.pusher.com/batch-webhooks).

Your server should respond to the POST request with a 2XX status code to indicate that the webhook has been successfully received. If a non 2XX status code is returned, Channels will retry sending the webhook, with exponential backoff, for 5 minutes. This ensures that temporary failure should not affect your ability to receive all webhooks.

## Security

### Encryption

We recommend using HTTPS, by configuring your webhook URL to one beginning with `https://`. We also support `http://`, if this is better for your use-case.

### Authentication

Since anyone could in principle send webhooks to your application, it's important to verify that these webhooks originated from Pusher. Valid webhooks will therefore contain these headers which contain a HMAC signature of the webhook payload (body):

- `X-Pusher-Key`: A Channels app may have multiple tokens. The oldest active token will be used, identified by this key.
- `X-Pusher-Signature`: A HMAC SHA256 hex digest formed by signing the POST payload (body) with the token's secret.

## Webhook request delay

There is a delay of up to three seconds between a client disconnecting and <a href="#channel-vacated"> <inlinecode>channel_vacated</inlinecode> </a> or <a href="#member-removed"> <inlinecode>member_removed</inlinecode> </a> webhooks being sent. If the client reconnects within this delay, no webhooks will be sent.

This delay was implemented so that momentary drops in connection or page navigations would not affect the state of connections from the point of view of your app. It also means that there is much less chance of receiving webhooks out of order due to them being triggered so close together.

## Events

### Channel existence events

Notify your application when channels become occupied or vacated.

For example, this allows you to publish events to a channel only when somebody is actually subscribed.

#### channel_occupied

Channels will send a `channel_occupied` event whenever any channel becomes occupied (i.e. there is at least one subscriber).

The event data for this event is as follows:

```json
{ "name": "channel_occupied", "channel": "my-channel" }
```

#### channel_vacated

Channels will send a `channel_vacated` event whenever any channel becomes vacated (i.e. there are no subscribers).

The event data for this event is as follows:

```json
{ "name": "channel_vacated", "channel": "my-channel" }
```

### Presence events

Notify your application whenever a user subscribes to or unsubscribes from a [Presence channel](/docs/channels/using_channels/presence-channels).

For example, this allows you to synchronise channel presence state on your server as well as all your application clients.

#### member_added

Channels will send a `member_added` event whenever a new user subscribes to a presence channel.

The event data for this event is as follows:

```json
{
  "name": "member_added",
  "channel": "presence-your_channel_name",
  "user_id": "a_user_id"
}
```

#### member_removed

Channels will send a `member_removed` event whenever a user unsubscribes from a presence channel.

The event data for this event is as follows:

```json
{
  "name": "member_removed",
  "channel": "presence-your_channel_name",
  "user_id": "a_user_id"
}
```

### Client events

Notify your application whenever a client event is sent.

Channels will send a `client_event` event whenever a [client event](/docs/channels/using_channels/events#triggering-client-events) is sent on any private or presence channel.

The event data for this event is as follows:

```json
{
  "name": "client_event",
  "channel": "name of the channel the event was published on",
  "event": "name of the event",
  "data": "data associated with the event",
  "socket_id": "socket_id of the sending socket",
  "user_id": "user_id associated with the sending socket" # Only for presence channels
}
```

# Channel existence example

{% snippets ['Rails', 'rb', 'php', 'go', 'py'] %}

```rb
class PusherController < ApplicationController

  def webhook
    webhook = Pusher::WebHook.new(request)
    if webhook.valid?
      webhook.events.each do |event|
        case event["name"]
        when 'channel_occupied'
          puts "Channel occupied: #{event["channel"]}"
        when 'channel_vacated'
          puts "Channel vacated: #{event["channel"]}"
        end
      end
      render text: 'ok'
    else
      render text: 'invalid', status: 401
    end
  end

end
```

```rb
# The webhook object should be initialised with a Rack::Request object, therefore it can be used with any Rack server. Here's a Sinatra example:
post '/webhooks' do
  webhook = Pusher::WebHook.new(request)
  if webhook.valid?
    webhook.events.each do |event|
      case event["name"]
      when 'channel_occupied'
        puts "Channel occupied: #{event["channel"]}"
      when 'channel_vacated'
        puts "Channel vacated: #{event["channel"]}"
      end
    end
  else
    status 401
  end
  return
end
```

```php
  // environmental variable must be set
  $app_secret = getenv('PUSHER_APP_SECRET');

  $app_key = $_SERVER['HTTP_X_PUSHER_KEY'];
  $webhook_signature = $_SERVER ['HTTP_X_PUSHER_SIGNATURE'];

  $body = file_get_contents('php://input');

  $expected_signature = hash_hmac( 'sha256', $body, $app_secret, false );

  if($webhook_signature == $expected_signature) {
    // decode as associative array
    $payload = json_decode( $body, true );
    foreach($payload['events'] as &$event) {
      // do something with the event
    }

    header("Status: 200 OK");
  }
  else {
    header("Status: 401 Not authenticated");
  }
```

```go
func pusherWebhook(res http.ResponseWriter, req *http.Request) {

  body, _ := ioutil.ReadAll(req.Body)

  webhook, err := pusherClient.Webhook(req.Header, body)

  if err == nil {
    for _, event := range webhook.Events {
      switch event.Name {
      case "channel_occupied":
        fmt.Println("Channel occupied: " + event.Channel)
      case "channel_vacated":
        fmt.Println("Channel vacated: " + event.Channel)
      }
    }
  }

  fmt.Fprintf(res, "ok")
}
```

```py
@app.route("/webhook", methods=['POST'])
def pusher_webhook():
  # pusher_client is obtained through pusher_client = pusher.Pusher( ... )
  webhook = pusher_client.validate_webhook(
    key=request.headers.get('X-Pusher-Key'),
    signature=request.headers.get('X-Pusher-Signature'),
    body=request.data
  )

  for event in webhook['events']:
    if event['name'] == "channel_occupied":
      print("Channel occupied: %s" % event["channel"])
    elif event['name'] == "channel_vacated":
      print("Channel vacated: %s" % event["channel"])

  return "ok"
```

{% endsnippets %}
