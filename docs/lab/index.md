---
title: Pusher Lab
layout: other.njk
eleventyNavigation:
  parent: Docs
  key: Pusher Lab
  order: 3
---

# Pusher Lab

At Pusher we pride ourselves on providing reliable and stable services you can trust. We maintain support for our APIs and protocol versions for as long as reasonably possible so users don’t have to frequently deal with breaking changes that will impact their applications.

However at Pusher we also want to continue to innovate and keep bringing our users cutting edge features and technologies to help solve complex problems as seamlessly as possible. This means we will sometimes release new features or APIs that will go through an Experimental or Beta phase.

Working with our developer community we may make changes or deprecate Experimental or Beta functionality at short notice so you should be sure not to rely on these in a production environment. Where practical the timelines below set out or expectations for changes to Experimental or Beta features.

## Experimental program

Experimental features could change at any time, however depending on the nature of the change we will endeavour to communicate changes to users at least 24 hours in advance.

Typically experimental features will remain experimental for no longer than one business quarter after the last update (subject to review), and will either be progressed to a Beta or Generally Available state or be deprecated.

### Experimental features

| Product  | Feature               | Last update | Review by date | Resources                                                                        | Status |
| -------- | --------------------- | ----------- | -------------- | -------------------------------------------------------------------------------- | ------ |
| Channels | HTTP publish API info | 18 Feb 2021 | 31 Aug 2021    | - [Trigger example] <br/> - [Trigger batch example] <br/> - [HTTP API reference] | Active |

[trigger example]: /docs/channels/server_api/http-api#example-fetch-subscriber-and-user-counts-at-the-time-of-publish
[trigger batch example]: /docs/channels/server_api/http-api#example-fetch-subscriber-and-user-counts-at-the-time-of-publish
[http api reference]: /docs/channels/library_auth_reference/rest-api#events

## Beta program

Beta features should be more stable than experimental features, but could still change at any time. However depending on the nature of the change we will endeavour to communicate changes to users at least a week in advance.

Typically beta features will remain beta for no longer than two business quarters after the last update (subject to review), and will either be progressed to a Generally Available state or be deprecated.

### Beta features

| Product | Feature                       | Last update | Review by date | Resources                                                                       | Status |
| ------- | ----------------------------- | ----------- | -------------- | ------------------------------------------------------------------------------- | ------ |
| Beams   | Safari web push notifications | 26 Mar 2021 | 26 May 2021    | [Safari configuration guide](/docs/beams/getting-started/web/configure-safari/) | Active |
| Channels  | Swift HTTP API library | 25 May 2021 | 22 Jun 2021 | [Docs](https://github.com/pusher/pusher-http-swift#installation) | Active  |

## Communication

### Update to users

When we make updates to experimental or beta features we will communicate these via:

- Email
- Beta slack channel
- Changelogs / Documentation updates
- Support help centre

### Feedback from users

The success of our experimental or beta programmes depends on feedback from our developer community. If you have a feedback on any of the programmes above you can do so via:

- Our support team
- Beta slack channel
