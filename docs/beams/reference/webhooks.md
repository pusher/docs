---
title: Pusher Beams Docs | Webhook Reference
description: Webhooks with Beams will are sent as POST requests with a JSON body. The request body contains a generic wrapper around event-specific payloads.
layout: beams.njk
eleventyNavigation:
  parent: Api
  key: Webhooks
  order: 5
---

# Webhook Reference

Webhooks are sent as `POST` requests with a JSON body. The request body contains a generic wrapper around the following event-specific payloads:

## `v1.PublishToUsersAttempt`

Contains a summary of what happened during a publish to one or more [Authenticated Users](/docs/beams/concepts/authenticated-users).

### Payload Schema

| Key Name                     | Type   | Description                                                                                                 |
| ---------------------------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| `instance_id`                | String | ID of the Pusher Beams instance that made this publish request.                                             |
| `publish_id`                 | String | Unique ID of the completed publish request.                                                                 |
| `users_delivered_to_gateway` | Array  | List of IDs of users who have had a notification accepted by the gateway for at least one of their devices. |
| `users_no_devices`           | Array  | List of IDs of users that do not have any devices registered with Pusher Beams.                             |
| `users_gateway_failed`       | Array  | List of IDs of users that could not be delivered to due to transient issues with the gateway.               |

### Example

```json
{
  "payload": {
    "instance_id": "9c83c1b2-77ac-49c5-94c2-bfc96f9bec49",
    "publish_id": "pubid-1df0b272-910b-43f7-9271-7345036aa739",
    "users_delivered_to_gateway": [
      "user-001",
      "user-002",
      "user-003",
      "user-004"
    ],
    "users_no_devices": ["user-005"],
    "users_gateway_failed": []
  },
  "metadata": {
    "created_at": "2019-03-11T10:42:16+0000",
    "event_type": "v1.PublishToUsersAttempt",
    "event_id": "e1b9d31a-480e-43dc-ae97-93ed96576372",
    "product": "beams"
  },
  "custom_data": {}
}
```

## `v1.UserNotificationAcknowledgement`

Sent when a notification is reported as delivered by a user's device. This gives you insight into whether notifications are making it to the device from the platform gateway. For example, this will help you detect when notifications are dropped by the OS (as they are on certain flavors of Android). Some devices will receive the notification but not report back an acknowledgement because of internet connectivity issues or various operating system limitations.

This webhook requires that the target device be running at least one of the following SDK versions:

- iOS - `1.3.0`
- Android - `1.4.0`

### Payload Schema

| Key Name      | Type   | Description                                                 |
| ------------- | ------ | ----------------------------------------------------------- |
| `instance_id` | string | ID of the Pusher Beams instance that triggered this event.  |
| `publish_id`  | string | Unique ID of the publish request that triggered this event. |
| `user_id`     | string | ID of the user that received this notification.             |

### Example

```json
{
  "payload": {
    "instance_id": "9c83c1b2-77ac-49c5-94c2-bfc96f9bec49",
    "publish_id": "pubid-1df0b272-910b-43f7-9271-7345036aa739",
    "user_id": "user-001"
  },
  "metadata": {
    "created_at": "2019-03-11T10:42:16+0000",
    "event_type": "v1.UserNotificationAcknowledgement",
    "event_id": "e1b9d31a-480e-43dc-ae97-93ed96576372",
    "product": "beams"
  },
  "custom_data": {}
}
```

## `v1.UserNotificationOpen`

Sent when a notification is opened by a user on one of their devices.

This webhook requires that the target device be running at least one of the following SDK versions:

- iOS - `1.3.0`
- Android - `1.4.0`

### Payload Schema

| Key Name      | Type   | Description                                                 |
| ------------- | ------ | ----------------------------------------------------------- |
| `instance_id` | string | ID of the Pusher Beams instance that triggered this event.  |
| `publish_id`  | string | Unique ID of the publish request that triggered this event. |
| `user_id`     | string | ID of the user that opened this notification.               |

### Example

```json
{
  "payload": {
    "instance_id": "9c83c1b2-77ac-49c5-94c2-bfc96f9bec49",
    "publish_id": "pubid-1df0b272-910b-43f7-9271-7345036aa739",
    "user_id": "user-001"
  },
  "metadata": {
    "created_at": "2019-03-11T10:42:16+0000",
    "event_type": "v1.UserNotificationOpen",
    "event_id": "e1b9d31a-480e-43dc-ae97-93ed96576372",
    "product": "beams"
  },
  "custom_data": {}
}
```

## Publish Webhooks (deprecated)

## Publish Webhooks

> The publish webhook format is deprecated. In the future these webhooks will be sent using the format described above.

All webhooks are `POST` requests with JSON bodies sent to the `webhookUrl` specified when publishing.

### Publish Started Hook

Indicates we have started publishing to the devices subscribed to the specified interests.

##### Payload Schema

| Key Name       | Type   | Description                                                                       |
| -------------- | ------ | --------------------------------------------------------------------------------- |
| `publish_id`   | string | Unique ID of the publish request that triggered this event.                       |
| `status`       | string | String constant which indicates the webhook type. Equal to `STARTED`              |
| `request_body` | object | The body of the request sent to the Publish API when publishing this notification |

##### Example

```json
{
  "publishId": "pubid-9e5f186a-93d9-4b79-af37-2a946d73e2b5",
  "status": "STARTED",
  "requestBody": {
    "interests": ["my_interest"],
    "webhookUrl": "http://mysite.com/push-webhook",
    "fcm": {
      "notification": {
        "title": "New Message",
        "body": "Alex Smith just sent you a new message"
      }
    },
    "apns": {
      "aps": {
        "alert": {
          "title": "New Message",
          "body": "Alex Smith just sent you a new message"
        }
      }
    }
  }
}
```

### Publish Finished Hook

Indicates we have finished publishing the push notification to devices subscribed to the specified interests.

##### Payload Schema

| Key Name       | Type   | Description                                                                       |
| -------------- | ------ | --------------------------------------------------------------------------------- |
| `publish_id`   | string | Unique ID of the publish request that triggered this event.                       |
| `status`       | string | String constant which indicates the webhook type. Equal to `FINISHED`             |
| `request_body` | object | The body of the request sent to the Publish API when publishing this notification |
| `results`      | object | The name of the platform (`apns`/`fcm`) to the `result` object for that platform  |

##### Result Object Schema

| Key Name                 | Type                   | Description                                                                                                                                           |
| ------------------------ | ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `failed`                 | boolean, default=false | If this field is `true` this means that the publishing process for the specified platform has failed completely and no other statistics can be given. |
| `numSuccessfulPublishes` | number                 | The number of devices successfully published to                                                                                                       |
| `numFailedPublishes`     | number                 | The number of devices where publishing failed                                                                                                         |

##### Example

```json
{
  "publishId": "pubid-9e5f186a-93d9-4b79-af37-2a946d73e2b5",
  "status": "FINISHED",
  "requestBody": {
    "interests": ["my_interest"],
    "webhookUrl": "http://mysite.com/push-webhook",
    "fcm": {
      "notification": {
        "title": "New Message",
        "body": "Alex Smith just sent you a new message"
      }
    },
    "apns": {
      "aps": {
        "alert": {
          "title": "New Message",
          "body": "Alex Smith just sent you a new message"
        }
      }
    }
  },
  "results": {
    "apns": {
      "numSuccessfulPublishes": 486546,
      "numFailedPublishes": 5
    },
    "fcm": {
      "numSuccessfulPublishes": 98423
    }
  }
}
```
