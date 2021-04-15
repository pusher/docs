---
title: Init beams
layout: beams.njk
eleventyNavigation:
  parent: Beams getting started android
  key: Init beams android
  title: 3. Initialisze Beams
  order: 3
---

# Initialize Beams

After you have [added the required dependencies](/docs/beams/getting-started/android/sdk-integration/), it's time to start Pusher Beams in your project.

## Import Pusher Beams

Go to the Activity or Application class where you want to use Beams and import the SDK:

```java
import com.pusher.pushnotifications.PushNotifications;
```

## Connect to Pusher

Add this line to connect the device to your Beams instance:

```java
PushNotifications.start(getApplicationContext(), "YOUR_INSTANCE_ID");
```

> Your instance ID can be found in the [dashboard](https://dashboard.pusher.com/beams).

## Add a device interest

Finally, add this line to subscribe to an [interest](/docs/beams/concepts/device-interests) so that your server can send notifications to this device.

```java
PushNotifications.addDeviceInterest("hello");
```

## Where Next?

Now that you have initialized Pusher Beams, why not [send a notification](/docs/beams/getting-started/android/publish-notifications/)?
