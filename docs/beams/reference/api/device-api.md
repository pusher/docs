---
title: Device API - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Api
  key: Device api
  title: Device API
  order: 3
---

# Device API

This is the API used by our Android, iOS and Web SDKs.

> We want everyone to use our official Android, iOS and Web SDKs. If your use case requires this documentation, please contact us [betterbeams@pusher.com](mailto:betterbeams@pusher.com)

## Register new APNs device

```http
POST https://<YOUR_INSTANCE_ID>.pushnotifications.pusher.com/device_api/v1/instances/<YOUR_INSTANCE_ID>/devices/apns
```

### Request headers

The following headers are necessary:

- `Content-Type`: with the value always set to `application/json`.

### Request body

A JSON object with the following keys:

{% parameter 'token', 'String', true %}

The APNs gateway token.

{% endparameter %}
{% parameter 'bundleIdentifier', 'String', true %}

The application bundle identifier.

{% endparameter %}
{% parameter 'metadata', 'apnsMetadata', false %}

The metadata for this device, which contains the following fields:

- `sdkVersion`: the version of the SDK.
- `iosVersion`: the iOS version the device has.
- `macosVersion`: the macOS version the device has.

{% endparameter %}

### Response Body

A JSON object with the following fields:

{% parameter 'id', 'String', null %}

Unique string used to identify this device.

{% endparameter %}
{% parameter 'initialInterestSet', 'Set&lt;string&gt;', null %}

Set of interests the device is initially subscribed to which can happen when they are migrated from other competitor products.

{% endparameter %}

### Error Responses

| Title                | Status Code | Description                               |
| -------------------- | ----------- | ----------------------------------------- |
| Invalid content type | 400         | Only `application/json` is supported.     |
| Incomplete Request   | 400         | `instance-id` param is missing from path. |
| Bad Request          | 400         | `instance-id` given is not valid.         |
| Bad request          | 400         | Failed to read body as a JSON object.     |
| Bad request          | 400         | Missing APNs token.                       |
| Bad request          | 400         | Missing App Bundle Identifier.            |
| Unauthorized         | 401         | Incorrect instance credentials.           |
| Unauthorized         | 401         | Incorrect APNs token supplied.            |
| Instance not found   | 404         | Could not find the instance.              |
| Something went wrong | 500         | Internal server error.                    |

## Register new FCM device

```http
POST https://<YOUR_INSTANCE_ID>.pushnotifications.pusher.com/device_api/v1/instances/<YOUR_INSTANCE_ID>/devices/fcm
```

### Request headers

The following headers are necessary:

- `Content-Type`: with the value always set to `application/json`.

### Request body

A JSON object with the following keys:

{% parameter 'token', 'String', true %}

The FCM gateway token.

{% endparameter %}
{% parameter 'bundleIdentifier', 'String', true %}

The application bundle identifier.

{% endparameter %}
{% parameter 'metadata', 'fcmMetadata', false %}

The metadata for this device, which contains the following fields:

- `sdkVersion`: the version of the SDK.
- `androidVersion`: the Android version the device has.

{% endparameter %}

### Response Body

A JSON object with the following fields:

{% parameter 'id', 'String', null %}

Unique string used to identify this device.

{% endparameter %}
{% parameter 'initialInterestSet', 'Set&lt;String&gt;', null %}

Set of interests the device is initially subscribed to which can happen when they are migrated from other competitor products.

{% endparameter %}

### Error Responses

| Title                | Status Code | Description                               |
| -------------------- | ----------- | ----------------------------------------- |
| Invalid content type | 400         | Only `application/json` is supported.     |
| Incomplete Request   | 400         | `instance-id` param is missing from path. |
| Bad request          | 400         | Failed to read body as a JSON object.     |
| Bad request          | 400         | Missing FCM token.                        |
| Unauthorized         | 401         | Incorrect instance credentials.           |
| Unauthorized         | 401         | Incorrect FCM token supplied.             |
| Instance not found   | 404         | Could not find the instance.              |
| Something went wrong | 500         | Internal server error.                    |

## Get APNs device

```http
GET https://<YOUR_INSTANCE_ID>.pushnotifications.pusher.com/device_api/v1/instances/<YOUR_INSTANCE_ID>/devices/apns/<DEVICE_ID>
```

### Request headers

The following headers are necessary:

- `Content-Type`: with the value always set to `application/json`.

### Response Body

A JSON object representing the Device with the following fields:

{% parameter 'id', 'String', true %}

Unique string used to identify this device.

{% endparameter %}
{% parameter 'userId', 'String', true %}

The User Id this device belongs to.

{% endparameter %}
{% parameter 'metadata', 'apnsMetadata', false %}

