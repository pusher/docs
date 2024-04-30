---
date: 2023-02-10
title: Pusher Beams Docs | Configuring FCM
description: Learn how to get set up with Firebase Cloud Messaging credentials and deliver event driven notifications to your Android user devices with Pusher Beams.
layout: beams.njk
eleventyNavigation:
  parent: Beams getting started android
  key: Configure fcm
  title: 1. Configure FCM
  order: 1
---

# Configure FCM

Pusher relies on Firebase Cloud Messaging (FCM) to deliver push notifications to Android application users on your behalf. When we deliver push notifications, we use your FCM credentials. This page guides you through the process of getting a FCM service account file and how to provide it to Pusher.

Head over to the [Pusher dashboard](https://dashboard.pusher.com/beams) and create a new instance of Beams. After that, you can either follow the interactive quick start over there, or return here to follow the documentation steps.

## Open Firebase Console

The first step is to go your [Firebase console](https://console.firebase.google.com). Sign up if you haven‘t already.

## Create a new app

> If you are using a pre-existing Firebase app, you can jump ahead to [Get Your Service Account JSON file](#get-your-fcm-service-account-json-file). Otherwise you will create one now.

Add a project if you haven’t already. Then create a new app, by clicking the <em>Add app</em> button.

![Screenshot of adding FCM app](./img/fcm_add_app.jpg)

Click the Android icon.

![Screenshot of selecting Android](./img/fcm_click_android.jpg)

Supply your app’s package name, then click the <em>Register app</em> button.

![Screenshot of firebase name](./img/fcm_add_firebase.jpg)

## Download the Firebase Configuration File

Once the app is registered, you should click the button to download the google-services.json.

Keep a note of the file‘s location, as eventually you will add it to your Android app‘s project on your computer.

![Screenshot of downloading config](./img/fcm_download_config.jpg)

## Get your FCM service account JSON file

Go to your Firebase project‘s settings page, and then go to the *Service Accounts* tab. 

Then, you will need to generate a new private key by clicking *Generate new private key*. 

![Generating new private key](./img/fcm_service_account_private_key.png)

This will download a service account JSON file.

> If you are following the quick start guide in the Pusher Beams dashboard, return to it now with your FCM service account file.

This FCM service account ifle can be saved to your Pusher Beams instance in the [dashboard](https://dashboard.pusher.com/beams).

## Where Next?

Now that you have configured FCM you can
[integrate our Android SDK into your project](/docs/beams/getting-started/android/sdk-integration/).
