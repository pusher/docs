---
title: Server sdk swift - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Server sdks
  key: Server sdk swift
  title: Swift
  order: 7
---

# Swift Server SDK

# Installation

To include PushNotifications in your package, add the following to your `Package.swift` file.

```swift
{install}
```

# Usage

## Configuring the SDK for your instance

Use your instance ID and secret key (you can get these from the dashboard) to create a `PushNotifications` instance:

```swift
{instanceExampleSwift}
```

## Publishing a notification

Once you have created your `PushNotifications` instance you can publish a push notification to your registered and subscribed devices:

```swift
{publishExampleSwift}
```

## Publish to users

```swift
{publishToUsersExample}
```

## Generate Token

```swift
{generateTokenExample}
```

## Delete user

```swift
{deleteUserExample}
```

# Reference

## `Class: PushNotifications`

** PushNotifications(instanceId: instanceId, secretKey: secretKey) **
Construct a new Pusher Beams Client connected to your Beams instance.

_Arguments_ <br /> _ `instanceId` (string): The unique identifier for your Push notifications instance. This can be found in the dashboard under "Credentials". _ `secretKey` (string): The secret key your server will use to access your Beams instance. This can be found in the dashboard under "Credentials".

## `publishToInterests(interests, publishRequest)`

Publish a new push notification to Pusher Beams with the given payload.

_Arguments_ <br /> _ `interests`: List of interests to send the push notification to, ranging from 1 to 100 per publish request. See [Interests](/docs/beams/concepts/interests). _ `publishRequest`: Map containing the body of the push notification publish request. See [publish API reference](/docs/beams/reference/publish-api#request-body).

_Returns_ <br />A non-empty device ID string if successful; or a non-nil `PushNotificationsError` error otherwise. String that contains `publishId`: See [publish API reference](/docs/beams/reference/publish-api#success-response-body)

## `publishToUsers(users, publishRequest)`

Publish the given `publishRequest` to specified users.

_Arguments_ <br /> _ `users`: Array of ids of users to send the push notification to, ranging from 1 to 1000 per publish request. See [Authenticated Users](/docs/beams/concepts/users). _ `publishRequest`: Map containing the body of the push notification publish request. See [publish API reference](/docs/beams/reference/publish-api#request-body).

_Returns_ <br /> String that contains `publishId`: See [publish API reference](/docs/beams/reference/publish-api#success-response-body)

## `generateToken(userId)`

Generate a Beams auth token to allow a user to associate their device with their user ID. The token is valid for 24 hours.

_Arguments_ <br /> \* `userId`: ID of the user you would like to generate a Beams auth token for.

## `deleteUser(userId)`

Remove the given user (and all of their devices) from Beams. This user will no longer receive any notifications and all state stored about their devices will be deleted.

_Arguments_ <br /> \* `userId`: ID of the user you would like to remove from Beams.
