---
date: 2022-04-05
title: Pusher Lab | Experimental and Beta Features
description: We continue to bring cutting edge features to our realtime APIs. Find out what we're working on and get involved with beta testing in the Pusher Lab.
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
| Channels | HTTP publish API info | 16 Feb 2022 | 31 Mar 2022    | - [Trigger example] <br/> - [Trigger batch example] <br/> - [HTTP API reference] | Active |
| Beams | WEB support in Flutter SDK  | 16 Feb 2022 | 31 May 2022    | [SDK repository] | Active |

[trigger example]: /docs/channels/server_api/http-api#example-fetch-subscriber-and-user-counts-at-the-time-of-publish
[trigger batch example]: /docs/channels/server_api/http-api#example-fetch-subscriber-and-user-counts-at-the-time-of-publish
[http api reference]: /docs/channels/library_auth_reference/rest-api#events
[sdk repository]: https://github.com/pusher/flutter_pusher_beams

## Beta program

Beta features should be more stable than experimental features, but could still change at any time. However depending on the nature of the change we will endeavour to communicate changes to users at least a week in advance.

Typically beta features will remain beta for no longer than two business quarters after the last update (subject to review), and will either be progressed to a Generally Available state or be deprecated.

### Beta features

| Product | Feature                       | Last update | Review by date | Resources                                                                       | Status |
| ------- | ----------------------------- | ----------- | -------------- | ------------------------------------------------------------------------------- | ------ |
| Beams   | Safari web push notifications | 09 Sep 2021 | 31 May 2022    | [Safari configuration guide](/docs/beams/getting-started/web/configure-safari/) | Active |
| Channels   | Cache channels | 05 Apr 2022 | 31 July 2022    | [Cache channels docs](/docs/channels/using_channels/cache-channels/) | Active |
| Channels   | Subscription count event | 18 July 2022 | 31 Oct 2022    | [Subscription count docs](/docs/channels/using_channels/events/) | Active |

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
