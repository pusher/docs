---
title: Pusher Beams Docs | Webhooks
description: Configure Beams to send webhooks to your server when important events occur, and trigger different behaviours depending on the status of your notifications.
layout: beams.njk
eleventyNavigation:
  parent: Concepts
  key: Webhooks
  order: 5
---

# Webhooks

Pusher Beams can be configured to send webhooks to your server when important events occur within the system. These webhooks allow you to trigger different behaviors in your server depending on the status of the notifications you send.

## Webhook Event Types

Webhooks are sent as `POST` requests with a JSON body. The request body contains a generic wrapper around an event-specific payload:

{% parameter 'v1.PublishToUsersAttempt' %}

Contains a summary of what happened during a publish to a collection of [Authenticated Users](/docs/beams/concepts/authenticated-users).

[See schema reference](/docs/beams/reference/webhooks#v1-publishtousersattempt)

{% endparameter %}
{% parameter 'v1.UserNotificationAcknowledgement' %}

Sent when a notification is acknowledged as delivered by an Authenticated User's device.

[See schema reference](/docs/beams/reference/webhooks#v1-usernotificationacknowledgement)

{% endparameter %}
{% parameter 'v1.UserNotificationOpen' %}

Sent when a notification is opened by an Authenticated User on one of their devices.

[See schema reference](/docs/beams/reference/webhooks#v1-usernotificationopen)

{% endparameter %}

## Minimum Requirements

The `v1.UserNotificationAcknowledgement` and `v1.UserNotificationOpen` webhooks require that the target device be running at least one of the following SDK versions:

- iOS - `1.3.0`
- Android - `1.4.0`

## Configuration

To configure a webhook for your instance:

- Navigate to the Settings tab on the dashboard and click the _Add a webhook_ button.
- Select the events on which you would like to trigger a request, and point the _target URL_ to somewhere you control.
- Set your server up to receive POST requests on your target URL.

You can configure as many webhooks as you want. Each optionally targetting different endpoints.

### Configuration options

- _Secret_ – Used to compute the request signature which we attach to every request we send. You should use this to verify the integrity and authenticity of the request. See [Verification](#verification).
- _Custom data_ – Any custom data you provide will be included in the body of every webhook request under the key `custom_data`.

## Request format

#### Headers

| Key                     | Value                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------- |
| User-Agent              | always `pusher-webhooks`                                                                    |
| Content-Type            | always `application/json`                                                                   |
| Webhook-Event-Type      | the type of event that triggered the webhook.                                               |
| Webhook-ID-UUID         | the ID of the configured webhook that led to this request                                   |
| Webhook-Request-ID-UUID | a UUID representing the specific request, this will stay the same if the webhook is retried |
| Webhook-Signature       | a hex encoded HMAC of the request body computed with the webhook secret as the key          |

#### Body

The request body will always take the following form:

```js
{
  payload: object,      // the event specific payload
  metadata: {
    created_at: string, // request creation time
    event_type: string, // the event which the request describes
    event_id:   string, // an ID unique to this request (to detect retries)
    product:    string  // the Pusher product the event relates to
  },
  custom_data: object   // the custom data configured in your dashboard
}
```

## Expected response

We expect your server to respond to webhook requests with a 2XX status code within three seconds. Non-2XX responses, or responses that take more than three seconds, will be considered failures.

## Retry strategy

If your server fails to reply with the [expected response](#expected-response), we will retry the webhook request up to four times – first after 10 seconds, then a further 30 seconds, a further 120 seconds, and finally a further 300 seconds.

## Verification

When you register a new webhook you provide a secret. Each time we send a webhook request to your server, we compute an HMAC (SHA-1) derived from the message body of the webhook request and the webhook’s secret. A hex digest is included as a [header](#headers) with the webhook request. To verify the integrity and authenticity of the webhook request, compute the same HMAC based on your secret and compare it to the one received in the request header.

For example, if your server is written in node and express, you would do something like the following to verify requests before processing them.

```js
const app = require("express")();
const bodyParser = require("body-parser");
const crypto = require("crypto");

const secret = process.env.PUSHER_WEBHOOK_SECRET;

const verifyPusherWebhook = bodyParser.json({
  verify: (req, _, buf) => {
    const signature = crypto
      .createHmac("sha1", secret)
      .update(buf)
      .digest("hex");

    req.webhookSignatureValid = signature === req.get("webhook-signature");
  },
});

// NOTE: Any other body-parser middleware must come AFTER the webhook endpoint
// so as to not interfere with the verifyPusherWebhook check
app.post("/pusher-webhooks", verifyPusherWebhook, (req, res) => {
  if (!req.webhookSignatureValid) {
    console.log("Webhook has invalid signature, rejecting.");
    res.sendStatus(401);
    return;
  }

  console.log("Got a webhook with payload", req.body);
  res.sendStatus(200);
});

// body-parser middleware for the rest of the application
app.use(bodyParser.json());

// Other REST endpoints here

app.listen(5000, () => console.log("listening on :5000"));
```

# Publish Webhooks (deprecated)

If you specify a `webhookUrl` when publishing a notification we will send requests to that URL to keep you up to date on how your publish is doing (including any errors that may occur).

> The publish webhook format is deprecated. In the future these webhooks will be sent using the format described above.

### Set up a webhook URL

The first step to using webhooks is to set up a URL route on a webserver capable of receiving `POST` requests and parsing JSON request bodies.

### Securing Webhooks

When you receive an incoming webhook you may want to check that the incoming request actually came from Pusher. You can do this by adding secret basic auth credentials to your webhook URL: `https://username:password@yourwebsite.com/webhook-path`

You can then check that incoming webhooks are really coming from Pusher by parsing your credentials out of the `Authorization`header of the incoming request.

Basic Auth Authorization headers look something like this:

```
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

where the encoded part can be created by base64 encoding your secret username and password separated by a colon (in this example `username:password`)

You can find more information on how to do this [here](https://tools.ietf.org/html/rfc7617#section-2).

> Make sure your webhook URL is using https. Otherwise you could be leaking sensitive data.

### Publish a push notification

Using one of our server SDKs (or raw HTTP) send a request to the publish API making sure to set the `webhookUrl` parameter to the URL you just created.

#### Example Publish Body

```json
{
  "interests": ["my_interest"],
  "webhookUrl": "http://mysite.com/push-webhook",
  "apns": {
    "aps": {
      "alert": {
        "title": "New Message",
        "body": "Alex Smith just sent you a new message"
      }
    }
  }
}
```

### Parse the webhook body

Some post requests should now have been sent to your webhook URL. To find out what to expect in the request body take a look at the [webhook reference documentation](/docs/beams/reference/webhooks).
