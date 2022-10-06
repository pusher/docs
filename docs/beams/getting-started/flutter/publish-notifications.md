---
date: 2022-02-16
title: Pusher Beams Docs | Publish notifications
description: Trigger push notifications from your server to mobile app users through our Beams service by publishing to their device's subscribed interests.
layout: beams.njk
eleventyNavigation:
  parent: Beams getting started flutter
  key: Publish notifications flutter
  title: 4. Publish Notifications
  order: 4
---

# Publishing Notifications in Flutter projects

Push notifications are triggered by your servers to our Beams service. After a device using your Android or iOS applications subscribes to an interest on our service, your server can then send a push notification to that device by publishing to that interest.

Before you can send push notifications, make sure you have done the [configuration step](/docs/beams/getting-started/flutter/configure-fcm-and-apns/), and [integrated your app with the SDK](/docs/beams/getting-started/flutter/sdk-integration/).

## Sending a notification

The following guides show you how to send notifications to Android and iOS devices.

- [Sending a notification to Android devices](/docs/beams/getting-started/android/publish-notifications/)
- [Sending a notification to iOS devices](/docs/beams/getting-started/ios/publish-notifications/)

If you are targeting both platforms, you should use our guide to [send notifications to multiple devices](/docs/beams/guides/publishing-to-multiple-devices/).
