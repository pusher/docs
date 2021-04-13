---
title: Server SDK Node.js
layout: beams.njk
eleventyNavigation:
  parent: Server sdks
  key: Server sdk node
  title: Node.js
  order: 3
---

# Node.js Server SDK

The SDK includes a typings file for TypeScript compatibility.

## Installation

The Beams Node.js server SDK is available on NPM [here](https://www.npmjs.com/package/@pusher/push-notifications-server).

### Install

You can install this SDK by using NPM or Yarn:

{% snippets ['npm', 'yarn'] %}

```bash
npm install @pusher/push-notifications-server --save
```

```bash
yarn add @pusher/push-notifications-server
```

{% endsnippets %}

## Reference

### `constructor PushNotifications`

`new PushNotifications(options)`

Construct a new Pusher Beams Client connected to your Beams instance.

You only need to do this once.

#### Arguments

{% parameter 'options', 'Object', true %}

- `instanceId` (String | _Required_) - The unique identifier for your Beams instance. This can be found in the dashboard under "Credentials".
- `secretKey` (String | _Required_) - The secret key your server will use to access your Beams instance. This can be found in the dashboard under "Credentials".

{% endparameter %}

#### Returns

A Pusher Beams client

#### Example

```js
const PushNotifications = require("${SDK_NAME}");

let beamsClient = new PushNotifications({
  instanceId: "YOUR_INSTANCE_ID_HERE",
  secretKey: "YOUR_SECRET_KEY_HERE",
});
```

### `.publishToInterests`

Publish a push notification to devices subscribed to given Interests, with the given payload.

#### Arguments

{% parameter 'interests', 'Array&lt;String&gt;', true %}

Interests to send the push notification to, ranging from 1 to 100 per publish request. See [Concept: Device Interests](/docs/beams/concepts/device-interests).

{% endparameter %}
{% parameter 'publishBody', 'Object' %}

See [publish API reference](/docs/beams/reference/publish-api#request-body).

{% endparameter %}

#### Returns

(Promise) - A promise that resolves to a `publishResponse`. See [publish API reference](/docs/beams/reference/publish-api#success-response-body).

#### Example

```js
beamsClient
  .publishToInterests(["hello"], {
    apns: {
      aps: {
        alert: {
          title: "Hello",
          body: "Hello, world!",
        },
      },
    },
    fcm: {
      notification: {
        title: "Hello",
        body: "Hello, world!",
      },
    },
    web: {
      notification: {
        title: "Hello",
        body: "Hello, world!",
      },
    },
  })
  .then((publishResponse) => {
    console.log("Just published:", publishResponse.publishId);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### `.publishToUsers`

Publish a push notification to devices belonging to specific users, with the given payload.

#### Arguments

{% parameter 'userIDs', 'Array&lt;String&gt;', true %}

User IDs to send the push notification to, ranging from 1 to 1000 per publish request. See [Concept: Authenticated Users](/docs/beams/concepts/authenticated-users).

{% endparameter %}
{% parameter 'publishBody', 'Object' %}

See [publish API reference](/docs/beams/reference/publish-api#request-body).

{% endparameter %}

#### Returns

(Promise) - A promise that resolves to a `publishResponse`. See [publish API reference](/docs/beams/reference/publish-api#success-response-body).

#### Example

```js
beamsClient
  .publishToUsers(["user-001", "user-002"], {
    apns: {
      aps: {
        alert: {
          title: "Hello",
          body: "Hello, world!",
        },
      },
    },
    fcm: {
      notification: {
        title: "Hello",
        body: "Hello, world!",
      },
    },
    web: {
      notification: {
        title: "Hello",
        body: "Hello, world!",
      },
    },
  })
  .then((publishResponse) => {
    console.log("Just published:", publishResponse.publishId);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

### `.generateToken`

Generate a Beams auth token to allow a user to associate their device with their user id. The token is valid for 24 hours.

#### Arguments

{% parameter 'userID', 'String', true %}

User ID of the user for whom you want to generate a Beams token.

{% endparameter %}

#### Returns

A Beams token for the given user.

#### Example

```js
const beamsToken = beamsClient.generateToken("user-001");
```

### `.deleteUser`

Delete a user and all their devices from Pusher Beams.

#### Arguments

{% parameter 'userID', 'String', true %}

The user ID of the user you wish to delete.

{% endparameter %}

#### Returns

(Promise) - A promise that resolves with no arguments. If deletion fails, the promise will reject.

#### Example

```js
beamsClient
  .deleteUser("user-001")
  .then(() => {
    console.log("Successfully deleted the user!");
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```
