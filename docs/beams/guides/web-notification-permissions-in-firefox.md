---
title: Web notification permissions in Firefox
layout: beams.njk
eleventyNavigation:
  parent: Web push guides
  key: Web notification permissions in Firefox
  order: 2
---

# Web notification permissions in Firefox

Mozilla have deep concerns about the user experience of web push notifications. This guide covers the Firefox specific requirements for requesting push permissions.

# Requesting permissions from a button click

Firefox requires that users interact with the page before push permissions can be requested [Learn more](https://blog.mozilla.org/futurereleases/2019/11/04/restricting-notification-permission-prompts-in-firefox/). As such, we recommend that you add a button to your page to allow users to enable notifications and call the `.start` method of the Beams SDK in the click handler.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Firefox permissions example</title>
    <script src="https://js.pusher.com/beams/1.0/push-notifications-cdn.js"></script>
  </head>
  <body>
    <button onclick="enableNotifications()">Enable Notifications</button>
    <script>
      const beamsClient = new PusherPushNotifications.Client({
        instanceId: "<YOUR_INSTANCE_ID_HERE>",
      });

      function enableNotifications() {
        beamsClient.start().then(() => console.log("Registered with beams!"));
      }
    </script>
  </body>
</html>
```
