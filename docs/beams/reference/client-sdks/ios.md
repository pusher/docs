---
title: iOS - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Client sdks
  key: Client sdks ios
  title: iOS
  order: 1
---

# Swift client SDK

# `PushNotifications`

`PushNotifications` is the top-level entrypoint to the SDK.

## `.shared`

`.shared` is static, so can be accessed from anywhere in your project. The minimum you need to initialize a client is the following:

```swift
{basicInit}
```

## `.start`

Register with the Beams service.

This must be done in `application:didFinishLaunchingWithOptions:` delegate method in AppDelegate class.

```swift
{register}
```

## `.registerForRemoteNotifications`

This is a convenience method that uses <em>alert</em>, <em>sound</em>, and <em>badge</em> as default authorization options.

```swift
{requestPermission}
```

You can specify constants to request authorization for multiple items.

```swift
{requestPermissionWithOptions}
```

- iOS Available options: <a external="" href="https://developer.apple.com/documentation/usernotifications/unauthorizationoptions">UNAuthorizationOptions</a> \* macOS Available options: <a external="" href="https://developer.apple.com/documentation/appkit/nsapplication.remotenotificationtype"> NSApplication.RemoteNotificationType </a>

## `.registerDeviceToken`

Register device token with the Beams service.

```swift
{registerDeviceToken}
```

## `.addDeviceInterest`

Subscribes the device to the given interest.

_Arguments_ <br /> \* `interest` (string): Interest that the device will be subscribed to.

_Returns_ <br /> None

_Example_ <br />

```swift
{addDeviceInterestExample}
```

## `.removeDeviceInterest`

Unsubscribes the device from the given interest.

_Arguments_ <br /> \* `interest` (string): Interest that the device will be unsubscribed from.

_Returns_ <br /> None

_Example_ <br />

```swift
{removeDeviceInterestExample}
```

## `.getDeviceInterests`

Returns the interests the device is currently subscribed to.

_Arguments_ <br /> None

_Returns_ <br /> `interests`({'[String]'} ): Set of interests the device is currently subscribed to.

_Example_ <br />

```swift
{getDeviceInterestsSwiftExample}
```

## `.setDeviceInterests`

Sets the subscriptions state for the device. Any interests not in the set will be unsubscribed from, so this will replace the Interest set by the one provided.

_Arguments_ <br /> \* `interests`({'[String]'} ): Set of new interests

_Returns_ <br /> None

_Example_ <br />

```swift
{setDeviceInterestsSwiftExample}
```

## `.clearDeviceInterests`

Unsubscribes the device from all interests.

_Arguments_ <br /> None

_Returns_ <br /> None

_Example_ <br />

```swift
{clearDeviceInterestsExample}
```

## `.handleNotification`

Use this method to enable Pusher related features, for example, the notification [Insights](/docs/beams/concepts/insights).

```swift
{handleNotification}
```

We provide an option to ignore Pusher related remote notifications.

```swift
{shouldIgnore}
```

All possible cases:

 <Table> <thead> <tr> <th>Case</th> <th>Status</th> </tr> </thead> <tbody> <tr> <td> Pusher sends a test push notification to validate the APNs token. </td> <td>.ShouldIgnore</td> </tr> <tr> <td> Payload contains only the `alert`. </td> <td>.ShouldIgnore</td> </tr> <tr> <td> While app is in the background and payload contains `alert` and `data`. </td> <td>.ShouldIgnore</td> </tr> <tr> <td> While app is in the foreground and payload contains `data`. </td> <td>.ShouldProcess</td> </tr> <tr> <td> Whenever `content-available: 1` is set. </td> <td>.ShouldProcess</td> </tr> </tbody> </Table> 
## `.interestsSetOnDeviceDidChange`
 
Method <em>interestsSetOnDeviceDidChange(interests:)</em> of the protocol <em>InterestsChangedDelegate</em> allows the delegate to be informed when interests set changes. 
 
```swift
{interestsChangedDelegate}
```
 
## `.setUserId`
 
Sets the user id that is associated with this device. You can have up to 100 devices associated with a given user. <Alert primary> This method can only be called after start. Once a user ID has been set for the device it cannot be changed until `clearAllState` or `stop` have been called. </Alert> 
 
*Arguments* <br />  *  `userId` (String): ID of the user you would like to associate with this device.  *  `tokenProvider` (TokenProvider): Token provider that will be used to generate the token for the user that you want to authenticate.  *  `completion` (error): An error object if request failed, or nil if the request was successful.   
 
*Returns* <br /> None 
 
*Example* <br /> <Code language="swift">{setUserIdiOSSwiftExample}
```
 
 
## `.clearAllState`
 
Clears all the state in the SDK, leaving it in a empty started state. You should call this method when your user logs out of the application. 
 
If the device was paired with a user and the app is uninstalled without calling this method, Pusher Beams will remove the device. This can take up to 3 days to take effect. 
 
*Returns* <br /> None 
 
*Example* <br /> 
```swift
{clearAllStateExample}
```
 
 
## `.stop`
 
Stops the SDK by deleting all state (both locally and remotely). Calling this will mean the device will cease to receive push notifications. `start` must be called if you want to use the SDK again. 
 
*Returns* <br /> None 
 
*Example* <br /> 
```swift
{stopExample}
```
