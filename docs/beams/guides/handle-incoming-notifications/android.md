---
title: Android
layout: beams.njk
eleventyNavigation:
  parent: Handle incoming notifications
  key: Handle incoming notifications android
  title: Android
  order: 1
---

# Handle incoming notifications: Android

Beams makes it possible trigger callback code in your application when a push notification arrives on a user's device. This can be used to respond to the arrival of the notification in your application.

## Handle all notifications

You can implement a service to handle incoming notifications. It will get called when your application is:

- In the foreground
- In the background, and the notification **only** contains a data payload.

```xml
<manifest>
    <application>
        ...
        <!-- Add these lines: -->
        <service android:name=".NotificationsMessagingService">
            <intent-filter android:priority="1">
                <action android:name="com.google.firebase.MESSAGING_EVENT" />
            </intent-filter>
        </service>
    </application>
</manifest>
```

> When your application is in the background this service will not be called unless there is **only** a data payload in the notification. The `notification` key cannot be used.

```java
import android.util.Log;

import com.google.firebase.messaging.RemoteMessage;
import com.pusher.pushnotifications.fcm.MessagingService;

public class NotificationsMessagingService extends MessagingService {
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        Log.i("NotificationsService", "Got a remote message 🎉");
    }
}
```

## Handle notifications in a particular Activity

When a push notification arrives while your activity is in display, the Beams SDK will call the `onMessageReceived` listener with a `RemoteMessage` object containing the notification and data payload.

**PHP server:**

```js
var publishResponse = beamsClient.publish(
  ["hello"],
  {
    "fcm": {
      "notification": {
        "title": "Hello",
        "body": "Hello, World!",
      },
      // This data can be used in your activity when a notification arrives
      // with your app in the foreground.
      "data": {
        "inAppNotificationMessage": "Display me somewhere in the app ui!",
      },
  },
);
```

**Android activity:**

```java
@Override
protected void onResume() {
    super.onResume();
    PushNotifications.setOnMessageReceivedListenerForVisibleActivity(this, new PushNotificationReceivedListener() {
        @Override
        public void onMessageReceived(RemoteMessage remoteMessage) {
            String messagePayload = remoteMessage.getData().get("inAppNotificationMessage");
            if (messagePayload == null) {
                // Message payload was not set for this notification
                Log.i("MyActivity", "Payload was missing");
            } else {
                Log.i("MyActivity", messagePayload);
                // Now update the UI based on your message payload!
            }
        }
    });
}
```
