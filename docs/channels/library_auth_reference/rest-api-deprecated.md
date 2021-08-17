---
title: Pusher Channels Docs | Deprecated HTTP API Reference Methods
description: The methods described in this documentation are considered deprecated and have been replaced by the new methods listed in our API reference.
layout: channels.njk
eleventyNavigation:
  key: Rest api deprecated
  title: HTTP API reference - deprecated
---

# HTTP API Reference - deprecated methods

The following methods are considered deprecated and have been replaced by new methods documented in the <a href="/docs/channels/library_auth_reference/rest-api">API reference</a> . If you maintain a library please transition to the new methods.

# Channels

## GET channel stats

```json
GET / apps / [app_id] / channels / [channel_name] / stats
```

Returns statistics for the given channel.

Deprecated 2012-09: use [GET channel](/docs/channels/library_auth_reference/rest-api#get-channels-fetch-info-for-multiple-channels-) instead.

#### Request

No parameters are currently accepted.

#### Successful response (200)

The following attributes will be returned in the JSON response

 <Table> <thead> <tr> <th>Attribute</th> <th>Type</th> <th>Applicable channels</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td>occupied</td> <td>Boolean</td> <td>All</td> <td> Whether or not there are currently any subscribers to this channel </td> </tr> <tr> <td>user_count</td> <td>Integer</td> <td>Presence</td> <td> Number of distinct users currently subscribed to this channel (a single user may be subscribed many times, but will only count as one) </td> </tr> <tr> <td>connection_count</td> <td>Integer</td> <td>All</td> <td> Number of connections currently subscribed to this channel. This is a beta feature - please contact support if you would like to try this. </td> </tr> </tbody> </Table> 
# Events
 
## POST event to channel
 
```json
POST /apps/[app_id]/channels/[channel_name]/events
```
 
Triggers an event on a channel. The event will be triggered on all clients which have subscribed to that channel. 
 
Deprecated 2012-09: use the more flexible [POSTevents](/docs/channels/library_auth_reference/rest-api) instead. 
 
#### Request
 
**Headers** 
 
A `Content-Type` header should be sent identifying the body of the request as `application/json`. 
 
**Parameters (in query string)** 
 
This API is an exception to the general rule: parameters must be submitted in the query string. 
 <Table> <thead> <tr> <th>Parameter</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td>name</td> <td>Event name (required)</td> </tr> <tr> <td>socket_id</td> <td> Excludes the event from being sent to a specific connection (see [excluding recipients](/docs/channels/server_api/excluding-event-recipients) ) </td> </tr> </tbody> </Table> 
**Request body** 
 
This API is an exception to the general rule: parameters must not be submitted in the body. 
 
Request body MUST contain event data as a UTF-8 JSON encoded string. Upon receipt of data which is not valid UTF-8, the API will return a 400 response code. The API does not check that the received data is valid JSON. 
 
#### Successful response (202)
 
The event has been received and will be send asynchronously to all sockets. No information is available in the response.
