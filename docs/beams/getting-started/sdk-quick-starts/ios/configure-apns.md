---
title: Configure APNS - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Beams getting started iOS
  key: Configure apns
  title: 1. Configure APNS
  order: 1
---

# Configure APNS

Pusher relies on Apple Push Notification service (APNs) to deliver push notifications to iOS application users on your behalf. When we deliver push notifications, we use your APNs Key. This page guides you through the process of getting an APNs Key and how to provide it to Pusher.

<figure class="mh0 mv5 pa0 border-box">
  <video controls height="auto" style="max-width: 100%">
    <source src="/video/configure-apns.webm" type="video/webm" />
    <source src="/video/configure-apns.mp4" type="video/mp4" />
    Hey! Your browser does not support videos!
  </video>
</figure>

## Open Apple Developer Account

Login into your [Apple Developer Account](https://developer.apple.com/account).

## Create a New Key

Navigate to the [keys](https://developer.apple.com/account/resources/authkeys/add) section in your Apple Developer Center, where you’ll create an APNs Key. Enter the key name and make sure that APNs checkbox is checked. Press the <em>continue</em> button in order to proceed to the step 3.

> In order to generate the key, you'll either need to be an **Account Holder** or **Admin**, **App Manager** with _Certificates, Identifiers & Profiles_ access enabled. You can learn more about the roles, [here](https://developer.apple.com/support/roles/).

## Confirm your key configuration

If information entered in step 2 is correct proceed by pressing the <em>confirm</em> button.

## Download the key

Press <em>download</em> button to download the key. Finalize the process and press the <em>done</em> button.

Now go to the Pusher Beams instance in the [dashboard](https://dashboard.pusher.com/beams), and use this APNs Key to configure your iOS integration.

## Where Next?

Now that you have configured APNs you can
[integrate our iOS SDK](/docs/beams/getting-started/sdk-quick-starts/ios/sdk-integration/).
