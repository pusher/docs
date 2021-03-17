---
title: Integrations - Channels - Pusher Docs
layout: channels.njk
eleventyNavigation:
  parent: Miscellaneous
  key: Integrations
  order: 2
---

# Integrations

Channels has integrations with third party applications to make it easier to use Channels and get the most out of it.

> **Note: Integrations are only available to Pro plans and above.**

# Datadog

Datadog is an application performance monitoring platform. You can add Channels as an integration in order to monitor the metrics and alerts that you are interested in tracking.

In order to add Channels as an integration on Datadog:
<List order> _ Create a Datadog account or Login at <a href="https://www.datadoghq.com/" target="_blank"> datadoghq.com </a> _ Go to ‘Integrations’ inside your Datadog dashboard _ Find the <a href="https://app.datadoghq.com/account/settings#integrations/pusher" target="_blank"> Pusher integration </a> , and follow the steps on the ‘Configuration’ tab. _ Go to your Channels account settings, select the tab for <a href="https://dashboard.pusher.com/channels/integrations/stats" target="_blank">Datadog Integration</a> _ Paste your Datadog API key and save it. _ Return to your Datadog, and on the [‘Dashboards’ tab](https://app.datadoghq.com/dash/list) , select Pusher to configure your dashboard, seen below. <Image src="/docs/static/channels/media/screenshot-channels-dashboard.png" alt="Pusher Channels dashboard in Datadog" />

# Librato

Librato is a application performance monitoring platform. You can add Channels as an integration in order to monitor the metrics and alerts that you are interested in tracking.

In order to add Pusher as an integration on Librato, you'll need a Librato account. If you don't have one, you can create one [here](https://metrics.librato.com/sign_up).

- Access your Librato tokens page, [here](https://metrics.librato.com/account/tokens). _ Generate a new 'Record Only' or 'Full Access' token. ** If you provide us with a full access token, we can set you up with a pre-built dashboard. ** _ Go to your Pusher account settings, select the tab for <a href="https://dashboard.pusher.com/channels/integrations/stats" target="_blank">Librato Integration</a> _ Paste your Librato Email and newly created API key and save it. _ Return to your Librato dashboard, and on the [Metrics tab](https://metrics.librato.com/s/metrics), you'll see your new Pusher Channels metrics with the `pusher.` namespace.  
  If you provided us with a full access token, you can go to the [Spaces tab](https://metrics.librato.com/s/spaces) and you'll see a new dashboard (`Pusher`) which is already setup to give you some insight on the metrics we're sending. You can modify this dashboard to your liking.
  <Image src="/docs/static/channels/media/pusher-metrics.png" alt="Channels Metrics in Librato" /> <Image src="/docs/static/channels/media/channels-space.png" alt="Librato Space" />

## Metrics

This is a list of metrics sent to our integrations. An aggregate per `app_id` is sent around every 5 seconds.

    <Table class="table table-striped">
      <thead>
        <tr>
          <th>Provided metrics</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Messages sent over time</td>
        </tr>
        <tr>
          <td>API Requests sent over time</td>
        </tr>
        <tr>
          <td>Webhooks sent over time</td>
        </tr>
        <tr>
          <td>Presence events sent over time</td>
        </tr>
        <tr>
          <td>Broadcast messages sent over time</td>
        </tr>
        <tr>
          <td>Client events received sent over time</td>
        </tr>
        <tr>
          <td>Client events sent over time</td>
        </tr>
        <tr>
          <td>Average message size</td>
        </tr>
        <tr>
          <td>Maximum message size</td>
        </tr>
        <tr>
          <td>95th percentile message size</td>
        </tr>
        <tr>
          <td>Messages count sent over time</td>
        </tr>
        <tr>
          <td>Median message size</td>
        </tr>
        <tr>
          <td>Concurrent connections per second</td>
        </tr>
        <tr>
          <td>Non-secure connections per 5 seconds</td>
        </tr>
        <tr>
          <td>Non-secure sockjs connections per 5 seconds</td>
        </tr>
        <tr>
          <td>Non-secure websocket connections per 5 seconds</td>
        </tr>
        <tr>
          <td>Secure connections per 5 seconds</td>
        </tr>
        <tr>
          <td>Secure sockjs connections per 5 seconds</td>
        </tr>
        <tr>
          <td>Secure websocket connections per 5 seconds</td>
        </tr>
      </tbody>
    </Table>
