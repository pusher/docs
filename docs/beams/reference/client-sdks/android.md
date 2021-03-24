---
title: Android - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation: 
  parent: Client sdks
  key: Client sdks Android
  title: Android
  order: 2
---
# Kotlin / Java client SDK
 
# `PushNotifications`
 
`PushNotifications` is the top-level entrypoint to the SDK. Methods are static, so can be accessed from anywhere in your project. 
 
## `.start`
 
Starts the SDK. Must be called at least once to ensure that the device is registered with Beams. 
 
*Arguments* <br /> None 
 
*Returns* <br /> None 
 
*Example* <br /> 
```kotlin
{basicInitSingleton}
```
 
 
## `.addDeviceInterest`
 
Subscribes the device to the given interest.
 
*Arguments* <br />  *  `interest` (string): Interest that the device will be subscribed to.   
 
*Returns* <br /> None 
 
*Example* <br /> 
```kotlin
{addDeviceInterestExample}
```
 
 
## `.removeDeviceInterest`
 
Unsubscribes the device from the given interest.
 
*Arguments* <br />  *  `interest` (string): Interest that the device will be unsubscribed from.   
 
*Returns* <br /> None 
 
*Example* <br /> 
```kotlin
{removeDeviceInterestExample}
```
 
 
## `.getDeviceInterests`
 
Returns the interests the device is currently subscribed to.
 
*Arguments* <br /> None 
 
*Returns* <br /> `interests`({'Set<String>'} ): Set of interests the device is currently subscribed to. 
 
*Example* <br /> 
{% snippets ['kotlin', 'Java'] %}
 
```kotlin
{getDeviceInterestsKotlinExample}
```
 
```java
{getDeviceInterestsJavaExample}
```
 
{% endsnippets %}
 
 
## `.setDeviceInterests`
 
Sets the subscriptions state for the device. Any interests not in the set will be unsubscribed from, so this will replace the Interest set by the one provided. 
 
*Arguments* <br />  *  `interests`({'Set<String>'} ): Set of new interests   
 
*Returns* <br /> None 
 
*Example* <br /> 
{% snippets ['kotlin', 'java'] %}
 
```kotlin
{setDeviceInterestsKotlinExample}
```
 
```java
{setDeviceInterestsJavaExample}
```
 
{% endsnippets %}
 
 
## `.clearDeviceInterests`
 
Unsubscribes the device from all interests.
 
*Arguments* <br /> None 
 
*Returns* <br /> None 
 
*Example* <br /> 
```kotlin
{clearDeviceInterestsExample}
```
 
 
## `.setOnDeviceInterestsChangedListener`
 
Sets a callback which will be fired whenever Device Interests are changed. 
 
*Arguments* <br />  *  `listener` (SubscriptionsChangedListener): Callback which will be fired when Device Interests change.   
 
*Returns* <br /> None 
 
*Example* <br /> 
{% snippets ['kotlin', 'java'] %}
 
```kotlin
{setOnDeviceInterestsChangedListenerKotlin}
```
 
```java
{setOnDeviceInterestsChangedListenerJava}
```
 
{% endsnippets %}
 
 
##  `.setOnMessageReceivedListenerForVisibleActivity` 
 
Configures the listener that handles a remote message only when this activity is in the foreground. You can use this method to update your UI. This should be called from the `Activity.onResume` method. 
 
*Arguments* <br />  *  `activity` (Activity): Activity for which this callback will trigger  *  `listener` (PushNotificationReceivedListener): Callback which will be fired when a notification arrives.   
 
*Returns* <br /> None 
 
*Example* <br /> 
{% snippets ['kotlin', 'java'] %}
 
```kotlin
{setOnMessageReceivedListenerForVisibleActivityKotlin}
```
 
```java
{setOnMessageReceivedListenerForVisibleActivityJava}
```
 
{% endsnippets %}
 
 
## `.setUserId`
 
Sets the user id that is associated with this device. You can have up to 100 devices associated with a given user. <Alert primary> This method can only be called after start. Once a user ID has been set for the device it cannot be changed until `clearAllState` or `stop` have been called. </Alert> 
 
*Arguments* <br />  *  `userId` (String): ID of the user you would like to associate with this device.  *  `tokenProvider` (TokenProvider): Token provider that will be used to generate the token for the user that you want to authenticate.  *  `callback` (BeamsCallback | Optional): Callback used to indicate whether the authentication process has succeeded.   
 
*Returns* <br /> None 
 
*Example* <br /> 
{% snippets ['kotlin', 'java'] %}
 
```kotlin
{setUserIdKotlinExample}
```
 
```java
{setUserIdJavaExample}
```
 
{% endsnippets %}
 
 
## `.clearAllState`
 
Clears all the state in the SDK, leaving it in a empty started state. You should call this method when your user logs out of the application. 
 
If the device was paired with a user and the app is uninstalled without calling this method, Pusher Beams will remove the device. This can take up to 3 days to take effect. 
 
*Arguments* <br /> None 
 
*Returns* <br /> None 
 
*Example* <br /> 
```kotlin
{clearAllStateExample}
```
 
 
## `.stop`
 
Stops the SDK by deleting all state (both locally and remotely). Calling this will mean the device will cease to receive push notifications. `start` must be called if you want to use the SDK again. 
 
*Arguments* <br /> None 
 
*Returns* <br /> None 
 
*Example* <br /> 
```kotlin
{stopExample}
```
 
 
# `MessagingService`
 
`MessagingService` is an Android `Service` base class that can be extended to handle data coming from FCM such as incoming notifications and the FCM device token. 
 
## `.onMessageReceived`
 
Callback used to inform the service of incoming push notifications. 
 
*Arguments* <br />  *  `remoteMessage` (RemoteMessage): Object containing details of the incoming notification.   
 
*Returns* <br /> None 
 
*Example* <br /> 
{% snippets ['kotlin', 'java'] %}
 
```kotlin
{onMessageReceivedKotlinExample}
```
 
```java
{onMessageReceivedJavaExample}
```
 
{% endsnippets %}
 
 
## `.onNewToken`
 
Callback used to inform the service when the device gets a new FCM device token. You can use this token to integrate with other push notification services. ** This token has already been passed to the Beams SDK no further action is required ** . 
 
*Arguments* <br />  *  `token` (String): New FCM device token.   
 
*Returns* <br /> None 
 
*Example* <br /> 
{% snippets ['kotlin', 'java'] %}
 
```kotlin
{onNewTokenKotlinExample}
```
 
```java
{onNewTokenJavaExample}
```
 
{% endsnippets %}
 

