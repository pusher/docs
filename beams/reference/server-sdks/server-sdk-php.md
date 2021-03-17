---
title: Server sdk php - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Server sdks
  key: Server sdk php
  title: PHP
  order: 2
---

# PHP Server SDK

<Alert warning>This library requires a PHP version of 5.6 or greater</Alert>

# Installation

The Beams PHP Server SDK is available on Packagist [here](https://packagist.org/packages/pusher/pusher-push-notifications) .
<Alert primary> We recommend that you use [Composer](https://getcomposer.org/) to install this SDK. </Alert> <br />

## Using Composer

You can add this SDK to your project using composer, or by directly adding it to your composer.json:

```http
{composerRequireExample}
```

```js
{
  composerJsonExample;
}
```

# Reference

## `PushNotifications.__construct`

Constructs a new Beams client instance using your instance id and secret key (you can get these from the dashboard)

_Arguments_ <br /> * `$options` (array | *required* ): * `instanceId` (string | _required_ ): The unique identifier for your Push notifications instance. This can be found in the dashboard under "Credentials". * `secretKey` (string | *required\* ): The secret key your server will use to access your Beams instance. This can be found in the dashboard under "Credentials". </Item>

_Example_

```php
{connectingExample}
```

## `.publishToInterests`

Sends broadcast notifications to groups of subscribed devices using [Device Interests](/docs/beams/concepts/device-interests)

_Arguments_ <br /> * `$interests` (Array&lt;string&gt; | *required* ): Array of interests to send the push notification to, ranging from 1 to 100 per publish request. See [Device Interests](/docs/beams/concepts/device-interests) . * `$publishBody`: See [publish API reference](/docs/beams/reference/publish-api#request-body)

_Returns_ <br /> An array containing the publish response body. See [publish API reference](/docs/beams/reference/publish-api#success-response-body)

_Example_

```php
{phpPublishToInterests}
```

## `.publishToUsers`

Securely send notifications to individual users of your application using [Authenticated Users](/docs/beams/concepts/authenticated-users)

_Arguments_ <br /> * `$userIds` (Array&lt;string&gt; | *required* ): Array of ids of users to send the push notification to, ranging from 1 to 1000 per publish request. See [Authenticated Users](/docs/beams/concepts/authenticated-users) . * `$publishBody`: See [publish API reference](/docs/beams/reference/publish-api#request-body)

_Returns_ <br /> An array containing the publish response body. See [publish API reference](/docs/beams/reference/publish-api#success-response-body)

_Example_

```php
{phpPublishToUsers}
```

## `.generateToken`

Generate a Beams auth token to allow a user to associate their device with their user id. The token is valid for 24 hours.

_Arguments_ <br /> * `$userId` (string | *required\* ): Id of the user you would like to generate a Beams auth token for.

_Returns_ <br /> Beams token string.

_Example_

```php
{generateTokenExample}
```

## `.deleteUser`

Remove the given user (and all of their devices) from Beams. This user will no longer receive any notifications and all state stored about their devices will be deleted.

_Arguments_ <br /> * `$userId` (string | *required\* ): Id of the user you would like to remove from Beams.

_Returns_ <br /> Nothing.

_Example_

```php
{deleteUserExample}
```
