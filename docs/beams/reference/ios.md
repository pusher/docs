---
title: iOS
layout: beams.njk
eleventyNavigation:
  parent: Client sdks
  key: Client sdks ios
  title: iOS
  order: 2
---

# Swift client SDK

### `PushNotifications`

`PushNotifications` is the top-level entrypoint to the SDK.

### `.shared`

`.shared` is static, so can be accessed from anywhere in your project. The minimum you need to initialize a client is the following:

```swift
let beamsClient = PushNotifications.shared
```

### `.start`

Register with the Beams service.

This must be done in `application:didFinishLaunchingWithOptions:` delegate method in AppDelegate class.

```swift
self.beamsClient.start(instanceId: "YOUR_INSTANCE_ID")
```

### `.registerForRemoteNotifications`

This is a convenience method that uses <em>alert</em>, <em>sound</em>, and <em>badge</em> as default authorization options.

```swift
self.beamsClient.registerForRemoteNotifications()
```

You can specify constants to request authorization for multiple items.

```swift
func registerForRemoteNotifications(options:)
```

- iOS Available options: [UNAuthorizationOptions](https://developer.apple.com/documentation/usernotifications/unauthorizationoptions)
- macOS Available options: [NSApplication.RemoteNotificationType](https://developer.apple.com/documentation/appkit/nsapplication.remotenotificationtype)

### `.registerDeviceToken`

Register device token with the Beams service.

```swift
self.beamsClient.registerDeviceToken(deviceToken)
```

### `.addDeviceInterest`

Subscribes the device to the given interest.

#### Arguments

{% parameter 'interest', 'String', true %}

Interest that the device will be subscribed to.

{% endparameter %}

#### Returns

None

#### Example

```swift
try? self.beamsClient.addDeviceInterest(interest: "hello")
```

### `.removeDeviceInterest`

Unsubscribes the device from the given interest.

#### Arguments

{% parameter 'interest', 'String', true %}

Interest that the device will be unsubscribed from.

{% endparameter %}

#### Returns

None

#### Example

```swift
try? self.beamsClient.removeDeviceInterest(interest: "hello")
```

### `.getDeviceInterests`

Returns the interests the device is currently subscribed to.

#### Arguments

{% parameter 'interest', '[String]', true %}

Set of interests the device is currently subscribed to.

{% endparameter %}

#### Returns

None

#### Example

```swift
self.beamsClient.getDeviceInterests()
```

### `.setDeviceInterests`

Sets the subscriptions state for the device. Any interests not in the set will be unsubscribed from, so this will replace the Interest set by the one provided.

#### Arguments

{% parameter 'interest', '[String]', true %}

Set of new interests

{% endparameter %}

#### Returns

None

#### Example

```swift
try? self.beamsClient.setDeviceInterests(interests: ["donuts", "pizza", "gaming"])
```

### `.clearDeviceInterests`

Unsubscribes the device from all interests.

#### Arguments

None

#### Returns

None

#### Example

```swift
try? self.beamsClient.clearDeviceInterests()
```

### `.handleNotification`

Use this method to enable Pusher related features, for example, the notification [Insights](/docs/beams/concepts/insights).

```swift
self.beamsClient.handleNotification(userInfo: userInfo)
```

We provide an option to ignore Pusher related remote notifications.

```swift
let remoteNotificationType = self.beamsClient.handleNotification(userInfo: userInfo)
if remoteNotificationType == .ShouldIgnore {
  return
}
```

All possible cases:

| Case                                                                    | Status         |
| ----------------------------------------------------------------------- | -------------- |
| Pusher sends a test push notification to validate the APNs token.       | .ShouldIgnore  |
| Payload contains only the `alert`.                                      | .ShouldIgnore  |
| While app is in the background and payload contains `alert` and `data`. | .ShouldIgnore  |
| While app is in the foreground and payload contains `data`.             | .ShouldProcess |
| Whenever `content-available: 1` is set.                                 | .ShouldProcess |

### `.interestsSetOnDeviceDidChange`

Method <em>interestsSetOnDeviceDidChange(interests:)</em> of the protocol <em>InterestsChangedDelegate</em> allows the delegate to be informed when interests set changes.

```swift/2,4-5,9,12-14
import UIKit
import Foundation
import PushNotifications

class ViewController: UIViewController, InterestsChangedDelegate {
    let beamsClient = PushNotifications.shared

    override func viewDidLoad() {
        super.viewDidLoad()
        self.beamsClient.delegate = self
    }

    func func interestsSetOnDeviceDidChange(interests: [String]) {
        print(interests) // ["vegan-pizza", "donuts"]
    }

```

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
{% parameter 'completion', 'Error' %}

An error object if request failed, or nil if the request was successful.

{% endparameter %}

#### Returns

None

#### Example

```swift
let tokenProvider = BeamsTokenProvider(authURL: "<YOUR_BEAMS_AUTH_URL_HERE>") { () -> AuthData in
  let sessionToken = "SESSION-TOKEN"
  let headers = ["Authorization": "Bearer \\(sessionToken)"] // Headers your auth endpoint needs
  let queryParams: [String: String] = [:] // URL query params your auth endpoint needs
  return AuthData(headers: headers, queryParams: queryParams)
}
self.beamsClient.setUserId("<USER_ID_GOES_HERE>", tokenProvider: tokenProvider, completion: { error in
  guard error == nil else {
      print(error.debugDescription)
      return
  }

  print("Successfully authenticated with Pusher Beams")
})
```

### `.clearAllState`

Clears all the state in the SDK, leaving it in a empty started state. You should call this method when your user logs out of the application.

If the device was paired with a user and the app is uninstalled without calling this method, Pusher Beams will remove the device. This can take up to 3 days to take effect.

#### Returns

None

#### Example

```swift
beamsClient.clearAllState {
  print("Cleared all state!")
}
```

### `.stop`

Stops the SDK by deleting all state (both locally and remotely). Calling this will mean the device will cease to receive push notifications. `start` must be called if you want to use the SDK again.

#### Returns

None

#### Example

```swift
beamsClient.stop {
  print("Stopped!")
}
```
