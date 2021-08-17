---
title: Pusher Beams Docs | Device Interests
description: The Device Interests feature targets groups of devices. These notifications are public broadcast and are great for topic subscribers and news updates.
layout: beams.njk
eleventyNavigation:
  parent: Concepts
  key: Device interests
  order: 2
---

# Device Interests

**Device Interests** target groups of devices. They use the Publish/Subscribe model to decide which devices should receive a particular message.

With Device Interests, a device "subscribes" to an Interest. Then when your servers publish a push notification to a Device Interest, only the devices subscribed to that Interest will receive it.

Device interests are **anonymous**. They are useful when the identity of the end user is not important - you just want to publish to groups of devices.

![Diagram illustrating how interests you publish are delivered to users](./img/interests-diagram.png)

> Device Interests have no concept of who owns the device. If you want to target a specific user across all their devices, consider using [Authenticated Users](/docs/beams/concepts/authenticated-users)

## Limits

- A device can be subscribed to a maximum of 5000 Device Interests.
- Device Interest names are limited to 164 characters and can only contain ASCII upper/lower-case letters, numbers or one of `_-=@,.;`
