---
title: Web - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Publish to specific user
  key: Web
---

---

title: iOS - Beams - Pusher Docs
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

Once you have created a Beams auth endpoint you need to setup the Beams client SDK so that it can request a Beams Token from that endpoint. You can do this by creating a `TokenProvider` instance.

##### What is a `TokenProvider`?

When the Beams SDK tries to authenticate a device it will verify the user's identity by requesting a Beams Token from your application backend. The SDK will do this using the `TokenProvider` that you pass to `setUserId`. You can authenticate the request using cookies sent by the browser, or if necessary, you can manually set query parameters and headers to be sent with the request.

```js
const tokenProvider = new PusherPushNotifications.TokenProvider({
  url: "YOUR_BEAMS_AUTH_URL_HERE",
  queryParams: { someQueryParam: "parameter-content" }, // URL query params your auth endpoint needs
  headers: { someHeader: "header-content" }, // Headers your auth endpoint needs
});
```

## Integrating Beams into your auth process

Now that you have everything set up, you can integrate Beams into the auth process of your app. This means:

- Associating the device with the user when they log in and enable notifications
- Disassociating the device from the user when they log out
- Checking the browser is associated with the correct user

### Associating the device with the user when they log in and enable notifications

You first need to call `start`. If the user has not yet given permission then this will display the dialog requesting permission to send notifications. Once the user has allowed notifications, you should call `setUserId` to associate the browser with the logged in user. This means notifications intended for that user will be sent to the browser.

```js
const beamsTokenProvider = new PusherPushNotifications.TokenProvider({
  url: "YOUR_BEAMS_AUTH_URL_HERE",
});

beamsClient
  .start()
  .then(() => beamsClient.setUserId("USER_ID_HERE", beamsTokenProvider))
  .catch(console.error);
```

> You can only have up to 100 devices associated with a given user.

### Disassociating the device from the user when they log out

When a user logs out of your application, you will want to ensure that notifications are no longer sent to the browser. You can do this by calling the `stop` method, which will disassociate the browser from that user.

```js
beamsClient.stop().catch(console.error);
```

### Checking the browser is associated with the correct user

In a web app, it is sometimes possible for a user to become logged out without explicitly logging out (for example, if their session expires). Therefore, you should check that the user currently registered with Beams matches the user that is logged into your application. If the two don't match then you should call `stop`. That will disassociate the currently associated user from the browser.

You should do this is when you initialize the Beams SDK when your web app loads:

```js
const currentUserId = "alice"; // Get this from your auth system
const beamsClient = new PusherPushNotifications.Client({
  instanceId: "YOUR_INSTANCE_ID",
});

beamsClient
  .getUserId()
  .then((userId) => {
    // Check if the Beams user matches the user that is currently logged in
    if (userId !== currentUserId) {
      // Unregister for notifications
      return beamsClient.stop();
    }
  })
  .catch(console.error);
```

## Publishing to users from your server

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
