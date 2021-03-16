---
title: Sdk integration - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation: 
  parent: Beams getting started
  key: Sdk integration
  order: 3
  title: Web
---
# Beams Web SDK Integration
 
This guide will take you through installing/initializing the Beams Web SDK in your application. 
 
# Create a Service Worker
 <Alert primary> Already have a Service Worker? Please see the [ advanced guide ](/docs/beams/guides/existing-service-worker) on integrating existing Service Workers with Beams. </Alert> 
The browser <a external="" href="https://www.w3.org/TR/push-api/"> Push API </a> requires that you handle incoming browser notifications in a <a external="" href="https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API"> Service Worker </a> hosted on your site. The steps to set up a Service Worker for your site are as follows: 
 <List order> *Create a file called service-worker.js with the following content:```js {serviceWorkerImport}```  *Upload this file to your site at the following location:```http https://your-site.com/service-worker.js``` *Open `service-worker.js` in your browser to verify that it is being served.  <Alert warning> The service worker file will only enable push notifications on pages hosted on the same domain. Avoid serving the same page from multiple domains, for example, from both https://pusher.com and https://www.pusher.com. </Alert> <Alert warning> Web push notifications only work for full HTTPS websites. The only exception is localhost to ease development. </Alert> </Item>  
# Install the SDK
 
## NPM/Yarn
 
If you are using NPM/Yarn to manage your Javascript packages, install the SDK as follows: 
 
{% snippets ['bash', 'bash'] %}
 
```bash
npm install @pusher/push-notifications-web
```
 
```bash
yarn add @pusher/push-notifications-web
```
 
{% endsnippets %}
 
And import it into your application:
 
```js
{ 'import * as PusherPushNotifications from "@pusher/push-notifications-web"' }
```
 
## Script Tag
 
If you include JavaScript into your application HTML directly, add the following script tag to the page where you're going to prompt for notifications: 
 
```html
{ '<script src="https://js.pusher.com/beams/1.0/push-notifications-cdn.js"></script>' }
```
 
The SDK will be available in the global scope as `PusherPushNotifications` 
 
# Initialize the SDK
 
Get your Beams instance ID from the Keys tab on <a external="" href="https://dashboard.pusher.com/beams"> the dashboard </a> and use the following snippet to initialize the SDK: 
 
```js
{startExample}
```
 
# Check your integration
 
When you run the code, a dialog will appear requesting permission to send notifications. After giving permission, open the browser console and check for a log line that says `Successfully registered with Beams`. This means that the web SDK has been successfully integrated into your app and the browser is ready to receive notifications <span role="img" aria-label="party popper emoji"> 🎉 </span> 
 <Alert warning> If a permission prompt does not appear, you may have to enable the notification permission in the top left of your address bar and refresh. You can find the best practices for prompting for permissions in different browsers [ here ](/docs/beams/guides/web-notification-permissions-in-firefox) . </Alert> 
# Subscribe to an interest
 
Now that the user's browser is registered, we need a way for Beams to know which notifications should be sent to them. In this guide, we will use Beams [Device Interests](/docs/beams/concepts/device-interests) . Any device subscribed to a given Device Interest will receive notifications published to that interest. 
 
Let's subscribe to the interest `hello` by adding the lines highlighted below: 
 
```bash
{subscribeExample}
```
 
You should see `Current interests: [&quot;hello&quot;]` printed to your browser console. 
 
# Send a notification
 
You are now ready to send a notification. In later steps, you will use one of the Beams server SDKs to send notifications. Before you do that, you can test your implementation by sending a notification via a HTTP request to the Beams API. We will use curl in this example, but you could use an alternative tool that allows you to make HTTP requests. 
 <List order> *Start by creating a file called `publish-body.json` with the request body for the publish. <Code language="bash" heading="JSON"> {publishBodyJsonFile}```  *Next, run the following curl command.Either export your instance ID and secret key as environment variables, or replace the variables in the command. If you don't have those keys from the previous steps, then you can find them on the <a external="" href="https://dashboard.pusher.com/beams"> dashboard </a> .```bash {curlExample}```After running the curl command, you should receive a notification in your browser <span role="img" aria-label="clap emoji"> 👏 </span> If you don't see the notification, check the [troubleshooting](#troubleshooting) section.   
# Customize your notifications
 
You may have noticed that clicking the notification opens `www.pusher.com`. This is configurable by changing the `deep_link` value in the payload. Change `deep_link` to a different URL and send a notification. Notice how clicking the notification takes you to that new URL. 
 
The full set of options is described in the [ payload reference docs ](/docs/beams/reference/publish-payloads#web-format) . 
 
# Send notifications from your server
 
Now you can send notfications from your backend using one of the [ Beams server SDKs ](/docs/beams/reference/all-libraries#server-sdks) : 
 
{% snippets ['php', 'go', 'js', 'py', 'java', 'kotlin', 'rb'] %}
 
```php
{phpWebExample}
```
 
```go
{goWebExample}
```
 
```js
{nodeWebExample}
```
 
```py
{pythonWebExample}
```
 
```java
{javaWebExample}
```
 
```kotlin
{kotlinWebExample}
```
 
```rb
{rubyWebExample}
```
 
{% endsnippets %}
 
# Where next?
  *  Read the [ guide on publishing to a specific user ](/docs/beams/guides/publish-to-specific-user/web) to learn about securely publishing to individual users  *  [Web SDK reference docs](/docs/beams/reference/web)  *  [ Web publish format ](/docs/beams/reference/publish-payloads#web-format)   <Alert primary> Anything confusing or missing? We are always looking to improve this documentation so get in touch with us at [betterbeams@pusher.com](mailto:betterbeams@pusher.com) </Alert> 
# Troubleshooting
 **Make sure you are using Chrome, Firefox, Edge or Opera** 
The SDK currently supports Chrome, Firefox, Edge and Opera.
 **Clear your browser cache** 
Ensure that your latest code changes have been loaded in your browser by performing a hard refresh (`ctrl/cmd + shift + r`) 
 **Check if "Do Not Disturb" is enabled** 
Go to your OS settings and ensure that the "Do Not Disturb" option is disabled. 
 **Check your browser notification permissions** 
Go to the settings page in your browser and ensure that the notifications permission is enabled for your site and that browser notifications have not been disabled globally. 
 **Make sure your project is HTTPS / localhost** 
Web Push requires that every resource on the page where notifications are enabled be served over HTTPS. The only exception is if the site is running on `localhost`. 
 **Restart your browser** 
We have found that some browsers sometimes need to be restarted before notification permissions can take effect. 

