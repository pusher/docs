---
title: Web 1 0 migration - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation: 
  parent: Beams
  key: Web 1 0 migration
---
# Beams Web SDK v1.0 migration guide
 
We are about to release v1.0 of the Beams web push SDK, this comes with some small breaking changes. Here is everything you need to know to upgrade smoothly 
 
# Before you start: check your version is pinned
 
Make sure your SDK version is pinned to the `0.*` series, this will ensure that your app does not break while you upgrade to `1.0` 
 
## If you are using npm
 
Check your `package.json` to ensure that you will not be automatically upgraded to `1.0` 
 
## If you are using the CDN
 
Ensure that you are using a CDN URL that is pinned to the 0.* series The following is OK because you will receive the latest 0.* version: 
 
```http
https://unpkg.com/@pusher/push-notifications-web@0/dist/push-notifications-cdn.js
```
 
Whereas this will cause issues by automatically upgrading you to the latest release: 
 
```http
https://unpkg.com/@pusher/push-notifications-web@latest/dist/push-notifications-cdn.js
```
 
# Migrate to our new CDN URL
 
We are no longer supporting unpkg as a CDN provider. Whilst we will make sure the 0.* series remains available, please use the official Pusher CDN URL for all future versions: 
 
```http
https://js.pusher.com/beams/1.0/push-notifications-cdn.js
```
 
# Use the new synchronous constructor
 
During the beta, we received feedback that the async `init` method was awkward to work with. This has been replaced with a synchronous constructor & all other methods have been made async. This does not impact network efficiency because operations are still being performed locally where possible (such as getting the current user/device ID). 

    
## Before

    
```js
let beamsClient;

        // On page load
        PusherPushNotifications.init({
          instanceId: "YOUR_INSTANCE_ID",
        }).then(bc => beamsClient = bc);

        // Elsewhere in your page
        function enableNotifications() {
          beamsClient.start()
            .then(() => console.log(beamsClient.deviceId))
            .catch(console.error)
        }
```

    
## After

    
```js
const beamsClient = new PusherPushNotifications.Client({
          instanceId: "YOUR_INSTANCE_ID",
        })

        // Elsewhere in your page
        function enableNotifications() {
          beamsClient.start()
            .then(() => beamsClient.getDeviceId())
            .then(deviceId => console.log(deviceId))
            .catch(console.error)
        }
```

