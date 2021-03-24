---
title: Web - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Client sdks
  key: client sdks web
  title: Web
  order: 3
---

# Web Client SDK

# Installation

The Beams Web SDK is available on npm [here](https://www.npmjs.com/package/@pusher/push-notifications-web).

## npm/yarn

You can install this SDK by using npm/yarn:

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
{
  es6Example;
}
```

## Script tag

Or you can include the SDK directly via a script tag:

```js
<script src="https://js.pusher.com/beams/1.0/push-notifications-cdn.js"></script>
```

And it will be available in the global scope as `PusherPushNotifications`

```js
{
  scriptExample;
}
```

# Client

## `Constructor`

Constructs a **new Beams client** instance.

_Arguments_

- `instanceId` (string | required): The unique identifier for your Push notifications instance. This can be found in the dashboard under "Credentials". * `serviceWorkerRegistration` (ServiceWorkerRegistration | optional): A [ServiceWorkerRegistration](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration) previously registered in your application. Only supply this if you do not want the SDK to register a Service Worker on your behalf.  
  *Returns\*

A new Client instance

_Example_

```js
{
  constructorExample;
}
```

## `.start`

Starts the SDK. Must be called at least once to ensure that the device is registered with Beams.

_Arguments_

None

_Returns_

A Promise that resolves to your PusherPushNotifications instance (allows for promise-chaining)

_Example_

```js
{
  startExample;
}
```

## `.getDeviceId`

Returns the interests the internal Beams ID for the device. Returns `null` if the device has not been registered with Beams.

_Arguments_

None

_Returns_

`deviceId`({'Promise<String>'} ): A promise that resolves to a string containing the internal Beams ID for the device

_Example_

```js
{
  getDeviceIdExample;
}
```

## `.addDeviceInterest`

Subscribes the device to the given interest.

_Arguments_

- `interest` (string | required): Name of the interest that the user will be subscribed to  
  _Returns_

A Promise that resolves when the interest has been subscribed to

_Example_

```js
{
  addDeviceInterestExample;
}
```

## `.removeDeviceInterest`

Unsubscribes the device from the given interest.

_Arguments_

- `interest` (string | required): Name of the interest that the user will be unsubscribed from  
  _Returns_

A Promise that resolves when the user has been unsubscribed

_Example_

```js
{
  removeDeviceInterestExample;
}
```

## `.getDeviceInterests`

Returns the interests the device is currently subscribed to.

_Arguments_

None

_Returns_

`interests`({'Promise<Array<String>>'} ): A promise that resolves to an array containing the interests the device is subscribed to

_Example_

```js
{
  getDeviceInterestsExample;
}
```

## `.setDeviceInterests`

Sets the subscriptions state for the device. Any interests not in the array will be unsubscribed from, so this will replace the interest set by the one provided. Duplicates will be ignored.

_Arguments_

- `interests` (array | required): Array containing the replacement set of interests for the device.  
  _Returns_

A Promise that resolves when the interests have been replaced

_Example_

```js
{
  setDeviceInterestsExample;
}
```

## `.clearDeviceInterests`

Unsubscribes the device from all interests.

_Arguments_

None

_Returns_

A Promise that resolves when the interests have been removed

_Example_

```js
{
  clearDeviceInterestsExample;
}
```

## `.getUserId`

Returns the user ID for the device if one has been set and `null` otherwise.

_Arguments_

None

_Returns_

`userId`({'Promise<String>'} ): A promise that resolves to a string containing the user ID for the device

_Example_

```js
{
  getUserIdExample;
}
```

## `.setUserId`

Sets the user id that is associated with this device. You can have up to 100 devices associated with a given user.

_Arguments_

- `userId` (string | required): ID of the user you would like to associate with this device. * `tokenProvider` (object | required): An object that contains a method called `fetchToken`. This method must return a promise that resolves to a correctly signed Beams Token for the desired user ID (this should come from an authenticated request sent to your server). The SDK offers a default token provider implementation under `PusherPushNotifications.TokenProvider`  
  *Returns\*

A Promise that resolves when the user has successfully authenticated with Beams

_Example_

```js
{
  setUserIdExample;
}
```

## `.clearAllState`

Clears all the state in the SDK, leaving it in a empty started state. You should call this method when your user logs out of the application.

_Arguments_

None

_Returns_

A Promise that resolves when the state has been cleared

_Example_

```js
{
  clearAllStateExample;
}
```

## `.stop`

Stops the SDK by deleting all state (both locally and remotely). Calling this will mean the device will cease to receive push notifications `.start` must be called if you want to use the SDK again.

_Arguments_

None

_Returns_

A Promise that resolves when the SDK has been stopped

_Example_

```js
{
  stopExample;
}
```

## `.getRegistrationState`

Returns the current registration state of the Beams SDK. The registration state depends on the browser notification permission for your site and whether or not the browser is registered with the Beams service. The four possible states, available in the `PusherPushNotifications.RegistrationState` enum, are listed in the following table:

 <Table> <thead> <tr> <th>State</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td> `PERMISSION_GRANTED_REGISTERED_WITH_BEAMS` </td> <td> The user has given permission in their browser for your site to send them notifications and the browser is registered with the Beams service. The SDK is ready to receive notifications and you can set the user/interests as necessary. Calling `.stop` will return the SDK to the ` PERMISSION_GRANTED<wbr />_NOT_REGISTERED_WITH_BEAMS ` state. </td> </tr> <tr> <td> ` PERMISSION_GRANTED_NOT_REGISTERED_WITH_BEAMS ` </td> <td> The user has given permission in their browser for your site to send them notifications but the browser is not registered with the Beams service so notifications cannot be received. Calling `.start` will register the browser with Beams, changing the state to ` PERMISSION_GRANTED<wbr />_REGISTERED_WITH_BEAMS ` without showing a permission prompt. </td> </tr> <tr> <td> `PERMISSION_PROMPT_REQUIRED` </td> <td> The user hasn't given permission in their browser for your site to send them notifications. Calling `.start` will show them a permission prompt and register the browser with Beams if they allow notifications. The state will change to ` PERMISSION_GRANTED<wbr />_REGISTERED_WITH_BEAMS ` if they allow notifications, or `PERMISSION_DENIED` if they block notifications. </td> </tr> <tr> <td> `PERMISSION_DENIED` </td> <td> The user has blocked the notification permission in their browser for your site. The only way to leave this state is for the user to change the permission setting for your site. </td> </tr> </tbody> </Table> 
*Arguments* 
 
None
 
*Returns* 
 
A Promise that resolves with the registration state.
 
*Example* 
 
```js
{getRegistrationStateExample}
```
 
# TokenProvider
 
##  `Constructor` 
 
Constructs a new Beams `TokenProvider` instance. You must pass a `TokenProvider` when you call the `setUserId` method. This will determine how the SDK will request a Beams Token from your auth system. [Learn more](/docs/beams/guides/publish-to-specific-user/web). 
 
*Arguments* 
  *  `url` (string | required): The absolute/relative URL of your Beams auth endpoint. See [Publish to a specific User: Web](/docs/beams/guides/publish-to-specific-user/web)  *  `queryParams` (object | optional): A key/value mapping of the query parameters you would like to be used when the SDK makes a request to your Beams auth endpoint.  *  `headers` (object | optional): A key/value mapping of the HTTP request headers you would like to be used when the SDK makes a request to your Beams auth endpoint.  *  `credentials` (string | optional): A string representing which policy you would like to use for determining which cookies will be sent to your Beams auth endpoint. Must be one of: `omit` (send no cookies), `same-origin` (send cookies if the URL is on the same origin as the calling script), or `include` (send cookies irrespective of origin). Defaults to `same-origin`. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials).   
*Returns* 
 
A new `TokenProvider` instance 
 
*Example* 
 
```js
{tokenProviderExample}
```
 
# Service Worker Library
 
A separate `PusherPushNotifications` SDK interface is available inside your Service Worker 
 
```js
{serviceWorkerExample}
```
 
##  `.onNotificationReceived` 
 
*Callback* 
 
Assign a callback to this property on the SDK to disable the default notification handling logic and provide your own. 
 
*Callback Arguments* 
  *  `payload` (object): JSON object containing the [publish payload](/docs/beams/reference/publish-payloads#web-format) that triggered this notification.  *  `pushEvent`( [PushEvent](https://developer.mozilla.org/en-US/docs/Web/API/PushEvent) ): Raw `PushEvent` received from the browser.  *  `handleNotification` (function): Call this function to trigger the default notification display/handling logic. You must pass this function the `payload` object passed to the callback (though you may modify it).   
*Returns* 
 
Nothing
 
*Example*

```js
{
  onNotificationReceivedExample;
}
```