The metadata for this device, which contains the following fields:

- `sdkVersion`: the version of the SDK.
- `iosVersion`: the iOS version the device has.
- `macosVersion`: the macOS version the device has.

{% endparameter %}

### Error Responses

| Title                | Status Code | Description                               |
| -------------------- | ----------- | ----------------------------------------- |
| Invalid content type | 400         | Only `application/json` is supported.     |
| Incomplete Request   | 400         | `instance-id` param is missing from path. |
| Incomplete Request   | 400         | `device-id` param is missing from path.   |
| Instance not found   | 404         | Could not find the instance.              |
| Something went wrong | 500         | Internal server error.                    |

## Get FCM device

```http
GET https://<YOUR_INSTANCE_ID>.pushnotifications.pusher.com/device_api/v1/instances/<YOUR_INSTANCE_ID>/devices/fcm/<DEVICE_ID>
```

### Request headers

The following headers are necessary:

- `Content-Type`: with the value always set to `application/json`.

### Response Body

A JSON object representing the Device with the following fields:

A JSON object representing the Device with the following fields:

{% parameter 'id', 'String', true %}

Unique string used to identify this device.

{% endparameter %}
{% parameter 'userId', 'String', true %}

The User Id this device belongs to.

{% endparameter %}
{% parameter 'metadata', 'fcmMetadata', false %}

The metadata for this device, which contains the following fields:

- `sdkVersion`: the version of the SDK.
- `androidVersion`: the Android version the device has.

{% endparameter %}

## Delete APNs device

```http
DELETE https://<YOUR_INSTANCE_ID>.pushnotifications.pusher.com/device_api/v1/instances/<YOUR_INSTANCE_ID>/devices/apns/<DEVICE_ID>
```

### Error Responses

| Title                | Status Code | Description                               |
| -------------------- | ----------- | ----------------------------------------- |
| Incomplete Request   | 400         | `instance-id` param is missing from path. |
| Bad Request          | 400         | `instance-id` given is not valid.         |
| Incomplete Request   | 400         | `device-id` param is missing from path.   |
| Something went wrong | 500         | Internal server error.                    |

## Delete FCM device

```http
DELETE https://<YOUR_INSTANCE_ID>.pushnotifications.pusher.com/device_api/v1/instances/<YOUR_INSTANCE_ID>/devices/fcm/<DEVICE_ID>
```

### Request headers

The following headers are necessary:

- `Content-Type`: with the value always set to `application/json`.

### Error Responses

| Title                | Status Code | Description                               |
| -------------------- | ----------- | ----------------------------------------- |
| Incomplete Request   | 400         | `instance-id` param is missing from path. |
| Bad Request          | 400         | `instance-id` given is not valid.         |
| Incomplete Request   | 400         | `device-id` param is missing from path.   |
| Something went wrong | 500         | Internal server error.                    |

## Update APNs Device Metadata

```http
PUT https://<YOUR_INSTANCE_ID>.pushnotifications.pusher.com/device_api/v1/instances/<YOUR_INSTANCE_ID>/devices/apns/<DEVICE_ID>/metadata
```

### Request headers

The following headers are necessary:

- `Content-Type`: with the value always set to `application/json`.

### Request body

A JSON object with the following keys:

- `sdkVersion`: the version of the SDK.
- `iosVersion`: the iOS version the device has.
- `macosVersion`: the macOS version the device has.

### Error Responses

| Title                | Status Code | Description                               |
| -------------------- | ----------- | ----------------------------------------- |
| Invalid content type | 400         | Only `application/json` is supported.     |
| Incomplete Request   | 400         | `instance-id` param is missing from path. |
| Bad Request          | 400         | `instance-id` given is not valid.         |
| Incomplete Request   | 400         | `device-id` param is missing from path.   |
| Bad request          | 400         | Failed to read body as a JSON object.     |
| Device not found     | 404         | Could not find the device.                |
| Something went wrong | 500         | Internal server error.                    |

## Update FCM Device Metadata

```http
PUT https://<YOUR_INSTANCE_ID>.pushnotifications.pusher.com/device_api/v1/instances/<YOUR_INSTANCE_ID>/devices/fcm/<DEVICE_ID>/metadata
```

### Request headers

The following headers are necessary:

- `Content-Type`: with the value always set to `application/json`.

### Request body

A JSON object with the following keys:

- `sdkVersion`: the version of the SDK.
- `androidVersion`: the iOS version the device

### Error Responses

