---
title: Server sdk ruby - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Server sdks
  key: Server sdk ruby
  title: Ruby
  order: 6
---

# Ruby Server SDK

# Installation

The Pusher Beams Ruby server SDK is available on RubyGems. Add this line to your application&rsquo;s Gemfile:

```rb
{installPushNotificationsSDK}
```

# Usage

## Configuring the SDK for your instance

Use your instance id and secret (you can get these from the dashboard) to create a `PushNotifications` instance:

```rb
{instanceExampleRuby}
```

## Publishing a notification

Once you have created your `PushNotifications` instance you can publish a push notification to your registered & subscribed devices:

```rb
{publishExampleRuby}
```

## Publish to users

```rb
{publishToUsersExampleRuby}
```

## Generate Token

```rb
{authenticateUserExampleRuby}
```

## Delete user

```rb
{deleteUserExampleRuby}
```

# Reference

## `Class: PushNotifications`

_Arguments_ <br /> _ `instance_id` (string): The unique identifier for your Push notifications instance. This can be found in the dashboard under "Credentials". _ `secret_key` (string): The secret key your server will use to access your Beams instance. This can be found in the dashboard under "Credentials".

## `publish_to_interests(interests, payload)`

Publish a new push notification to Pusher Beams with the given payload.

_Arguments_ <br /> _ `interests`: List of interests to send the push notification to, ranging from 1 to 100 per publish request. See [Interests](/docs/beams/concepts/interests). _ `payload`: Map containing the body of the push notification publish request. See [publish API reference](/docs/beams/reference/publish-api#request-body).

_Returns_ <br /> String that contains `publish_id`: See [publish API reference](/docs/beams/reference/publish-api#success-response-body)

## `publish_to_users(users, publishRequest)`

Publish the given `publishRequest` to specified users.

_Arguments_ <br /> _ `users`: Array of ids of users to send the push notification to, ranging from 1 to 1000 per publish request. See [Authenticated Users](/docs/beams/concepts/users). _ `publishRequest`: Map containing the body of the push notification publish request. See [publish API reference](/docs/beams/reference/publish-api#request-body).

_Returns_ <br /> String that contains `publishId`: See [publish API reference](/docs/beams/reference/publish-api#success-response-body)

## `generate_token(userId)`

Generate a Beams auth token to allow a user to associate their device with their user ID. The token is valid for 24 hours.

_Arguments_ <br /> \* `userId`: ID of the user you would like to generate a Beams auth token for.

## `delete_user(userId)`

Remove the given user (and all of their devices) from Beams. This user will no longer receive any notifications and all state stored about their devices will be deleted.

_Arguments_ <br /> \* `userId`: ID of the user you would like to remove from Beams.
