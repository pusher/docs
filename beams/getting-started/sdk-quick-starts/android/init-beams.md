---
title: Init beams - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation:
  parent: Beams getting started android
  key: Init beams android
  title: 3. Initialisze Beams
  order: 3
---

# Initialize Beams

After you have [added the required dependencies]({urls.android.step2}) , it's time to start Pusher Beams in your project.

# Import Pusher Beams

Go to the Activity or Application class where you want to use Beams and import the SDK:

```java
{pnImport}
```

# Connect to Pusher

Add this line to connect the device to your Beams instance:

```java
{pnConnect}
```

<Alert primary> Your instance ID can be found in the <a external="" href="https://dashboard.pusher.com/beams">dashboard</a> . </Alert>

# Add a device interest

Finally, add this line to subscribe to an [interest]({urls.interests}) so that your server can send notifications to this device.

```java
{pnAddDeviceInterest}
```

# Where Next?

Now that you have initialized Pusher Beams, why not [send a notification]({urls.android.step4})?