| Title                | Status Code | Description                               |
| -------------------- | ----------- | ----------------------------------------- |
| Invalid content type | 400         | Only `application/json` is supported.     |
| Incomplete Request   | 400         | `instance-id` param is missing from path. |
| Bad Request          | 400         | `instance-id` given is not valid.         |
| Incomplete Request   | 400         | `device-id` param is missing from path.   |
| Bad request          | 400         | Failed to read body as a JSON object.     |
| Device not found     | 404         | Could not find the device.                |
| Something went wrong | 500         | Internal server error.                    |

## Update FCM Device Token

```http
PUT https://<YOUR_INSTANCE_ID>.pushnotifications.pusher.com/device_api/v1/instances/<YOUR_INSTANCE_ID>/devices/fcm/<DEVICE_ID>/token
```

### Request headers

The following headers are necessary:

- `Content-Type`: with the value always set to `application/json`.

### Request body

A JSON object with the following keys:

- `token`: the updated FCM token for this device.

### Error Responses

| Title                | Status Code | Description                                       |
| -------------------- | ----------- | ------------------------------------------------- |
| Invalid content type | 400         | Only `application/json` is supported.             |
| Incomplete Request   | 400         | `instance-id` param is missing from path.         |
| Bad Request          | 400         | `instance-id` given is not valid.                 |
| Incomplete Request   | 400         | `device-id` param is missing from path.           |
| Bad request          | 400         | Failed to read body as a JSON object.             |
| Bad request          | 400         | Missing token field with the FCM Registration Id. |
| Device not found     | 404         | Could not find the device.                        |
| Something went wrong | 500         | Internal server error.                            |

## Set APNs Device User Id

```http
PUT https://<YOUR_INSTANCE_ID>.pushnotifications.pusher.com/device_api/v1/instances/<YOUR_INSTANCE_ID>/devices/apns/<DEVICE_ID>/user
```

### Request headers

The following headers are necessary:

- `Authorization`: with the value in the following format: `Bearer <BEAMS_USER_JWT_TOKEN>`.

### Error Responses

| Title                | Status Code | Description                                             |
| -------------------- | ----------- | ------------------------------------------------------- |
| Invalid content type | 400         | Only `application/json` is supported.                   |
| Incomplete Request   | 400         | `instance-id` param is missing from path.               |
| Bad Request          | 400         | `instance-id` given is not valid.                       |
| Incomplete Request   | 400         | `device-id` param is missing from path.                 |
| Bad Request          | 400         | Missing expiration (exp) field in JWT                   |
| Bad Request          | 400         | Missing subject (sub) field in JWT                      |
| Bad Request          | 400         | JWT subject (sub) must be between 1-164 characters long |
| Bad Request          | 400         | Missing issuer (iss) field in JWT                       |
| Bad Request          | 400         | A User Id is already associated with this device.       |
| Bad Request          | 400         | Invalid device id.                                      |
| Unauthorized         | 401         | `Authorization` header token is missing.                |
| Unauthorized         | 401         | `Authorization` header token is malformed.              |
| Forbidden            | 403         | Invalid JWT issuer.                                     |
| Device not found     | 404         | Could not find the device.                              |
| Unprocessable Entity | 422         | User already has reached the maximum of 100 devices.    |
| Something went wrong | 500         | Internal server error.                                  |

## Set FCM Device User Id

```http
PUT https://<YOUR_INSTANCE_ID>.pushnotifications.pusher.com/device_api/v1/instances/<YOUR_INSTANCE_ID>/devices/fcm/<DEVICE_ID>/user
```

### Request headers

The following headers are necessary:

- `Authorization`: with the value in the following format: `Bearer <BEAMS_USER_JWT_TOKEN>`.

### Error Responses

| Title                | Status Code | Description                                             |
| -------------------- | ----------- | ------------------------------------------------------- |
| Invalid content type | 400         | Only `application/json` is supported.                   |
| Incomplete Request   | 400         | `instance-id` param is missing from path.               |
| Bad Request          | 400         | `instance-id` given is not valid.                       |
| Incomplete Request   | 400         | `device-id` param is missing from path.                 |
| Bad Request          | 400         | Missing expiration (exp) field in JWT                   |
| Bad Request          | 400         | Missing subject (sub) field in JWT                      |
| Bad Request          | 400         | JWT subject (sub) must be between 1-164 characters long |
| Bad Request          | 400         | Missing issuer (iss) field in JWT                       |
| Bad Request          | 400         | A User Id is already associated with this device.       |
| Bad Request          | 400         | Invalid device id.                                      |
| Unauthorized         | 401         | `Authorization` header token is missing.                |
| Unauthorized         | 401         | `Authorization` header token is malformed.              |
| Forbidden            | 403         | Invalid JWT issuer.                                     |
| Device not found     | 404         | Could not find the device.                              |
| Unprocessable Entity | 422         | User already has reached the maximum of 100 devices.    |
| Something went wrong | 500         | Internal server error.                                  |

