---
title: Sdk integration - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Beams getting started ios
  key: Sdk integration
  title: 2. Integrate SDK
  order: 2
---

# Integrate iOS SDK

Our Beams service lets you subscribe iOS devices to [interests](/docs/beams/concepts/interests). When your servers publish push notifications to interests, the iOS devices subscribed to the relevant interests will receive them. Your iOS application can subscribe to interests using our Swift SDK. This page guides you through setting up your iOS application to register, subscribe to interests, and receive push notifications pushed to those interests.

# Minimum Requirements

[Xcode](https://itunes.apple.com/us/app/xcode/id497799835) - The easiest way to get Xcode is from the [App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12) , but you can also download it from [developer.apple.com](https://developer.apple.com) if you have an AppleID registered with an Apple Developer account.

# Install from CocoaPods

[CocoaPods](https://cocoapods.org) is a dependency manager for Cocoa projects. You can install it with the following commands:

```rb
{cocoapodsInstall}
```

Create an empty Podfile:

```rb
{podInit}
```

To integrate Beams into your Xcode project using CocoaPods, specify it in your Podfile:

```rb
{podfile}
```

Run the following command:

```rb
{podInstall}
```

When installation is complete open the `.xcworkspace` that was created.

# Install from Carthage

[Carthage](https://github.com/Carthage/Carthage) is a decentralized dependency manager that builds your dependencies and provides you with binary frameworks.

You can install Carthage with [Homebrew](https://brew.sh) using the following command:

```bash
{carthageInstall}
```

To integrate Beams into your Xcode project using Carthage, specify it in your `Cartfile`:

```bash
{cartfile}
```

Run `carthage bootstrap` to build the framework and drag the built `PushNotifications.framework` into your Xcode project.

# Enable Capabilities

In the project navigator, select your project, and click on the <em>Signing & Capabilities</em> tab. [Enable Push Notifications](http://help.apple.com/xcode/mac/current/#/devdfd3d04a1) by clicking on the "+ Capability" button.

Enable <em>Remote notifications</em> and <em>Background processing</em> in the <em>Background Modes</em> section.
<Image src="/docs/static/beams/media/capabilities.png" />

# Register with APNs

For your iOS app to receive push notifications, it must first register the device with APNs. You should do this when the application finishes launching, i.e. in its `application:didFinishLaunchingWithOptions:` handler:
<CodeDiff language="swift">{registerWithAPNs}</CodeDiff>

# Register with Pusher

APNs will provide a device token identifying your app instance. This device token is passed to your application with the `application:didRegisterForRemoteNotificationsWithDeviceToken:` method. Pusher requires the `deviceToken` in order to send push notifications to the app instance. Your app should register with Push Notifications, passing along its device token. Add a handler for it:
<CodeDiff language="swift">{deviceToken}</CodeDiff>

# Add a device interest

Subscribe the app to the interest <em>hello</em>:
<CodeDiff language="swift">{addDeviceInterest}</CodeDiff>
When your server publishes a push notification to the interest <em>hello</em>, it will get passed to your app. This happens as a call to `application:didReceiveRemoteNotification:fetchCompletionHandler:` in your `AppDelegate`:
<CodeDiff language="swift">{handlePayload}</CodeDiff>

## Notification delivery for iOS 13 and above

Please read [these notes](/docs/beams/guides/handle-incoming-notifications/ios#notification-delivery-for-ios-13-and-above) for a guide on how to ensure timely notification delivery to your app on iOS 13 and above.

# Where Next?

      Now that you have integrated the SDK into your iOS project why not
      [send a notification]({urls.ios.step3})?
