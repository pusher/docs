---
title: Publish payloads - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Reference
  key: Publish payloads
  title: Platform Publish Formats
  order: 5
---

# Platform publish formats

Each platform supports different options when publishing notifications via the `publishToUsers` and `publishToInterests` methods. These are the formats expected by each platform.

# FCM format

The full set of options is described by Google in their documentation of [FCM downstream HTTP messages](https://firebase.google.com/docs/cloud-messaging/http-server-ref#downstream)
<Code heading="FCM example" language="javascript"> {fcmExample}

```

# APNs format

The full set of options for the APNs section of the <code className="highlighter-rouge">notify</code> call is described in Apple's [Payload Key Reference](https://developer.apple.com/library/prerelease/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/PayloadKeyReference.html#//apple_ref/doc/uid/TP40008194-CH17-SW1) . For further examples, see Apple's [ “Creating the Remote Notification Payload” ](https://developer.apple.com/library/prerelease/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html#//apple_ref/doc/uid/TP40008194-CH10-SW1)
 <Code heading="APNs example" language="javascript"> {apnsExample}
```

# Web format

Pusher Beams offers a bespoke format for sending web notifications that works across all supported browsers.

      *  `time_to_live` (integer|optional): The number of seconds the web push gateway should store the notification for whilst the user is offline. **Max: 2419200; Default: 4 weeks.**
      *  `notification` (object|optional): See [notification object format](/docs/beams/reference/publish-payloads#-notification-object-format)
      *  `data` (object|optional): Arbritrary object containing any custom metadata you would like to send with the notification. **Cannot contain the key "pusher"**.

## notification object format

      *  `title` (string|optional): The title shown when the notification is displayed to the user.
      *  `body` (string|optional): The body shown when the notification is displayed to the user.
      *  `icon` (string|optional): URL of the image shown as the notification icon when the notification is displayed.
      *  `deep_link` (string|optional): If provided, this URL will be opened in a new tab when the notification is clicked.
      *  `hide_notification_if_site_has_focus` (boolean|optional): If set to true, the notification will not be shown if your site has focus. Default: false.

    <Code heading="Web example" language="javascript">
      {webExample}

```

```
