---
date: 2021-08-01
title: Pusher Beams Docs
description: Beams is a professional hosted API service for quickly and reliably sending push notifications to all users of your mobile and web apps.
layout: beams.njk
eleventyNavigation:
  parent: Docs
  key: Beams
  order: 1
---

# Beams overview

Beams is an API for sending push notifications to iOS, Android and Web applications. It includes a hosted service and specialized SDKs to seamlessly manage your app’s device push tokens. To send notifications, you can either authenticate devices as [Authenticated Users](/docs/beams/concepts/authenticated-users) for private notifications to specific users across their devices or you can subscribe devices to public [Device Interests](/docs/beams/concepts/device-interests) for batch notification delivery. Get a realtime Debug Console and observe [Insights](/docs/beams/concepts/insights) to keep track of your notification service health.

## Example Use Cases

Our API and SDKs make Beams the developer-friendly tool to send push notifications. Developers use Beams to orchestrate a personalized notification experience for app users.

With Beams, you can programmatically trigger push notifications based on actual in-app activity to keep users engaged with your app, such as:

- Progress through a food delivery, ride-sharing, or any other logistics/delivery app
- Scores in a game or news alerts sent in realtime from a server to interested clients
- Social engagement like comments, likes, or interactions inside of an app
- Transactional notifications for e-commerce, fintech, or any other marketplace app

## Main Features

With the Beams API and SDKs, developers can build a personalized notification service using:

- **Authenticated Users** allows you to securely associate devices with your own user ID which you set from your server and publish personalized notifications directly to users.
- **Device Interests** target groups of devices. They use the Publish/Subscribe model to decide which devices should receive a particular message.
- **Hosted Token Management** keeps push tokens up to date with the platform push gateway for valid publishing.
- **Webhooks** for each notification sent to a user for key events like publishes, acks, and opens to integrate with other events in your server.
- **Insights** about key notification service health metrics such as acknowledgement and open rates reported back from the devices.
- **Debug Console** for realtime observability into a notification service broken down by events from a new device registration all the way to notification opened by the user.

## Getting Started

There are two ways to get started with Pusher Beams:

### Interactive quick start guide in Dashboard

Head over to the [Pusher dashboard](https://dashboard.pusher.com/beams) and create a new instance of Pusher Beams. After that, you will be taken to our interactive quick start guide.

### Documentation

Or if you would prefer, you can skip the interactive quick start and follow the steps here in the documentation:

- [Steps for Android](/docs/beams/getting-started/android/configure-fcm)
- [Steps for iOS](/docs/beams/getting-started/ios/configure-apns)
- [Steps for Web](/docs/beams/getting-started/web/sdk-integration)
