---
title: Installation - Channels - Pusher Docs
layout: channels.njk
eleventyNavigation:
  parent: Pusher cli
  key: Installation
  order: 2
---

# Pusher CLI Installation

The Pusher CLI is a great way to improve your development experience, and the first step to using it is to install it! This document will go through the ways in which you can do so. If you're comfortable setting CLI tools up on your own, feel free to check out our [Git repo](https://github.com/pusher/pusher-cli).

## Prerequisites

- A computer running on a 64 bit architecture. We do not currently support 32 bit architectures
- A supported OS: MacOS, Linux, Windows or BSD
- An internet connection
- A Pusher account that has an API key [(in your account settings)](https://dashboard.pusher.com/accounts/api_key).

## MacOS

For MacOS users we provide a Homebrew tap that you can add to your personal Brew setup [here](http://github.com/pusher/homebrew-tap). It should then be a case of running `brew install pusher/brew/pusher` to get it, and then the `pusher` command should be available on your terminal emulator.

You can also just grab the MacOS binary from the [releases page](https://github.com/pusher/pusher-cli/releases) and add it to your path yourself.

## Linux & BSD

For Linux and BSD users we provide a number of ways to get the CLI. The easiest is to be running a Debian or Redhat package managed distro and to grab our packages from the releases page [here](https://github.com/pusher/pusher-cli/releases) and install that. The `pusher` command should now be available from your terminal emulator.

Your other option is to grab the binary and add it to your path yourself. It has no dependencies so this should just be a simple case of copying the executable to wherever you wish to store your binaries, and modifying your `.profile` to add the directory where the binary is stored to your path.

## Windows

1. You should download the Windows CLI from our [releases page](https://github.com/pusher/pusher-cli/releases). This will be a zip file that contains an executable.
2. Extract this executable and put it somewhere easy to find.
3. You can now run this binary by opening up your Powershell and typing `pusher.exe`.

You can streamline this further by adding the binary to your path; something that won't be covered here. [Here](https://www.computerhope.com/issues/ch000549.htm) is a good guide on how to do so from the good people at Windows IT Pro.

## Other platforms

The CLI is written in Golang, meaning that if your platform can compile Go, it can probably run our CLI. Feel free to either [Tweet at us](https://twitter.com/pusher) about your proposed platform or even attempt compiling for it yourself. The source code is in the [repo](https://github.com/pusher/pusher-cli).
