---
title: Existing service worker - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation: 
  parent: Web push guides
  key: Existing service worker
  order: 1
---
# Using an existing service worker in the Web SDK
 
The Beams Web SDK requires access to a Service Worker. By default, the SDK will register a Service Worker on your behalf. However, you may already be using Service Workers in your application. ** If you are only using Service Workers in your app with Beams, please ignore this guide. ** 
 
##  Import the Beams Service Worker in your existing Service Worker file 
 <Alert primary>Only one service worker per domain can be registered.</Alert> 
If you already have a Service Worker file hosted on your domain you can integrate the Beams Service Worker by adding an import line at the top of the file: 
 
```js
{existingServiceWorkerImport}
```
 
## Initialize the SDK
 
Once you have imported the Beams Service Worker library, you will need to pass your existing Service Worker registration to the Beams Web SDK when it is initialized: 
 
```js
{example}
```
 
## Next steps
 
Now continue with our main guide from the [Check your integration](/docs/beams/getting-started/web/sdk-integration#check-your-integration) section. 

