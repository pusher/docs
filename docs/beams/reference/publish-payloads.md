---
date: 2021-08-01
title: Pusher Beams Docs | Publish platform formats for payloads
description: Each platform (APNS, FCM and Web) supports different options when publishing notifications. This guide describes the formats expected by each platform.
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

```js
publishToUsers(["SOME_USER"], {
  fcm: {
    notification: {
      title: "You have a new message",
      body: "Hi!",
    },
    data: {
      some: "metadata",
      of: "your",
      choosing: "can",
      go: "here 😏",
    },
  },
});
```

# APNs format

The full set of options for the APNs section of the `notify` call is described in Apple's [Payload Key Reference](https://developer.apple.com/library/prerelease/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/PayloadKeyReference.html#//apple_ref/doc/uid/TP40008194-CH17-SW1). For further examples, see Apple's [“Creating the Remote Notification Payload”](https://developer.apple.com/library/prerelease/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html#//apple_ref/doc/uid/TP40008194-CH10-SW1)

```js
publishToUsers(["SOME_USER"], {
  apns: {
    alert: {
      title: "You have a new message",
      body: "Hi!",
    },
    data: {
      some: "metadata",
      of: "your",
      choosing: "can",
      go: "here 😏",
    },
  },
});
```

# Web format

Pusher Beams offers a bespoke format for sending web notifications that works across all supported browsers.

{% parameter 'time_to_live', 'Integer', false %}

The number of seconds the web push gateway should store the notification for whilst the user is offline. **Max: 2419200; Default: 4 weeks.**

{% endparameter %}
{% parameter 'notification', 'Object', false %}

See [notification object format](/docs/beams/reference/publish-payloads#-notification-object-format)

{% endparameter %}
{% parameter 'data', 'Object', false %}

Arbritrary object containing any custom metadata you would like to send with the notification. **Cannot contain the key "pusher"**.

{% endparameter %}

## Notification object format

{% parameter 'title', 'String', false %}

The title shown when the notification is displayed to the user.

{% endparameter %}
{% parameter 'body', 'String', false %}

The body shown when the notification is displayed to the user.

{% endparameter %}
{% parameter 'icon', 'String', false %}

URL of the image shown as the notification icon when the notification is displayed.

{% endparameter %}
{% parameter 'deep_link', 'String', false %}

If provided, this URL will be opened in a new tab when the notification is clicked.

{% endparameter %}
{% parameter 'hide_notification_if_site_has_focus', 'Boolean', false %}

If set to true, the notification will not be shown if your site has focus. Default: false.

{% endparameter %}

```js
publishToUsers(["SOME_USER"], {
  web: {
    time_to_live: 3600,
    notification: {
      title: "You have a new message",
      body: "Hi!",
      icon: "https://example.com/img/notification-icon.png",
      deep_link: "https://example.com/messages?message_id=2342",
      hide_notification_if_site_has_focus: true,
    },
    data: {
      some: "metadata",
      of: "your",
      choosing: "can",
      go: "here 😏",
    },
  },
});
```
