---
date: 2022-02-16
title: Pusher Beams Docs | Handling incoming notifications
description: Trigger callback code in your app when a push notification arrives on a user’s device and respond to the arrival of the notification in your app.
layout: beams.njk
eleventyNavigation:
  parent: Handle incoming notifications
  key: Handle incoming notifications flutter
  title: Flutter
  order: 4
---

# Handle incoming notifications: Flutter

Beams makes it possible trigger callback code in your application when a push notification arrives on a user's device. This can be used to respond to the arrival of the notification in your application.

## Handle all notifications

You can implement a service to handle incoming notifications. It will get called when your application is in the foreground.

```dart
PusherBeams.instance.onMessageReceivedInTheForeground((notification) => print(notification));
```
