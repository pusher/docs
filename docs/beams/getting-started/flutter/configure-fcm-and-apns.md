---
date: 2022-02-16
title: Pusher Beams Docs | Configuring FCM
description: Learn how to get set up with Firebase Cloud Messaging credentials and deliver event driven notifications to your Android user devices with Pusher Beams.
layout: beams.njk
eleventyNavigation:
  parent: Beams getting started flutter
  key: Configure fcm and apns
  title: 1. Configure FCM and APNS
  order: 1
---

# Configure FCM and APNS

Pusher relies on Firebase Cloud Messaging (FCM) for Android, and Apple Push Notification service (APNs) for iOS to deliver push notifications on your behalf. When we deliver push notifications, we use your credentials.

Head over to the [Pusher dashboard](https://dashboard.pusher.com/beams) and create a new instance of Beams. After that, you can either follow the interactive quick start over there, or return here to follow the documentation steps.

The FCM and APNS configuration steps for the Flutter SDK are similar to what you do for the Swift and Java libraries. Please use the links below to complete the configuration and then return here to follow the next steps.

- [Configure FCM for Android builds](/docs/beams/getting-started/android/configure-fcm/?ref=android)
- [Configure APNS for iOS builds](/docs/beams/getting-started/ios/configure-apns/?ref=ios)

## Where Next?

Now that you have finished this step you can [integrate our Flutter SDK into your project](/docs/beams/getting-started/flutter/sdk-integration/).
