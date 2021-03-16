---
title: Server migration guide - Channels - Pusher Docs
layout: channels.njk
eleventyNavigation:
  parent: Push notifications
  key: Server migration guide
  order: 2
---

# Push Notifications Server Migration Guide

Use the [ new Pusher Beams Server SDKs ](/docs/beams/reference/all-libraries#server-sdks) to publish notifications.

# Create and Configure Beams instance

In order to complete this migration you will need a Pusher Beams Instance ID and Secret Key.

If you haven't already, head on over to the [Dashboard](https://dashboard.pusher.com/beams) and create a new Pusher Beams instance, noting down your Instance ID and Secret Key.

# Integrate the Pusher Beams Server SDK

When you release the new version of your app that contains the Pusher Beams SDK, some of your users will take some time to upgrade.

As a temporary migration step, your server should publish to both Pusher Beams and the old push notifications [BETA] feature until you are happy that enough users have upgraded. We have created an automated migration process on the backend to ensure no duplicate notifications will be delivered. The Pusher Beams client SDKs will automatically migrate each device's Interest subscriptions and remove them from push notifications [BETA].

{% snippets ['go', 'js', 'php', 'py', 'rb'] %}

```go
func sendPushNotification(pushNotifications pusher.Client, beams pushnotifications.PushNotifications, fcmPayload interface{}) error { // Push Notifications BETA: err1 := pushNotifications.Notify(pusher.PushNotification{ Interests: []string{"hello"}, FCM: fcmPayload, }) // Pusher Beams: publishRequest := map[string]interface{}{ "fcm": fcmPayload, } _, err2 := beams.PublishToInterests([]string{"hello"}, publishRequest) if err1 != nil { return err1 } if err2 != nil { return err2 } return nil }
```

```js
function sendPushNotification(pushNotifications, beams, payload) { // Push Notifications BETA: pushNotifications.notify(["hello"], payload, function(error, req, res) { console.log(error, req, res); }) // Pusher Beams: beams.publishToInterests(['hello'], payload).then((publishResponse) => { console.log('Just published:', publishResponse.publishId); }).catch((error) => { console.log('Error:', error); }); }
```

```php
function sendPushNotification($pushNotifications, $beams, $payload) { // Push Notifications BETA: $pushNotifications->notify(array("hello"), $payload); // Pusher Beams: $beams->publishToInterests(array("hello"), $payload); }
```

```py
def sendPushNotification(pushNotifications, beams, payload): // Push Notifications BETA: pushNotifications.notify(["hello"], payload) // Pusher Beams: beams.publish_to_interests(interests=['hello'], publish_body=payload)
```

```rb
def send_push_notification(pushNotifications, beams, payload) # Push Notifications BETA: pushNotifications.notify(["hello"], payload) # Pusher Beams: beams.publish_to_interests(interests: ['hello'], payload: payload) end
```

{% endsnippets %}

> If you're using the webhooks feature, please note that we have changed the API a bit, so please read [Webhooks guide](/docs/beams/concepts/webhooks).

If you have implemented the integration without the use of an SDK, see read the [API reference](/docs/beams/reference/publish-api) to learn how to publish.
