---
title: Publish notifications - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation: 
  parent: Beams getting started android
  key: Publish notifications android
  title: 4. Publish Notifications
  order: 4
---
# Android Publishing Notifications
 
Push notifications are triggered by your servers to our Beams service. After a device using your Android application subscribes to an interest on our service, your server can then send a push notification to that device by publishing to that interest. 
 
Before you can send push notifications, make sure you have [configured your FCM Key]({urls.android.step1}), [integrated your app with the SDK]({urls.android.step2}), and [initialized Beams ]({urls.android.step3}) 
 
# Sending a notification
 
To get started, let's send the time-honored “hello world” message to your Android application. We'll assume your Android application has subscribed to the interest "hello". 
 
Let's start by creating a file called `publish-body.json` with the request body for the publish: 
 
```bash
{publishBodyJsonFile}
```
 
Now, before you run the `curl` command, you need to get the instance id and its secret. You can get this information in the <a external="" href="https://dashboard.pusher.com/beams"> Pusher Dashboard "Keys" tab for your Beams instance </a> . Now you can either export environment variables or replace the command with the appropriate keys. 
 
```bash
{curlExample}
```
 
From this point onwards, you can just change the `publish-body.json` file and run the same `curl` command. 
 
# Sending From The Server
 
{% snippets ['php', 'go', 'js', 'py', 'java', 'kotlin', 'rb'] %}
 
```php
{phpFcmExample}
```
 
```go
{goFcmExample}
```
 
```js
{nodeFcmExample}
```
 
```py
{pythonFcmExample}
```
 
```java
{javaFcmExample}
```
 
```kotlin
{kotlinFcmExample}
```
 
```rb
{rubyFcmExample}
```
 
{% endsnippets %}
 
# Advanced Options
 
The publish method accepts an object which specifies the message to send. This object is the language's native representation of JSON. The previous example was a very simple one. There are many more advanced details you can specify. The full set of options for the FCM section of the publish call is described by Google in their documentation of <a external="" href="https://firebase.google.com/docs/cloud-messaging/http-server-ref#downstream"> FCM downstream messages </a> 
 
# Custom Data
 
Any custom data fields you wish to include in your push notification **must** be provided under a `data` key in the `fcm` data structure. Any custom data fields specified outside of the `data` key won't be pushed to the device. 

