---
title: Server sdk go - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Server sdks
  key: Server sdk go
  title: Go
  order: 1
---

# Go Server SDK

# Installation

You can install this SDK by doing:

```http
{goGetInstallExample}
```

# Reference

## `.New`

Constructs a new Beams client instance using your instance id and secret key (you can get these from the dashboard)

_Arguments_ <br /> _ `instanceId` (string): The unique identifier for your Push notifications instance. This can be found in the dashboard under "Credentials". _ `secretKey` (string): The secret key your server will use to access your Beams instance. This can be found in the dashboard under "Credentials". \* `options` (Option | vararg): Variadic list of options for configuring the SDK

_Returns_ <br /> _ `client` (PushNotifications): Beams API client implementing the `PushNotifications` interface. _ `err` (error): Error value if something went wrong, `nil` otherwise.

_Example_

```go
{connectingExample}
```

## `.PublishToInterests`

Sends broadcast notifications to groups of subscribed devices using [Device Interests](/docs/beams/concepts/device-interests)

_Arguments_ <br /> * `interests` ([]string | *Min length=1, Max length=100* ): List of interests to send the push notification to, ranging from 1 to 100 per publish request. See [Device Interests](/docs/beams/concepts/device-interests) * `publishBody`({'map[string]interface{}'} ): A map containing the publish request body. See [publish API reference](/docs/beams/reference/publish-api#request-body)

_Returns_ <br /> _ `publishID` (string): Unique identifier for the publish request. _ `err` (error): Error value if something went wrong, `nil` otherwise.

_Example_ <br />

```go
{goPublishToInterests}
```

## `.PublishToUsers`

Securely send notifications to individual users of your application using [Authenticated Users](/docs/beams/concepts/authenticated-users)

_Arguments_ <br /> * `userIds` ([]string | *Min length=1, Max length=1000* ): List of ids of users to send the push notification to, ranging from 1 to 1000 per publish request. See [Authenticated Users](/docs/beams/concepts/authenticated-users) * `publishBody`({'map[string]interface{}'} ): A map containing the publish request body. See [publish API reference](/docs/beams/reference/publish-api#request-body)

_Returns_ <br /> _ `publishID` (string): Unique identifier for the publish request. _ `err` (error): Error value if something went wrong, `nil` otherwise.

_Example_ <br />

```go
{goPublishToUsers}
```

## `.GenerateToken`

Generate a Beams auth token to allow a user to associate their device with their user id. The token is valid for 24 hours.

_Arguments_ <br /> \* `userID` (string): Id of the user you would like to generate a Beams auth token for.

_Returns_ <br /> _ `beamsToken` (string): Beams Token for the given user _ `err` (error): Error value if something went wrong, `nil` otherwise.

_Example_ <br />

```go
{generateTokenExample}
```

## `.DeleteUser`

Remove the given user (and all of their devices) from Beams. This user will no longer receive any notifications and all state stored about their devices will be deleted.

_Arguments_ <br /> \* `userID` (string): Id of the user you would like to delete from Beams.

_Returns_ <br /> \* `err` (error): Error value if something went wrong, `nil` otherwise.

_Example_ <br />

```go
{deleteUserExample}
```
