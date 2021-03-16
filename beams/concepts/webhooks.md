---
title: Webhooks - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation: 
  parent: Concepts
  key: Webhooks
  order: 5
---
# Webhooks
 
Pusher Beams can be configured to send webhooks to your server when important events occur within the system. These webhooks allow you to trigger different behaviors in your server depending on the status of the notifications you send. 
 {WEBHOOKS_DOCS_ENABLED && (  
# Webhook Event Types
 
Webhooks are sent as `POST` requests with a JSON body. The request body contains a generic wrapper around an event-specific payload: 
 {/* Keep these event descriptions in sync with the ones in the webhooks reference */} 
####  `v1.PublishToUsersAttempt` 
 
 Contains a summary of what happened during a publish to a collection of [ Authenticated Users ](/docs/beams/concepts/authenticated-users) . 
 
[ See schema reference ](/docs/beams/reference/webhooks#v1-publishtousersattempt) 
 
####  `v1.UserNotificationAcknowledgement` 
 
 Sent when a notification is acknowledged as delivered by an Authenticated User's device. 
 
[ See schema reference ](/docs/beams/reference/webhooks#v1-usernotificationacknowledgement) 
 
####  `v1.UserNotificationOpen` 
 
Sent when a notification is opened by an Authenticated User on one of their devices. 
 
[ See schema reference ](/docs/beams/reference/webhooks#v1-usernotificationopen) 
 
# Minimum Requirements
 
The `v1.UserNotificationAcknowledgement` and `v1.UserNotificationOpen` webhooks require that the target device be running at least one of the following SDK versions:  *  iOS - `1.3.0`  *  Android - `1.4.0`   
  )} {WEBHOOKS_DOCS_ENABLED && webhookOverviewCopy} {WEBHOOKS_DOCS_ENABLED && 
# Publish Webhooks (deprecated)
} 
If you specify a `webhookUrl` when publishing a notification we will send requests to that URL to keep you up to date on how your publish is doing (including any errors that may occur). 
 {WEBHOOKS_DOCS_ENABLED && ( <Alert warning> The publish webhook format is deprecated. In the future these webhooks will be sent using the format described above. </Alert> )} 
## Set up a webhook URL
 
The first step to using webhooks is to set up a URL route on a webserver capable of receiving `POST` requests and parsing JSON request bodies. 
 
## Securing Webhooks
 
When you receive an incoming webhook you may want to check that the incoming request actually came from Pusher. You can do this by adding secret basic auth credentials to your webhook URL: ` https://username:password@yourwebsite.com/webhook-path ` 
 
You can then check that incoming webhooks are really coming from Pusher by parsing your credentials out of the `Authorization` header of the incoming request. 
 
Basic Auth Authorization headers look something like this: <Code>Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```
 where the encoded part can be created by base64 encoding your secret username and password separated by a colon (in this example `username:password`) 
 
You can find more information on how to do this [here](https://tools.ietf.org/html/rfc7617#section-2). 
 <Alert danger> Make sure your webhook URL is using https. Otherwise you could be leaking sensitive data. </Alert> 
## Publish a push notification
 
Using one of our server SDKs (or raw HTTP) send a request to the publish API making sure to set the `webhookUrl` parameter to the URL you just created. 
 
```javascrpt
{publishBody}
```
 
## Parse the webhook body
 
Some post requests should now have been sent to your webhook URL. To find out what to expect in the request body take a look at the [ webhook reference documentation ](/docs/beams/reference/webhooks) . 

