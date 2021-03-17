---
title: Configure apns - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Beams getting started ios
  key: Configure apns
  title: 1. Configure APNS
  order: 1
---

# Configure APNS

Pusher relies on Apple Push Notification service (APNs) to deliver push notifications to iOS application users on your behalf. When we deliver push notifications, we use your APNs Key. This page guides you through the process of getting an APNs Key and how to provide it to Pusher.
<Video controls innerRef={c => (this.videoEl = c)}> <source src="/docs/static/beams/media/configure-apns.webm" type="video/webm" /> <source src="/docs/static/beams/media/configure-apns.mp4" type="video/mp4" /> Hey! Your browser does not support videos! </Video> <br />

# Open Apple Developer Account

Login into your [Apple Developer Account](https://developer.apple.com/account) .

# Create a New Key

Navigate to the [keys](https://developer.apple.com/account/resources/authkeys/add) section in your Apple Developer Center, where you'll <Anchor role="button" onClick={this.videoGoTo(0)}> create {videoPlayIcon} </Anchor> an APNs Key. Enter the key name and make sure that APNs checkbox is checked. Press the <em>continue</em> button in order to proceed to the step 3.
<Alert primary> In order to generate the key, you'll either need to be an **Account Holder** or **Admin**, **App Manager** with _Certificates, Identifiers & Profiles_ access enabled. You can learn more about the roles, <a external="" href="https://developer.apple.com/support/roles/">here</a> . </Alert>

# Confirm your key configuration

If information entered in step 2 is correct proceed by pressing the <Anchor role="button" onClick={this.videoGoTo(9)}> <em>confirm</em> {videoPlayIcon} </Anchor> button.

# Download the key

Press <Anchor role="button" onClick={this.videoGoTo(11)}> <em>download</em> {videoPlayIcon} </Anchor> button to download the key. Finalize the process and press the <em>done</em> button.

Now go to the Pusher Beams instance in the <a external="" href="https://dashboard.pusher.com/beams">dashboard</a> , and use this APNs Key to configure your iOS integration.

# Where Next?

        Now that you have configured APNs you can
        [integrate our iOS SDK]({urls.ios.step2}).
