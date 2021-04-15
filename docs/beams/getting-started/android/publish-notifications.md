---
title: Publish notifications
layout: beams.njk
eleventyNavigation:
  parent: Beams getting started android
  key: Publish notifications android
  title: 4. Publish Notifications
  order: 4
---

# Android Publishing Notifications

Push notifications are triggered by your servers to our Beams service. After a device using your Android application subscribes to an interest on our service, your server can then send a push notification to that device by publishing to that interest.

Before you can send push notifications, make sure you have [configured your FCM Key](/docs/beams/getting-started/android/configure-fcm/), [integrated your app with the SDK](/docs/beams/getting-started/android/sdk-integration/), and [initialized Beams ](/docs/beams/getting-started/android/init-beams/)

## Sending a notification

To get started, let's send the time-honored “hello world” message to your Android application. We'll assume your Android application has subscribed to the interest "hello".

Let's start by creating a file called `publish-body.json` with the request body for the publish:

```json
{
  "interests": ["hello"],
  "fcm": {
    "notification": {
      "title": "Hello",
      "body": "Hello, world!"
    }
  }
}
```

Now, before you run the `curl` command, you need to get the instance id and its secret. You can get this information in the [Pusher Dashboard](https://dashboard.pusher.com/beams) "Keys" tab for your Beams instance. Now you can either export environment variables or replace the command with the appropriate keys.

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
  array("fcm" => array("notification" => array(
    "title" => "Hello",
    "body" => "Hello, World!",
  )),
));
```

```go
const connectingExample = const (
  instanceId = "YOUR_INSTANCE_ID_HERE"
  secretKey  = "YOUR_SECRET_KEY_HERE"
)

publishRequest := map[string]interface{}{
  "fcm": map[string]interface{}{
    "notification": map[string]interface{}{
      "title": "Hello",
      "body":  "Hello, world",
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
    fcm: {
      notification: {
        title: "Hello",
        body: "Hello, world!",
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
    'fcm': {
      'notification': {
        'title': 'Hello',
        'body': 'Hello, world!',
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
Map<String, String> fcmNotification = new HashMap();
fcmNotification.put("title", "hello");
fcmNotification.put("body", "Hello world");
Map<String, Map> fcm = new HashMap();
fcm.put("notification", fcmNotification);
publishRequest.put("fcm", fcm);

beamsClient.publish(interests, publishRequest);
```

```kotlin
val instanceId = "YOUR_INSTANCE_ID_HERE"
val secretKey = "YOUR_SECRET_KEY_HERE"

val beamsClient = PushNotifications(instanceId, secretKey)

val interests = listOf("donuts", "pizza")
val publishRequest = hashMapOf(
  "fcm" to hashMapOf("notification" to hashMapOf("title" to "hello", "body" to "Hello world"))
)

beamsClient.publish(interests, publishRequest)
```

```rb
Pusher::PushNotifications.configure do |config|
  config.instance_id = 'YOUR_INSTANCE_ID_HERE'
  config.secret_key = 'YOUR_SECRET_KEY_HERE'
end

data = {
  fcm: {
    notification: {
      title: 'Hello',
      body: 'Hello, world!'
    }
  }
}

Pusher::PushNotifications.publish(interests: ['hello'], payload: data)
```

{% endsnippets %}

## Advanced Options

The publish method accepts an object which specifies the message to send. This object is the language's native representation of JSON. The previous example was a very simple one. There are many more advanced details you can specify. The full set of options for the FCM section of the publish call is described by Google in their documentation of [FCM downstream messages](https://firebase.google.com/docs/cloud-messaging/http-server-ref#downstream)

## Custom Data

Any custom data fields you wish to include in your push notification **must** be provided under a `data` key in the `fcm` data structure. Any custom data fields specified outside of the `data` key won't be pushed to the device.
