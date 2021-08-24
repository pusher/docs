---
date: 2021-08-01
title: Pusher Beams Docs | Reporting API
description: The reporting API is used by our Android, iOS and Web SDKs to report back notification events such as which devices have received or opened notifications.
layout: beams.njk
eleventyNavigation:
  parent: Api
  key: Reporting api
  title: Reporting API
  order: 4
---

# Reporting API

This is the API used by our Android, iOS and Web SDKs to report back notification events.

> We highly recommend that you use our official Android, iOS and Web SDKs. If your use case requires this documentation, please contact us [betterbeams@pusher.com](mailto:betterbeams@pusher.com)

## Reporting a notification acknowledgment

This event should be triggered when a device receives a notification.

```http
POST https://<YOUR_INSTANCE_ID>.pushnotifications.pusher.com/reporting_api/v2/instances/<YOUR_INSTANCE_ID>/events
```

### Request headers

The following headers are necessary:

- `Content-Type`: with the value always set to `application/json`.

### Request body

A JSON object with the following keys:

{% parameter 'event', 'String', true %}

Must be set to `delivery`.

{% endparameter %}
{% parameter 'publishId', 'String', true %}

The ID used to identify the publish request that led to this notification.

{% endparameter %}
{% parameter 'deviceId', 'String', true %}

The ID used to identify the device.

{% endparameter %}
{% parameter 'timestampSecs', 'Int', true %}

The unix timestamp in seconds.

{% endparameter %}
{% parameter 'userId', 'String', false %}

The ID of the User that received this notification. This is required if using [Authenticated Users](/docs/beams/concepts/authenticated-users) and [Webhooks](/docs/beams/concepts/webhooks).

{% endparameter %}
{% parameter 'appInBackground', 'Boolean', false %}

Describes if the application was in background when a notification was delivered.

{% endparameter %}
{% parameter 'hasDisplayableContent', 'Boolean', false %}

Describes if the notification had an UI element to the user.

{% endparameter %}
{% parameter 'hasData', 'Boolean', false %}

Describes if the notification contained an additional data payload.

{% endparameter %}

### Response

If the event is well formed, the success response will be a `200 OK`.

### Error Responses

| Title                | Status Code | Description                                                                                                   |
| -------------------- | ----------- | ------------------------------------------------------------------------------------------------------------- |
| Invalid content type | 400         | Only `application/json` is supported.                                                                         |
| Incomplete Request   | 400         | `instance-id` param is missing from path.                                                                     |
| Bad request          | 400         | The instance id given is invalid. It is expected to be in this format: 426abfc7-41fe-492f-bcf1-27586fa9bd3f . |
| Bad request          | 400         | Failed to read body as a JSON object.                                                                         |
| Bad request          | 400         | `event` is missing from body.                                                                                 |
| Bad request          | 400         | `publishId` is missing from body.                                                                             |
| Bad request          | 400         | `deviceId` is missing from body.                                                                              |
| Bad request          | 400         | `timestampSecs` is missing from body.                                                                         |
| Something went wrong | 500         | Internal server error.                                                                                        |

## Reporting a notification open

This event should be triggered when a user taps on a notification.

```http
POST https://<YOUR_INSTANCE_ID>.pushnotifications.pusher.com/reporting_api/v2/instances/<YOUR_INSTANCE_ID>/events
```

### Request headers

The following headers are necessary:

- `Content-Type`: with the value always set to `application/json`.

### Request body

A JSON object with the following keys:

{% parameter 'event', 'String', true %}

Must be set to `open`.

{% endparameter %}
{% parameter 'publishId', 'String', true %}

The ID used to identify the publish request that led to this notification.

{% endparameter %}
{% parameter 'deviceId', 'String', true %}

The ID used to identify the device.

{% endparameter %}
{% parameter 'timestampSecs', 'Int', true %}

The unix timestamp in seconds.

{% endparameter %}
{% parameter 'userId', 'String', false %}

The ID of the User that received this notification. This is required if using [Authenticated Users](/docs/beams/concepts/authenticated-users) and [Webhooks](/docs/beams/concepts/webhooks).

{% endparameter %}

### Response

If the event is well formed, the success response will be a `200 OK`.

### Error Responses

| Title                | Status Code | Description                                                                                                   |
| -------------------- | ----------- | ------------------------------------------------------------------------------------------------------------- |
| Invalid content type | 400         | Only `application/json` is supported.                                                                         |
| Incomplete Request   | 400         | `instance-id` param is missing from path.                                                                     |
| Bad request          | 400         | The instance id given is invalid. It is expected to be in this format: 426abfc7-41fe-492f-bcf1-27586fa9bd3f . |
| Bad request          | 400         | Failed to read body as a JSON object.                                                                         |
| Bad request          | 400         | `event` is missing from body.                                                                                 |
| Bad request          | 400         | `publishId` is missing from body.                                                                             |
| Bad request          | 400         | `deviceId` is missing from body.                                                                              |
| Bad request          | 400         | `timestampSecs` is missing from body.                                                                         |
| Something went wrong | 500         | Internal server error.                                                                                        |
