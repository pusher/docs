---
title: Pusher Beams Docs | Deleting a user
description: Our Customer API allows you to quickly and easily delete unsubscribed users from your user base and discontinue notifications to their devices.
layout: beams.njk
eleventyNavigation:
  parent: Api
  key: Customer api
  title: Customer API
  order: 2
---

# Customer API

## Deleting a User

```http
DELETE https://<YOUR_INSTANCE_ID>.pushnotifications.pusher.com/customer_api/v1/instances/<YOUR_INSTANCE_ID>/users/<YOUR_USER_ID>
```

> When sending the User ID in the path, make sure it's URL encoded.

### Request headers

The following headers are necessary:

- `Authorization`: with the value in the following format: `Bearer <YOUR_SECRET_KEY>`.

### Error Responses

| Title                | Status Code | Description                                                     |
| -------------------- | ----------- | --------------------------------------------------------------- |
| Incomplete Request   | 400         | `instance-id` param is missing from path.                       |
| Incomplete Request   | 400         | Authorization header is missing.                                |
| Unauthorized         | 401         | Incorrect API Key.                                              |
| Instance not found   | 404         | Could not find the instance.                                    |
| Rate Limited         | 429         | Too many requests being made in quick succession (max 100 RPS). |
| Something went wrong | 500         | Internal server error.                                          |
