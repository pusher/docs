---
title: Configure fcm - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Beams getting started android
  key: Configure fcm
  title: 1. Configure FCM
  order: 1
---

# Configure FCM

Pusher relies on Firebase Cloud Messaging (FCM) to deliver push notifications to Android application users on your behalf. When we deliver push notifications, we use your FCM credentials. This page guides you through the process of getting an FCM Server Key and how to provide it to Pusher.

Head over to the <a external="" href="https://dashboard.pusher.com/beams">Pusher dashboard</a> and create a new instance of Beams. After that, you can either follow the interactive quick start over there, or return here to follow the documentation steps.
<br />

## Visual walkthrough

To help you find your way around, this video mirrors the steps listed below.
<Video controls innerRef={c => (this.videoEl = c)}> <source src="/docs/static/beams/media/new_firebase_app.webm" type="video/webm" /> <source src="/docs/static/beams/media/new_firebase_app.mp4" type="video/mp4" /> Hey! Your browser does not support videos! </Video>

# Open Firebase Console

The first step is to go your [Firebase console](https://console.firebase.google.com). Sign up if you haven't already.

# Create a new app

<Alert primary> If you are using a pre-existing Firebase app, you can jump ahead to [Get Your FCM Server Key](#get-your-fcm-server-key). Otherwise you will create one now. </Alert> <br />
To create a new app, you'll need to <Play time={3} seek={this.seek}> supply the name and region </Play> .

Then from your app's Overview page, <Play time={13} seek={this.seek}> click on the Android logo </Play> and write your <Play time={18} seek={this.seek}> Android application's package name </Play> to register your app in Firebase.

# Download the Firebase Configuration File

Once the app is registered, you should click the button to <Play time={25} seek={this.seek}> download google-services.json </Play> .

Keep a note of the file's location, as eventually you will add it to your Android app's project on your computer.

# Get your FCM Server Key

Go to your <Play time={38} seek={this.seek}> Firebase project's settings page </Play> , and then go to the <Play time={46} seek={this.seek}> Cloud Messaging tab </Play> .<br /> Now you can copy the FCM Server Key by clicking on the <Play time={51} seek={this.seek}> clipboard button </Play> .
<Alert success> If you are following the quick start guide in the Pusher Beams dashboard, return to it now with your FCM Server Key. </Alert> <br />
This FCM Server Key can be saved to your Pusher Beams instance in the <a external="" href="https://dashboard.pusher.com/beams">dashboard</a> .

# Where Next?

        Now that you have configured FCM you can
        [integrate our Android SDK into your project]({urls.android.step2})
        .
