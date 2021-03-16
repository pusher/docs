---
title: Reporting api - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation: 
  parent: Api
  key: Reporting api
  title:  Reporting API
  order: 4
---
# Reporting API
 
This is the API used by our Android, iOS and Web SDKs to report back notification events.
 <Alert danger> We want everyone to use our official Android, iOS and Web SDKs. If your use case requires this documentation, please contact us <a external="" href="mailto:betterbeams@pusher.com"> betterbeams@pusher.com </a> </Alert> 
# Reporting a notification acknowledgment
 
This event should be triggered when a device receives a notification.
 
```http
{reportingURLDefinition}
```
 
## Request headers
 
The following headers are necessary:
  *  `Content-Type`: with the value always set to `application/json`.   
## Request body
 
A JSON object with the following keys:
  *  `event` (String| *required* ): Must be set to `delivery`.  *  `publishId` (String| *required* ): the ID used to identify the publish request that led to this notification.  *  `deviceId` (String| *required* ): the ID used to identify the device.  *  `timestampSecs` (Int| *required* ): the unix timestamp in seconds.  *  `userId` (String| *optional* ): the ID of the User that received this notification. This is required if using <a href="/docs/beams/concepts/authenticated-users">Authenticated Users</a> and [Webhooks](/docs/beams/concepts/webhooks).  *  `appInBackground` (Boolean| *optional* ): describes if the application was in background when a notification was delivered.  *  `hasDisplayableContent` (Boolean| *optional* ): describes if the notification had an UI element to the user.  *  `hasData` (Boolean| *optional* ): describes if the notification contained an additional data payload.   
## Response
 
If the event is well formed, the success response will be a `200 OK`.
 
## Error Responses
 <Table> <thead> <tr> <th>Title</th> <th>Status Code</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td>Invalid content type</td> <td>400</td> <td> Only `application/json` is supported. </td> </tr> <tr> <td>Incomplete Request</td> <td>400</td> <td> `instance-id` param is missing from path. </td> </tr> <tr> <td>Bad request</td> <td>400</td> <td> The instance id given is invalid. It is expected to be in this format: 426abfc7-41fe-492f-bcf1-27586fa9bd3f . </td> </tr> <tr> <td>Bad request</td> <td>400</td> <td>Failed to read body as a JSON object.</td> </tr> <tr> <td>Bad request</td> <td>400</td> <td> `event` is missing from body. </td> </tr> <tr> <td>Bad request</td> <td>400</td> <td> `publishId` is missing from body. </td> </tr> <tr> <td>Bad request</td> <td>400</td> <td> `deviceId` is missing from body. </td> </tr> <tr> <td>Bad request</td> <td>400</td> <td> `timestampSecs` is missing from body. </td> </tr> <tr> <td>Something went wrong</td> <td>500</td> <td>Internal server error.</td> </tr> </tbody> </Table> 
# Reporting a notification open
 
This event should be triggered when a user taps on a notification.
 
```http
{reportingURLDefinition}
```
 
## Request headers
 
The following headers are necessary:
  *  `Content-Type`: with the value always set to `application/json`.   
## Request body
 
A JSON object with the following keys:
  *  `event` (String| *required* ): Must be set to `open`.  *  `publishId` (String| *required* ): the ID used to identify the publish request that led to this notification.  *  `deviceId` (String| *required* ): the ID used to identify the device.  *  `timestampSecs` (Int| *required* ): the unix timestamp in seconds.  *  `userId` (String| *optional* ): the ID of the User that received this notification. This is required if using <a href="/docs/beams/concepts/authenticated-users">Authenticated Users</a> and [Webhooks](/docs/beams/concepts/webhooks).   
## Response
 
If the event is well formed, the success response will be a `200 OK`.


    
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
        <td>Bad request</td>
        <td>400</td>
        <td>
          The instance id given is invalid. It is expected to be in this format: 426abfc7-41fe-492f-bcf1-27586fa9bd3f .
        </td>
      </tr>
      <tr>
        <td>Bad request</td>
        <td>400</td>
        <td>Failed to read body as a JSON object.</td>
      </tr>
      <tr>
        <td>Bad request</td>
        <td>400</td>
        <td>
          `event` is missing from body.
        </td>
      </tr>
      <tr>
        <td>Bad request</td>
        <td>400</td>
        <td>
          `publishId` is missing from body.
        </td>
      </tr>
      <tr>
        <td>Bad request</td>
        <td>400</td>
        <td>
          `deviceId` is missing from body.
        </td>
      </tr>
      <tr>
        <td>Bad request</td>
        <td>400</td>
        <td>
          `timestampSecs` is missing from body.
        </td>
      </tr>
      <tr>
        <td>Something went wrong</td>
        <td>500</td>
        <td>Internal server error.</td>
      </tr>
      </tbody>
    </Table>

