---
title: Publishing to multiple devices - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Guides
  key: Publishing to multiple devices
  order: 2
---

## Publishing to multiple devices

If you want to send push notifications to multiple devices, [Device Interests](/docs/beams/concepts/device-interests) are the way to go. This guide will demonstrate how to publish to multiple devices with Beams, using Device Interests.

> This guide uses Device Interests to send public broadcasts to subscribed users. For increased security you can use [Authenticated Users](/docs/beams/concepts/authenticated-users) instead.

## Add a Device Interest

In your chosen client SDK, you can call the `addDeviceInterest` method, passing in the Interest name.

For example, here we subscribe to the Interest _"hello"_.

{% snippets ['swift', 'java', 'js'] %}

```swift
try? self.beamsClient.addDeviceInterest(interest: "hello")
```

```java
PushNotifications.addDeviceInterest("hello");
```

```js
const beamsClient = new PusherPushNotifications.Client({
  instanceId: "YOUR_INSTANCE_ID",
});

beamsClient.start().then(() => beamsClient.addDeviceInterest("hello"));
```

{% endsnippets %}

This device has now subscribed to the Interest _"hello"_ and will receive any push notifications published to _"hello"_.

> Device Interest names are limited to 164 characters and can only contain ASCII upper/lower-case letters, numbers or one of `_-=@,.;`

## Publish to the Device Interest

Now to publish to all devices that are subscribed to _hello_, call the `publishToInterests` method, passing an array containing _hello_.

{% snippets ['node', 'php', 'go', 'py', 'java', 'kotlin', 'rb', 'API'] %}

```js
beamsClient
  .publishToInterests(["hello"], {
    apns: {
      aps: {
        alert: {
          title: "Hello",
          body: "Hello, world!",
        },
      },
    },
    fcm: {
      notification: {
        title: "Hello",
        body: "Hello, world!",
      },
    },
    web: {
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
    console.error("Error:", error);
  });
```

```php
<?php
include 'src/PushNotifications.php';
$publishResponse = $beamsClient->publishToInterests(
  array("hello", "donuts"),
  array(
    "fcm" => array(
      "notification" => array(
        "title" => "Hi!",
        "body" => "This is my first Push Notification!"
      )
    ),
    "apns" => array("aps" => array(
      "alert" => array(
        "title" => "Hi!",
        "body" => "This is my first Push Notification!"
      )
    )),
    "web" => array(
      "notification" => array(
        "title" => "Hi!",
        "body" => "This is my first Push Notification!"
      )
    )
));
```

```go
publishRequest := map[string]interface{}{
  "apns": map[string]interface{}{
    "aps": map[string]interface{}{
      "alert": map[string]interface{}{
        "title": "Hello",
        "body":  "Hello, world",
      },
    },
  },
  "fcm": map[string]interface{}{
    "notification": map[string]interface{}{
      "title": "Hello",
      "body":  "Hello, world",
    },
  },
  "web": map[string]interface{}{
    "notification": map[string]interface{}{
      "title": "Hello",
      "body":  "Hello, world",
    },
  },
}

pubId, err := beamsClient.PublishToInterests([]string{"hello"}, publishRequest)
if err != nil {
  fmt.Println(err)
} else {
  fmt.Println("Publish Id:", pubId)
}
```

```py
response = beams_client.publish_to_interests(
  interests=['hello'],
  publish_body={
    'apns': {
      'aps': {
        'alert': {
          'title': 'Hello',
          'body': 'Hello, world!',
        },
      },
    },
    'fcm': {
      'notification': {
        'title': 'Hello',
        'body': 'Hello, world!',
      },
    },
    'web': {
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
List<String> interests = Arrays.asList("donuts", "pizza");

Map<String, Map> publishRequest = new HashMap();

Map<String, String> apsAlert = new Hashmap();
apsAlert.put("title", "hello");
apsAlert.put("body", "Hello world");
Map<String, Map> alert = new HashMap();
alert.put("alert", apsAlert);
Map<String, Map> aps = new HashMap();
aps.put("aps", alert);
publishRequest.put("apns", aps);

Map<String, String> fcmNotification = new HashMap();
fcmNotification.put("title", "hello");
fcmNotification.put("body", "Hello world");
Map<String, Map> fcm = new HashMap();
fcm.put("notification", fcmNotification);
publishRequest.put("fcm", fcm);

Map<String, String> webNotification = new HashMap();
webNotification.put("title", "hello");
webNotification.put("body", "Hello world");
Map<String, Map> web = new HashMap();
web.put("notification", webNotification);
publishRequest.put("web", web);

beamsClient.publishToInterests(interests, publishRequest);
```

