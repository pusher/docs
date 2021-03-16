---
title: Logging - Channels - Pusher Docs
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

    <Table>
      <thead>
        <tr>
          <th>Log level</th>
          <th>Content</th>
          <th>Context/notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{INFO}</td>
          <td>`{'SDK initialized with logLevel: ${logLevel}'}`</td>
          <td>The SDK MAY alternatively log all configuration.</td>
        </tr>
        <tr>
          <td>{ERROR}</td>
          <td>`{'Invalid response from auth endpoint: ${error}'}`</td>
          <td>The SDK MUST log *why* the response was invalid.</td>
        </tr>
        <tr>
          <td>{ERROR}</td>
          <td>`{'Received a pusher:error event: ${event}'}`</td>
          <td>
            We prefer including "how to fix" guidance in the message from the server-side,
            which MUST be included in the logged error.
          </td>
        </tr>
        <tr>
          <td>{INFO}</td>
          <td>`{'Connection state changed to: ${newState}'}`</td>
          <td>The SDK MAY also include the previous state, and why the state changed.</td>
        </tr>
        <tr>
          <td>{INFO}</td>
          <td>`{'No callbacks are bound to event name ${name}; discarding event: ${event}. To fix: ...'}`</td>
          <td>The recommendation SHOULD be to call the SDK's equivalent of `bind`.</td>
        </tr>
        <tr>
          <td>{DEBUG}</td>
          <td>`{'Protocol event sent: ${event}'}`</td>
          <td>MUST be logged for all Channels protocol events (e.g. including ping/pong)</td>
        </tr>
        <tr>
          <td>{DEBUG}</td>
          <td>`{'Protocol event received: ${event}'}`</td>
          <td>MUST be logged for all Channels protocol events (e.g. including ping/pong)</td>
        </tr>
      </tbody>
    </Table>
