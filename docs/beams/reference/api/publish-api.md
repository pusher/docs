---
title: Publish api - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Api
  key: Publish api
  title: Publish API
  order: 1
---

# Publish API

# Publishing a notification to interest(s)

```http
{interestsPublishDefinition}
```

## Request headers

The following headers are necessary:

- `Authorization`: with the value in the following format: `{'Bearer <YOUR_SECRET_KEY>'}`. \* `Content-Type`: with the value always set to `application/json`.

## Request body

A JSON object with the following keys:

- `interests` (Array&lt;string&gt;| _required_ ): Array of interests to send the push notification to, ranging from 1 to 100 per publish request. * `webhookUrl` (String| *optional* ): a URL to which we will send webhooks at key points throughout the publishing process. E.g when the publish finishes. * At least one of: _ `apns`: the payload to be sent to APNs. The full set of options for the APNs section of the <code className="highlighter-rouge">notify</code> call is described in Apple's [Payload Key Reference](https://developer.apple.com/library/prerelease/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/PayloadKeyReference.html#//apple_ref/doc/uid/TP40008194-CH17-SW1). For further examples, see Apple's [“Creating the Remote Notification Payload”](https://developer.apple.com/library/prerelease/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html#//apple_ref/doc/uid/TP40008194-CH10-SW1). _ `fcm`: the payload to be sent to FCM. The full set of options is described by Google in their documentation of [FCM downstream HTTP messages](https://firebase.google.com/docs/cloud-messaging/http-server-ref#downstream). \* `web`: the payload to be sent to the web push gateway. The Beams web push format reference can be found [here](/docs/beams/reference/publish-payloads#web-format). </Item> {interestNameValidationRules}

## Response Body

A JSON object with the following fields:

- `publishId` (string| _required_ ): Unique string used to identify this publish request.

## Error Responses

 <Table> <thead> <tr> <th>Title</th> <th>Status Code</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td>Invalid content type</td> <td>400</td> <td> Only `application/json` is supported. </td> </tr> <tr> <td>Incomplete Request</td> <td>400</td> <td> `instance-id` param is missing from path. </td> </tr> <tr> <td>Incomplete Request</td> <td>400</td> <td>Authorization header is missing.</td> </tr> <tr> <td>Bad request</td> <td>400</td> <td>Request body size is too large (max 10KiB).</td> </tr> <tr> <td>Bad request</td> <td>400</td> <td>Failed to read body as a JSON object.</td> </tr> <tr> <td>Unauthorized</td> <td>401</td> <td>Incorrect API Key.</td> </tr> <tr> <td>Instance not found</td> <td>404</td> <td>Could not find the instance.</td> </tr> <tr> <td>Unprocessable Entity</td> <td>422</td> <td>JSON does not our match schema.</td> </tr> <tr> <td>Rate Limited</td> <td>429</td> <td> Too many requests being made in quick succession (max 100 RPS). </td> </tr> <tr> <td>Something went wrong</td> <td>500</td> <td>Internal server error.</td> </tr> </tbody> </Table> 
# Publishing a notification to user(s)
 
```http
{usersPublishDefinition}
```
 
## Request headers
 
The following headers are necessary:
  *  `Authorization`: with the value in the following format: `{'Bearer <YOUR_SECRET_KEY>'}`.  *  `Content-Type`: with the value always set to `application/json`.   
## Request body
 
A JSON object with the following keys:
  *  `users` (Array&lt;string&gt;| *required* ): Array of user IDs to send the push notification to, ranging from 1 to 1000 per publish request. User IDs are UTF-8 encoded strings of no more than 164 bytes.  *  At least one of:  *  `apns`: the payload to be sent to APNs. The full set of options for the APNs section of the <code className="highlighter-rouge">notify</code> call is described in Apple's [Payload Key Reference](https://developer.apple.com/library/prerelease/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/PayloadKeyReference.html#//apple_ref/doc/uid/TP40008194-CH17-SW1). For further examples, see Apple's [“Creating the Remote Notification Payload”](https://developer.apple.com/library/prerelease/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/CreatingtheNotificationPayload.html#//apple_ref/doc/uid/TP40008194-CH10-SW1).  *  `fcm`: the payload to be sent to FCM. The full set of options is described by Google in their documentation of [FCM downstream HTTP messages](https://firebase.google.com/docs/cloud-messaging/http-server-ref#downstream).  *  `web`: the payload to be sent to the web push gateway. The Beams web push format reference can be found [here](/docs/beams/reference/publish-payloads#web-format).   </Item>  
## Response Body
 
A JSON object with the following fields:

      *  `publishId` (string| *required* ): Unique string used to identify this publish request.

## Error Responses

    <Table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Status Code</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Invalid content type</td>
          <td>400</td>
          <td>
            Only `application/json` is supported.
          </td>
        </tr>
        <tr>
          <td>Incomplete Request</td>
          <td>400</td>
          <td>
            `instance-id` param is missing from path.
          </td>
        </tr>
        <tr>
          <td>Incomplete Request</td>
          <td>400</td>
          <td>Authorization header is missing.</td>
        </tr>
        <tr>
          <td>Bad request</td>
          <td>400</td>
          <td>Request body size is too large (max 200KiB).</td>
        </tr>
        <tr>
          <td>Bad request</td>
          <td>400</td>
          <td>Failed to read body as a JSON object.</td>
        </tr>
        <tr>
          <td>Unauthorized</td>
          <td>401</td>
          <td>Incorrect API Key.</td>
        </tr>
        <tr>
          <td>Instance not found</td>
          <td>404</td>
          <td>Could not find the instance.</td>
        </tr>
        <tr>
          <td>Unprocessable Entity</td>
          <td>422</td>
          <td>JSON does not our match schema.</td>
        </tr>
        <tr>
          <td>Rate Limited</td>
          <td>429</td>
          <td>
            Too many requests being made in quick succession (max 100 RPS).
          </td>
        </tr>
        <tr>
          <td>Something went wrong</td>
          <td>500</td>
          <td>Internal server error.</td>
        </tr>
      </tbody>
    </Table>
