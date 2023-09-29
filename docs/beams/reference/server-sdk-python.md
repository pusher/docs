---
date: 2021-08-01
title: Pusher Beams Docs | Python Server SDK
description: The Beams Python server SDK is available on PyPi. Install the SDK to start sending push notifications to your Python app users.
layout: beams.njk
eleventyNavigation:
  parent: Server sdks
  key: Server sdk python
  title: Python
  order: 4
---

# Python Server SDK

## Installation

The Beams Python server SDK is available on PyPi [here](https://pypi.python.org/pypi/pusher_push_notifications/).

You can install this SDK by using pip:

```bash
pip install pusher_push_notifications
```

## Reference

### `class PushNotifications`

Constructs a **new Beams client** instance using your instance id and secret key (you can get these from the dashboard)

#### Arguments

{% parameter 'instance_id', 'String', true %}

The unique identifier for your Push notifications instance. This can be found in the dashboard under "Credentials"

{% endparameter %}
{% parameter 'secret_key', 'String', true %}

The secret key your server will use to access your Beams instance. This can be found in the dashboard under "Credentials".

{% endparameter %}

#### Returns

A Beams token for the given user.

#### Example

```py
beams_client = PushNotifications(
    instance_id='YOUR_INSTANCE_ID_HERE',
    secret_key='YOUR_SECRET_KEY_HERE',
)
```

### `.publish_to_interests`

Sends broadcast notifications to groups of subscribed devices using [Device Interests](/docs/beams/concepts/device-interests)

#### Arguments

{% parameter 'interests', 'list&lt;String&gt; Min length=1, Max length=100', true %}

List of interests to send the push notification to, ranging from 1 to 100 per publish request. See [Device Interests](/docs/beams/concepts/device-interests)

{% endparameter %}
{% parameter 'publish_body', 'Dictionary' %}

A dictionary containing the publish request body. See [publish API reference](/docs/beams/reference/publish-api#request-body)

{% endparameter %}

#### Returns

A dictionary containing the publish response body. See [publish API reference](/docs/beams/reference/publish-api#success-response-body)

#### Example

```py
response = beams_client.publish_to_interests(
  interests=['hello'],
  publish_body={
    'apns': {
      'aps': {
        'alert': {
          'title': 'Hello',
          'body': 'Hello, world!',
        },
      },
    },
    'fcm': {
      'notification': {
        'title': 'Hello',
        'body': 'Hello, world!',
      },
    },
    'web': {
      'notification': {
        'title': 'Hello',
        'body': 'Hello, world!',
      },
    },
  },
)

print(response['publishId'])
```

### `.publish_to_users`

Securely send notifications to individual users of your application using [Authenticated Users](/docs/beams/concepts/authenticated-users)

#### Arguments

{% parameter 'user_ids', 'list&lt;String&gt; Min length=1, Max length=1000', true %}

List of ids of users to send the push notification to, ranging from 1 to 1000 per publish request. See [Authenticated Users](/docs/beams/concepts/authenticated-users)

{% endparameter %}
{% parameter 'publish_body', 'Dictionary' %}

A dictionary containing the publish request body. See [publish API reference](/docs/beams/reference/publish-api#request-body)

{% endparameter %}

#### Returns

A dictionary containing the publish response body. See [publish API reference](/docs/beams/reference/publish-api#success-response-body)

#### Example

```py
response = beams_client.publish_to_users(
  user_ids=['user-001', 'user-002'],
  publish_body={
    'apns': {
      'aps': {
        'alert': {
          'title': 'Hello',
          'body': 'Hello, world!',
        },
      },
    },
    'fcm': {
      'notification': {
        'title': 'Hello',
        'body': 'Hello, world!',
      },
    },
    'web': {
      'notification': {
        'title': 'Hello',
        'body': 'Hello, world!',
      },
    },
  },
)

print(response['publishId'])
```

### `.generate_token`

Generate a Beams auth token to allow a user to associate their device with their user id. The token is valid for 24 hours.

#### Arguments

{% parameter 'user_id', 'String', true %}

Id of the user you would like to generate a Beams auth token for.

{% endparameter %}

#### Returns

Beams token string.

#### Example

```py
user_id = '<ID_OF_AUTHENTICATED_USER>'
token = beams_client.generate_token(user_id)
# Return token to device
```

### `.delete_user`

Remove the given user (and all of their devices) from Beams. This user will no longer receive any notifications and all state stored about their devices will be deleted.

#### Arguments

{% parameter 'user_id', 'String', true %}

Id of the user you would like to delete from Beams.

{% endparameter %}

#### Returns

None

#### Example

```py
user_id = '<ID_OF_USER_TO_BE_DELETED>'
beams_client.delete_user(user_id)
```
