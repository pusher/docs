---
title: Server sdk python - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Server sdks
  key: Server sdk python
  title: Python
  order: 4
---

# Python Server SDK

# Installation

The Beams Python server SDK is available on PyPi [here](https://pypi.python.org/pypi/pusher_push_notifications/).

You can install this SDK by using pip:

```http
{pipInstallExample}
```

# Reference

## `class PushNotifications`

Constructs a **new Beams client** instance using your instance id and secret key (you can get these from the dashboard)

_Arguments_ <br /> _ `instance_id` (string): The unique identifier for your Push notifications instance. This can be found in the dashboard under "Credentials". _ `secret_key` (string): The secret key your server will use to access your Beams instance. This can be found in the dashboard under "Credentials".

_Example_

```py
{connectingExample}
```

## `.publish_to_interests`

Sends broadcast notifications to groups of subscribed devices using [Device Interests](/docs/beams/concepts/device-interests)

_Arguments_ <br /> * `interests` (list {'<string>'} | *Min length=1, Max length=100* ): List of interests to send the push notification to, ranging from 1 to 100 per publish request. See [Device Interests](/docs/beams/concepts/device-interests) * `publish_body` (dictionary): A dictionary containing the publish request body. See [publish API reference](/docs/beams/reference/publish-api#request-body)

_Returns_ <br />A dictionary containing the publish response body. See [publish API reference](/docs/beams/reference/publish-api#success-response-body)

_Example_ <br />

```py
{pythonPublishToInterests}
```

## `.publish_to_users`

Securely send notifications to individual users of your application using [Authenticated Users](/docs/beams/concepts/authenticated-users)

_Arguments_ <br /> * `user_ids` (list {'<string>'} | *Min length=1, Max length=1000* ): List of ids of users to send the push notification to, ranging from 1 to 1000 per publish request. See [Authenticated Users](/docs/beams/concepts/authenticated-users) * `publish_body` (dictionary): A dictionary containing the publish request body. See [publish API reference](/docs/beams/reference/publish-api#request-body)

_Returns_ <br />A dictionary containing the publish response body. See [publish API reference](/docs/beams/reference/publish-api#success-response-body)

_Example_ <br />

```py
{pythonPublishToUsers}
```

## `.generate_token`

Generate a Beams auth token to allow a user to associate their device with their user id. The token is valid for 24 hours.

_Arguments_ <br /> \* `user_id` (string): Id of the user you would like to generate a Beams auth token for.

_Returns_ <br /> Beams token string.

_Example_ <br />

```py
{generateTokenExample}
```

## `.delete_user`

Remove the given user (and all of their devices) from Beams. This user will no longer receive any notifications and all state stored about their devices will be deleted.

_Arguments_ <br /> \* `user_id` (string): Id of the user you would like to delete from Beams.

_Returns_ <br /> None

_Example_ <br />

```py
{deleteUserExample}
```
