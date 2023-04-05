---
date: 2021-08-01
title: Pusher Channels Docs | HTTP API Reference
description: Consult all API methods for querying the state of your application and details of the authentication mechanism for Pusher Channels.
layout: channels.njk
eleventyNavigation:
  parent: Library auth reference
  key: Rest api
  title: HTTP API reference
  order: 2
---

# HTTP API Reference

This document lists all API methods and details the authentication mechanism. Unless you're writing a library, you may wish to refer to the [Server API overview](/docs/channels/server_api/overview) instead. 

## General

The API is hosted at [http://api-CLUSTER.pusher.com](http://api-CLUSTER.pusher.com), where CLUSTER is replaced with your own apps cluster (e.g., mt1). The API may be accessed via HTTP or HTTPS.

All requests MUST be authenticated, as described in the [Generating authentication signatures](#generating-authentication-signatures) section.

Parameters MUST be submitted in the query string for GET requests. For POST requests, parameters MAY be submitted in the query string but SHOULD be submitted in the POST body as a JSON hash (while setting `Content-Type:application/json` ).

HTTP status codes are used to indicate the success or otherwise of requests. The following statuses are common:

| Code | Description                                                        |
| ---- | ------------------------------------------------------------------ |
| 200  | Successful request. The body will contain a JSON hash of response data |
| 400  | Error: details in response body                                    |
| 401  | Authentication error: response body will contain an explanation    |
| 403  | Forbidden: app disabled or over message quota                      |

Other status codes are documented under the appropriate APIs.

## Events

An event consists of a name and data (typically JSON) which may be sent to all subscribers to a particular channel or channels. This is conventionally known as triggering an event.

### POST event (trigger an event)

```http
POST /apps/[app_id]/events
```

Triggers an event on one or more channels.

The event data should not be larger than 10KB. If you attempt to POST an event with a larger data parameter, you will receive a 413 error code. If you have a use case that requires a larger message size, [get in touch](https://support.pusher.com/hc/en-us/requests/new).

> **NOTE:** A previous version of this resource is now considered deprecated but is detailed in the [Deprecated](/docs/channels/library_auth_reference/rest-api-deprecated) section.

> **NOTE:** For POST requests, we recommend including parameters in the JSON body. If using the query string, send arrays as `channels[]=channel1&amp;channels[]=channel2;`. This is more verbose than the JSON representation.

##### Request

| Parameter | Description                                                                                                                                                                                                                                              |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name      | Event name (required)                                                                                                                                                                                                                                    |
| data      | Event data (required) - limited to 10KB                                                                                                                                                                                                                  |
| channels  | Array of one or more channel names - limited to 100 channels. When using encrypted channels this parameter is not supported.                                                                                                                                                                                             |
| channel   | Channel name if publishing to a single channel (can be used instead of channels)                                                                                                                                                                         |
| socket_id | Excludes the event from being sent to a specific connection (refer to [Excluding recipients](/docs/channels/server_api/excluding-event-recipients) )                                                                                                          |
| info      | A comma-separated list of attributes that should be returned for each unique channel triggered to. If this parameter is present, the request will count as two "messages" for billing. |

Available info attributes:

| Attribute          | Type    | Applicable channels | Description                                                                                                                                                                                                                               |
| ------------------ | ------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user_count         | Integer | Presence            | Number of **distinct users** currently subscribed to each channel (a single user may be subscribed many times, but will only count as one)                                                                                                |
| subscription_count | Integer | All   (except Presence channels)              | Number of **connections** currently subscribed to each channel. This attribute is not available by default. To enable it, navigate to your [Channels dashboard](https://dashboard.pusher.com), find the app you are working on, and click **App Settings**. |

##### Successful response

The event has been received and will be sent asynchronously to all sockets. Response is an empty JSON hash.

If the `info` parameter is sent, then it returns a hash of unique channels that were triggered to. The hash maps from channel name to a hash of attributes for that channel (may be empty).

```json
{
  "channels": {
    "presence-foobar": { "user_count": 42, "subscription_count": 51 },
    "presence-another": { "user_count": 123, "subscription_count": 140 },
    "another": { "subscription_count": 13 }
  }
}
```

> **NOTE:** Counts are computed independently of broadcasting the message to connections. This means the counts do not necessarily match the number of subscribers/users that were published to.

### POST batch events (trigger multiple events)

```http
POST /apps/[app_id]/batch_events
```

Triggers multiple events in a single call (up to 10 per call on the multi-tenant clusters).

The event data should not be larger than 10KB. If you attempt to POST an event with a larger data parameter, you will receive a 413 error code.

##### Request

| Parameter | Description                           |
| --------- | ------------------------------------- |
| batch     | An array of Event objects (see below) |

Event object:

| Parameter | Description                                                                                                                                                                                                                         |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name      | Event name (required)                                                                                                                                                                                                               |
| data      | Event data (required) - limited to 10KB                                                                                                                                                                                             |
| channel   | Channel name (required)                                                                                                                                                                                                             |
| socket_id | Excludes the event from being sent to a specific connection (refer to [Excluding event recipients](/docs/channels/server_api/excluding-event-recipients) )                                                                                     |
| info      | A comma-separated list of attributes which should be returned for the channel. If this parameter is present, the request will count as two "messages" for billing. |

Available info attributes:

| Attribute          | Type    | Applicable channels | Description                                                                                                                                                                                                                              |
| ------------------ | ------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user_count         | Integer | Presence            | Number of **distinct users** currently subscribed to the channel (a single user may be subscribed many times, but will only count as one)                                                                                                |
| subscription_count | Integer | All  (except Presence channels)              | Number of **connections** currently subscribed to the channel. This attribute is not available by default. To enable it, navigate to your [Channels dashboard](https://dashboard.pusher.com), click the app you are working on, navigate to **App Settings** and **Enable subscription count** toggle.  |

##### Successful response

The event has been received and will be sent asynchronously to all sockets. Response is an empty JSON hash.

If the `info` parameter is sent with any events, then it returns a list of attributes for the channels published to. The attributes at index `i` will correspond to the channel that event at index `i` in the request body was published to.

```json
{
  "batch": [
    { "user_count": 42, "subscription_count": 51 },
    {},
    { "subscription_count": 13 }
  ]
}
```

> **NOTE:** Counts are computed independently of broadcasting the message to connections. This means the counts do not necessarily match the number of subscribers/users that were published to.

## Channels

Channels are identified by name and are used to determine which messages are delivered to which clients. Security may be added by using private or presence channels (identified by name prefix). Channels are created and destroyed automatically whenever clients subscribe or unsubscribe.

### GET channels (fetch info for multiple channels)

```http
GET /apps/[app_id]/channels
```

Allows fetching a hash of occupied channels (optionally filtered by prefix), and optionally one or more attributes for each channel.

##### Request

| Parameter        | Description                                                                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| filter_by_prefix | Filter the returned channels by a specific prefix. For example in order to return only presence channels you would set `filter_by_prefix=presence-`                          |
| info             | A comma-separated list of attributes which should be returned for each channel. If this parameter is missing, an empty hash of attributes will be returned for each channel. |

**Available info attributes**

| Attribute  | Type    | Applicable channels | Description                                                                                                                                |
| ---------- | ------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| user_count | Integer | Presence            | Number of **distinct users** currently subscribed to this channel (a single user may be subscribed many times, but will only count as one) |

If an attribute such as `user_count` is requested, and the request is not limited to presence channels, the API will return an error (400 code).

##### Successful response

Returns a hash of channels mapping from channel name to a hash of attributes for that channel (may be empty)

```json
{
  "channels": {
    "presence-foobar": { "user_count": 42 },
    "presence-another": { "user_count": 123 }
  }
}
```

### GET channel (fetch info for one channel)

```http
GET /apps/[app_id]/channels/[channel_name]
```

Fetch one or some attributes for a given channel.

##### Request

| Parameter | Description                                                                                                                                                         |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| info      | A comma-separated list of attributes which should be returned for the channel. See the table below for a list of available attributes, and for which channel types. |

**Available info attributes**

| Attribute          | Type    | Applicable channels | Description                                                                                                                                                                                                                               |
| ------------------ | ------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user_count         | Integer | Presence            | Number of **distinct users** currently subscribed to this channel (a single user may be subscribed many times, but will only count as one)                                                                                                |
| subscription_count | Integer | All  (except Presence channels)               | Number of **connections** currently subscribed to this channel. This attribute is not available by default. To enable it, navigate to your [Channels dashboard](https://dashboard.pusher.com), click the app you are working on, navigate to **App Settings** and **Enable subscription count** toggle. |
| cache              | Object  | Cache               | Cached data and TTL (in seconds) for this channel or null in case the cache is empty.


Requesting an attribute which is not available for the requested channel will return an error (for example requesting a the `user_count` for a public channel).

##### Successful response

Returns a hash describing the state of the channel. The occupied status is always reported, as well as any requested attributes.

```json
{ "occupied": true, "user_count": 42, "subscription_count": 42, "cache": { "data": "event data", ttl: 60 } }
```

## Users

### POST terminate user connections

```
    POST /apps/[app_id]/users/[user_id]/terminate_connections
```

Terminates all connections established by the given user. The user is allowed to reconnect again if nothing else is done. Refer to [Terminating user connections](/docs/channels/server_api/terminating-user-connections/) for more information on how to prevent users from reconnecting.

##### Request

No additional parameters needed or allowed.

##### Successful response

User's connections will be terminated. Response is an empty JSON hash.

### GET users

```http
GET /apps/[app_id]/channels/[channel_name]/users
```

Fetch user IDs of user currently subscribed to a presence channel. This functionality is primarily aimed to complement [presence webhooks](/docs/channels/server_api/webhooks#presence-events). It allows you to fetch the initial state of a channel.

>**NOTE:** Only `presence channels` allow this functionality. If you send this request to any other type of channel, you will get a 400 HTTP code.

##### Request

No additional parameters needed or allowed.

##### Successful response

Returns an array of subscribed users IDs.

```json
{ "users": [{ "id": "1" }, { "id": "2" }] }
```

## HTTP Keep-Alive

The Channels API supports [HTTP Keep-Alive](https://en.wikipedia.org/wiki/HTTP_persistent_connection). HTTP client libraries that implement this feature are able to re-use a single TCP connection to send multiple HTTP requests thus avoiding the overhead of the TCP connection (typically 100-200ms) between each subsequent request.

In scenarios where many requests are sent at the same time this can improve the throughput and decrease the load on the machine that is sending those requests.

## Authentication

The following query parameters must be included with all requests, and are used to authenticate the request.

| Parameter      | Description                                                                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| auth_key       | Your application key                                                                                                                                  |
| auth_timestamp | The number of seconds since January 1, 1970 00:00:00 GMT. The server will only accept requests where the timestamp is within 600s of the current time |
| auth_version   | Authentication version, currently 1.0                                                                                                                 |

The following query parameters must be included for all requests with a non-empty body (for example for POST requests to `/events`).

| Parameter | Description                          |
| --------- | ------------------------------------ |
| body_md5  | The hexadecimal MD5 hash of the body |

Once all the above parameters have been added to the request, a signature is calculated.

| Parameter      | Description                               |
| -------------- | ----------------------------------------- |
| auth_signature | Authentication signature, described below |

### Generating authentication signatures

The signature is a HMAC SHA256 hex digest. This is generated by signing a string made up of the following components concatenated with newline characters `\n`.

- The uppercase request method (e.g., `POST`)
- The request path (e.g., `/some/resource`)
- The query parameters sorted by key, with keys converted to lowercase, then joined as in the query string. Note that the string must not be URL-escaped (e.g., given the keys `auth_key`: `foo`,`Name`: `Something else`, you get `auth_key=foo&name=Something else`)

Here's an example.

### Worked authentication example

Assume that we wish to trigger the `foo` event on the `project-3` channel with JSON `{'{"some":"data"}'}` and that our app credentials are:

```json
app_id 3 key 278d425bdf160c739803 secret 7ad3773142a6692b25b8
```

The request url is:

```json
http://api.pusherapp.com/apps/3/events
```

Since this is a POST request, the body should contain a hash of parameters encoded as JSON where the data parameter is itself JSON encoded (the `\"` here are ** _two characters_ ** — a backslash and a quote):

```json
{ "name": "foo", "channels": ["project-3"], "data": "{\"some\":\"data\"}" }
```

Note that these parameters may be provided in the query string, although this is discouraged.

Add the authentication parameters (assume that these are included in the query string, so the body is unchanged from above). Since the body is non-empty a body_md5 parameter should be added:

```json
auth_key 278d425bdf160c739803 auth_timestamp 1353088179 auth_version 1.0 body_md5 ec365a775a4cd0599faeb73354201b6f
```

The signature is generated by signing the following string (the `\n` that you see here is ** _one character_ ** — an actual newline character.):

```http
POST\n/apps/3/events\nauth_key=278d425bdf160c739803&auth_timestamp=1353088179&auth_version=1.0&body_md5=ec365a775a4cd0599faeb73354201b6f
```

This should be signed by generating the HMAC SHA256 hex digest with the secret key `7ad3773142a6692b25b8`. This provides the following signature:

```http
da454824c97ba181a32ccc17a72625ba02771f50b50e1e7430e47a1f3f457e6c
```

The api request then becomes:

```http
POST /apps/3/events?auth_key=278d425bdf160c739803&auth_timestamp=1353088179&auth_version=1.0&body_md5=ec365a775a4cd0599faeb73354201b6f&auth_signature=da454824c97ba181a32ccc17a72625ba02771f50b50e1e7430e47a1f3f457e6c HTTP/1.1 Content-Type: application/json {"name":"foo","channels":["project-3"],"data":"{\"some\":\"data\"}"}
```

Or using curl:

```bash
curl -H "Content-Type: application/json" -d '{"name":"foo","channels":["project-3"],"data":"{\"some\":\"data\"}"}' "http://api.pusherapp.com/apps/3/events?auth_key=278d425bdf160c739803&auth_timestamp=1353088179&auth_version=1.0&body_md5=ec365a775a4cd0599faeb73354201b6f&auth_signature=da454824c97ba181a32ccc17a72625ba02771f50b50e1e7430e47a1f3f457e6c"
    {}
```

If you're having difficulty generating the correct signature in your library, chehck out this example in Ruby.

```rb
require 'digest/md5'
require 'hmac-sha2'

app_id = '3'
key = '278d425bdf160c739803'
secret = '7ad3773142a6692b25b8'

# note Here we've used single quotes so that Ruby doesn't replace the escape sequences
body = '{"name":"foo","channels":["project-3"],"data":"{\"some\":\"data\"}"}'

auth_timestamp = '1353088179'
auth_version = '1.0'

body_md5 = Digest::MD5.hexdigest(body)

puts 'Body md5: ' + body_md5
puts

# but here we use double quotes so that Ruby replaces \n with an actual newline character
string_to_sign =
"POST\n/apps/" + app_id +
"/events\nauth_key=" + key +
"&auth_timestamp=" + auth_timestamp +
"&auth_version=" + auth_version +
"&body_md5=" + body_md5

puts 'String to sign: ' + string_to_sign
puts

auth_signature = HMAC::SHA256.hexdigest(secret, string_to_sign)

puts 'Auth signature: ' + auth_signature
puts

curl =
'curl -H "Content-Type: application/json" -d \'' + body +
'\' "http://api.pusherapp.com/apps/' + app_id +
'/events?auth_key=' + key +
'&auth_timestamp=' + auth_timestamp +
'&auth_version=' + auth_version +
'&body_md5=' + body_md5 +
'&auth_signature=' + auth_signature +
'"'

puts 'Curl: ' + curl
puts

# Body md5: ec365a775a4cd0599faeb73354201b6f
#
# String to sign: POST
# /apps/3/events
# auth_key=278d425bdf160c739803&auth_timestamp=1353088179&auth_version=1.0&body_md5=ec365a775a4cd0599faeb73354201b6f
#
# Auth signature: da454824c97ba181a32ccc17a72625ba02771f50b50e1e7430e47a1f3f457e6c
#
# Curl: curl -H "Content-Type: application/json" -d '{"name":"foo","channels":["project-3"],"data":"{\"some\":\"data\"}"}' "http://api.pusherapp.com/apps/3/events?auth_key=278d425bdf160c739803&auth_timestamp=1353088179&auth_version=1.0&body_md5=ec365a775a4cd0599faeb73354201b6f&auth_signature=da454824c97ba181a32ccc17a72625ba02771f50b50e1e7430e47a1f3f457e6c"
```
