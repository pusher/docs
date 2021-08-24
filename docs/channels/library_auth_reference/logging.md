---
date: 2021-08-01
title: Pusher Channels Docs | Logging
description: Libraries must detect and log important events as it is essential for usability. Our guide gives a recommendation of best practices on logging with Channels.
layout: channels.njk
eleventyNavigation:
  parent: Library auth reference
  key: Logging
  order: 4
---

# Logging

Libraries must detect and log important events. This is extremely important for usability.

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).

# Guidelines

The library SHOULD allow configuration with a `logLevel`. The possible values for `logLevel` are `DEBUG`, `INFO`, `WARN`, `ERROR`, and `OFF`. The `logLevel` SHOULD default to `INFO`.

Where possible, error log lines SHOULD describe common fixes. This may take the form of a link to a help page.

If the language provides "exceptions", the SDK MAY use these for `ERROR` events. Exceptions carry more context (such as a stacktrace), which may help diagnose the error.

A Channels SDK MUST report the following minimal list of errors. A Channels SDK MAY extend this with specific errors for its own platform.

Each log line MUST include the parameters denoted with `{'${parameter}'}`. The SDK author MAY determine an appropriate log format and English phrasing.

Each log line SHOULD include a timestamp, with millisecond accuracy. If the platform provides this feature, the SDK MAY omit it from the log line.

Each log line SHOULD include the name of the SDK, to distinguish the log source from other SDKs used. If the platform provides the origin of the log line, the SDK MAY omit this from the log line.

# WebSocket library log event list

| Log level | Content                                                                                 | Context/notes                                                                                                              |
| --------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| INFO      | `SDK initialized with logLevel: ${logLevel}`                                            | The SDK MAY alternatively log all configuration.                                                                           |
| ERROR     | `Invalid response from auth endpoint: ${error}`                                         | The SDK MUST log _why_ the response was invalid.                                                                           |
| ERROR     | `Received a pusher:error event: ${event}`                                               | We prefer including "how to fix" guidance in the message from the server-side, which MUST be included in the logged error. |
| INFO      | `Connection state changed to: ${newState}`                                              | The SDK MAY also include the previous state, and why the state changed.                                                    |
| INFO      | `No callbacks are bound to event name ${name}; discarding event: ${event}. To fix: ...` | The recommendation SHOULD be to call the SDK's equivalent of `bind`.                                                       |
| DEBUG     | `Protocol event sent: ${event}`                                                         | MUST be logged for all Channels protocol events (e.g. including ping/pong)                                                 |
| DEBUG     | `Protocol event received: ${event}`                                                     | MUST be logged for all Channels protocol events (e.g. including ping/pong)                                                 |
