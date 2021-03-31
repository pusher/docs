---
title: Safari Certificate Expiration - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Web push guides
  key: Safari Certificate Expiration
  order: 3
---

# Safari Certificate Expiration

The certificate issued to you by Apple will expire after one year. You should replace this certificate before it expires otherwise new users will not be able to sign up for notifications and you will not be able to send notifications to any users.

You can generate a new certificate using the [Apple Developer website](https://developer.apple.com). Many steps are similar to the [Safari getting started guide](/docs/beams/getting-started/web/configure-safari). The main difference is that you should not generate a new Website Push ID (identifier). You should generate a new certificate for your existing Website Push ID. To do that, you will need to create a new certificate signing request, upload that to the Apple developer website, download the new certificate and generate a p12\. You can then upload the new p12 to the settings page for your instance on the [Beams dashboard](https://dashboard.pusher.com/beams).

> Make sure you generate a certificate for the **same Website Push ID** (identifier) as your previous certificate. If you provide a certificate with a different Website Push ID then you will no longer be able to send notifications to your existing users.
