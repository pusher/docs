---
date: 2021-08-01
title: Pusher Beams Docs | Authenticated Users
description: The Authenticated Users features allows you to send secure, personalized, transactional notifications for account and social updates.
layout: beams.njk
eleventyNavigation:
  parent: Concepts
  key: Authenticated users
  order: 3
---

# Authenticated Users

Authenticated Users allows you to securely associate devices with an arbitrary user ID which you set from your server and publish personalized notifications directly to users.

Upon logging in and registering for push notifications, set a custom user ID and authenticate the device with a token from your server. Target this user with push notifications across their authenticated devices by publishing to their set Authenticated User ID.

![Diagram illustrating notifications can be delivered directly to a user](./img/users-diagram.png)

## Use Cases

Authenticated Users are ideal for publishing personal notifications with private information:

- Transactions — customers can get updates about purchases during the fulfilment lifecycle
- Social — users get notifications when connections interact with them
- Activity — users receive personalized notifications when in-app events occur

## Security

Unlike [Device Interests](/docs/beams/concepts/device-interests) (an alternative method of targeting devices with a notification) clients require permission from your server before they can be targeted as an Authenticated User. Clients get this permission by requesting a Beams Token from your server. This allows your server to verify their identity using your existing authentication system.

> Publishes to Device Interests and Authenticated Users must be separate API requests

## Authentication Process

The authentication flow for Beams can be integrated directly with your existing authentication flow for logging in users:

1. The User logs in to your backend server using your existing authentication method
2. If valid, it will receive a User Id and probably some additional data (e.g. a session token)
3. Your application uses the Client SDK to request a Beams Token from your backend server
4. Your backend server verifies that the request is authorized and returns a new Beams Token generated using one of our Server SDKs.
5. The Client SDK sends the Beams Token, along with the User Id, to Pusher. The device is now securely associated with the desired User within Pusher Beams.

![Diagram illustrating the beams authentication process](./img/auth.png)

#### Important Terms

- **Beams Token**: A secure token your server gives to properly authenticated devices so that they can authenticate with Beams. Can be generated using one of our server SDKs.
- **User ID**: A unique string that can identify users in your existing auth system
- **Session Token**: Whatever data your existing auth system uses to verify that a user has been properly authenticated.

## Limits

- A user can be associated with a maximum of **100** devices per platform at any given time.
  - Devices can be immediately disassociated from users by calling `.stop` in the client SDK when a user logs out of your application.
  - Devices will be disassociated automatically when the app is uninstalled and the push gateway invalidates the device token (this process can take some time).
- User ids are limited to 164 unicode characters.

# Where Next?

Learn how to publish to Authenticated Users in your application:

- [Android](/docs/beams/guides/publish-to-specific-user/android)
- [iOS](/docs/beams/guides/publish-to-specific-user/ios)
- [Web](/docs/beams/guides/publish-to-specific-user/web)
