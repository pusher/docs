---
title: iOS
layout: beams.njk
eleventyNavigation:
  parent: Publish to specific user
  key: iOS
---

# Publish to a specific User: iOS

Beams allows you to send notifications to individual users of your application via their user ID (whatever ID you use in your system). You can do this by associating users with their devices using the [Authenticated Users](/docs/beams/concepts/authenticated-users) feature.

## Overview

Incorporating Authenticated Users into your application is a four step process:

1. Create an endpoint in your server that returns Beams Tokens to your users
2. Set up a `TokenProvider` that the Beams SDK can use to request the token from your server
3. Call the `setUserId` method after the user logs in and `clearAllState`when they log out
4. Use one of the Beams server SDKs to send notifications to your users

## Creating a Beams auth endpoint

Before we allow devices to get access to notifications sent to a particular user, we require that they send us a Beams Token. To facilitate this you will need to set up an endpoint on your server that can verify that the device belongs to the requested user and return a Beams Token generated using one of the [Beams server SDKs](/docs/beams/reference/all-libraries#server-sdks).

##### How do I get the user ID?

You should determine the ID of the user being authenticated by using your existing authorization system. By default, the SDK will include the user ID as a query parameter (`user_id`) — you can use this to validate that the session is associated with the correct user. However, you shouldn't solely rely on this parameter for production use.

> The `TokenProvider` will perform a **GET** request and expects the response to be JSON.

{% snippets ['laravel', 'go', 'node', 'py', 'java'] %}

```php
Route::middleware('auth:api')->get('/pusher/beams-auth', function (Request $request) {
    $userID = $request->user()->id; // If you use a different auth system, do your checks here
    $userIDInQueryParam = Input::get('user_id');

    if ($userID != $userIDInQueryParam) {
        return response('Inconsistent request', 401);
    } else {
        $beamsToken = $beamsClient->generateToken($userID);
        return response()->json($beamsToken);
    }
});
```

```go
package main

import (
  "net/http"

  "github.com/pusher/push-notifications-go"
)

const (
  instanceId = "YOUR_INSTANCE_ID_HERE"
  secretKey  = "YOUR_SECRET_KEY_HERE"
)

func main() {
  beamsClient, _ := pushnotifications.New(instanceId, secretKey)

  http.HandleFunc("/pusher/beams-auth", func (w http.ResponseWriter, r *http.Request) {
    // Do your normal auth checks here 🔒
    userID := "" // get it from your auth system
    userIDInQueryParam := r.URL.Query().Get("user_id")
    if userID != userIDInQueryParam {
      w.WriteHeader(http.StatusUnauthorized)
      return
    }

    beamsToken, err := beamsClient.GenerateToken(userID)
    if err != nil {
      w.WriteHeader(http.StatusInternalServerError)
      return
    }

    beamsTokenJson, err := json.Marshal(beamsToken)
    if err != nil {
      w.WriteHeader(http.StatusInternalServerError)
      return
    }

    w.WriteHeader(http.StatusOK)
    w.Write(beamsTokenJson)
  })

  http.ListenAndServe(":8080", nil)
}
```

```js
const express = require("express");
const PushNotifications = require("@pusher/push-notifications-server");

const port = 8080;
const app = express();
const beamsClient = new PushNotifications({
  instanceId: "YOUR_INSTANCE_ID_HERE",
  secretKey: "YOUR_SECRET_KEY_HERE",
});

app.get("/pusher/beams-auth", function (req, res) {
  // Do your normal auth checks here 🔒
  const userId = ""; // get it from your auth system
  const userIDInQueryParam = req.query["user_id"];
  if (userId != userIDInQueryParam) {
    res.send(401, "Inconsistent request");
  } else {
    const beamsToken = beamsClient.generateToken(userId);
    res.send(JSON.stringify(beamsToken));
  }
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
```

```py
from flask import Flask, jsonify, request
from pusher_push_notifications import PushNotifications

beams_client = PushNotifications(
    instance_id='YOUR_INSTANCE_ID_HERE',
    secret_key='YOUR_SECRET_KEY_HERE',
)

app = Flask(__name__)

@app.route('/pusher/beams-auth', methods=['GET'])
def beams_auth():
  # Do your normal auth checks here 🔒
  user_id = '' # get it from your auth system
  user_id_in_query_param = request.args.get('user_id')
  if user_id != user_id_in_query_param:
    return 'Inconsistent request', 401

  beams_token = beams_client.generate_token(user_id)
  return jsonify(beams_token)
```

```java
@RequestMapping(value="/pusher/beams-auth", method=RequestMethod.GET)
@ResponseBody
public Map<String, Object> beamsAuth(@RequestParam(value="user_id") String userId) {
  // Do your normal auth checks here 🔒
  return beamsClient.generateToken(userId);
}
```

{% endsnippets %}

## Setting up a TokenProvider

Once you have created a Beams auth endpoint you need to setup the Beams client SDK so that it can request a Beams Token from that endpoint. You can do this by creating a `BeamsTokenProvider` instance.

##### What is a `BeamsTokenProvider`?

When the Beams SDK tries to authenticate a device it will verify the user's identity by requesting a Beams Token from your application backend. The SDK will do this using the `BeamsTokenProvider` that you pass to `setUserId`. The `BeamsTokenProvider` must have access to the data needed to authenticate with your application backend. It gets this data using an `AuthData` callback.

##### What is an `AuthData` callback?

Your application backend will need certain values from the client to authenticate requests in the Beams auth endpoint created above. Your `AuthData` callback is responsible for retrieving these values and putting them in the headers/query parameters required by your application backend. For example, you may want to put your application session token into an auth header.

{% snippets ['swift', 'objc'] %}

```swift
let tokenProvider = BeamsTokenProvider(authURL: "<YOUR_BEAMS_AUTH_URL_HERE>") { () -> AuthData in
  let sessionToken = "SESSION-TOKEN"
  let headers = ["Authorization": "Bearer \(sessionToken)"] // Headers your auth endpoint needs
  let queryParams: [String: String] = [:] // URL query params your auth endpoint needs
  return AuthData(headers: headers, queryParams: queryParams)
}
```

```objc
BeamsTokenProvider *beamsTokenProvider = [[BeamsTokenProvider alloc] initWithAuthURL:@"<YOUR_BEAMS_AUTH_URL_HERE>" getAuthData:^AuthData * _Nonnull{
  NSString *sessionToken = @"SESSION-TOKEN";
  NSDictionary *headers = @{@"Authorization": [NSString stringWithFormat:@"Bearer %@", sessionToken]}; // Headers your auth endpoint needs
  NSDictionary *queryParams = @{}; // URL query params your auth endpoint needs

  return [[AuthData alloc] initWithHeaders:headers queryParams:queryParams];
}];
```

{% endsnippets %}

## Integrating Beams into your auth process

Now that you have everything set up, you can integrate Beams into the auth process of your app. This means:

- Associating the device with the user when they log in
- Disassociating the device from the user when they log out

### Associating the device with the user when they log in

After a user logs into your application, you should call the `setUserId` method in the SDK.

> You must call `setUserId` both when the user logs in **and** every time your app launches whilst the user is still authenticated.

{% snippets ['swift', 'objc'] %}

```swift
let tokenProvider = BeamsTokenProvider(authURL: "<YOUR_BEAMS_AUTH_URL_HERE>") { () -> AuthData in
  let sessionToken = "SESSION-TOKEN"
  let headers = ["Authorization": "Bearer \(sessionToken)"] // Headers your auth endpoint needs
  let queryParams: [String: String] = [:] // URL query params your auth endpoint needs
  return AuthData(headers: headers, queryParams: queryParams)
}

self.beamsClient.setUserId("<USER_ID_GOES_HERE>", tokenProvider: tokenProvider, completion: { error in
  guard error == nil else {
      print(error.debugDescription)
      return
  }

  print("Successfully authenticated with Pusher Beams")
})
```

```objc
BeamsTokenProvider *beamsTokenProvider = [[BeamsTokenProvider alloc] initWithAuthURL:@"<YOUR_BEAMS_AUTH_URL_HERE>" getAuthData:^AuthData * _Nonnull{
  NSString *sessionToken = @"SESSION-TOKEN";
  NSDictionary *headers = @{@"Authorization": [NSString stringWithFormat:@"Bearer %@", sessionToken]}; // Headers your auth endpoint needs
  NSDictionary *queryParams = @{}; // URL query params your auth endpoint needs

  return [[AuthData alloc] initWithHeaders:headers queryParams:queryParams];
}];

[[PushNotifications shared] setUserId:@"<USER_ID_GOES_HERE>" tokenProvider:beamsTokenProvider completion:^(NSError * _Nullable anyError) {
  if (anyError) {
      NSLog(@"Error: %@", anyError);
  }
  else {
      NSLog(@"Successfully authenticated with Pusher Beams");
  }
}];
```

{% endsnippets %}

> You can only have up to 100 devices associated with a given user.

### Deauthenticating when a user logs out

When a user logs of your application, you will want to ensure that notifications are no longer sent to that users' device. You can do this by calling the `clearAllState` method in the SDK. This will disassociate the device from that user and put the SDK into a clean state.

> Calling `clearAllState` will also clear any [Device Interests](docs/beams/concepts/device-interests) present on the device. If you would like to retain any Device Interests after logging out, you should re-subscribe to them.

{% snippets ['swift', 'objc'] %}

```swift
self.beamsClient.clearAllState {
  print("Successfully cleared all state")
}
```

```objc
[[PushNotifications shared] clearAllStateWithCompletion:^{
  NSLog(@"Successfully cleared all state");
}];
```

{% endsnippets %}

### Publishing to users from your server

You should now be able to associate devices with users in your application. This will allow you to send notifications to all devices belonging to a particular user by publishing to their user ID. Use one of the [Beams server SDKs](/docs/beams/reference/all-libraries#server-sdks) to publish to your users:

{% snippets ['php', 'node', 'py', 'java', 'kotlin', 'go', 'swift', 'rb'] %}

```php
<?php
include 'src/PushNotifications.php';
$publishResponse = $beamsClient->publishToUsers(
  array("user-001", "user-002"),
  array(
    "fcm" => array(
      "notification" => array(
        "title" => "Hi!",
        "body" => "This is my first Push Notification!"
      )
    ),
    "apns" => array("aps" => array(
      "alert" => array(
        "title" => "Hi!",
        "body" => "This is my first Push Notification!"
      )
    )),
    "web" => array(
      "notification" => array(
        "title" => "Hi!",
        "body" => "This is my first Push Notification!"
      )
    )
));
```

```js
beamsClient
  .publishToUsers(["user-001", "user-002"], {
    apns: {
      aps: {
        alert: {
          title: "Hello",
          body: "Hello, world!",
        },
      },
    },
    fcm: {
      notification: {
        title: "Hello",
        body: "Hello, world!",
      },
    },
    web: {
      notification: {
        title: "Hello",
        body: "Hello, world!",
      },
    },
  })
  .then((publishResponse) => {
    console.log("Just published:", publishResponse.publishId);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

```py
response = beams_client.publish_to_users(
  user_ids=['user-001', 'user-002'],
  publish_body={
    'apns': {
      'aps': {
        'alert': {
          'title': 'Hello',
          'body': 'Hello, world!',
        },
      },
    },
    'fcm': {
      'notification': {
        'title': 'Hello',
        'body': 'Hello, world!',
      },
    },
    'web': {
      'notification': {
        'title': 'Hello',
        'body': 'Hello, world!',
      },
    },
  },
)

print(response['publishId'])
```

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

```swift
let publishRequest = [
  "apns": [
    "aps": [
      "alert": [
        "title": "Hello",
        "body":  "Hello, world",
      ]
    ]
  ],
  "fcm": [
    "notification": [
      "title": "Hello",
      "body":  "Hello, world",
    ]
  ],
  "web": [
    "notification": [
      "title": "Hello",
      "body":  "Hello, world",
    ]
  ]
]
pushNotifications.publishToUsers(["user-001", "user-002"], publishRequest, completion: { result in
  switch result {
  case .value(let publishId):
      print("\(publishId)")
  case .error(let error):
      print("\(error)")
  }
})
```

```rb
data = {
  apns: {
    aps: {
      alert: {
        title: 'Hello',
        body: 'Hello, world!'
      }
    }
  },
  fcm: {
    notification: {
      title: 'Hello',
      body: 'Hello, world!'
    }
  },
  web: {
    notification: {
      title: 'Hello',
      body: 'Hello, world!'
    }
  }
}

Pusher::PushNotifications.publish_to_users(users: ['user-001', 'user-002'], payload: data)
```

{% endsnippets %}
