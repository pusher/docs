---
title: Android
layout: beams.njk
eleventyNavigation:
  parent: Client sdks
  key: Client sdks Android
  title: Android
  order: 2
---

# Kotlin / Java client SDK

## `PushNotifications`

`PushNotifications` is the top-level entrypoint to the SDK. Methods are static, so can be accessed from anywhere in your project.

### `.start`

Starts the SDK. Must be called at least once to ensure that the device is registered with Beams.

#### Returns

None

#### Example

{% snippets ['Kotlin/Java'] %}

```kotlin
PushNotifications.start(getApplicationContext(), "YOUR_INSTANCE_ID");
```

{% endsnippets %}

### `.addDeviceInterest`

Subscribes the device to the given interest.

#### Arguments

{% parameter 'interest', 'String', true %}

Interest that the device will be subscribed to.

{% endparameter %}

#### Returns

None

#### Example

{% snippets ['Kotlin/Java'] %}

```kotlin
PushNotifications.addDeviceInterest("hello");
```

{% endsnippets %}

### `.removeDeviceInterest`

Unsubscribes the device from the given interest.

#### Arguments

{% parameter 'interest', 'String', true %}

Interest that the device will be unsubscribed from.

{% endparameter %}

#### Returns

None

#### Example

{% snippets ['Kotlin/Java'] %}

```kotlin
PushNotifications.removeDeviceInterest("hello");
```

{% endsnippets %}

### `.getDeviceInterests`

Returns the interests the device is currently subscribed to.

#### Arguments

None

#### Returns

{% parameter 'interests', 'Set<String>' %}

Set of interests the device is currently subscribed to.

{% endparameter %}

#### Example

{% snippets ['kotlin', 'java'] %}

```kotlin
val interests = PushNotifications.getDeviceInterests();
```

```java
Set<String> interests = PushNotifications.getDeviceInterests();
```

{% endsnippets %}

### `.setDeviceInterests`

Sets the subscriptions state for the device. Any interests not in the set will be unsubscribed from, so this will replace the Interest set by the one provided.

#### Arguments

{% parameter 'interests', 'Set<String>', true %}

Set of new interests

{% endparameter %}

#### Returns

None

#### Example

{% snippets ['kotlin', 'java'] %}

```kotlin
PushNotifications.setDeviceInterests(setOf("hello", "donuts"))
```

```java
PushNotifications.setDeviceInterests(Arrays.asList("hello", "donuts").toSet());
```

{% endsnippets %}

### `.clearDeviceInterests`

Unsubscribes the device from all interests.

#### Arguments

None

#### Returns

None

#### Example

{% snippets ['Kotlin/Java'] %}

```kotlin
PushNotifications.clearDeviceInterests();
```

{% endsnippets %}

### `.setOnDeviceInterestsChangedListener`

Sets a callback which will be fired whenever Device Interests are changed.

#### Arguments

{% parameter 'listener', 'SubscriptionsChangedListener' %}

Callback which will be fired when Device Interests change.

{% endparameter %}

#### Returns

None

#### Example

{% snippets ['kotlin', 'java'] %}

```kotlin
PushNotifications.setOnDeviceInterestsChangedListener(object: SubscriptionsChangedListener {
  override fun onSubscriptionsChanged(interests: Set<String>) {
    // do something wonderful 🌈
  }
})
```

```java
PushNotifications.setOnDeviceInterestsChangedListener(new SubscriptionsChangedListener() {
  @Override
  public void onSubscriptionsChanged(Set<String> interests) {
    // do something magical 🔮
  }
});
```

{% endsnippets %}

### `.setOnMessageReceivedListenerForVisibleActivity`

Configures the listener that handles a remote message only when this activity is in the foreground. You can use this method to update your UI. This should be called from the `Activity.onResume` method.

#### Arguments

{% parameter 'activity', 'Activity' %}

Activity for which this callback will trigger

{% endparameter %}
{% parameter 'listener', 'PushNotificationReceivedListener' %}

Callback which will be fired when a notification arrives.

{% endparameter %}

#### Returns

None

#### Example

{% snippets ['kotlin', 'java'] %}

```kotlin
PushNotifications.setOnMessageReceivedListenerForVisibleActivity(this, object: PushNotificationReceivedListener {
  override fun onMessageReceived(remoteMessage: RemoteMessage) {
      // do something wonderful 🌈
  }
})
```

```java
PushNotifications.setOnMessageReceivedListenerForVisibleActivity(this, new PushNotificationReceivedListener() {
  @Override
  public void onMessageReceived(RemoteMessage remoteMessage) {
      // do something magical 🔮
  }
});
```

{% endsnippets %}

### `.setUserId`

Sets the user id that is associated with this device. You can have up to 100 devices associated with a given user.

> This method can only be called after start. Once a user ID has been set for the device it cannot be changed until `clearAllState` or `stop` have been called.

#### Arguments

{% parameter 'userId', 'String', true %}