## Get Device Interests

```http
GET https://<YOUR_INSTANCE_ID>.pushnotifications.pusher.com/device_api/v1/instances/<YOUR_INSTANCE_ID>/devices/<DEVICE_PLATFORM>/<DEVICE_ID>/interests
```

### Request Query Parameters

The request can have the following query parameters:

- `limit`: the maximum number of interests to be returned from a single request. By default, it's the maximum value of 100.
- `cursor`: the cursor returned from a previous request to continue fetching the list of interests.

### Response Body

A JSON object with the following fields:

{% parameter 'interests', 'Array&lt;string&gt;', null %}

The array of interests the device is currently subscribed to. This array might be incomplete and more requests might be needed to get the complete list.

{% endparameter %}
{% parameter 'responseMetadata', 'responseMetadata', null %}

which contains the following fields: \_ `nextCursor`: if present, use this to perform the next request
{% endparameter %}

### Error Responses

| Title                | Status Code | Description                               |
| -------------------- | ----------- | ----------------------------------------- |
| Incomplete Request   | 400         | `instance-id` param is missing from path. |
| Bad Request          | 400         | `instance-id` given is not valid.         |
| Incomplete Request   | 400         | `device-id` param is missing from path.   |
| Bad Request          | 400         | `limit` given is not valid.               |
| Bad Request          | 400         | `cursor` given is not valid.              |
| Instance not found   | 404         | Could not find the instance.              |
| Device not found     | 404         | Could not find the device.                |
| Something went wrong | 500         | Internal server error.                    |

## Set Device Interests

```http
PUT https://<YOUR_INSTANCE_ID>.pushnotifications.pusher.com/device_api/v1/instances/<YOUR_INSTANCE_ID>/devices/<DEVICE_PLATFORM>/<DEVICE_ID>/interests
```

### Request Body

A JSON object with the following keys:

- `interests` (array of string): the set of interests this device should be subscribed to. This replaces any other existing interests. Limited to 5000 interests per device.

### Error Responses

| Title                             | Status Code | Description                                                 |
| --------------------------------- | ----------- | ----------------------------------------------------------- |
| Incomplete Request                | 400         | `instance-id` param is missing from path.                   |
| Bad Request                       | 400         | `instance-id` given is not valid.                           |
| Incomplete Request                | 400         | `device-id` param is missing from path.                     |
| Bad request                       | 400         | Failed to read body as a JSON object.                       |
| Invalid interest name             | 400         | `interest-name` given is not valid.                         |
| Interest set too large            | 400         | Too many interests are being set for this device. Only 5000 |
| interests per device are allowed. |
| Instance not found                | 404         | Could not find the instance.                                |
| Device not found                  | 404         | Could not find the device.                                  |
| Something went wrong              | 500         | Internal server error.                                      |

## Add Device Interest

```http
POST https://<YOUR_INSTANCE_ID>.pushnotifications.pusher.com/device_api/v1/instances/<YOUR_INSTANCE_ID>/devices/<DEVICE_PLATFORM>/<DEVICE_ID>/interests/<INTEREST_NAME>
```

### Error Responses

| Title                 | Status Code | Description                                 |
| --------------------- | ----------- | ------------------------------------------- |
| Incomplete Request    | 400         | `instance-id` param is missing from path.   |
| Bad Request           | 400         | `instance-id` given is not valid.           |
| Incomplete Request    | 400         | `device-id` param is missing from path.     |
| Bad Request           | 400         | `device-id` given is not valid.             |
| Invalid interest name | 400         | `interest-name` given is not valid.         |
| Incomplete Request    | 400         | `interest-name` param is missing from path. |
| Instance not found    | 404         | Could not find the instance.                |
| Something went wrong  | 500         | Internal server error.                      |

## Remove Device Interest

```http
DELETE https://<YOUR_INSTANCE_ID>.pushnotifications.pusher.com/device_api/v1/instances/<YOUR_INSTANCE_ID>/devices/<DEVICE_PLATFORM>/<DEVICE_ID>/interests/<INTEREST_NAME>
```

### Error Responses

| Title                | Status Code | Description                                 |
| -------------------- | ----------- | ------------------------------------------- |
| Incomplete Request   | 400         | `instance-id` param is missing from path.   |
| Bad Request          | 400         | `instance-id` given is not valid.           |
| Incomplete Request   | 400         | `device-id` param is missing from path.     |
| Incomplete Request   | 400         | `device-id` given is not valid.             |
| Incomplete Request   | 400         | `interest-name` param is missing from path. |
| Instance not found   | 404         | Could not find the instance.                |
| Something went wrong | 500         | Internal server error.                      |
