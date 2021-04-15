---
title: Documentation
layout: channels.njk
eleventyNavigation:
  parent: Pusher cli
  key: Documentation
  order: 3
---

# Pusher CLI Documentation

This document describes the functionality that is currently available in the Pusher CLI tool.

## Generating an API Key.

Before you can use Pusher CLI, you need to generate an API key to allow Pusher CLI access to your account. Accounts do not by default have an API key, so please do this first.

1. Go to your [account settings page](https://dashboard.pusher.com/accounts/api_key)
2. Click the "Regenerate API key" button

## Logging into Pusher CLI

Now that your account has an API key associated with it, it's time to go set up Pusher CLI.

1. Run `pusher login` on your terminal. You should be presented with a login prompt.
2. Log in with your standard account credentials. You should see `Got your API key!` after you're done.
3. Run `pusher channels apps list` in order to verify everything went properly.

## Using Pusher CLI

In order to explore the tool, it's best to just run it and it will respond with a description of the functionality that is available to you at that time. For an overview of what it can do right now, see our [overview](/docs/channels/pusher_cli/overview) page.
