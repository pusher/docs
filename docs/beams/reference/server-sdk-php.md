---
date: 2021-08-01
title: Pusher Beams Docs | PHP Server SDK
description: Install the PHP Server SDK and start sending push notifications to your users. Learn how to install using composer and publish notificaitons from your PHP app.
layout: beams.njk
eleventyNavigation:
  parent: Server sdks
  key: Server sdk php
  title: PHP
  order: 2
---

# PHP Server SDK

> This library requires a PHP version of 5.6 or greater

## Installation

The Beams PHP Server SDK is available on Packagist [here](https://packagist.org/packages/pusher/pusher-push-notifications).

> We recommend that you use [Composer](https://getcomposer.org/) to install this SDK.

### Using Composer

You can add this SDK to your project using composer, or by directly adding it to your composer.json:

```bash
composer require pusher/pusher-push-notifications
```

```json
"require": {
    "pusher/pusher-push-notifications": "^1.0"
}
```

## Reference

### `PushNotifications.__construct`

Constructs a new Beams client instance using your instance id and secret key (you can get these from the dashboard)

#### Arguments

{% parameter '$options', 'Array', true %}

- `instanceId` (String | _required_ ): The unique identifier for your Push notifications instance. This can be found in the dashboard under "Credentials".
- `secretKey` (String | _required_ ): The secret key your server will use to access your Beams instance. This can be found in the dashboard under "Credentials".

{% endparameter %}

#### Example

```php
$beamsClient = new \Pusher\PushNotifications\PushNotifications(
  array(
    "instanceId" => "YOUR_INSTANCE_ID_HERE",
    "secretKey" => "YOUR_SECRET_KEY_HERE",
  )
);
```

### `.publishToInterests`

Sends broadcast notifications to groups of subscribed devices using [Device Interests](/docs/beams/concepts/device-interests)

#### Arguments

{% parameter '$interests', 'Array&lt;string&gt', true %}

Array of interests to send the push notification to, ranging from 1 to 100 per publish request. See [Device Interests](/docs/beams/concepts/device-interests).

{% endparameter %}
{% parameter '$publishBody' %}

See [publish API reference](/docs/beams/reference/publish-api#request-body)

{% endparameter %}

#### Returns

An array containing the publish response body. See [publish API reference](/docs/beams/reference/publish-api#success-response-body)

#### Example

```php
<?php
include 'src/PushNotifications.php';
$publishResponse = $beamsClient->publishToInterests(
  array("hello", "donuts"),
  array(
    "fcm" => array(
      "notification" => array(
        "title" => "Hi!",
        "body" => "This is my first Push Notification!"
      )
    ),
    "apns" => array("aps" => array(
      "alert" => array(
        "title" => "Hi!",
        "body" => "This is my first Push Notification!"
      )
    )),
    "web" => array(
      "notification" => array(
        "title" => "Hi!",
        "body" => "This is my first Push Notification!"
      )
    )
));
```

### `.publishToUsers`

Securely send notifications to individual users of your application using [Authenticated Users](/docs/beams/concepts/authenticated-users)

#### Arguments

{% parameter '$userIds', 'Array&lt;string&gt', true %}

Array of ids of users to send the push notification to, ranging from 1 to 1000 per publish request. See [Authenticated Users](/docs/beams/concepts/authenticated-users).

{% endparameter %}
{% parameter '$publishBody' %}

See [publish API reference](/docs/beams/reference/publish-api#request-body)

{% endparameter %}

#### Returns

An array containing the publish response body. See [publish API reference](/docs/beams/reference/publish-api#success-response-body)

#### Example

```php
<?php
include 'src/PushNotifications.php';
$publishResponse = $beamsClient->publishToUsers(
  array("user-001", "user-002"),
  array(
    "fcm" => array(
      "notification" => array(
        "title" => "Hi!",
        "body" => "This is my first Push Notification!"
      )
    ),
    "apns" => array("aps" => array(
      "alert" => array(
        "title" => "Hi!",
        "body" => "This is my first Push Notification!"
      )
    )),
    "web" => array(
      "notification" => array(
        "title" => "Hi!",
        "body" => "This is my first Push Notification!"
      )
    )
));
```

### `.generateToken`

Generate a Beams auth token to allow a user to associate their device with their user id. The token is valid for 24 hours.

#### Arguments

{% parameter '$userId', 'String', true %}

Id of the user you would like to generate a Beams auth token for.

{% endparameter %}

#### Returns

Beams token string.

#### Example

```php
$userId = "user-001";
$token = $beamsClient.generateToken($userId);
// Return $token to device
```

### `.deleteUser`

Remove the given user (and all of their devices) from Beams. This user will no longer receive any notifications and all state stored about their devices will be deleted.

#### Arguments

{% parameter '$userId', 'String', true %}

Id of the user you would like to remove from Beams.

{% endparameter %}

#### Returns

Nothing

#### Example

```php
$beamsClient.deleteUser("user-001");
```
