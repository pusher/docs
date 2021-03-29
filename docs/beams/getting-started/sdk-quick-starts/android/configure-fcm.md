---
title: Configure FCM - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Beams getting started android
  key: Configure fcm
  title: 1. Configure FCM
  order: 1
---

# Configure FCM

Pusher relies on Firebase Cloud Messaging (FCM) to deliver push notifications to Android application users on your behalf. When we deliver push notifications, we use your FCM credentials. This page guides you through the process of getting an FCM Server Key and how to provide it to Pusher.

Head over to the [Pusher dashboard](https://dashboard.pusher.com/beams) and create a new instance of Beams. After that, you can either follow the interactive quick start over there, or return here to follow the documentation steps.

### Visual walkthrough

To help you find your way around, this video mirrors the steps listed below.

<figure class="mh0 mv5 pa0 border-box">
  <video controls height="auto" style="max-width: 100%">
    <source src="/video/new_firebase_app.webm" type="video/webm" />
    <source src="/video/new_firebase_app.mp4" type="video/mp4" />
    Hey! Your browser does not support videos!
  </video>
</figure>

## Open Firebase Console

The first step is to go your [Firebase console](https://console.firebase.google.com). Sign up if you haven‘t already.

## Create a new app

> If you are using a pre-existing Firebase app, you can jump ahead to [Get Your FCM Server Key](#get-your-fcm-server-key). Otherwise you will create one now.

To create a new app, you will need to supply the name and region.

Then from your app’s Overview page, click on the Android logo and write your Android application‘s package name to register your app in Firebase.

## Download the Firebase Configuration File

Once the app is registered, you should click the button to download google-services.json.

Keep a note of the file‘s location, as eventually you will add it to your Android app‘s project on your computer.

## Get your FCM Server Key

Go to your Firebase project‘s settings page, and then go to the Cloud Messaging tab.

Now you can copy the FCM Server Key by clicking on the clipboard button.

> If you are following the quick start guide in the Pusher Beams dashboard, return to it now with your FCM Server Key.

This FCM Server Key can be saved to your Pusher Beams instance in the [dashboard](https://dashboard.pusher.com/beams).

## Where Next?

Now that you have configured FCM you can
[integrate our Android SDK into your project](/docs/beams/getting-started/sdk-quick-starts/android/sdk-integration/).
