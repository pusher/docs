---
title: Ios migration guide - Channels - Pusher Docs
layout: channels.njk
eleventyNavigation:
  parent: Push notifications
  key: Ios migration guide
  title: iOS migration guide
  order: 3
---

# Push Notifications iOS Migration Guide

# Create and Configure Beams instance

In order to complete this migration you will need a Pusher Beams Instance.

If you haven't already, head on over to the <a href="https://dashboard.pusher.com/beams" target="_blank"> Dashboard </a> and create a new Pusher Beams instance, noting down your Instance ID.

You'll need to configure your iOS instance on the Pusher Beams dashboard, by going to the instance's Settings tab. You can learn how to get the APNs key [here](/docs/beams/getting-started/ios/configure-apns).

# Integrate Beams Swift SDK

Add SDK dependency which can be done by using [CocoaPods](https://github.com/pusher/push-notifications-swift#cocoapods) or [Carthage](https://github.com/pusher/push-notifications-swift#carthage) . Ensure that Push Notifications capabilities are [enabled](/docs/beams/getting-started/ios/sdk-integration#enable-capabilities) .

Import the Beams SDK into your project:

```swift
import PushNotifications
```

Instead of creating an instance of **Pusher**:

```swift
pusher = Pusher(key: "YOUR_APP_KEY", options: options)
```

Use an instance of PushNotifications.shared: . In this case it's `pushNotifications`.

```swift
self.pushNotifications.start(instanceId: "YOUR_INSTANCE_ID")
```

We’ve simplified the way how we register with APNs. Existing code:

```swift
let center = UNUserNotificationCenter.current() center.requestAuthorization(options: [.alert, .sound, .badge]) { (granted, error) in // Handle user allowing / declining notification permission. Example: if (granted) { DispatchQueue.main.async(execute: { application.registerForRemoteNotifications() }) } else { print("User declined notification permissions") } }
```

Can be [replaced](https://docs.pusher.com/mimir, !node_modules, !.nextfications/ios/sdk-integration#register-with-apns) with:

```swift
self.pushNotifications.registerForRemoteNotifications()
```

Register with Pusher:

```swift
func application(_: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) { pusher.nativePusher.register(deviceToken: deviceToken) }
```

Can be replaced with:

```swift
func application(_: UIApplication, didRegisterForRemoteNotificationsWithDeviceToken deviceToken: Data) { self.pushNotifications.registerDeviceToken(deviceToken) }
```

Subscribing to the interest changed from:

```swift
pusher.nativePusher.subscribe(interestName: "donuts")
```

To:

```swift
try? self.pushNotifications.addDeviceInterest(interest: "hello")
```

Unsubscribe changed from:

```swift
pusher.nativePusher.unsubscribe(interestName: "donuts")
```

To:

```swift
try? self.pushNotifications.removeDeviceInterest(interest: "hello")
```

When the application receives a notification, there’s a new function to be called:

```swift
func application(_ application: UIApplication, didReceiveRemoteNotification userInfo: [AnyHashable: Any], fetchCompletionHandler completionHandler: @escaping (UIBackgroundFetchResult) -> Void) { let remoteNotificationType = self.pushNotifications.handleNotification(userInfo: userInfo) if remoteNotificationType == .ShouldIgnore { return } }
```

This function enables new features such as Insights.

# Cleanup Old Dependencies

Remove the `PusherSwift` dependency from your `Podfile` or `Cartfile` and all associated methods and logic from your project.

# Publish a Test Notification

The first step to test your migration is successful is to make sure the notifications are publishing from Pusher Beams to the migrated client device correctly.

- Confirm successful migration by [sending](/docs/beams/getting-started/ios/publish-notifications) a test push notification.  
  The next step to verify that your migration is successful is to attempt to publish a notification to the same Interest using the beta push notification service. If the device has been migrated by installing the new client SDK, then you will no longer deliver a notification to it because the Interest subscription has been removed from the beta push notifications service.

# FAQ

**Q:** Will the interests associated with specific device (device token) be copied over from the Push Notifications BETA product to Pusher Beams automatically?

**A:** Yes, all interests will be migrated from the old service to Pusher Beams. You can test this by sending a push notification to the specific device (device token) and interest.