ID of the user you would like to associate with this device.
{% endparameter %}
{% parameter 'tokenProvider', 'TokenProvider', true %}

Token provider that will be used to generate the token for the user that you want to authenticate.

{% endparameter %}
{% parameter 'callback', 'BeamsCallback', false %}

Callback used to indicate whether the authentication process has succeeded.
{% endparameter %}

#### Returns

None

#### Example

{% snippets ['kotlin', 'java'] %}

```kotlin
val tokenProvider = BeamsTokenProvider(
    "<YOUR_BEAMS_AUTH_URL_HERE>",
    object: AuthDataGetter {
      override fun getAuthData(): AuthData {
        return AuthData(
            // Headers and URL query params your auth endpoint needs to
            // request a Beams Token for a given user
            headers = hashMapOf(
                // for example:
                // "Authorization" to sessionToken
            ),
            queryParams = hashMapOf()
        )
      }
    }
)
.setUserId(
    "<USER_ID_GOES_HERE>",
    tokenProvider,
    object : BeamsCallback<Void, PusherCallbackError> {
      override fun onFailure(error: PusherCallbackError) {
        Log.e("BeamsAuth", "Could not login to Beams: \${error.message}");
      }

      override fun onSuccess(vararg values: Void) {
        Log.i("BeamsAuth", "Beams login success");
      }
    }
)
```

```java
BeamsTokenProvider tokenProvider = new BeamsTokenProvider(
  "<YOUR_BEAMS_AUTH_URL_HERE>",
  new AuthDataGetter() {
    @Override
    public AuthData getAuthData() {
      // Headers and URL query params your auth endpoint needs to
      // request a Beams Token for a given user
      HashMap<String, String> headers = new HashMap<>();
      // for example:
      // headers.put("Authorization", sessionToken);
      HashMap<String, String> queryParams = new HashMap<>();
      return new AuthData(
        headers,
        queryParams
      );
    }
  }
);
PushNotifications.setUserId("<USER_ID_GOES_HERE>", tokenProvider, new BeamsCallback<Void, PusherCallbackError>(){
  @Override
  public void onSuccess(Void... values) {
      Log.i("PusherBeams", "Successfully authenticated with Pusher Beams");
  }

  @Override
  public void onFailure(PusherCallbackError error) {
      Log.i("PusherBeams", "Pusher Beams authentication failed: " + error.getMessage());
  }
});
```

{% endsnippets %}

### `.clearAllState`

Clears all the state in the SDK, leaving it in a empty started state. You should call this method when your user logs out of the application.

If the device was paired with a user and the app is uninstalled without calling this method, Pusher Beams will remove the device. This can take up to 3 days to take effect.

#### Arguments

None

#### Returns

None

#### Example

{% snippets ['Kotlin/Java'] %}

```kotlin
PushNotifications.clearAllState();
```

{% endsnippets %}

### `.stop`

Stops the SDK by deleting all state (both locally and remotely). Calling this will mean the device will cease to receive push notifications. `start` must be called if you want to use the SDK again.

#### Arguments

None

#### Returns

None

#### Example

{% snippets ['Kotlin/Java'] %}

```kotlin
PushNotifications.stop();
```

{% endsnippets %}

## `MessagingService`

`MessagingService` is an Android `Service` base class that can be extended to handle data coming from FCM such as incoming notifications and the FCM device token.

### `.onMessageReceived`

Callback used to inform the service of incoming push notifications.

#### Arguments

{% parameter 'remoteMessage', 'RemoteMessage' %}

Object containing details of the incoming notification.

{% endparameter %}

#### Returns

None

#### Example

{% snippets ['kotlin', 'java'] %}

```kotlin
class MyCustomMessagingService: MessagingService() {
  override fun onMessageReceived(remoteMessage: RemoteMessage) {
    // We just got a notification 🔥
  }
}
```

```java
public class MyCustomMessagingService extends MessagingService {
    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        // We just got a notification 🔥
    }
}
```

{% endsnippets %}

### `.onNewToken`

Callback used to inform the service when the device gets a new FCM device token. You can use this token to integrate with other push notification services. **This token has already been passed to the Beams SDK no further action is required**.

#### Arguments

{% parameter 'token', 'String', true %}

New FCM device token.

{% endparameter %}

#### Returns

None

#### Example

{% snippets ['kotlin', 'java'] %}

```kotlin
class MyCustomMessagingService: MessagingService() {
  override fun onMessageReceived(remoteMessage: RemoteMessage) {
    // We just got a notification 🔥
  }

  override fun onNewToken(remoteMessage: RemoteMessage) {
    // Incoming device token from FCM 🔒
  }
}
```

```java
public class MyCustomMessagingService extends MessagingService {
  @Override
  public void onMessageReceived(RemoteMessage remoteMessage) {
    // We just got a notification 🔥
  }

  @Override
  public void onNewToken(String token) {
    super.onNewToken(token);
    // Incoming device token from FCM 🔒
  }
}
```

{% endsnippets %}
