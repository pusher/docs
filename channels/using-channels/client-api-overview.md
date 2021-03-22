---
title: Client api overview - Channels - Pusher Docs
layout: channels.njk
eleventyNavigation:
  parent: Using channels
  key: Client API overview
  order: 1
---

# Client API overview

The Client API Overview provides information on how to perform specific actions using our [client libraries](/docs/channels/channels_libraries/libraries). Where possible each section provides an overview of the action, a reference-style guide to the constructor, property or method and an example of how it is used.

The reference-style guide and examples may contain information for different languages. You can choose which language you wish to view by clicking on the appropriate tab as below.

{% snippets ['js', 'swift', 'objc', 'java', 'laravelecho', 'c'] %}

```js
var pusher = new Pusher("YOUR_APP_KEY", options);
```

```swift
let pusher = Pusher(key: "YOUR_APP_KEY")
```

```objc
self.pusher = [[Pusher alloc] initWithKey:@"YOUR_APP_KEY"];
```

```java
Pusher pusher = new Pusher("YOUR_APP_KEY");
```

```js
window.Echo = new Echo({ broadcaster: "pusher", key: "YOUR_APP_KEY" });
```

```c
var pusher = new Pusher("YOUR_APP_KEY");
```

{% endsnippets %}

# Where Next?

- [Connection](/docs/channels/using_channels/connection)
- [Channels](/docs/channels/using_channels/channels)
- [Events](/docs/channels/using_channels/events)
- [Presence](/docs/channels/using_channels/presence-channels)
- [User Authentication](/docs/channels/using_channels/authorized-connections)
- [Global config](/docs/channels/using_channels/global-config)
