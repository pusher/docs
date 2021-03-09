---
title: Android - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation: 
  parent: Handle incoming notifications
  key: Handle incoming notifications android
  title: Android
  order: 2
---
# Handle incoming notifications: Android
 
Beams makes it possible trigger callback code in your application when a push notification arrives on a user's device. This can be used to respond to the arrival of the notification in your application. 
 
# Handle all notifications
 
You can implement a service to handle incoming notifications. It will get called when your application is:  * In the foreground *  In the background, and the notification **only** contains a data payload.   
 
```xml
{androidManifestServiceExampleDiff}
```
 <Alert primary> When your application is in the background this service will not be called unless there is **only** a data payload in the notification. The `notification` key cannot be used. </Alert> 
```java
{androidServiceExample}
```
 
# Handle notifications in a particular Activity
 
When a push notification arrives while your activity is in display, the Beams SDK will call the `onMessageReceived` listener with a `RemoteMessage` object containing the notification and data payload. 

    
```php
{JSForegroundExample}
```

    
```java
{androidForegroundExample}
```

