---
date: 2021-08-01
title: Pusher Beams Docs | What are subscribers in Beams?
description: Push notification gateways provide a token for each device you want to publish to. The device registers its token with Beams and is counted as a subscriber.
layout: beams.njk
eleventyNavigation:
  parent: Concepts
  key: Subscribers
  order: 1
---

# Subscribers

Your Beams usage is calculated by taking the total number of concurrent Subscribers across all your Beams instances.

#### What are Subscribers?

All push notification gateways provide a secret token for each device (Android device, iOS device, web browser) you want to publish to. When you start the SDK (by calling the `.start` method) the device will register its token with Beams. Each of these devices is counted as a "subscriber".

#### How do I avoid being charged for devices I'm not publishing to?

Devices are only subscribed to Pusher Beams after you call the `.start` method in the SDK and will be removed once you call `.stop`. You can use these methods to create a setting in your application to allow your users to opt out of notifications. This will prevent you from being charged for these devices.

#### What happens when someone stops using my app?

When someone uninstalls your app, the push notification gateway will invalidate their device token. We have an automated process that periodically removes any invalid tokens, removing the Subscribers from your instance. Subscribers will also be removed if you publish to them and the gateway reports their token as invalid.

> Apple's APNs gateway can take several days to invalidate old device tokens. They do this to make it more difficult to track when users uninstall your application. For this reason, it can sometimes take up to a week to remove iOS Subscribers from Beams after they uninstall the application.

#### Why do I have more Subscribers than test devices?

Whenever you uninstall/reinstall your application on a device (which is common during development) it will receive a new push gateway token. Beams will therefore count it as a new Subscriber. The old Subscribers will be removed by our automated device cleanup procedure.
