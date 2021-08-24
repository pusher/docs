---
date: 2021-08-01
title: Pusher Channels Docs | Other resources
description: A collection of useful resources from other users and writers on the web to help you get set up with Channels.
layout: channels.njk
eleventyNavigation:
  parent: Miscellaneous
  key: Resources
  order: 3
---

# Channels resources on the web

A collection of Channels resources from around the web in one place. [Let us know](mailto:support@pusher.com) if you have anything to add.

#### Articles/presentations/code

** [Backbone Live](https://github.com/bluedevil2k/backbone-live) **

**Backbone Live Models and Collections**

These two Backbone mixins aim to make working with Channels even easier. It keeps your Models and Collections always up-to-date by capturing Channels events from the server. It also adheres to the "convention over configuration" mentality, and prescribes the event names you should use with your Channels events to reduce the amount of code needed.

** [Publishing Realtime Updates from Apex with Pusher](http://blogs.developerforce.com/developer-relations/2011/10/publishing-real-time-updates-from-apex-with-pusher.html) **

**In this tutorial:**

- Apex _ Force _ Java \* Visualforce  
  Apex provides a complete set of features for building business applications – including data models and objects to manage data, a workflow engine for managing collaboration of that data between users, a user interface model to handle forms and other interactions, and a Web services API for programmatic access and integration. You can now do this in realtime, using Pusher Channels.

By [Pat Patterson](http://blogs.developerforce.com/developer-relations/author/pat-patterson).

** [Managing and responding to the status of your Channels connection](https://blog.pusher.com/2011/7/12/connections-states) **

**In this tutorial:**

- JavaScript _ library _ Connection states  
  Channels has a rich JavaScript client that handles the nitty gritty of WebSocket connections. It emits events to expose the connection's status. With this functionality, you can tell your users whether the realtime features of your site are available and, if they are not, if and when they might become available.

** [Check authentication signatures](http://www.leggetter.co.uk/pusher/help/auth_checker/) **

**In the helper:**

- Publisher _ HTTP API _ JavaScript _ Private _ Presence  
  A utility written in JavaScript that lets you check what your authentication message and JSON should be given a `channel_name`, `socket_id` and optionally some `channel_data`. This can be helpful if your are having trouble authenticating subscription to a private or presence channel.

** [Catch Authentication Errors](https://blog.pusher.com/2011/8/10/catching-your-private-and-presence-authentication-errors) **

**In the blog post:**

- JavaScript _ Authentication _ Private Channels \* Presence Channels  
  A short blog post showing how to catch errors which occur when calling authentication endpoints to authenticate a private or presence channel subscription when using the Channels JavaScript library.

[Implement Live Web Chat With ASP.NET MVC 4, Pusher Channels and jQuery (Part 1)](http://www.geekbeing.com/2012/05/18/implement-live-web-chat-part-1/)

[How to setup growl notifications for Beanstalk Deployments](http://www.joshstrange.com/2012/06/14/how-to-setup-growl-notifications-for-beanstalk-deployments-updated/)

[Making Backbone Applications Realtime With Pusher Channels](http://blog.gazler.com/blog/2012/04/02/making-backbone-applications-realtime-with-pusher/)

[JSONp authentication for channels](https://blog.pusher.com/2010/10/26/jsonp-authentication-for-private-channels)

**In the blog post:**

- JavaScript _ Authentication _ Private Channels _ Presence Channels _ Ruby  
  This post shows how to use the JSONp authentication using the Channels JavaScript library and shows how to execute the callback in in Ruby.

[Adding Channels to Truestory (Rails tutorial)](http://blog.new-bamboo.co.uk/2010/5/12/integrating-pusher-into-a-complex-app-in-one-day) <br /> By [Oliver](http://new-bamboo.co.uk)

[How to Push (PHP tutorial)](http://blog.tarnfeldweb.com/2010/05/how-to-push/) <br /> By [Tom Arnfeld](http://tarnfeldweb.com/ "Tom Arnfeld")

[Channels and ColdFusion](http://www.bennadel.com/blog/1954-Using-ColdFusion-With-Pusher-A-Notification-Service-Powered-By-HTML5-WebSockets.htm) <br /> By [Ben Nadel](http://www.bennadel.com/)

[Pushing events to your iPhone using WebSockets and Pusher](http://lukeredpath.co.uk/blog/pushing-events-to-your-iphone-using-websockets-and-pusher.html "Pushing events to your iPhone using WebSockets and Pusher") <br /> By [Luke Redpath](http://lukeredpath.co.uk/ "Luke Redpath")

[Basic private channel authentication using PHP](https://gist.github.com/1180618)

**In the code:**

- PHP _ Code _ Authentication \* Private Channels  
  A simple example of how to implement an authentication endpoint in PHP which authenticates a private channel subscription. The code sample uses the [PHP Channels Server library](/docs/channels/channels_libraries/libraries) to generate the authentication signature and JSON.
