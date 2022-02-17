---
date: 2022-02-16
title: Pusher Beams Docs | Flutter SDK Integration
description: Integrate the Flutter SDK for Pusher into your project so you can start sending push notifications to your mobile users.
layout: beams.njk
eleventyNavigation:
  parent: Beams getting started flutter
  key: Sdk integration flutter
  title: 2. Integrate SDK
  order: 2
---

# Integrate SDKs

Once you have [properly configured FCM and APNS](/docs/beams/getting-started/flutter/configure-fcm-and-apns/) you will need to integrate the SDKs into your project.

## Prerequisites

- [Pusher Beams Account](https://dashboard.pusher.com/accounts/sign_up?product=beams).
- [Flutter >= 2.x.x](https://docs.flutter.dev/get-started/install).

### Android Additional

- [Firebase Account](https://firebase.google.com/) and a `google-services.json` ([follow this guide](https://pusher.com/docs/beams/getting-started/android/sdk-integration/)). Do not initialize anything, this plugin just requires a `google-services.json` in your android/app folder.
- [Enable Multidex](https://firebase.flutter.dev/docs/manual-installation/android#enabling-multidex) (If your minSdkVersion is lower than 21)
- For Android 12 support, `compileSdkVersion` must be set to 31. (if you use Kotlin, use version `1.5.30`)

### iOS Additional

- [Xcode](https://itunes.apple.com/us/app/xcode/id497799835) - The easiest way to get Xcode is from the [App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12) , but you can also download it from [developer.apple.com](https://developer.apple.com) if you have an AppleID registered with an Apple Developer account.
- [Enable capabilities within your iOS app](https://pusher.com/docs/beams/getting-started/ios/sdk-integration/#enable-capabilities).
- [Configure APNs](https://pusher.com/docs/beams/getting-started/ios/configure-apns/) in order to work with iOS platform.

## Create a Flutter application

Create a new Flutter project.

```bash
flutter create example
```

## Add Pusher Beams SDK

Inside the project directory, run the following command to add our library.

```bash
flutter pub add pusher_beams
```

## Android

### Add Firebase config file to your project

Have you downloaded the `google-services.json` config file from your Firebase project console?

  <details>

  <summary><span>If not, see this video.</span></summary>

  <figure class="mh0 mv5 pa0 border-box">
    <video controls height="auto" style="max-width: 100%">
      <source src="/docs/static/video/firebase_get_config_json.webm" type="video/webm" />
      <source src="/docs/static/video/firebase_get_config_json.mp4" type="video/mp4" />
      Hey! Your browser does not support videos!
    </video>
  </figure>

  </details>

### Move config file into project

Move your `google-services.json` config file into your project, in the `example/android/app` directory:

```http
example/android/app/google-services.json
```

## Update your project-level gradle config

Edit project level Gradle build script (`example/android/build.gradle`) and add the following line to dependencies.

```bash
classpath 'com.google.gms:google-services:4.2.0'
```

## Update your app-level gradle config

And edit the app level Gradle build script (`example/android/app/build.gradle`) and add the following line.

```bash
apply plugin: 'com.google.gms.google-services'
```

## iOS

Open the iOS project (`example/ios`) in XCode and go to Build Settings and ensure that “iOS Deployment Target” is not lower than iOS 10.0. Then go to “Signing and Capabilities” and set the “Bundle Identifier” to the App ID you created in your Apple Account.

### Enable Capabilities

In the project navigator, select your project, and click on the <em>Signing & Capabilities</em> tab. [Enable Push Notifications](http://help.apple.com/xcode/mac/current/#/devdfd3d04a1) by clicking on the "+ Capability" button.

Enable <em>Remote notifications</em> in the <em>Background Modes</em> section.

![Screenshot from xCode showing Remote Notifications checked](./img/capabilities.png)

## Import Pusher Beams and add a device interest

Now it’s time to use Pusher Beams in your code. The following snippet includes the imports and the lines you need to add to your `main()` function in `lib/main.dart` file.

```dart/0,2,5,7
import 'package:pusher_beams/pusher_beams.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  const instanceID = '00000000-0000-0000-0000-000000000000';
  await PusherBeams.instance.start(instanceID);
  await PusherBeams.instance.setDeviceInterests([‘hello’]);

  runApp(const MyApp());
}
```

Remember that the main function must be `async`.

> Your instance ID can be found in the [dashboard](https://dashboard.pusher.com/beams). Replace the instanceID with the id of the Beams instance you just created.

We subscribe the app to the interest <em>hello</em> on line 8.

When your server publishes a push notification to the interest <em>hello</em>, it will get passed to your app.

The SDK also provides more ways to add and remove interests.

```dart
await PusherBeams.instance.addDeviceInterest('bananas');
await PusherBeams.instance.removeDeviceInterest('bananas');
await PusherBeams.instance.clearDeviceInterests();
```

## Where Next?

Now that you have initialized Pusher Beams, why not [send a notification](/docs/beams/getting-started/flutter/publish-notifications/)?
