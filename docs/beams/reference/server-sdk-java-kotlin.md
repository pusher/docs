---
title: Pusher Beams Docs | Java & Kotlin Server SDK
description: The Beams Java/Kotlin server SDK is available on Maven Central. Follow this guide to begin sending notifications from your Java or Kotlin app.
layout: beams.njk
eleventyNavigation:
  parent: Server sdks
  key: Server sdk java kotlin
  title: Java/Kotlin
  order: 5
---

# Java/Kotlin Server SDK

## Installation

The Beams Java/Kotlin server SDK is available on Maven Central.

```xml
<dependencies>
    <dependency>
      <groupId>com.pusher</groupId>
      <artifactId>push-notifications-server-java</artifactId>
      <version>1.1.1</version>
    </dependency>
</dependencies>
```

```groovy
dependencies {
  compile 'com.pusher:push-notifications-server-java:1.1.1'
}
```

You can download a version of the `.jar` directly from [Maven](http://repo1.maven.org/maven2/com/pusher/push-notifications-server-java/).

## Reference

### `Class: PushNotifications`

`PushNotifications(instanceId, secretKey)`

Construct a new Pusher Beams Client connected to your Beams instance.

#### Arguments

{% parameter 'instanceId', 'String', true %}

The unique identifier for your Push notifications instance. This can be found in the dashboard under "Credentials".

{% endparameter %}
{% parameter 'secretKey', 'String', true %}

The secret key your server will use to access your Beams instance. This can be found in the dashboard under "Credentials".

{% endparameter %}

#### Example

{% snippets ['java', 'kotlin'] %}

```java
String instanceId = "YOUR_INSTANCE_ID_HERE";
String secretKey = "YOUR_SECRET_KEY_HERE";

PushNotifications beamsClient = new PushNotifications(instanceId, secretKey);
```

```kotlin
val instanceId = "YOUR_INSTANCE_ID_HERE"
val secretKey = "YOUR_SECRET_KEY_HERE"

val beamsClient = PushNotifications(instanceId, secretKey)
```

{% endsnippets %}

### `.publishToInterests`

Sends broadcast notifications to groups of subscribed devices using [Device Interests](/docs/beams/concepts/device-interests)

#### Arguments

{% parameter 'interests', 'List&lt;String&gt;', true %}

List of interests to send the push notification to, ranging from 1 to 100 per publish request. See [Interests](/docs/beams/concepts/device-interests).

{% endparameter %}
{% parameter 'publishRequest', 'Map&lt;String, Map&gt;', true %}

Map containing the body of the push notification publish request. See [publish API reference](/docs/beams/reference/publish-api#request-body).

{% endparameter %}

#### Returns

String that contains `publishId`: See [publish API reference](/docs/beams/reference/publish-api#success-response-body)

#### Example

{% snippets ['java', 'kotlin'] %}

```java
List<String> interests = Arrays.asList("donuts", "pizza");

Map<String, Map> publishRequest = new HashMap();

Map<String, String> apsAlert = new HashMap();
apsAlert.put("title", "hello");
apsAlert.put("body", "Hello world");
Map<String, Map> alert = new HashMap();
alert.put("alert", apsAlert);
Map<String, Map> aps = new HashMap();
aps.put("aps", alert);
publishRequest.put("apns", aps);

Map<String, String> fcmNotification = new HashMap();
fcmNotification.put("title", "hello");
fcmNotification.put("body", "Hello world");
Map<String, Map> fcm = new HashMap();
fcm.put("notification", fcmNotification);
publishRequest.put("fcm", fcm);

Map<String, String> webNotification = new HashMap();
webNotification.put("title", "hello");
webNotification.put("body", "Hello world");
Map<String, Map> web = new HashMap();
web.put("notification", webNotification);
publishRequest.put("web", web);

beamsClient.publishToInterests(interests, publishRequest);
```

```kotlin
val interests = listOf("donuts", "pizza")
val publishRequest = hashMapOf(
  "apns" to hashMapOf("aps" to hashMapOf("alert" to hashMapOf("title" to "hello", "body" to "Hello world"))),
  "fcm" to hashMapOf("notification" to hashMapOf("title" to "hello", "body" to "Hello world")),
  "web" to hashMapOf("notification" to hashMapOf("title" to "hello", "body" to "Hello world"))
)

beamsClient.publishToInterests(interests, publishRequest)
```

{% endsnippets %}

### `.publishToUsers`

Securely send notifications to individual users of your application using [Authenticated Users](/docs/beams/concepts/authenticated-users)

#### Arguments

{% parameter 'userIds', 'List&lt;String&gt; Min length=1, Max length=1000', true %}

List of ids of users to send the push notification to, ranging from 1 to 1000 per publish request. See [Authenticated Users](/docs/beams/concepts/authenticated-users)

{% endparameter %}
{% parameter 'publishRequest', 'Map&lt;String, Map&gt;', true %}

Map containing the body of the push notification publish request. See [publish API reference](/docs/beams/reference/publish-api#request-body).

{% endparameter %}

#### Returns

String that contains `publishId`: See [publish API reference](/docs/beams/reference/publish-api#success-response-body)

#### Example

{% snippets ['java', 'kotlin'] %}

```java
List<String> users = Arrays.asList("user-001", "user-002");

Map<String, Map> publishRequest = new HashMap();

Map<String, String> apsAlert = new Hashmap();
apsAlert.put("title", "hello");
apsAlert.put("body", "Hello world");
Map<String, Map> alert = new HashMap();
alert.put("alert", apsAlert);
Map<String, Map> aps = new HashMap();
aps.put("aps", alert);
publishRequest.put("apns", aps);

Map<String, String> fcmNotification = new HashMap();
fcmNotification.put("title", "hello");
fcmNotification.put("body", "Hello world");
Map<String, Map> fcm = new HashMap();
fcm.put("notification", fcmNotification);
publishRequest.put("fcm", fcm);

Map<String, String> webNotification = new HashMap();
webNotification.put("title", "hello");
webNotification.put("body", "Hello world");
Map<String, Map> web = new HashMap();
web.put("notification", webNotification);
publishRequest.put("web", web);

beamsClient.publishToUsers(users, publishRequest);
```

```kotlin
val users = listOf("user-001", "user-002")
val publishRequest = hashMapOf(
  "apns" to hashMapOf("aps" to hashMapOf("alert" to "hashMapOf("title" to "hello", "body" to "Hello world"))),
  "fcm" to hashMapOf("notification" to hashMapOf("title" to "hello", "body" to "Hello world")),
  "web" to hashMapOf("notification" to hashMapOf("title" to "hello", "body" to "Hello world"))
)

beamsClient.publishToUsers(users, publishRequest)
```

{% endsnippets %}

### `.generateToken`

Generate a Beams auth token to allow a user to associate their device with their user id. The token is valid for 24 hours.

#### Arguments

{% parameter 'userID', 'String', true %}

Id of the user you would like to generate a Beams auth token for.

{% endparameter %}

#### Returns

{% parameter 'beamsToken', 'Map&lt;String, Any&gt;' %}

Beams Token for the given user

{% endparameter %}

#### Example

{% snippets ['java', 'kotlin'] %}

```java
String userId = "user-001";
Map<String, Object> token = beamsClient.generateToken(userId);
```

```kotlin
val userId = "user-001"
val token = beamsClient.generateToken(userId)
```

{% endsnippets %}
