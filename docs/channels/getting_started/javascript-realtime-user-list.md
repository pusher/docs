---
title: Javascript realtime user list
layout: channels.njk
eleventyNavigation:
  parent: Use case quick starts
  key: Javascript realtime user list
  order: 2
---

# JavaScript realtime user list quick start

<figure class="mh0 mv5 pa0 border-box">
  <video src="/docs/static/video/javascript-realtime-user-list.mp4" alt="Video of JavaScript realtime chart" autoPlay muted loop="loop" height="auto" style="max-width: 100%"></video>
</figure>

After following this guide you will have a user list in a webpage that updates when users open and close the page. If you have any questions [get in touch](https://pusher.com/support).

# Get your free API keys

<a href="https://dashboard.pusher.com/accounts/sign_up" target="_blank">Create an account</a> , then create a Channels app. Go to the "Keys" page for that app, and make a note of your `app_id`, `key`, `secret` and `cluster`.

# Create your webpage

Copy-paste the following code into `index.html`. Replace `'APP_KEY'` and `'APP_CLUSTER'` with the values from your dashboard. Then open `index.html` in your browser:

```html
<!-- index.html -->
<html>
  <body>
    <div id="user_list"></div>
    <script src="https://js.pusher.com/7.0.3/pusher.min.js"></script>
    <script>
      Pusher.logToConsole = true;
      const pusher = new Pusher(
        "APP_KEY", // Replace with 'key' from dashboard
        {
          cluster: "APP_CLUSTER", // Replace with 'cluster' from dashboard
          forceTLS: true,
          authEndpoint: "http://localhost:5000/pusher/auth",
        }
      );
      if (!document.cookie.match("(^|;) ?user_id=([^;]*)(;|$)")) {
        // Primitive auth! This 'user_id' cookie is read by your auth endpoint,
        // and used as the user_id in the subscription to the 'presence-quickstart'
        // channel. This is then displayed to all users in the user list.
        // In your production app, you should use a secure auth system.
        document.cookie = "user_id=" + prompt("Your initials:");
      }
      const channel = pusher.subscribe("presence-quickstart");
      const hashCode = (s) =>
        s.split("").reduce((a, b) => {
          a = (a << 5) - a + b.charCodeAt(0);
          return a & a;
        }, 0);
      function addMemberToUserList(memberId) {
        userEl = document.createElement("div");
        userEl.id = "user_" + memberId;
        userEl.innerText = memberId;
        userEl.style.backgroundColor =
          "hsl(" + (hashCode(memberId) % 360) + ",70%,60%)";
        document.getElementById("user_list").appendChild(userEl);
      }
      channel.bind("pusher:subscription_succeeded", () =>
        channel.members.each((member) => addMemberToUserList(member.id))
      );
      channel.bind("pusher:member_added", (member) =>
        addMemberToUserList(member.id)
      );
      channel.bind("pusher:member_removed", (member) => {
        const userEl = document.getElementById("user_" + member.id);
        userEl.parentNode.removeChild(userEl);
      });
    </script>
    <style>
      body {
        margin: 1em;
      }
      #user_list div {
        float: right;
        margin-left: -12px;
        font-family: sans-serif;
        text-align: center;
        height: 40px;
        width: 40px;
        line-height: 40px;
        border-radius: 50%;
        border: 3px solid white;
        color: white;
      }
    </style>
  </body>
</html>
```

This page will only work with an "auth endpoint" at `http://localhost:5000/pusher/auth`. The auth endpoint provides the `user_id` for each user. You'll create this auth endpoint next.

# Create your auth endpoint server

Your server should provide an endpoint `/pusher/auth` which reads the request's cookies to identify the user, then provides an auth token containing the user's `user_id`. Each example below uses one of the [official Pusher Channels server SDKs](/docs/channels/channels_libraries/libraries).

```js
// server.js

// First, run 'npm install pusher express body-parser cookie-parser'
// Then run this file with 'node server.js'
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const Pusher = require("pusher");
const pusher = new Pusher({
  appId: "APP_ID", // Replace with 'app_id' from dashboard
  key: "APP_KEY", // Replace with 'key' from dashboard
  secret: "APP_SECRET", // Replace with 'secret' from dashboard
  cluster: "APP_CLUSTER", // Replace with 'cluster' from dashboard
  useTLS: true,
});
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});
app.post("/pusher/auth", (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  // Primitive auth: the client self-identifies. In your production app,
  // the client should provide a proof of identity, like a session cookie.
  const user_id = req.cookies.user_id;
  const presenceData = { user_id };
  const auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}!`));
```

> If there isn't an example in your language, have a look on our [server SDKs](/docs/channels/channels_libraries/libraries) page, or [get in touch](https://pusher.com/support).

Open `http://localhost:5000`. Log in by entering your initials in the prompt. Your user should appear in the top-right. For more users, open "incognito" browser windows.

# Where next?

- If you had any trouble, [get in touch](https://pusher.com/support).
- For the core concepts, read [Understanding Pusher Channels](/docs/channels).
- For the features this quick start uses, see [connections](/docs/channels/using_channels/connection), [presence channels](/docs/channels/using_channels/presence-channels), and [the JavaScript client library](/docs/channels/using_channels/client-api-overview).
