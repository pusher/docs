---
title: Server SDK ruby
layout: beams.njk
eleventyNavigation:
  parent: Server sdks
  key: Server sdk ruby
  title: Ruby
  order: 6
---

## Ruby Server SDK

## Installation

The Pusher Beams Ruby server SDK is available on RubyGems. Add this line to your application&rsquo;s Gemfile:

```rb
gem 'pusher-push-notifications'
```

## Reference

### `Class: PushNotifications`

#### Arguments

{% parameter 'instance_id', 'String', true %}

The unique identifier for your Push notifications instance. This can be found in the dashboard under "Credentials".

{% endparameter %}
{% parameter 'secret_key', 'String', true %}

The secret key your server will use to access your Beams instance. This can be found in the dashboard under "Credentials".

{% endparameter %}

#### Example

```rb
Pusher::PushNotifications.configure do |config|
  config.instance_id = 'YOUR_INSTANCE_ID_HERE'
  config.secret_key = 'YOUR_SECRET_KEY_HERE'
end
```

### `publish_to_interests(interests, payload)`

Publish a new push notification to Pusher Beams with the given payload.

#### Arguments

{% parameter 'interests', 'Array', true %}

List of interests to send the push notification to, ranging from 1 to 100 per publish request. See [Interests](/docs/beams/concepts/device-interests).

{% endparameter %}
{% parameter 'payload', 'Map' %}

Map containing the body of the push notification publish request. See [publish API reference](/docs/beams/reference/publish-api#request-body).

{% endparameter %}

#### Returns

String that contains `publish_id`: See [publish API reference](/docs/beams/reference/publish-api#success-response-body)

#### Example

```rb
data = {
  apns: {
    aps: {
      alert: {
        title: 'Hello',
        body: 'Hello, world!'
      }
    }
  },
  fcm: {
    notification: {
      title: 'Hello',
      body: 'Hello, world!'
    }
  }
}

Pusher::PushNotifications.publish_to_interests(interests: ['hello'], payload: data)
```

### `publish_to_users(users, publishRequest)`

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

```rb
users = ['cucas', 'jonathan', 'jordan', 'luis', 'luka', 'mina']
Pusher::PushNotifications.publish_to_users(users: users, payload: data)
```

### `generate_token(userId)`

Generate a Beams auth token to allow a user to associate their device with their user ID. The token is valid for 24 hours.

#### Arguments

{% parameter 'userId', null, true %}

ID of the user you would like to generate a Beams auth token for.

{% endparameter %}

#### Example

```rb
Pusher::PushNotifications.generate_token(user: 'Elmo')
```

### `delete_user(userId)`

Remove the given user (and all of their devices) from Beams. This user will no longer receive any notifications and all state stored about their devices will be deleted.

#### Arguments

{% parameter 'userId', null, true %}

ID of the user you would like to remove from Beams.

{% endparameter %}

#### Example

```rb
Pusher::PushNotifications.delete_user(user: 'Elmo')
```
