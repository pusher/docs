---
title: Javascript realtime chart
layout: channels.njk
eleventyNavigation:
  parent: Use case quick starts
  key: Javascript realtime chart
  order: 1
---

# JavaScript realtime chart quick start

<figure class="mh0 mv5 pa0 border-box">
  <video src="/video/javascript-realtime-chart.mp4" alt="Video of JavaScript realtime chart" autoPlay muted loop="loop" height="auto" style="max-width: 100%"></video>
</figure>

After following this guide you will have a chart in a webpage that you can publish new data-points to from your server. If you have any questions [get in touch](https://pusher.com/support).

# Get your free API keys

<a href="https://dashboard.pusher.com/accounts/sign_up" target="_blank">Create an account</a> , then create a Channels app. Go to the "Keys" page for that app, and make a note of your `app_id`, `key`, `secret` and `cluster`.

# Create your webpage

We’ll make the chart UI using [Google Charts](https://developers.google.com/chart) (but you can use any common charting library). Copy-paste the following code into `index.html`. Replace `'APP_KEY'` and `'APP_CLUSTER'` with the values from your dashboard. Then open `index.html` in your browser:

```html
<html>
  <body>
    <div id="chart_div" style="width: 100%; height: 500px;"></div>
    <script src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="https://js.pusher.com/${process.env.CURRENT_JS_VERSION}/pusher.min.js"></script>
    <script>
      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(() => {
        // Instead of hard-coding the initial table data,
        // you could fetch it from your server.
        const dataTable = google.visualization.arrayToDataTable([
          ["Year", "Price"],
          [2013, 400],
          [2014, 460],
        ]);
        const chart = new google.visualization.AreaChart(
          document.getElementById("chart_div")
        );
        const options = {
          title: "1 BTC in USD",
          hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
          vAxis: { minValue: 0 },
          animation: { duration: 100, easing: "out" },
        };
        chart.draw(dataTable, options);
        let year = 2015;
        Pusher.logToConsole = true;
        const pusher = new Pusher(
          "APP_KEY", // Replace with 'key' from dashboard
          {
            cluster: "APP_CLUSTER", // Replace with 'cluster' from dashboard
            forceTLS: true,
          }
        );
        const channel = pusher.subscribe("price-btcusd");
        channel.bind("new-price", (data) => {
          const row = [year++, data.value];
          dataTable.addRow(row);
          chart.draw(dataTable, options);
        });
      });
    </script>
  </body>
</html>
```

This page is now waiting for `new-price` events on the `price-btcusd` channel. When an event comes in, it will extract the `value` field and add this as a new data point on the right of the chart!

# Trigger events from your server

Your server should trigger events called `new-price` on a channel called `price-btcusd`. Each example below uses one of the [official Pusher Channels server SDKs](/docs/channels/channels_libraries/libraries) to trigger the events.

{% snippets ['js', 'php', 'py'] %}

```js
// First, run 'npm install pusher'
const Pusher = require("pusher");
const pusher = new Pusher({
  appId: "APP_ID", // Replace with 'app_id' from dashboard
  key: "APP_KEY", // Replace with 'key' from dashboard
  secret: "APP_SECRET", // Replace with 'secret' from dashboard
  cluster: "APP_CLUSTER", // Replace with 'cluster' from dashboard
  useTLS: true,
});
// Trigger a new random event every second. In your application,
// you should trigger the event based on real-world changes!
setInterval(() => {
  pusher.trigger("price-btcusd", "new-price", {
    value: Math.random() * 5000,
  });
}, 1000);
```

```php
<?php
// First, run 'composer require pusher/pusher-php-server'
require __DIR__ . '/vendor/autoload.php';

$pusher = new Pusher\Pusher(
  "APP_KEY", // Replace with 'key' from dashboard
  "APP_SECRET", // Replace with 'secret' from dashboard
  "APP_ID", // Replace with 'app_id' from dashboard
  array(
    'cluster' => 'APP_CLUSTER' // Replace with 'cluster' from dashboard
  )
);
// Trigger a new random event every second. In your application,
// you should trigger the event based on real-world changes!
while (true) {
  $pusher->trigger('price-btcusd', 'new-price', array(
    'value' => rand(0, 5000)
  ));
  sleep(1);
}
```

```py
# First, run 'pip install pusher'
import pusher
import random
import time pusher_client = pusher.Pusher(
  app_id='APP_ID', # Replace with 'app_id' from dashboard
  key='APP_KEY', # Replace with 'key' from dashboard
  secret='APP_SECRET', # Replace with 'secret' from dashboard
  cluster='APP_CLUSTER', # Replace with 'cluster' from dashboard
  ssl=True
)
# Trigger a new random event every second.In your application,
# you should trigger the event based on real-world changes!
while True:
  pusher_client.trigger('price-btcusd', 'new-price', {
    'value': random.randint(0, 5000)
  })
  time.sleep(1)
```

{% endsnippets %}

> If there isn't an example in your language, have a look on our [server SDKs](/docs/channels/channels_libraries/libraries) page, or [get in touch](https://pusher.com/support).

Finally, go back to your browser to see the realtime data appearing in the chart!

# Where next?

- If you had any trouble, [get in touch](https://pusher.com/support).
- For the core concepts, read [Understanding Pusher Channels](/docs/channels).
- For the features this quick start uses, see [connections](/docs/channels/using_channels/connection) , [publish/subscribe over channels](/docs/channels/using_channels/channels) , and [the JavaScript client library](/docs/channels/using_channels/client-api-overview).
