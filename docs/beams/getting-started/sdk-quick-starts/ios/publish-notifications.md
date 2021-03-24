---
title: Publish notifications - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Beams getting started ios
  key: Publish notifications
  title: 3. Publish Notifications
  order: 3
---

# iOS Publishing Notifications

Push notifications are triggered by your servers to our Beams service. After a device using your iOS application subscribes to an interest on our service, your server can then send a push notification to that device by publishing to that interest.

Before you can send push notifications, make sure you have [configured your APNs Key]({urls.ios.step1}) and [integrated your app with the SDK]({urls.ios.step2}).

# Sending a notification

To get started, let's send the time-honored “hello world” message to your iOS application. We'll assume your iOS application has subscribed to the interest "hello".

Let's start by creating a file called `publish-body.json` with the request body for the publish:

```bash
{publishBodyJsonFile}
```

Now, before you run the `curl` command, you need to get the instance id and its secret. You can get this information in the Pusher Dashboard "Keys" tab for your Beams instance. Now you can either export environment variables or replace the command with the appropriate keys.

```bash
{curlExample}
```

From this point onwards, you can just change the `publish-body.json` file and run the same `curl` command.

# Sending From The Server

{% snippets ['php', 'go', 'js', 'py', 'java', 'kotlin', 'rb'] %}

```php
{phpiOSExample}
```

```go
{goiOSExample}
```

```js
{
  nodeiOSExample;
}
```

```py
{pythoniOSExample}
```

```java
{javaiOSExample}
```

```kotlin
{kotliniOSExample}
```

```rb
{rubyiOSExample}
```

{% endsnippets %}

# Advanced Options

The publish method accepts an object which specifies the message to send. This object is the language's native representation of JSON. The previous example was a very simple one. There are many more advanced details you can specify. The full set of options for the APNs section of the publish call is described in Apple's <a external="" href="https://developer.apple.com/library/prerelease/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/PayloadKeyReference.html#//apple_ref/doc/uid/TP40008194-CH17-SW1"> Payload Key Reference </a> . For further examples, see Apple's <a external="" href="https://developer.apple.com/library/prerelease/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html#//apple_ref/doc/uid/TP40008194-CH10-SW1"> Creating the Remote Notification Payload </a> .

If you encounter error responses from the Beams service, you may wish to consult Apple's <a external="" href="https://developer.apple.com/library/content/technotes/tn2265/_index.html">push notification troubleshooting guide</a> .

# content-available

By default, Beams hard codes the value of `content-available` to `1` to enable delivery tracking. If you would like to customize this behaviour, please use the `disable_delivery_tracking` flag as described [here](/docs/beams/concepts/insights#content-available).

# Custom Data

Any custom data fields you wish to include in your push notification **must** be provided under a `data` key in the `apns` data structure. Any custom data fields specified outside of the `data` key won't be pushed to the device.
