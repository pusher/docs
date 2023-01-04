---
date: 2021-08-01
title: Pusher Beams Docs | Web SDK
description: Install the Beams Web SDK using npm/Yarn and send valuable browser notifications to your Safari, Firefox, Opera, Chrome and Edge.
layout: beams.njk
eleventyNavigation:
  parent: Client sdks
  key: client sdks web
  title: Web
  order: 3
---

# Web Client SDK

## Installation

The Beams Web SDK is available on npm [here](https://www.npmjs.com/package/@pusher/push-notifications-web).

### npm/Yarn

You can install this SDK by using npm/Yarn:

{% snippets ['bash', 'bash'] %}

```bash
npm install @pusher/push-notifications-web
```

```bash
yarn add @pusher/push-notifications-web
```

{% endsnippets %}

And import it into your application:

```js
import * as PusherPushNotifications from "@pusher/push-notifications-web";

const beamsClient = new PusherPushNotifications.Client({
  instanceId: "<YOUR_INSTANCE_ID_HERE>",
});

beamsClient.start().then(() => {
  // Build something beatiful 🌈
});
```

### Script tag

Or you can include the SDK directly via a script tag:

```html
<script src="https://js.pusher.com/beams/1.0/push-notifications-cdn.js"></script>
```

And it will be available in the global scope as `PusherPushNotifications`

```html
<script src="https://js.pusher.com/beams/1.0/push-notifications-cdn.js"></script>
<script>
  const beamsClient = new PusherPushNotifications.Client({
    instanceId: "<YOUR_INSTANCE_ID_HERE>",
  });

  beamsClient.start().then(() => {
    // You know the drill ⚙️
  });
</script>
```

## Client

### `Constructor`

Constructs a **new Beams client** instance.

#### Arguments

{% parameter 'instanceId', 'String', true %}

The unique identifier for your Push notifications instance. This can be found in the dashboard under "Credentials".

{% endparameter %}
{% parameter 'serviceWorkerRegistration', 'ServiceWorkerRegistration', false %}

A [ServiceWorkerRegistration](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration) previously registered in your application. Only supply this if you do not want the SDK to register a Service Worker on your behalf.

{% endparameter %}
{% parameter 'instanceId', 'String', true %}

The unique identifier for your Push notifications instance. This can be found in the dashboard under "Credentials".

{% endparameter %}

#### Returns

A new Client instance

#### Example

```js
const beamsClient = new PusherPushNotifications.Client({
  instanceId: "<YOUR_INSTANCE_ID_HERE>",
  // Only add this if you already have a Service Worker in your application.
  // If you omit this parameter, Beams will register a Service Worker on your
  // behalf.
  serviceWorkerRegistration: myServiceWorkerRegistration,
});
```

### `.start`

Starts the SDK. Must be called at least once to ensure that the device is registered with Beams.

#### Arguments

None

#### Returns

A Promise that resolves to your PusherPushNotifications instance (allows for promise-chaining)

#### Example

```js
const beamsClient = new PusherPushNotifications.Client({
  instanceId: '<YOUR_INSTANCE_ID_HERE>',
})

beamsClient.start() =>
  .then(() => {
    // Beams integration code here
  });
```

### `.getDeviceId`

Returns the interests the internal Beams ID for the device. Returns `null` if the device has not been registered with Beams.

#### Arguments

None

#### Returns

{% parameter 'deviceId', 'Promise&lt;String&gt;' %}

A promise that resolves to a string containing the internal Beams ID for the device

{% endparameter %}

#### Example

```js
const beamsClient = new PusherPushNotifications.Client({
  instanceId: '<YOUR_INSTANCE_ID_HERE>',
})

beamsClient.start()
  .then(() => beamsClient.getDeviceId())
  .then(deviceId => {
    console.log(deviceId) // Will log something like web-1234-1234-1234-1234
  })
  .catch(e => console.error('Could not get device id', e));
```

### `.addDeviceInterest`

Subscribes the device to the given interest.

#### Arguments

{% parameter 'interest', 'String', true %}

Name of the interest that the user will be subscribed to

{% endparameter %}

#### Returns

A Promise that resolves when the interest has been subscribed to

#### Example

```js
const beamsClient = new PusherPushNotifications.Client({
  instanceId: '<YOUR_INSTANCE_ID_HERE>',
})

beamsClient.start()
  .then(() => beamsClient.addDeviceInterest('donuts'))
  .catch(e => console.error('Could not add device interest', e));
```

### `.removeDeviceInterest`

Unsubscribes the device from the given interest.

#### Arguments

{% parameter 'interest', 'String', true %}

Name of the interest that the user will be unsubscribed from
{% endparameter %}

#### Returns

A Promise that resolves when the user has been unsubscribed

#### Example

```js
const beamsClient = new PusherPushNotifications.Client({
  instanceId: '<YOUR_INSTANCE_ID_HERE>',
})

beamsClient.start()
  .then(() => beamsClient.removeDeviceInterest('donuts'))
  .catch(e => console.error('Could not remove device interest', e));
```

### `.getDeviceInterests`

Returns the interests the device is currently subscribed to.

#### Arguments

None

#### Returns

{% parameter 'deviceId', 'Promise&lt;Array&lt;String&gt;&gt;' %}

A promise that resolves to an array containing the interests the device is subscribed to

{% endparameter %}

#### Example

```js
const beamsClient = new PusherPushNotifications.Client({
  instanceId: '<YOUR_INSTANCE_ID_HERE>',
})

beamsClient.getDeviceInterests()
  .then(interests => {
    console.log(interests) // Will log something like ["a", "b", "c"]
  })
  .catch(e => console.error('Could not get device interests', e));
```

### `.setDeviceInterests`

Sets the subscriptions state for the device. Any interests not in the array will be unsubscribed from, so this will replace the interest set by the one provided. Duplicates will be ignored.

#### Arguments

{% parameter 'interests', 'Array', true %}

Array containing the replacement set of interests for the device.

{% endparameter %}

#### Returns

A Promise that resolves when the interests have been replaced

#### Example

```js
const beamsClient = new PusherPushNotifications.Client({
  instanceId: '<YOUR_INSTANCE_ID_HERE>',
})

// The user will now be subscribed to "a", "b" & "c" only
beamsClient.setDeviceInterests(['a', 'b', 'c'])
  .then(() => console.log('Device interests have been set'))
  .catch(e => console.error('Could not set device interests', e));
```

### `.clearDeviceInterests`

Unsubscribes the device from all interests.

#### Arguments

None

#### Returns

A Promise that resolves when the interests have been removed

#### Example

```js
const beamsClient = new PusherPushNotifications.Client({
  instanceId: '<YOUR_INSTANCE_ID_HERE>',
})

// The user will now not be subscribed to any interests
beamsClient.clearDeviceInterests()
  .then(() => console.log('Device interests have been cleared'))
  .catch(e => console.error('Could not clear device interests', e));
```

### `.getUserId`

Returns the user ID for the device if one has been set and `null` otherwise.

#### Arguments

None

#### Returns

{% parameter 'userId', 'Promise&lt;String&gt;' %}

A promise that resolves to a string containing the user ID for the device

{% endparameter %}

#### Example

```js
const beamsClient = new PusherPushNotifications.Client({
  instanceId: '<YOUR_INSTANCE_ID_HERE>',
})

beamsClient.getUserId()
  .then(userId => {
    console.log(userId) // Will log the current user id
  })
  .catch(e => console.error('Could not get user id', e));
```

### `.setUserId`

Sets the user id that is associated with this device. You can have up to 100 devices associated with a given user.

#### Arguments

{% parameter 'userId', 'String', true %}

ID of the user you would like to associate with this device.

{% endparameter %}
{% parameter 'tokenProvider', 'Object', true %}

An object that contains a method called `fetchToken`. This method must return a promise that resolves to a correctly signed Beams Token for the desired user ID (this should come from an authenticated request sent to your server). The SDK offers a default token provider implementation under `PusherPushNotifications.TokenProvider`.

{% endparameter %}

#### Returns

A Promise that resolves when the user has successfully authenticated with Beams

#### Example

```js
const tokenProvider = new PusherPushNotifications.TokenProvider({
  url: 'https://example.com/pusher/beams-auth',
})

const beamsClient = new PusherPushNotifications.Client({
  instanceId: '<YOUR_INSTANCE_ID_HERE>',
})

beamsClient.start()
  .then(() => beamsClient.setUserId('<USER_ID_HERE>', tokenProvider))
  .then(() => console.log('User ID has been set'))
  .catch(e => console.error('Could not authenticate with Beams:', e));
```

### `.clearAllState`

Clears all the state in the SDK, leaving it in a empty started state. You should call this method when your user logs out of the application.

#### Arguments

None

#### Returns

A Promise that resolves when the state has been cleared

#### Example

```js
beamsClient.clearAllState()
  .then(() => console.log('Beams state has been cleared'))
  .catch(e => console.error('Could not clear Beams state', e));
```

### `.stop`

Stops the SDK by deleting all state (both locally and remotely). Calling this will mean the device will cease to receive push notifications `.start` must be called if you want to use the SDK again.

#### Arguments

None

#### Returns

A Promise that resolves when the SDK has been stopped

#### Example

```js
beamsClient.stop()
  .then(() => console.log('Beams SDK has been stopped'))
  .catch(e => console.error('Could not stop Beams SDK', e));
```

### `.getRegistrationState`

Returns the current registration state of the Beams SDK. The registration state depends on the browser notification permission for your site and whether or not the browser is registered with the Beams service. The four possible states, available in the `PusherPushNotifications.RegistrationState` enum, are listed in the following table:

| State                                          | Description                                                                                                                                                                                                                                                                                                                                                           |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PERMISSION_GRANTED_REGISTERED_WITH_BEAMS`     | The user has given permission in their browser for your site to send them notifications and the browser is registered with the Beams service. The SDK is ready to receive notifications and you can set the user/interests as necessary. Calling `.stop` will return the SDK to the `PERMISSION_GRANTED_NOT_REGISTERED_WITH_BEAMS` state.                             |
| `PERMISSION_GRANTED_NOT_REGISTERED_WITH_BEAMS` | The user has given permission in their browser for your site to send them notifications but the browser is not registered with the Beams service so notifications cannot be received. Calling `.start` will register the browser with Beams, changing the state to `PERMISSION_GRANTED_REGISTERED_WITH_BEAMS` without showing a permission prompt.                    |
| `PERMISSION_PROMPT_REQUIRED`                   | The user hasn't given permission in their browser for your site to send them notifications. Calling `.start` will show them a permission prompt and register the browser with Beams if they allow notifications. The state will change to `PERMISSION_GRANTED_REGISTERED_WITH_BEAMS` if they allow notifications, or `PERMISSION_DENIED` if they block notifications. |
| `PERMISSION_DENIED`                            | The user has blocked the notification permission in their browser for your site. The only way to leave this state is for the user to change the permission setting for your site.                                                                                                                                                                                     |

#### Arguments

None

#### Returns

A Promise that resolves with the registration state.

#### Example

```js
beamsClient
  .getRegistrationState()
  .then((state) => {
    let states = PusherPushNotifications.RegistrationState;
    switch (state) {
      case states.PERMISSION_DENIED: {
        // Notifications are blocked
        // Show message saying user should unblock notifications in their browser
        break;
      }
      case states.PERMISSION_GRANTED_REGISTERED_WITH_BEAMS: {
        // Ready to receive notifications
        // Show "Disable notifications" button, onclick calls '.stop'
        break;
      }
      case states.PERMISSION_GRANTED_NOT_REGISTERED_WITH_BEAMS:
      case states.PERMISSION_PROMPT_REQUIRED: {
        // Need to call start before we're ready to receive notifications
        // Show "Enable notifications" button, onclick calls '.start'
        break;
      }
    }
  })
  .catch((e) => console.error("Could not get registration state", e));
```

## TokenProvider

### `Constructor`

Constructs a new Beams `TokenProvider` instance. You must pass a `TokenProvider` when you call the `setUserId` method. This will determine how the SDK will request a Beams Token from your auth system. [Learn more](/docs/beams/guides/publish-to-specific-user/web).

#### Arguments

{% parameter 'url', 'String', true %}

The absolute/relative URL of your Beams auth endpoint. See [Publish to a specific User: Web](/docs/beams/guides/publish-to-specific-user/web)

{% endparameter %}
{% parameter 'queryParams', 'Object', false %}

A key/value mapping of the query parameters you would like to be used when the SDK makes a request to your Beams auth endpoint.

{% endparameter %}
{% parameter 'headers', 'Object', false %}

A key/value mapping of the HTTP request headers you would like to be used when the SDK makes a request to your Beams auth endpoint.

{% endparameter %}
{% parameter 'credentials', 'String', false %}

A string representing which policy you would like to use for determining which cookies will be sent to your Beams auth endpoint. Must be one of: `omit` (send no cookies), `same-origin` (send cookies if the URL is on the same origin as the calling script), or `include` (send cookies irrespective of origin). Defaults to `same-origin`. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials).

{% endparameter %}

#### Returns

A new `TokenProvider` instance

#### Example

```js
const tokenProvider = new PusherPushNotifications.TokenProvider({
  url: 'https://example.com/pusher/beams-auth',
  queryParams: { userId: 'alice' },
  headers: { 'Example-Header': 'value' },
  credentials: 'include',
})

const beamsClient = new PusherPushNotifications.Client({
  instanceId: '<YOUR_INSTANCE_ID_HERE>',
})

beamsClient.start()
  .then(() => beamsClient.setUserId('<USER_ID_HERE>', tokenProvider))
  .then(() => console.log('User ID has been set'))
  .catch(e => console.error('Could not authenticate with Beams:', e);
```

## Service Worker Library

A separate `PusherPushNotifications` SDK interface is available inside your Service Worker

```js
importScripts("https://js.pusher.com/beams/service-worker.js");

// You can now use the Service Worker SDK by calling
// PusherPushNotifications.<METHOD_NAME>
```

### `.onNotificationReceived`

#### Callback

Assign a callback to this property on the SDK to disable the default notification handling logic and provide your own.

#### Callback Arguments

{% parameter 'payload', 'Object' %}

JSON object containing the [publish payload](/docs/beams/reference/publish-payloads#web-format) that triggered this notification.

{% endparameter %}
{% parameter 'pushEvent', 'PushEvent' %}

Raw [PushEvent](https://developer.mozilla.org/en-US/docs/Web/API/PushEvent) received from the browser.

{% endparameter %}
{% parameter 'handleNotification', 'Function' %}

Call this function to trigger the default notification display/handling logic. You must pass this function the `payload` object passed to the callback (though you may modify it).

{% endparameter %}

#### Returns

Nothing

#### Example

```js
importScripts("https://js.pusher.com/beams/service-worker.js");

PusherPushNotifications.onNotificationReceived = ({
  payload,
  pushEvent,
  handleNotification,
}) => {
  payload.notification.title = "A new title!";
  pushEvent.waitUntil(handleNotification(payload));
};
```
