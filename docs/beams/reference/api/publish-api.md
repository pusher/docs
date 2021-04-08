---
title: Publish API - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Api
  key: Publish api
  title: Publish API
  order: 1
---

# Publish API

## Publishing a notification to interest(s)

```http
POST https://<YOUR_INSTANCE_ID>.pushnotifications.pusher.com/publish_api/v1/instances/<YOUR_INSTANCE_ID>/publishes/interests
```

### Request headers

The following headers are necessary:

- `Authorization`: with the value in the following format: `Bearer <YOUR_SECRET_KEY>`.
- `Content-Type`: with the value always set to `application/json`.

### Request body

A JSON object with the following keys:

{% parameter 'interests', 'Array&lt;string&gt;', true %}

Array of interests to send the push notification to, ranging from 1 to 100 per publish request.

{% endparameter %}
{% parameter 'webhookUrl', 'String', false %}

A URL to which we will send webhooks at key points throughout the publishing process. E.g when the publish finishes.

{% endparameter %}

**At least one of:**

{% parameter 'apns', 'object', null %}

The payload to be sent to APNs. The full set of options for the APNs section of the `notify` call is described in Apple's [Payload Key Reference](https://developer.apple.com/library/prerelease/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/PayloadKeyReference.html#//apple_ref/doc/uid/TP40008194-CH17-SW1). For further examples, see Apple's [“Creating the Remote Notification Payload”](https://developer.apple.com/library/prerelease/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html#//apple_ref/doc/uid/TP40008194-CH10-SW1).

{% endparameter %}
{% parameter 'apns', 'object', null %}

The payload to be sent to FCM. The full set of options is described by Google in their documentation of [FCM downstream HTTP messages](https://firebase.google.com/docs/cloud-messaging/http-server-ref#downstream).

{% endparameter %}
{% parameter 'web', 'object', null %}

The payload to be sent to the web push gateway. The Beams web push format reference can be found [here](/docs/beams/reference/publish-payloads#web-format).

{% endparameter %}

> Each interest name can be up to 164 characters. Each character in the name must be an ASCII upper- or lower-case letter, a number, or one of `_-=@,.;`.

### Response Body

A JSON object with the following fields:

{% parameter 'publishId', 'string', true %}

Unique string used to identify this publish request.

{% endparameter %}

### Error Responses

| Title                | Status Code | Description                                                     |
| -------------------- | ----------- | --------------------------------------------------------------- |
| Invalid content type | 400         | Only `application/json` is supported.                           |
| Incomplete Request   | 400         | `instance-id` param is missing from path.                       |
| Incomplete Request   | 400         | Authorization header is missing.                                |
| Bad request          | 400         | Request body size is too large (max 10KiB).                     |
| Bad request          | 400         | Failed to read body as a JSON object.                           |
| Unauthorized         | 401         | Incorrect API Key.                                              |
| Instance not found   | 404         | Could not find the instance.                                    |
| Unprocessable Entity | 422         | JSON does not our match schema.                                 |
| Rate Limited         | 429         | Too many requests being made in quick succession (max 100 RPS). |
| Something went wrong | 500         | Internal server error.                                          |

## Publishing a notification to user(s)

```http
POST https://<YOUR_INSTANCE_ID>.pushnotifications.pusher.com/publish_api/v1/instances/<YOUR_INSTANCE_ID>/publishes/users
```

### Request headers

The following headers are necessary:

- `Authorization`: with the value in the following format: `Bearer <YOUR_SECRET_KEY>`.
- `Content-Type`: with the value always set to `application/json`.

### Request body

A JSON object with the following keys:

{% parameter 'users', 'Array&lt;string&gt;', true %}

Array of user IDs to send the push notification to, ranging from 1 to 1000 per publish request. User IDs are UTF-8 encoded strings of no more than 164 bytes

{% endparameter %}

**At least one of:**

{% parameter 'apns', 'object', null %}

The payload to be sent to APNs. The full set of options for the APNs section of the `notify` call is described in Apple's [Payload Key Reference](https://developer.apple.com/library/prerelease/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/PayloadKeyReference.html#//apple_ref/doc/uid/TP40008194-CH17-SW1). For further examples, see Apple's [“Creating the Remote Notification Payload”](https://developer.apple.com/library/prerelease/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html#//apple_ref/doc/uid/TP40008194-CH10-SW1).

{% endparameter %}
{% parameter 'apns', 'object', null %}

The payload to be sent to FCM. The full set of options is described by Google in their documentation of [FCM downstream HTTP messages](https://firebase.google.com/docs/cloud-messaging/http-server-ref#downstream).

{% endparameter %}
{% parameter 'web', 'object', null %}

The payload to be sent to the web push gateway. The Beams web push format reference can be found [here](/docs/beams/reference/publish-payloads#web-format).

{% endparameter %}

### Response Body

A JSON object with the following fields:

{% parameter 'publishId', 'string', true %}

Unique string used to identify this publish request.

{% endparameter %}

### Error Responses

| Title                | Status Code | Description                                                     |
| -------------------- | ----------- | --------------------------------------------------------------- |
| Invalid content type | 400         | Only `application/json` is supported.                           |
| Incomplete Request   | 400         | `instance-id` param is missing from path.                       |
| Incomplete Request   | 400         | Authorization header is missing.                                |
| Bad request          | 400         | Request body size is too large (max 200KiB).                    |
| Bad request          | 400         | Failed to read body as a JSON object.                           |
| Unauthorized         | 401         | Incorrect API Key.                                              |
| Instance not found   | 404         | Could not find the instance.                                    |
| Unprocessable Entity | 422         | JSON does not our match schema.                                 |
| Rate Limited         | 429         | Too many requests being made in quick succession (max 100 RPS). |
| Something went wrong | 500         | Internal server error.                                          |
