---
title: Publishing to multiple devices - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation: 
  parent: Guides
  key: Publishing to multiple devices
  order: 2
---
# Publishing to multiple devices
 
If you want to send push notifications to multiple devices, [Device Interests](/docs/beams/concepts/device-interests) are the way to go. This guide will demonstrate how to publish to multiple devices with Beams, using Device Interests. 
 <Alert primary> This guide uses Device Interests to send public broadcasts to subscribed users. For increased security you can use [ Authenticated Users ](/docs/beams/concepts/authenticated-users) instead. </Alert> 
# Add a Device Interest
 
In your chosen client SDK, you can call the `addDeviceInterest` method, passing in the Interest name. 
 
For example, here we subscribe to the Interest *"hello"*. 
 
{% snippets ['swift', 'java', 'js'] %}
 
```swift
{iosAddInterestSnippet}
```
 
```java
{androidAddInterestSnippet}
```
 
```js
{webAddInterestSnippet}
```
 
{% endsnippets %}
 
This device has now subscribed to the Interest *"hello"* and will receive any push notifications published to *"hello"*. 
 <Alert primary> Device Interest names are limited to 164 characters and can only contain ASCII upper/lower-case letters, numbers or one of `_-=@,.;` </Alert> <br /> 
# Publish to the Device Interest
 
Now to publish to all devices that are subscribed to *hello*, call the `publishToInterests` method, passing an array containing *hello*. 
 
{% snippets [] %}
 <Code showLineNumbers={false} language="node"> {nodePublishToInterests}
```
 <Code showLineNumbers={false} language="php"> {phpPublishToInterests}
```
 {/* There is no syntax highlighing for HTTP, so we use the bash syntax highlighting and override the language label with the `title` attribute, which takes precedence. */} <Code showLineNumbers={false} language="go"> {goPublishToInterests}
```
 <Code showLineNumbers={false} language="python"> {pythonPublishToInterests}
```
 <Code showLineNumbers={false} language="java"> {javaPublishToInterests}
```
 <Code showLineNumbers={false} language="kotlin"> {kotlinPublishToInterests}
```
 <Code showLineNumbers={false} language="ruby"> {rubyPublishToInterests}
```
 <Code showLineNumbers={false} language="bash" title="API"> {httpPublishToInterests}
```
 
{% endsnippets %}
 <Alert primary> Each publish requires at least one interest, up to a maximum of 100. </Alert> <br /> 
## Differences between platforms
 
A publish request must target at least one our supported platforms: 
  * APNs (for iOS devices) * FCM (for Android devices) * Web (for web browsers)  
The structure of the publish request is slightly different for each. Follow the links below for the full set of options. 
  *  **iOS**: see [ “Creating the Remote Notification Payload” ](https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html#//apple_ref/doc/uid/TP40008194-CH10-SW1) and [ Payload Key Reference ](https://developer.apple.com/library/archive/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/PayloadKeyReference.html#//apple_ref/doc/uid/TP40008194-CH17-SW1)  *  **Android**: see [ FCM downstream HTTP messages ](https://firebase.google.com/docs/cloud-messaging/http-server-ref#downstream)  *  **Web**: see [ Beams web notification format ](/docs/beams/reference/publish-payloads#web-format)   
For example, a publish request to only iOS devices would look something like this: 
 <Code heading="iOS (APNs only)" language="json" showLineNumbers={false}> {publishReqApnsOnlyJSON}
```
 
...whereas a publish request to all supported platforms would have this structure: 
 <Code heading="All platforms" language="json"> {publishReqJSON}
```
 
## Adding metadata to a notification
 
If you want to add metadata to your request, add a `data` property to the payload for each desired platform, like so: 

    <Code heading="Adding metadata">{publishReqWithMetadata}
```

