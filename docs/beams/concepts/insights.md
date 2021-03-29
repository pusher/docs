---
title: Insights - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Concepts
  key: Insights
  order: 4
---

# Insights

Beams tracks the lifecycle of the push notifications you send and uses this data to produce analytics that will help you make sure you are sending the most engaging push notifications to your users. This data is currently available in the "Notification Insights" panel which can be found on the instance overview page on the [dashboard](https://dashboard.pusher.com/beams) .

# Available Metrics

## Acknowledgement Rate

This metric allows you to track what percentage of your notifications were acknowledged back from the device. We calculate this metric in the following way:
<Code showLineNumbers={false} language="plaintext"> Number of device acknowledged notifications / number of notifications triggered

```
 **Number of notifications triggered**
This is the total number of notifications that have been sent to subscribed devices through one of the Server SDKs (or directly through the HTTP Publish API). We only count notifications that have been sent to devices that support delivery tracking. To start tracking delivery you should upgrade to the latest client SDK. For iOS, you must call the `handleNotification` function when you receive a notification (go [here](/docs/beams/reference/ios#handle-notification) to learn more).
 **Number of acknowledged notifications**
We only count a notification as acknowledged when the target mobile device reports back to us that it has actually been received. This gives you insight into whether notifications are making it to the device from the platform gateway. For example, this will help you detect when notifications are dropped by the OS (as they are on certain flavors of Android). Some devices will receive the notification but not report back an acknowledgement because of internet connectivity issues or various operating system limitations.

## Open Rate

This metric gives you insight into how users are engaging with the notifications you send. You can track this metric over time to help improve user engagement with your application. We calculate this metric in the following way:
 <Code showLineNumbers={false} language="plaintext"> Number of notifications opened / Number of openable notifications
```

**Opened Notifications**
We count a notification as having been opened if it appeared in the system tray and was tapped/clicked on by the user (thereby launching your application). We believe this is the best measure of user engagement with your notifications.
**Openable Notifications**
We count a notification as openable if it was successfully delivered to the device and displayed in the system tray by the OS. This has a couple of important consequences.

First, because we do not count notifications that were not delivered, your open rate can be higher than your delivery rate. For example, if 95% of your notifications were delivered and then 100% of those notifications were opened.

Second, we only count notifications that are shown in the system tray by the OS. Notifications will not appear in the system tray when your application is in the foreground (on iOS & Android) or when the notification you send has no displayable content.

# Minimum Requirements

Only newer versions of the client SDKs support open and delivery tracking. You must upgrade your SDK version to meet the following minimum requirements to take advantage of insights:

Android SDK Version >= 0.9.13 <br /> iOS SDK Version >= 0.10.6 <br /> Web SDK: >= 1.0.0

As your users start using the version of your application that satisfies these minimum requirements, their data will begin to appear on the "Notification Insights" panel which can be found on the instance overview page on the [dashboard](https://dashboard.pusher.com/beams) .

# iOS Delivery Tracking

In order to track notification delivery, the SDK requires that you call `handleNotification` in the `didReceiveRemoteNotification` handler. If the returned notification type is `shouldIgnore` - you should return early from the handler as this is a silent housekeeping notification sent by Pusher.

```swift
{iOSDidReceiveRemoteNotificationExample}
```

## content-available

This delivery tracking technique requires that we set the `content-available` flag when publishing to APNs. If you want to disable this behaviour please set the `disable_delivery_tracking` flag when publishing to Beams:

    <Alert warning>
      Warning: This will disable all delivery tracking on iOS including the
      insights graphs on the dashboard, the debug console and delivery webhooks.
    </Alert>

```json
{ publishPayload }
```
