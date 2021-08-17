---
title: Pusher Beams Docs | Swift Server SDK
description: Begin publishing push notifications to groups and individual users of your server side Swift app with the Beams SDK.
layout: beams.njk
eleventyNavigation:
  parent: Server sdks
  key: Server sdk swift
  title: Swift
  order: 7
---

# Swift Server SDK

## Installation

To include PushNotifications in your package, add the following to your `Package.swift` file.

```swift
// swift-tools-version:4.0
import PackageDescription

let package = Package(
    name: "YourProjectName",
    dependencies: [
        ...
        .package(url: "git@github.com:pusher/push-notifications-server-swift.git", from: "1.0.0"),
    ],
    targets: [
      .target(name: "YourProjectName", dependencies: ["PushNotifications", ... ])
    ]
)
```

## Reference

### `Class: PushNotifications`

Construct a new Pusher Beams Client connected to your Beams instance.

#### Arguments

{% parameter 'instance_id', 'String', true %}

The unique identifier for your Push notifications instance. This can be found in the dashboard under "Credentials".

{% endparameter %}
{% parameter 'secret_key', 'String', true %}

The secret key your server will use to access your Beams instance. This can be found in the dashboard under "Credentials".

{% endparameter %}

#### Example

```swift
// Pusher Beams Instance Id.
let instanceId = "YOUR_INSTANCE_ID_HERE"
// Pusher Beams Secret Key.
let secretKey = "YOUR_SECRET_KEY_HERE"

// PushNotifications instance.
let beamsClient = PushNotifications(instanceId: instanceId, secretKey: secretKey
```

### `publishToInterests(interests, publishRequest)`

Publish a new push notification to Pusher Beams with the given payload.

#### Arguments

{% parameter 'interests', 'Array', true %}

List of interests to send the push notification to, ranging from 1 to 100 per publish request. See [Interests](/docs/beams/concepts/device-interests).

{% endparameter %}
{% parameter 'publishRequest', 'Map' %}

Map containing the body of the push notification publish request. See [publish API reference](/docs/beams/reference/publish-api#request-body).

{% endparameter %}

#### Returns

A non-empty device ID string if successful; or a non-nil `PushNotificationsError` error otherwise. String that contains `publishId`: See [publish API reference](/docs/beams/reference/publish-api#success-response-body)

#### Example

```swift
// Interests array.
let interests = ["pizza", "donuts"]
// Publish request: APNs, FCM.
let publishRequest = [
  "apns": [
    "aps": [
      "alert": [
          "title": "Hello",
          "body": "Hello, world",
      ]
    ]
  ],
  "fcm": [
    "notification": [
      "title": "Hello",
      "body":  "Hello, world",
    ]
  ]
]

// Publish To Interests
beamsClient.publishToInterests(interests, publishRequest, completion: { result in
    switch result {
    case .value(let publishId):
        print("\\(publishId)")
    case .error(let error):
        print("\\(error)")
    }
})
```

### `publishToUsers(users, publishRequest)`

Publish the given `publishRequest` to specified users.

#### Arguments

{% parameter 'users', 'Array', true %}

Array of ids of users to send the push notification to, ranging from 1 to 1000 per publish request. See [Authenticated Users](/docs/beams/concepts/authenticated-users/).

{% endparameter %}
{% parameter 'publishRequest', 'Map' %}

Map containing the body of the push notification publish request. See [publish API reference](/docs/beams/reference/publish-api#request-body).

{% endparameter %}

#### Returns

String that contains `publishId`: See [publish API reference](/docs/beams/reference/publish-api#success-response-body)

#### Example

```swift
// Users array.
let users = ["jonathan", "jordan", "luís", "luka", "mina"]
// Publish request: APNs, FCM.
let publishRequest = [
    "apns": [
        "aps": [
          "alert": [
              "title": "Hello",
              "body": "Hello, world",
          ]
        ]
      ],
    "fcm": [
        "notification": [
            "title": "Hello",
            "body":  "Hello, world",
        ]
    ]
]

// Publish To Users
beamsClient.publishToUsers(users, publishRequest, completion: { result in
    switch result {
    case .value(let publishId):
        print("\\publishId)")
    case .error(let error):
        print("\\(error)")
    }
})
```

### `generateToken(userId)`

Generate a Beams auth token to allow a user to associate their device with their user ID. The token is valid for 24 hours.

#### Arguments

{% parameter 'userId', null, true %}

ID of the user you would like to generate a Beams auth token for.

{% endparameter %}

#### Example

```swift
beamsClient.generateToken("Elmo", completion: { result in
    switch result {
    case .value(let jwtToken):
        // 'jwtToken' is a Dictionary<String, String>
        // Example: ["token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYWEiLCJleHAiOjE"]
        print("\\(jwtToken)")
    case .error(let error):
        print("\\(error)")
    }
})
```

### `deleteUser(userId)`

Remove the given user (and all of their devices) from Beams. This user will no longer receive any notifications and all state stored about their devices will be deleted.

#### Arguments

{% parameter 'userId', null, true %}

ID of the user you would like to remove from Beams.

{% endparameter %}

#### Example

```swift
beamsClient.deleteUser("Elmo", completion: { result in
    switch result {
    case .value:
        print("User deleted 👌")
    case .error(let error):
        print("\\(error)")
    }
})
```
