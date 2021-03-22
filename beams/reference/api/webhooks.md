---
title: Webhooks - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Api
  key: Webhooks
  order: 5
---

# Webhook Reference

Webhooks will are sent as `POST` requests with a JSON body. The request body contains a generic wrapper around the following event-specific payloads:
{WEBHOOKS*DOCS_ENABLED && ( {/* Keep these event descriptions in sync with the ones in the webhooks concept page \_/}

# `v1.PublishToUsersAttempt`

Contains a summary of what happened during a publish to one or more [Authenticated Users](/docs/beams/concepts/authenticated-users).

## Payload Schema

 <Table> <thead> <tr> <th>Key Name</th> <th>Type</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td> `instance_id` </td> <td>string</td> <td> ID of the Pusher Beams instance that made this publish request. </td> </tr> <tr> <td> `publish_id` </td> <td>string</td> <td>Unique ID of the completed publish request.</td> </tr> <tr> <td> `users_delivered_to_gateway` </td> <td>{'Array<string>'}</td> <td> List of IDs of users who have had a notification accepted by the gateway for at least one of their devices. </td> </tr> <tr> <td> `users_no_devices` </td> <td>{'Array<string>'}</td> <td> List of IDs of users that do not have any devices registered with Pusher Beams. </td> </tr> <tr> <td> `users_gateway_failed` </td> <td>{'Array<string>'}</td> <td> List of IDs of users that could not be delivered to due to transient issues with the gateway. </td> </tr> </tbody> </Table> 
## Example
 
```json
{PublishToUsersAttemptExample}
```
 
#  `v1.UserNotificationAcknowledgement` 
 
Sent when a notification is reported as delivered by a user's device. This gives you insight into whether notifications are making it to the device from the platform gateway. For example, this will help you detect when notifications are dropped by the OS (as they are on certain flavors of Android). Some devices will receive the notification but not report back an acknowledgement because of internet connectivity issues or various operating system limitations. 
 
This webhook requires that the target device be running at least one of the following SDK versions:  *  iOS - `1.3.0`  *  Android - `1.4.0`   
 
## Payload Schema
 <Table> <thead> <tr> <th>Key Name</th> <th>Type</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td> `instance_id` </td> <td>string</td> <td> ID of the Pusher Beams instance that triggered this event. </td> </tr> <tr> <td> `publish_id` </td> <td>string</td> <td> Unique ID of the publish request that triggered this event. </td> </tr> <tr> <td> `user_id` </td> <td>string</td> <td>ID of the user that received this notification.</td> </tr> </tbody> </Table> 
## Example
 
```json
{userNotificationAcknowledgementExample}
```
 
#  `v1.UserNotificationOpen` 
 
Sent when a notification is opened by a user on one of their devices. 
 
This webhook requires that the target device be running at least one of the following SDK versions:  *  iOS - `1.3.0`  *  Android - `1.4.0`   
 
## Payload Schema
 <Table> <thead> <tr> <th>Key Name</th> <th>Type</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td> `instance_id` </td> <td>string</td> <td> ID of the Pusher Beams instance that triggered this event. </td> </tr> <tr> <td> `publish_id` </td> <td>string</td> <td> Unique ID of the publish request that triggered this event. </td> </tr> <tr> <td> `user_id` </td> <td>string</td> <td>ID of the user that opened this notification.</td> </tr> </tbody> </Table> 
## Example
 
```json
{userNotificationOpenExample}
```
  )} {WEBHOOKS_DOCS_ENABLED ? ( 
# Publish Webhooks (deprecated)
 ) : ( 
# Publish Webhooks
 )} <Alert warning> The publish webhook format is deprecated. In the future these webhooks will be sent using the format described above. </Alert> 
All webhooks are `POST` requests with JSON bodies sent to the `webhookUrl` specified when publishing. 
 
## Publish Started Hook
 
Indicates we have started publishing to the devices subscribed to the specified interests. 
 
#### Payload Schema
 <Table> <thead> <tr> <th>Key Name</th> <th>Type</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td> `publish_id` </td> <td>string</td> <td>Unique ID of the publish request that triggered this event.</td> </tr> <tr> <td> `status` </td> <td>string</td> <td> String constant which indicates the webhook type. Equal to `STARTED` </td> </tr> <tr> <td> `request_body` </td> <td>object</td> <td> The body of the request sent to the Publish API when publishing this notification </td> </tr> </tbody> </Table> 
#### Example
 
```js
{startedExample}
```
 
## Publish Finished Hook
 
Indicates we have finished publishing the push notification to devices subscribed to the specified interests.

#### Payload Schema

    <Table>
      <thead>
        <tr>
          <th>Key Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            `publish_id`
          </td>
          <td>string</td>
          <td>Unique ID of the publish request that triggered this event.</td>
        </tr>
        <tr>
          <td>
            `status`
          </td>
          <td>string</td>
          <td>
            String constant which indicates the webhook type. Equal to
            `FINISHED`
          </td>
        </tr>
        <tr>
          <td>
            `request_body`
          </td>
          <td>object</td>
          <td>
            The body of the request sent to the Publish API when publishing this
            notification
          </td>
        </tr>
        <tr>
          <td>
            `results`
          </td>
          <td>object</td>
          <td>
            The name of the platform (`apns`/
            `fcm`) to the `result`
            object for that platform
          </td>
        </tr>
      </tbody>
    </Table>

#### Result Object Schema

    <Table>
      <thead>
        <tr>
          <th>Key Name</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            `failed`
          </td>
          <td>boolean, default=false</td>
          <td>
            If this field is
            `true` this means that the publishing process
            for the specified platform has failed completely and no other
            statistics can be given.
          </td>
        </tr>
        <tr>
          <td>
            `numSuccessfulPublishes`
          </td>
          <td>number</td>
          <td>The number of devices successfully published to</td>
        </tr>
        <tr>
          <td>
            `numFailedPublishes`
          </td>
          <td>number</td>
          <td>The number of devices where publishing failed</td>
        </tr>
      </tbody>
    </Table>

#### Example

```js
{
  finishedExample;
}
```
