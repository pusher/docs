---
title: Pusher Channels | Server Library Reference Specification
description: This documentation describes the language and platform-agnostic requirements for a Pusher Channels server library, as expected by Pusher.
layout: channels.njk
eleventyNavigation:
  parent: Library auth reference
  key: Server library reference specification
  title: Server library reference specification
  order: 3
---

# Server library reference specification

Describes a language and platform-agnostic specification for implementing a Pusher Channels server library.

Changes to this specification are handled by incrementing an integer version number. The current version is 

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).

## Introduction

This specification lists the requirements for a Channels server library, as expected by Pusher. The specifics of the required HTTP request and response payload data contents are not discussed here. This document is intended as a functional specification. Specific API requirements can be found in the [Channels HTTP API reference](/docs/channels/library_auth_reference/rest-api) instead.

## Features

The library MUST offer the following features to be considered feature-complete and be open for consideration as an “officially-supported” Channels server library by Pusher.

### Triggering single events

- The library MUST allow a developer to [trigger a single event on one or more channels](/docs/channels/library_auth_reference/rest-api/#post-event-trigger-an-event).
- A specific connection MAY be excluded from receiving a triggered event by providing the socket identifier for its connection when defining the event to trigger.
- Triggering an event on multiple channels if any of those channels are encrypted MUST be prevented in the library API or MUST result in an error if a developer attempts it.

### Triggering multiple events

- The library MUST allow a developer to [trigger multiple events, each on a specific channel](/docs/channels/library_auth_reference/rest-api/#post-batch-events-trigger-multiple-events).
- A specific connection MAY be excluded from receiving a triggered event by providing the socket identifier for its connection when defining the events to trigger.
- Triggering multiple events if one or more of those events specify multiple channels MUST be prevented in the library API or MUST result in an error if a developer attempts it.

### Experimental program

The [Pusher Experimental program](/docs/lab#experimental-program) defines some additional parameters to the Channels HTTP API which could become incorporated into the HTTP API in the future.

- The library MAY allow a developer to fetch channel attribute information for the channel(s) that are being published to when triggering single or multiple events.

### Private and presence channel subscription authentication

- The library MUST provide a helper method for generating authentication tokens for user subscriptions to private and presence channels, according to the [HTTP API docs](/docs/channels/library_auth_reference/auth-signatures).

### Webhook verification

- The library MUST provide a helper method for verifying that received Webhook requests have originated directly from Pusher itself, by inspecting headers and decrypting encrypted event payloads according to the [HTTP API docs](/docs/channels/server_api/webhooks).

### Application state queries

- The library MUST provide a method to [fetch a list of occupied channels](/docs/channels/library_auth_reference/rest-api/#get-channels-fetch-info-for-multiple-channels).
  - The returned list of channels MAY be filtered to return only those channels whose name begins with a specific a prefix.
  - The user_count MAY be returned for occupied presence channels.
- The library MUST provide a method to [fetch information on a specific occupied channel](/docs/channels/library_auth_reference/rest-api/#get-channel-fetch-info-for-one-channel).
  - The subscription_count MAY be returned for a channel, if requested by a developer.
  - The user_count MAY be returned for a presence channel, if requested by a developer.
- The library MUST provide a method to [fetch a list of users subscribed to a specific presence channel](/docs/channels/library_auth_reference/rest-api/#get-users).

## Interfaces

The library MUST provide the following top-level API (tailored for the platform language) to support the required [features](#features):

```swift
// Initializer for the top-level API object.
// options: A container for required configuration parameters.
init(options: PusherClientOptions)

// Fetch a list of occupied channels.
//
// filteredByPrefix: An optional channel name prefix filter string.
// fetchingAttributes: An array containing any attributes to be fetched.
// Async callback: A list of channel summaries, or an error.
func channels(filteredByPrefix: String?,
              fetchingAttributes: [String],
              callback: Result<[ChannelSummary], Error>)

// Fetch information for an occupied channel.
//
// channelName: The name of the channel to inspect.
// fetchingAttributes: An array containing any attributes to be fetched.
// Async callback: A channel information, or an error.
func channelInfo(channelName: String,
                 fetchingAttributes: [String],
                 callback: Result<ChannelInfo, PusherError>)

// Fetch a list of users for a given presence channel.
//
// channelName: The name of the presence channel to inspect.
// Async callback: A list of subscribed users, or an error.
func users(channelName: String,
           callback: Result<[User], PusherError>)

// Trigger an event on one or more channels.
//
// eventJSON: event JSON data.
// Async callback: A list of channel summaries that were published to, or an error.
func trigger(eventJSON: [String: Any],
             callback: Result<[ChannelSummary], PusherError>)

// Trigger multiple events on channels.
//
// eventsJSON: An array of event JSON data records.
// Async callback: A list of channel information records published to, or an error.
trigger(eventsJSON: [[String: Any]],
        callback: Result<[ChannelInfo], PusherError>)

// Verify the authenticity of a received Webhook request (based on its headers).
//
// requestHeaders: A dictionary of request header key/value pairs to inspect.
// Async callback: A verified Webhook record, or an error.
func verifyWebhook(requestHeaders: [String: String],
                   callback: Result<Webhook, PusherError>)

// Generate an authentication token for a private or presence channel
// subscription attempt from a connected client.
//
// channelName: The name of the channel being subscribed to.
// socketId: The socket identifier of the connected client.
// userDataJSON: user data JSON for a presence channel subscription attempt.
// Async callback: A list of channel summaries, or an error.
func authenticate(channelName: String,
                  socketId: String,
                  userDataJSON: [String: Any]?,
                  callback: Result<AuthenticationToken, PusherError>)
```

- The method parameters SHOULD be encapsulated into public containing types for typed languages where this is more in keeping with best practices for the development language.
  - E.g. a `Channel` object that has  channel name `String` and channel type `enum` properties.
- The library SHOULD specify the required public types to encapsulate the objects returned by these top-level API methods.
  - If appropriate for the development language, lower-level primitives such as Strings, Arrays or Dictionaries SHOULD be used to encapsulate the returned data instead.

## Configuration options

- The library MUST provide a method to configure the connection to the Channels HTTP API.
  - This could be a type encapsulating the configuration options, or an API method to provide them.
- The library MUST accept the following required configuration parameters:
  - An `app_id` string
  - A `key` string
  - A `secret` string
- The library MUST accept the following optional configuration parameters:
  - A `cluster` string
  - A `host` string
  - A `httpProxy` string
  - A `port` string
  - A `useTLS` boolean flag
  - An `encryptionMasterKey` string

## Documentation

- The library MUST provide a comprehensive README
  - The README MUST contain well-formatted code examples covering the public API of the library.
  - The README MUST provide instructions for installation and configuration, as well as a link to full API documentation.
  - The README MUST be kept up to date based on any changes to the public API.
- The library MUST have its public API fully documented via code comments on the public interfaces.
- The library SHOULD host comprehensive API documentation, automatically generated from the documentation comments discussed in the previous bullet point.

## Error reporting

- The library MUST report errors using an accepted “best practice” for the development language or platform.
  - Examples of a suitable error reporting mechanism could be throwing catchable exceptions, returning errors using a delegate pattern, or logging errors to a console.
- All HTTP API error responses SHOULD be surfaced via the library unless there is a specific reason that a HTTP API error MUST NOT be surfaced for security reasons.

## Tests and code coverage

The library MUST include a standardised set of unit tests, covering its critical functionality. The exact implementation SHOULD be dictated based on development language best practices. The test cases are self descriptive, however implementation examples can be found in the [Channels Swift server library](https://github.com/pusher/pusher-http-swift/tree/main/Tests/PusherTests).

### Triggering events

- `testPostBatchEventsToChannelFailsForMultichannelEvents`
- `testPostBatchEventsToChannelFailsForTooLargeBatch`
- `testPostBatchEventsToChannelSucceedsForSingleChannelEvents`
- `testPostEventToChannelFailsForInvalidMultichannelEvent`
- `testPostEventToChannelSucceedsForEncryptedChannel`
- `testPostEventToChannelSucceedsForPrivateChannel`
- `testPostEventToChannelSucceedsForPublicChannel`
- `testPostEventToChannelSucceedsForValidMultichannelEvent`

### Private and presence channel subscription authentication

- `testAuthenticateEncryptedChannelSucceeds`
- `testAuthenticatePresenceChannelSucceeds`
- `testAuthenticatePresenceChannelWithMissingUserDataFails`
- `testAuthenticatePresenceChannelWithUserInfoSucceeds`
- `testAuthenticatePrivateChannelSucceeds`
- `testAuthenticatePublicChannelFails`

### Webhook verification

- `testInvalidPusherKeyHeaderWebhookFails`
- `testInvalidPusherSignatureHeaderWebhookFails`
- `testMissingBodyDataWebhookFails`
- `testMissingPusherKeyHeaderWebhookFails`
- `testMissingPusherSignatureHeaderWebhookFails`
- `testVerifyChannelOccupiedWebhookSucceeds`
- `testVerifyChannelVacatedWebhookSucceeds`
- `testVerifyClientEventWebhookSucceeds`
- `testVerifyMemberAddedWebhookSucceeds`
- `testVerifyMemberRemovedWebhookSucceeds`

### Application state queries

- `testGetChannelInfoFailsForInvalidAttributes`
- `testGetChannelInfoSucceeds`
- `testGetChannelsFailsForInvalidAttributes`
- `testGetChannelsSucceeds`
- `testGetUsersForChannelFailsForPublicChannel`
- `testGetUsersForChannelSucceedsForPresenceChannel`

The library SHOULD also include further unit tests covering platform-specific functionality, where necessary.

## Release process

### CI

- The library MUST use GitHub Actions to run a suitable CI pipeline for commits to open PRs and when merging PRs to `master` or `main` branches.
  - The CI pipeline MUST include suitable build and test stages in order to verify the library can be built on supported platforms and passes the required tests.

### Release automation

- The library SHOULD be able to be automatically released based on provided parameters when merging a PR or adding a new release tag to a `master` or `main` branch.

### Versioning

The library releases MUST be versioned according to the [Semantic Versioning v2.0.0 specification](https://semver.org/spec/v2.0.0.html).

## CHANGELOG

### Version 1 (2021-06-10)

Initial release
