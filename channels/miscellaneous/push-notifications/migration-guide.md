---
title: Migration guide - Channels - Pusher Docs
layout: channels.njk
eleventyNavigation:
  parent: Push notifications
  key: Migration guide
  order: 1
---

# Push Notifications Migration Guide

This is a guide to ease your migration from Pusher’s beta push notifications service to Pusher Beams.

The legacy Push Notifications [BETA] feature of Pusher Channels has been deprecated. Furthermore, as of March 31st 2021, Apple will no longer be supporting the APNs protocol this service relies on. This means that notifications can no longer be sent to iOS devices. This guide will take you through an automated migration process to our current push notifications service - Pusher Beams.

Pusher Beams offers API/SDKs for delivering push notifications with Interests for segmenting users into pub/sub topics. We are also offering some brand new features: Authenticated Users, delivery/open rate tracking, performance that’s built to scale, and iOS tokens which never expire.

Today we will show you how to migrate your iOS and Android device tokens and interest subscriptions from the push notifications [BETA] (which was released as part of the Pusher Channels SDKs) to Pusher Beams.

      *  <a href="/docs/channels/push_notifications/server-migration-guide"> **Push Notifications Server Migration Guide** </a>
      *  <a href="/docs/channels/push_notifications/ios-migration-guide"> **Push Notifications iOS Migration Guide** </a>
      *  <a href="/docs/channels/push_notifications/android-migration-guide"> **Push Notifications Android Migration Guide** </a>
