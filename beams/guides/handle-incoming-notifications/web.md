---
title: Web - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation: 
  parent: Handle incoming notifications
  key: Handle incoming notifications web
  title: Web
  order: 3
---
# Handle incoming notifications: Web
 
By default, the Beams web SDK will always display a notification when one arrives and will open a new tab based on the `deep_link` property provided in the publish payload. We offer two different methods of customizing this behavior. 
 
# Overriding default SDK behavior
 
If you would like to take complete control of how notifications are handled and displayed, you can provide a custom `onNotificationReceived` handler. This will be triggered when a notification arrives and will disable the default SDK behavior. 
 
```js
{overrideExample}
```
 
# Adding additional custom logic, keeping default behavior
 
If you would like to add custom logic when a notification arrives but still make use of the default implementation, you can call the `handleNotification` callback in your `onNotificationReceived` handler. For example, you could choose to only call `handleNotification` when your site isn't in focus. 

    
```js
{defaultImplementationExample}
```

