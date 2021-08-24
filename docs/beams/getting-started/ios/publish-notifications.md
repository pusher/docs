---
date: 2021-08-01
title: Pusher Beams Docs | Publish notifications to iOS devices
description: Use Pusher Beams to publish push notifications triggered by your server to iOS user devices.
layout: beams.njk
eleventyNavigation:
  parent: Beams getting started iOS
  key: Publish notifications
  title: 3. Publish Notifications
  order: 3
---

# iOS Publishing Notifications

Push notifications are triggered by your servers to our Beams service. After a device using your iOS application subscribes to an interest on our service, your server can then send a push notification to that device by publishing to that interest.

Before you can send push notifications, make sure you have [configured your APNs Key](/docs/beams/getting-started/ios/configure-apns/) and [integrated your app with the SDK](/docs/beams/getting-started/ios/sdk-integration/).

## Sending a notification

To get started, let's send the time-honored “hello world” message to your iOS application. We'll assume your iOS application has subscribed to the interest "hello".

Let's start by creating a file called `publish-body.json` with the request body for the publish:

```json
{
  "interests": ["hello"],
  "apns": {
    "aps": {
      "alert": {
        "title": "Hello",
        "body": "Hello, world!"
      }
    }
  }
}
```

Now, before you run the `curl` command, you need to get the instance id and its secret. You can get this information in the Pusher Dashboard "Keys" tab for your Beams instance. Now you can either export environment variables or replace the command with the appropriate keys.

```bash
curl -H "Content-Type: application/json" \
     -H "Authorization: Bearer $SECRET_KEY" \
     -X POST "https://$INSTANCE_ID.pushnotifications.pusher.com/publish_api/v1/instances/$INSTANCE_ID/publishes" \
     -d @publish-body.json
```

From this point onwards, you can just change the `publish-body.json` file and run the same `curl` command.

## Sending From The Server

{% snippets ['php', 'go', 'node', 'py', 'java', 'kotlin', 'rb'] %}

```php
$beamsClient = new \Pusher\PushNotifications\PushNotifications(array(
  "instanceId" => "YOUR_INSTANCE_ID_HERE",
  "secretKey" => "YOUR_SECRET_KEY_HERE",
));

$publishResponse = $beamsClient->publish(
  array("hello"),
  array("apns" => array("aps" => array(
    "alert" => array(
      "title" => "Hello",
      "body" => "Hello, World!",
    ),
  )),
));
```

```go
const connectingExample = const (
  instanceId = "YOUR_INSTANCE_ID_HERE"
  secretKey  = "YOUR_SECRET_KEY_HERE"
)

publishRequest := map[string]interface{}{
  "apns": map[string]interface{}{
    "aps": map[string]interface{}{
      "alert": map[string]interface{}{
        "title": "Hello",
        "body":  "Hello, world",
      },
    },
  },
}

pubId, err := beamsClient.Publish([]string{"hello"}, publishRequest)
if err != nil {
  fmt.Println(err)
} else {
  fmt.Println("Publish Id:", pubId)
}
```

```js
const PushNotifications = require("@pusher/push-notifications-server");

let beamsClient = new PushNotifications({
  instanceId: "YOUR_INSTANCE_ID_HERE",
  secretKey: "YOUR_SECRET_KEY_HERE",
});

beamsClient
  .publish(["hello"], {
    apns: {
      aps: {
        alert: "Hello!",
      },
    },
  })
  .then((publishResponse) => {
    console.log("Just published:", publishResponse.publishId);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
```

```py
from pusher_push_notifications import PushNotifications

beams_client = PushNotifications(
    instance_id='YOUR_INSTANCE_ID_HERE',
    secret_key='YOUR_SECRET_KEY_HERE',
)

response = beams_client.publish(
  interests=['hello'],
  publish_body={
    'apns': {
      'aps': {
        'alert': 'Hello!',
      },
    },
  },
)

print(response['publishId'])
```

```java
String instanceId = "YOUR_INSTANCE_ID_HERE";
String secretKey = "YOUR_SECRET_KEY_HERE";

PushNotifications beamsClient = new PushNotifications(instanceId, secretKey);

List<String> interests = Arrays.asList("donuts", "pizza");

Map<String, Map> publishRequest = new HashMap();

Map<String, String> alert = new HashMap();
alert.put("alert", "hi");
Map<String, Map> aps = new HashMap();
aps.put("aps", alert);
publishRequest.put("apns", aps);

beamsClient.publish(interests, publishRequest);
```

```kotlin
val instanceId = "YOUR_INSTANCE_ID_HERE"
val secretKey = "YOUR_SECRET_KEY_HERE"

val beamsClient = PushNotifications(instanceId, secretKey)

val interests = listOf("donuts", "pizza")
val publishRequest = hashMapOf(
  "apns" to hashMapOf("aps" to hashMapOf("alert" to "hi"))
)

beamsClient.publish(interests, publishRequest)
```

```rb
Pusher::PushNotifications.configure do |config|
  config.instance_id = 'YOUR_INSTANCE_ID_HERE'
  config.secret_key = 'YOUR_SECRET_KEY_HERE'
end

data = {
  apns: {
    aps: {
      alert: {
        title: 'Hello',
        body: 'Hello, world!'
      }
    }
  }
}

Pusher::PushNotifications.publish(interests: ['hello'], payload: data)
```

{% endsnippets %}

## Advanced Options

The publish method accepts an object which specifies the message to send. This object is the language's native representation of JSON. The previous example was a very simple one. There are many more advanced details you can specify. The full set of options for the APNs section of the publish call is described in Apple's [Payload Key Reference](https://developer.apple.com/library/prerelease/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/PayloadKeyReference.html#//apple_ref/doc/uid/TP40008194-CH17-SW1). For further examples, see Apple's [ Creating the Remote Notification Payload](https://developer.apple.com/library/prerelease/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html#//apple_ref/doc/uid/TP40008194-CH10-SW1).

If you encounter error responses from the Beams service, you may wish to consult Apple's [push notification troubleshooting guide](https://developer.apple.com/library/content/technotes/tn2265/_index.html).

## content-available

By default, Beams hard codes the value of `content-available` to `1` to enable delivery tracking. If you would like to customize this behaviour, please use the `disable_delivery_tracking` flag as described [here](/docs/beams/concepts/insights#content-available).

## Custom Data

Any custom data fields you wish to include in your push notification **must** be provided under a `data` key in the `apns` data structure. Any custom data fields specified outside of the `data` key won't be pushed to the device.
