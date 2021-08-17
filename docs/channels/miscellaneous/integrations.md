---
title: Pusher Channels Docs | Integrations
description: Our third party integrations mean you can make the most out of building your apps with Channels. Including Librato, Datadog and Metrics.
layout: channels.njk
eleventyNavigation:
  parent: Miscellaneous
  key: Integrations
  order: 2
---

# Integrations

Channels has integrations with third party applications to make it easier to use Channels and get the most out of it.

> **Note:** Integrations are only available to Pro plans and above.

## Datadog

Datadog is an application performance monitoring platform. You can add Channels as an integration in order to monitor the metrics and alerts that you are interested in tracking.

In order to add Channels as an integration on Datadog:

1. Create a Datadog account or Login at [datadoghq.com](https://www.datadoghq.com/)
2. Go to ‘Integrations’ inside your Datadog dashboard
3. Find the [Pusher integration](https://app.datadoghq.com/account/settings#integrations/pusher), and follow the steps on the ‘Configuration’ tab.
4. Go to your Channels account settings, select the tab for [Datadog Integration](https://dashboard.pusher.com/channels/integrations/stats)
5. Paste your Datadog API key and save it.
6. Return to your Datadog, and on the [‘Dashboards’ tab](https://app.datadoghq.com/dash/list) , select Pusher to configure your dashboard, seen below.

![Pusher Channels dashboard in Datadog](./img/screenshot-channels-dashboard.png)

## Librato

Librato is a application performance monitoring platform. You can add Channels as an integration in order to monitor the metrics and alerts that you are interested in tracking.

In order to add Pusher as an integration on Librato, you'll need a Librato account. If you don't have one, you can create one [here](https://metrics.librato.com/sign_up).

1. Access your Librato tokens page, [here](https://metrics.librato.com/account/tokens).
2. Generate a new 'Record Only' or 'Full Access' token. ** If you provide us with a full access token, we can set you up with a pre-built dashboard. **
3. Go to your Pusher account settings, select the tab for [Librato Integration](https://dashboard.pusher.com/channels/integrations/stats)
4. Paste your Librato Email and newly created API key and save it.
5. Return to your Librato dashboard, and on the [Metrics tab](https://metrics.librato.com/s/metrics), you'll see your new Pusher Channels metrics with the `pusher.` namespace.

If you provided us with a full access token, you can go to the [Spaces tab](https://metrics.librato.com/s/spaces) and you'll see a new dashboard (`Pusher`) which is already setup to give you some insight on the metrics we're sending. You can modify this dashboard to your liking.

![Channels Metrics in Librato](./img/pusher-metrics.png)

![Librato Space](./img/channels-space.png)

## Metrics

This is a list of metrics sent to our integrations. An aggregate per `app_id` is sent around every 5 seconds.

| Provided metrics                               |
| ---------------------------------------------- |
| Messages sent over time                        |
| API Requests sent over time                    |
| Webhooks sent over time                        |
| Presence events sent over time                 |
| Broadcast messages sent over time              |
| Client events received sent over time          |
| Client events sent over time                   |
| Average message size                           |
| Maximum message size                           |
| 95th percentile message size                   |
| Messages count sent over time                  |
| Median message size                            |
| Concurrent connections per second              |
| Non-secure connections per 5 seconds           |
| Non-secure sockjs connections per 5 seconds    |
| Non-secure websocket connections per 5 seconds |
| Secure connections per 5 seconds               |
| Secure sockjs connections per 5 seconds        |
| Secure websocket connections per 5 seconds     |