```kotlin
val interests = listOf("donuts", "pizza")
val publishRequest = hashMapOf(
  "apns" to hashMapOf("aps" to hashMapOf("alert" to hashMapOf("title" to "hello", "body" to "Hello world"))),
  "fcm" to hashMapOf("notification" to hashMapOf("title" to "hello", "body" to "Hello world")),
  "web" to hashMapOf("notification" to hashMapOf("title" to "hello", "body" to "Hello world"))
)

beamsClient.publishToInterests(interests, publishRequest)
```

```rb
data = {
  apns: {
    aps: {
      alert: {
        title: 'Hello',
        body: 'Hello, world!'
      }
    }
  },
  fcm: {
    notification: {
      title: 'Hello',
      body: 'Hello, world!'
    }
  },
  web: {
    notification: {
      title: 'Hello',
      body: 'Hello, world!'
    }
  }
}

Pusher::PushNotifications.publish_to_interests(interests: ['hello'], payload: data)
```

```text
POST https://:instance-id.publish.pushnotifications.pusher.com/publish_api/v1/instances/:instance_id/publishes/interests HTTP/1.1
Host: instance-id.publish.pushnotifications.pusher.com
Content-Type: application/json

{
  "interests": ["hello", "donuts"],
  "fcm": {
    "notification": {
      "title": "Hi!",
      "body": "This is my first Push Notification!"
    }
  },
  "apns": {
    "aps": {
      "alert": {
        "title": "Hi!",
        "body": "This is my first Push Notification!"
      }
    }
  },
  "web": {
    "notification": {
      "title": "Hi!",
      "body": "This is my first Push Notification!"
    }
  }
}
```

{% endsnippets %}

> Each publish requires at least one interest, up to a maximum of 100.

### Differences between platforms

A publish request must target at least one our supported platforms:

- APNs (for iOS devices)
- FCM (for Android devices)
- Web (for web browsers)

The structure of the publish request is slightly different for each. Follow the links below for the full set of options.

- **iOS**: see [“Creating the Remote Notification Payload”](https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html#//apple_ref/doc/uid/TP40008194-CH10-SW1) and [Payload Key Reference](https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/PayloadKeyReference.html#//apple_ref/doc/uid/TP40008194-CH17-SW1)
- **Android**: see [FCM downstream HTTP messages](https://firebase.google.com/docs/cloud-messaging/http-server-ref#downstream)
- **Web**: see [Beams web notification format](/docs/beams/reference/publish-payloads#web-format)
  For example, a publish request to only iOS devices would look something like this:

```json
{
  "apns": {
    "aps": {
      "alert": "Hello!"
    }
  }
}
```

...whereas a publish request to all supported platforms would have this structure:

```json
{
  "apns": {
    "aps": {
      "alert": "Hello!"
    }
  },
  "fcm": {
    "notification": {
      "title": "Hello",
      "body": "Hello, world!"
    }
  },
  "web": {
    "notification": {
      "title": "Hello",
      "body": "Hello, world!"
    }
  }
}
```

### Adding metadata to a notification

If you want to add metadata to your request, add a `data` property to the payload for each desired platform, like so:

```json
{
  "apns": {
    "aps": {
      "alert": "Hello!"
    },
    "data": {
      "some": "metadata",
      "of": "your",
      "choosing": "can",
      "go": "here 😏"
    }
  },
  "fcm": {
    "notification": {
      "title": "Hello",
      "body": "Hello, world!"
    },
    "data": {
      "put": "whatever",
      "you": "need",
      "here": "✨"
    }
  },
  "web": {
    "notification": {
      "title": "Hello",
      "body": "Hello, world!"
    },
    "data": {
      "et": "cetera"
    }
  }
}
```
