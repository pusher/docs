---
title: Server sdk java kotlin - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Server sdks
  key: Server sdk java kotlin
  title: Java/Kotlin
  order: 5
---

# Java/Kotlin Server SDK

# Installation

The Beams Java/Kotlin server SDK is available on Maven Central.

```xml
{installMaven}
```

```groovy
{addGradle}
```

You can download a version of the `.jar` directly from [Maven](http://repo1.maven.org/maven2/com/pusher/push-notifications-server-java/) .

# Reference

## `Class: PushNotifications`

**PushNotifications(instanceId, secretKey)**
Construct a new Pusher Beams Client connected to your Beams instance.

_Arguments_ <br /> _ `instanceId` (string): The unique identifier for your Push notifications instance. This can be found in the dashboard under "Credentials". _ `secretKey` (string): The secret key your server will use to access your Beams instance. This can be found in the dashboard under "Credentials".

_Example_
{% snippets ['java', 'kotlin'] %}

```java
{instanceExampleJava}
```

```kotlin
{instanceExampleKotlin}
```

{% endsnippets %}

## `.publishToInterests`

Sends broadcast notifications to groups of subscribed devices using [Device Interests](/docs/beams/concepts/device-interests)

_Arguments_ <br /> _ `interests`({'List<String>'} ): List of interests to send the push notification to, ranging from 1 to 100 per publish request. See [Interests](/docs/beams/concepts/interests). _ `publishRequest`({'Map<String, Map>'} ): Map containing the body of the push notification publish request. See [publish API reference](/docs/beams/reference/publish-api#request-body) .

_Returns_ <br /> String that contains `publishId`: See [publish API reference](/docs/beams/reference/publish-api#success-response-body)

_Example_ <br />
{% snippets ['java', 'kotlin'] %}

```java
{javaPublishToInterests}
```

```kotlin
{kotlinPublishToInterests}
```

{% endsnippets %}

## `.publishToUsers`

Securely send notifications to individual users of your application using [Authenticated Users](/docs/beams/concepts/authenticated-users)

_Arguments_ <br /> * `userIds`({'List<String>'} | *Min length=1, Max length=1000* ): List of ids of users to send the push notification to, ranging from 1 to 1000 per publish request. See [Authenticated Users](/docs/beams/concepts/authenticated-users) * `publishRequest`({'Map<String, Map>'} ): Map containing the body of the push notification publish request. See [publish API reference](/docs/beams/reference/publish-api#request-body) .

_Returns_ <br /> String that contains `publishId`: See [publish API reference](/docs/beams/reference/publish-api#success-response-body)

_Example_
{% snippets ['java', 'kotlin'] %}

```java
{javaPublishToUsers}
```

```kotlin
{kotlinPublishToUsers}
```

{% endsnippets %}

## `.generateToken`

Generate a Beams auth token to allow a user to associate their device with their user id. The token is valid for 24 hours.

_Arguments_ <br /> \* `userID` (String): Id of the user you would like to generate a Beams auth token for.

_Returns_ <br /> \* `beamsToken`({'Map<String, Any>'} ): Beams Token for the given user

_Example_ <br />
{% snippets ['java', 'kotlin'] %}

```java
{generateTokenJava}
```

```kotlin
{generateTokenKotlin}
```

{% endsnippets %}
