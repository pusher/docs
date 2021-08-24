---
date: 2021-08-01
title: Pusher Beams Docs | Go Server SDK
description: Install the Go Server SDK and start sending notifications to your Go app users. Learn how to install the SDK and publish notifications to groups or individuals.
layout: beams.njk
eleventyNavigation:
  parent: Server sdks
  key: Server sdk go
  title: Go
  order: 1
---

# Go Server SDK

## Installation

You can install this SDK by doing:

```bash
go get github.com/pusher/push-notifications-go
```

## Reference

### `.New`

Constructs a new Beams client instance using your instance id and secret key (you can get these from the dashboard)

#### Arguments

{% parameter 'instanceId', 'String', true %}

The unique identifier for your Push notifications instance. This can be found in the dashboard under "Credentials".

{% endparameter %}
{% parameter 'secretKey', 'String', true %}

The secret key your server will use to access your Beams instance. This can be found in the dashboard under "Credentials".

{% endparameter %}
{% parameter 'options', 'Option | vararg', false %}

Variadic list of options for configuring the SDK

{% endparameter %}

#### Returns

{% parameter 'client', 'PushNotifications' %}

Beams API client implementing the `PushNotifications` interface.

{% endparameter %}
{% parameter 'err', 'Error' %}

Error value if something went wrong, `nil` otherwise.

{% endparameter %}

#### Example

```go
const (
  instanceId = "YOUR_INSTANCE_ID_HERE"
  secretKey  = "YOUR_SECRET_KEY_HERE"
)

beamsClient, err := pushnotifications.New(instanceId, secretKey)
if err != nil {
  fmt.Println("Could not create Beams Client:", err.Error())
}
```

### `.PublishToInterests`

Sends broadcast notifications to groups of subscribed devices using [Device Interests](/docs/beams/concepts/device-interests)

#### Arguments

{% parameter 'interests', '[]string | Min length=1, Max length=100', true %}

List of interests to send the push notification to, ranging from 1 to 100 per publish request. See [Device Interests](/docs/beams/concepts/device-interests)

{% endparameter %}
{% parameter 'publishBody', 'map[string]interface{}' %}

A map containing the publish request body. See [publish API reference](/docs/beams/reference/publish-api#request-body)

{% endparameter %}

#### Returns

{% parameter 'publishID', 'string' %}

Unique identifier for the publish request.

{% endparameter %}
{% parameter 'err', 'error' %}

Error value if something went wrong, `nil` otherwise.

{% endparameter %}

#### Example

```go
publishRequest := map[string]interface{}{
  "apns": map[string]interface{}{
    "aps": map[string]interface{}{
      "alert": map[string]interface{}{
        "title": "Hello",
        "body":  "Hello, world",
      },
    },
  },
  "fcm": map[string]interface{}{
    "notification": map[string]interface{}{
      "title": "Hello",
      "body":  "Hello, world",
    },
  },
  "web": map[string]interface{}{
    "notification": map[string]interface{}{
      "title": "Hello",
      "body":  "Hello, world",
    },
  },
}

pubId, err := beamsClient.PublishToInterests([]string{"hello"}, publishRequest)
if err != nil {
  fmt.Println(err)
} else {
  fmt.Println("Publish Id:", pubId)
}
```

### `.PublishToUsers`

Securely send notifications to individual users of your application using [Authenticated Users](/docs/beams/concepts/authenticated-users)

#### Arguments

{% parameter 'userIds', '[]string | Min length=1, Max length=100', true %}

List of ids of users to send the push notification to, ranging from 1 to 1000 per publish request. See [Authenticated Users](/docs/beams/concepts/authenticated-users)

{% endparameter %}
{% parameter 'publishBody', 'map[string]interface{}' %}

A map containing the publish request body. See [publish API reference](/docs/beams/reference/publish-api#request-body)

{% endparameter %}

#### Returns

{% parameter 'publishID', 'string' %}

Unique identifier for the publish request.

{% endparameter %}
{% parameter 'err', 'error' %}

Error value if something went wrong, `nil` otherwise.

{% endparameter %}

#### Example

```go
publishRequest := map[string]interface{}{
  "apns": map[string]interface{}{
    "aps": map[string]interface{}{
      "alert": map[string]interface{}{
        "title": "Hello",
        "body":  "Hello, world",
      },
    },
  },
  "fcm": map[string]interface{}{
    "notification": map[string]interface{}{
      "title": "Hello",
      "body":  "Hello, world",
    },
  },
  "web": map[string]interface{}{
    "notification": map[string]interface{}{
      "title": "Hello",
      "body":  "Hello, world",
    },
  },
}

pubId, err := beamsClient.PublishToUsers([]string{"user-001", "user-002"}, publishRequest)
if err != nil {
  fmt.Println(err)
} else {
  fmt.Println("Publish Id:", pubId)
}
```

### `.GenerateToken`

Generate a Beams auth token to allow a user to associate their device with their user id. The token is valid for 24 hours.

#### Arguments

{% parameter 'userID', 'string', true %}

ID of the user you would like to generate a Beams auth token for

{% endparameter %}

#### Returns

{% parameter 'beamsToken', 'string' %}

Beams Token for the given user

{% endparameter %}
{% parameter 'err', 'error' %}

Error value if something went wrong, `nil` otherwise.

{% endparameter %}

#### Example

```go
userID := "user-001"
beamsToken, err := beamsClient.GenerateToken(userID)
if err != nil {
  fmt.Println("Could not generate Beams token:", err.Error())
}
```

### `.DeleteUser`

Remove the given user (and all of their devices) from Beams. This user will no longer receive any notifications and all state stored about their devices will be deleted.

#### Arguments

{% parameter 'userID', 'string', true %}

ID of the user you would like to delete from Beams.

{% endparameter %}

#### Returns

{% parameter 'err', 'error' %}

Error value if something went wrong, `nil` otherwise.

{% endparameter %}

#### Example

```go
userID := "user-001"
err := beamsClient.DeleteUser(userID)
if err != nil {
  fmt.Println("Could not delete user:", err.Error())
}
```
