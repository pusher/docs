---
title: Connection — Channels — Pusher Docs
layout: channels.njk
eleventyNavigation:
  parent: Channels
  key: Connection
---

# Connection

The Channels connection is the fundamental means of communication with the service. It is a bi-directional connection and is able to receive messages as well as emit messages from the server.

## Connecting to Channels

| State            | Note                                                                                                                                                                                                                                                                                    |
| :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **initialized**  | Initial state. No event is emitted in this state.                                                                                                                                                                                                                                       |
| **connecting**   | All dependencies have been loaded and Channels is trying to connect. The connection will also enter this state when it is trying to reconnect after a connection failure.                                                                                                               |
| **connected**    | The connection to Channels is open and authenticated with your app.                                                                                                                                                                                                                     |
| **unavailable**  | The connection is temporarily unavailable. In most cases this means that there is no internet connection. It could also mean that Channels is down, or some intermediary is blocking the connection. In this state, pusher-js will automatically retry the connection every 15 seconds. |
| **failed**       | Channels is not supported by the browser. This implies that WebSockets are not natively available and an HTTP-based transport could not be found.                                                                                                                                       |
| **disconnected** | The Channels connection was previously connected and has now intentionally been closed.                                                                                                                                                                                                 |

more words
