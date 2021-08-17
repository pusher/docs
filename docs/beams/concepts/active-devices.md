---
title: Pusher Beams Docs | What are active devices in Beams?
description: We consider a device to be active if you’ve asked us to send it one or more notifications within a given period.
layout: beams.njk
eleventyNavigation:
  key: Active devices
---

# Active Devices

We consider a device to be active if you've asked us to send it one or more notifications within a given period.

## Monthly Active Devices

Beams billing is based on Monthly Active Devices. For accounts on a Free plan, the most recent 30 days of unique Active Devices will be considered. For accounts on a paid plan, the billing cycle is used instead.

If a user has uninstalled your app, any notifications you try to send to them will **not** contribute to your Monthly Active Devices.

This information can be found on the dashboard, in the instance page. For example:

    <Image src="/docs/static/beams/media/active_devices_example.png" />
