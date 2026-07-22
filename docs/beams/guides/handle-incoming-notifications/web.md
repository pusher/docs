---
date: 2021-08-01
title: Pusher Beams Docs | Handling incoming web notifications
description: The Beams web SDK will always display a browser notification when one arrives to the device and interaction will open a new tab based on the deep link provided.
layout: beams.njk
eleventyNavigation:
  parent: Handle incoming notifications
  key: Handle incoming notifications web
  title: Web
  order: 3
---

# Handle incoming notifications: Web

By default, the Beams web SDK will always display a notification when one arrives and will open a new tab based on the `deep_link` property provided in the publish payload. We offer two different methods of customizing this behavior.

## Overriding default SDK behavior

If you would like to take complete control of how notifications are handled and displayed, you can provide a custom `onNotificationReceived` handler. This will be triggered when a notification arrives and will disable the default SDK behavior.

```js
importScripts("https://js.pusher.com/beams/service-worker.js");

PusherPushNotifications.onNotificationReceived = ({ pushEvent, payload }) => {
  // NOTE: Overriding this method will disable the default notification
  // handling logic offered by Pusher Beams. You MUST display a notification
  // in this callback unless your site is currently in focus
  // https://developers.google.com/web/fundamentals/push-notifications/subscribing-a-user#uservisibleonly_options

  // Your custom notification handling logic here 🛠️
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
  pushEvent.waitUntil(
    self.registration.showNotification(payload.notification.title, {
      body: payload.notification.body,
      icon: payload.notification.icon,
      data: payload.data,
    })
  );
};
```

## Adding additional custom logic, keeping default behavior

If you would like to add custom logic when a notification arrives but still make use of the default implementation, you can call the `handleNotification` callback in your `onNotificationReceived` handler. For example, you could choose to only call `handleNotification` when your site isn't in focus.

```js
importScripts("https://js.pusher.com/beams/service-worker.js");

PusherPushNotifications.onNotificationReceived = ({
  pushEvent,
  payload,
  handleNotification,
}) => {
  // Your custom notification handling logic here 🛠️
  // This method triggers the default notification handling logic offered by
  // the Beams SDK. This gives you an opportunity to modify the payload.
  // E.g. payload.notification.title = "A client-determined title!"
  pushEvent.waitUntil(handleNotification(payload));
};
```

## Accessing Beams state

If you would like to access the Beams state, you can subscribe to the `statePromise` promise in your `onNotificationReceived` handler. For example, you can customize the notification based on the current user's role.

```js
PusherPushNotifications.onNotificationReceived = async ({
  pushEvent,
  payload,
  handleNotification,
  statePromise,
}) => {
  const { userId } = await statePromise;
  pushEvent.waitUntil(
    // custom notification handling logic
  );
};
```

Beam state properties:

| Property              | Type    | Description                                                                        |
| --------------------- | ------- | ---------------------------------------------------------------------------------- |
| instanceId            | string  | Beams instance ID.                                                                 |
| publishId             | string  | The ID used to identify the publish request.                                       |
| deviceId              | string  | The ID used to identify the device.                                                |
| userId                | string  | The ID of the current User.                                                        |
| appInBackground       | boolean | Describes if the application was in background when the notification was received. |
| hasDisplayableContent | boolean | Describes if the notification should display a UI element to the user.             |
| hasData               | boolean | Describes if the payload contains additional data.                                 |
