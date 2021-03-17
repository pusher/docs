---
title: Android migration guide - Channels - Pusher Docs
layout: channels.njk
eleventyNavigation:
  parent: Push notifications
  key: Android migration guide
  order: 4
---

# Push Notifications Android Migration Guide

# Create and Configure Beams instance

In order to complete this migration you will need a Pusher Beams Instance.

If you haven't already, head on over to the <a href="https://dashboard.pusher.com/beams" target="_blank">Dashboard</a> and create a new Pusher Beams instance, noting down your Instance ID.

You'll need to configure your Android instance on the Pusher Beams dashboard, by going to the instance's Settings tab.

If you previously had integrated with FCM, you can use the same FCM Key to setup your new instance. Otherwise, you can learn how to get this key [here](/docs/beams/getting-started/android/configure-fcm) .

# Integrate Beams Android SDK

## Add new dependencies

To start using Pusher Beams you should install the dedicated Android SDK.

In your project-level `build.gradle`:

- Update the version field of the google services dependency

```groovy
buildscript { dependencies { classpath 'com.google.gms:google-services:4.2.0' } }
```

In your application-level `build.gradle`:

- Upgrade the version field of the Firebase Messaging dependency \* Add the new push-notifications-android package

```groovy
dependencies { ... implementation 'com.google.firebase:firebase-messaging:20.2.3' implementation 'com.pusher:push-notifications-android:1.6.2' }
```

## Replace integration code in your app

> Note: In the Native Pusher API the following methods have optional callbacks that are called when they return. The methods in the Pusher Beams SDK use a offline-first sync strategy and do not use callbacks at all.

#### Registering with the API

Find the location(s) where you register your application with nativePusher:

```java
public class MainActivity extends AppCompatActivity { @Override protected void onCreate(Bundle savedInstanceState) { PusherAndroid pusher = new PusherAndroid("<pusher_api_key>"); PushNotificationRegistration nativePusher = pusher.nativePusher(); nativePusher.registerFCM(this); } // ... }
```

And replace it with the following:

```java
import com.pusher.pushnotifications.PushNotifications; public class MainActivity extends AppCompatActivity { @Override protected void onCreate(Bundle savedInstanceState) { PushNotifications.start(getApplicationContext(), "<beams_instance_id>"); } // ... }
```

#### Subscribing/Unsubscribing

Update all the locations where you subscribe/unsubscribe to interests:

```java
// Old subscribe nativePusher.subscribe("donuts"); // New subscribe PushNotifications.addDeviceInterest("donuts"); // Old unsubscribe nativePusher.unsubscribe("donuts"); // New unsubscribe PushNotifications.removeDeviceInterest("donuts");
```

#### Handling Incoming Notifications

If you would like to handle incoming notifications, replace the service integration in your manifest:

```xml
<application> <!-- ... --> <!-- Pusher's FCM listeners and services --> <service android:name="com.pusher.android.notifications.fcm.FCMMessagingService"> <intent-filter> <action android:name="com.google.firebase.MESSAGING_EVENT"/> </intent-filter> </service> <service android:name="com.pusher.android.notifications.fcm.FCMInstanceIDService"> <intent-filter> <action android:name="com.google.firebase.INSTANCE_ID_EVENT"/> </intent-filter> </service> <!-- ... --> </application>
```

With the following:

```xml
<application> <!-- ... --> <!-- Pusher's FCM listeners and services --> <service android:name=".NotificationsMessagingService"> <intent-filter android:priority="1"> <action android:name="com.google.firebase.MESSAGING_EVENT" /> </intent-filter> </service> <!-- ... --> </application>
```

And add a new Service to your application:

```java
import android.util.Log; import com.google.firebase.messaging.RemoteMessage; import com.pusher.pushnotifications.fcm.MessagingService; public class NotificationsMessagingService extends MessagingService { @Override public void onMessageReceived(RemoteMessage remoteMessage) { // Here you can put any logic you want to execute when the notification arrives. // In the old SDK your logic would have looked something like this: // nativePusher.setFCMListener(new FCMPushNotificationReceivedListener() { // @Override // public void onMessageReceived(RemoteMessage remoteMessage) { // // Your logic here... // } // }); } }
```

# Clean Up Old Integration

Once you have updated the references to the old push notifications SDK there are a few clean up tasks remaining:

## Clean Up Gradle

Remove the following lines from your application-level `build.gradle`:

```groovy
dependencies { compile 'com.google.firebase:firebase-messaging:11.0.4' // compile 'com.google.firebase:firebase-core:11.0.4' -- REMOVE THIS LINE // compile 'com.pusher:pusher-websocket-android:0.7.0' -- REMOVE THIS LINE } apply plugin: 'com.google.gms.google-services'
```

## Clean Up Manifest

If you haven't already, remove the following lines from your application manifest:

```xml
<application> <!-- ... --> <!-- Remove all of these --> <service android:name="com.pusher.android.notifications.fcm.FCMMessagingService"> <intent-filter> <action android:name="com.google.firebase.MESSAGING_EVENT"/> </intent-filter> </service> <service android:name="com.pusher.android.notifications.fcm.FCMInstanceIDService"> <intent-filter> <action android:name="com.google.firebase.INSTANCE_ID_EVENT"/> </intent-filter> </service> <!-- ... --> </application>
```

# Test your migration

Once you launch your app with the above changes your device should automatically migrate itself over to Pusher Beams.

To test that this was successful, do the following:
<List order> _ Publish a notification to the device via one of the pusher-http server SDKs, the device should no longer receive the notification _ Publish to the same interest via one of the new Pusher Beams server SDKs, the notification should arrive on the now migrated device

# Congratulations!

If you have successfully run the above test, you are ready to ship your new integration with Pusher Beams. Your users will be gradually migrated to the new system as they update to this version of your application.

# FAQ

**Q:** Will the interests associated with specific device (device token) be copied over from the Push Notifications BETA product to Pusher Beams automatically?

**A:** Yes, all interests will be migrated from the old service to Pusher Beams. You can test this by sending a push notification to the specific device (device token) and interest.
