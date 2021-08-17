---
title: Pusher Beams Docs | Service Workers
description: Find out how to import the service worker into an existing service worker file and intialize the Beams SDK for push notifications in your web app.
layout: beams.njk
eleventyNavigation:
  parent: Web push guides
  key: Using an existing service worker
  order: 1
---

# Using an existing service worker in the Web SDK

The Beams Web SDK requires access to a Service Worker. By default, the SDK will register a Service Worker on your behalf. However, you may already be using Service Workers in your application. **If you are only using Service Workers in your app with Beams, please ignore this guide.**

## Import the Beams Service Worker in your existing Service Worker file

> Only one service worker per domain can be registered.

If you already have a Service Worker file hosted on your domain you can integrate the Beams Service Worker by adding an import line at the top of the file:

```js
importScripts("https://js.pusher.com/beams/service-worker.js");
// The rest of your Service Worker code goes here...
```

## Initialize the SDK

Once you have imported the Beams Service Worker library, you will need to pass your existing Service Worker registration to the Beams Web SDK when it is initialized:

```js
window.navigator.serviceWorker.ready.then(serviceWorkerRegistration =>
  const beamsClient = new PusherPushNotifications.Client({
    instanceId: '<YOUR_INSTANCE_ID_HERE>',
    serviceWorkerRegistration: serviceWorkerRegistration,
  })
)
```

## Next steps

Now continue with our main guide from the [Check your integration](/docs/beams/getting-started/web/sdk-integration#check-your-integration) section.
