---
title: Libraries
layout: channels.njk
eleventyNavigation:
  parent: Channels libraries
  key: Api libraries
  order: 1
  title: API libraries
---

# Channels API libraries

Sending and receiving messages using the Channels API requires libraries. In this section you'll find libraries for a variety of platforms.

Channels libraries are divided into 2 categories:

- **Client**
  Client libraries predominantly consume messages using a [WebSocket interface](/docs/channels/library_auth_reference/pusher-websockets-protocol). Think of them as _subscribers_ , although it's possible to publish messages using [Client Events](/docs/channels/using_channels/events#triggering-client-events).
- **Server**
  Server libraries publish messages, request information using [our HTTP API](/docs/channels/library_auth_reference/rest-api), [authenticate](/docs/channels/server_api/authenticating-users) channel subscriptions, and handle [Webhook](/docs/channels/server_api/webhooks) calls. Think of them as _publishers_, although it's possible to subscribe to messages using [Client Event Webhooks](/docs/channels/server_api/webhooks#client-events).

## Official libraries

The following libraries are updated and supported by Pusher.

### Client libraries

| Library                             | Maintainer                                       | Docs                                                                 | Code                                                                                  |
| ----------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Android (uses Java library)         | Pusher                                           | [Docs](https://github.com/pusher/pusher-websocket-android)           | [pusher/pusher-websocket-android](https://github.com/pusher/pusher-websocket-android) |
| AngularJS (uses JavaScript library) | Pusher                                           | [Docs](https://github.com/pusher/pusher-angular)                     | [pusher/pusher-angular](https://github.com/pusher/pusher-angular)                     |
| iOS: Swift and Objective-C          | Pusher                                           | [Docs](https://github.com/pusher/pusher-websocket-swift)             | [pusher/pusher-websocket-swift](https://github.com/pusher/pusher-websocket-swift)     |
| iOS: Objective-C                    | Pusher [Luke Redpath](http://lukeredpath.co.uk/) | [Docs](/docs/channels/getting_started/ios)                           | [pusher/libPusher](https://github.com/pusher/libPusher)                               |
| Java                                | Pusher                                           | [Docs](https://github.com/pusher/pusher-websocket-java#installation) | [pusher/pusher-websocket-java](https://github.com/pusher/pusher-websocket-java)       |
| JavaScript                          | Pusher                                           | [Docs](/docs/channels/getting_started/javascript)                    | [pusher/pusher-js](https://github.com/pusher/pusher-js)                               |
| .NET                                | Pusher                                           | [Docs](https://github.com/pusher/pusher-websocket-dotnet)            | [pusher/pusher-websocket-dotnet](https://github.com/pusher/pusher-websocket-dotnet)   |
| Unity                               | Pusher                                           | [Docs](https://github.com/pusher/pusher-websocket-unity)             | [pusher/pusher-websocket-unity](https://github.com/pusher/pusher-websocket-unity)     |

## Official server libraries

| Library | Maintainer | Docs                                                                           | Code                                                                      |
| ------- | ---------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------- |
| Go      | Pusher     | [Docs](http://godoc.org/github.com/pusher/pusher-http-go)                      | [pusher/pusher-http-go](https://github.com/pusher/pusher-http-go)         |
| Java    | Pusher     | [Docs](https://github.com/pusher/pusher-http-java#installation)                | [pusher/pusher-http-java](https://github.com/pusher/pusher-http-java)     |
| .NET    | Pusher     | [Docs](https://github.com/pusher/pusher-http-dotnet#installation)              | [pusher/pusher-http-dotnet](https://github.com/pusher/pusher-http-dotnet) |
| Node.js | Pusher     | [Docs](https://github.com/pusher/pusher-http-node#installation)                | [pusher/pusher-http-node](https://github.com/pusher/pusher-http-node)     |
| PHP     | Pusher     | [Docs](https://github.com/pusher/pusher-http-php#installation)                 | [pusher/pusher-http-php](https://github.com/pusher/pusher-http-php)       |
| Python  | Pusher     | [Docs](https://github.com/pusher/pusher-http-python#installation)              | [pusher/pusher-http-python](http://github.com/pusher/pusher-http-python)  |
| Ruby    | Pusher     | [Docs](https://github.com/pusher/pusher-http-ruby#installation--configuration) | [pusher/pusher-http-ruby](https://github.com/pusher/pusher-http-ruby)     |
| Swift [[BETA](https://pusher.com/docs/lab#beta-features)] | Pusher  | [Docs](https://github.com/pusher/pusher-http-swift#installation)  | [pusher/pusher-http-swift](https://github.com/pusher/pusher-http-swift) |

# Community libraries

These libraries are built by members of the Pusher Channels Developer Community. They are potentially incomplete and are therefore not officially supported by Pusher. We recommend that you first reach out to the maintainer of the library before contacting Pusher support.

## ActionScript

| Library                     | Type   | Maintainer                                 | Docs                                                         | Code                                                                                              |
| --------------------------- | ------ | ------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| PusherAS                    | Client | [rocketengine.io](http://rocketengine.io/) | [Docs](https://github.com/rocketengineio/PusherAS/#pusheras) | [rocketengineio/PusherAS](https://github.com/rocketengineio/PusherAS/)                            |
| Pusher-ActionScript-Library | Client | [Shawn Makison](http://squarefactor.com/)  |                                                              | [smakinson/Pusher-ActionScript-Library](https://github.com/smakinson/Pusher-ActionScript-Library) |

## Android

also see [Java](#java)

| Library                 | Type   | Maintainer                             | Docs                                                                         | Code                                                                                          |
| ----------------------- | ------ | -------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| titanium_pusher_android | Client | [Ruben Fonseca](http://blog.0x82.com/) | [Docs](https://github.com/pusher-community/titanium_pusher_android#building) | [pusher/titanium_pusher_android](https://github.com/pusher-community/titanium_pusher_android) |

## Arduino

| Library             | Type   | Maintainer                                    | Docs                                                                              | Code                                                                            |
| ------------------- | ------ | --------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| ArduinoPusherClient | Client | [Kevin Rohling](http://www.kevinrohling.com/) | [Docs](https://github.com/krohling/ArduinoPusherClient#installation-instructions) | [krohling/ArduinoPusherClient](https://github.com/krohling/ArduinoPusherClient) |

## C++

| Library                  | Type              | Maintainer                                         | Docs                                                        | Code                                                                    |
| ------------------------ | ----------------- | -------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------- |
| niv/pusher-websocket-cpp | Client            | [niv](https://github.com/niv)                      | [Docs](https://github.com/niv/pusher-websocket-cpp)         | [niv/pusher-websocket-cpp](https://github.com/niv/pusher-websocket-cpp) |
| pusherpp                 | Server            | [Mazen Abdulaziz](https://github.com/parallelfold) | [Docs](https://github.com/parallelfold/pusherpp#installing) | [parallelfold/pusherpp](https://github.com/parallelfold/pusherpp)       |
| BenPope/pusher-cpp       | Client and Server | [BenPope](https://github.com/BenPope)              | [Docs](https://github.com/BenPope/pusher-cpp)               | [BenPope/pusher-cpp](https://github.com/BenPope/pusher-cpp)             |

## Clojure

| Library    | Type   | Maintainer                                   | Docs                                                   | Code                                                        |
| ---------- | ------ | -------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------- |
| clj-pusher | Server | [Bartosz Blimke](https://github.com/bblimke) | [Docs](https://github.com/bblimke/clj-pusher#building) | [bblimke/clj-pusher](https://github.com/bblimke/clj-pusher) |

## Coldfusion

| Library    | Type   | Maintainer                            | Docs                                                                                                 | Code                                                          |
| ---------- | ------ | ------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Pusher.cfc | Server | [Ben Nadel](http://www.bennadel.com/) | [Docs](https://github.com/bennadel/Pusher.cfc#pushercfc---pushercom-rest-api-library-for-coldfusion) | [bennadel/Pusher.cfc](https://github.com/bennadel/Pusher.cfc) |

## Dart

| Library     | Type   | Maintainer                                    | Docs                                                                   | Code                                                      |
| ----------- | ------ | --------------------------------------------- | ---------------------------------------------------------------------- | --------------------------------------------------------- |
| Dart Pusher | Server | [Adao Junior](https://github.com/adaojunior/) | [Docs](http://www.dartdocs.org/documentation/pusher/latest/index.html) | [adaojunior/pusher](https://github.com/adaojunior/pusher) |

## Elixir

| Library | Type   | Maintainer                                    | Docs                                            | Code                                                      |
| ------- | ------ | --------------------------------------------- | ----------------------------------------------- | --------------------------------------------------------- |
| Pushest | Client | [Tomas Koutsky](https://github.com/stepnivlk) | [Docs](https://hexdocs.pm/pushest/Pushest.html) | [stepnivlk/pushest](https://github.com/stepnivlk/pushest) |

## Flutter

| Library        | Type   | Maintainer                                | Docs                                                                    | Code                                                                              |
| -------------- | ------ | ----------------------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| flutter_pusher | Client | [Genert](https://github.com/genert)       | [Docs](https://github.com/ninjasolutions/flutter_pusher#how-to-install) | [ninjasolutions/flutter_pusher](https://github.com/ninjasolutions/flutter_pusher) |
| pusher_client  | Client | [chinloyal](https://github.com/chinloyal) | [Docs](https://github.com/chinloyal/pusher_client#installation)         | [chinloyal/pusher_client](https://github.com/chinloyal/pusher_client)             |

## Grails

see [Groovy](#groovy)

## Groovy

| Library          | Type   | Maintainer                              | Docs                                                           | Code                                                                    |
| ---------------- | ------ | --------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------- |
| groovy-libpusher | Server | [zenuevo](https://github.com/zenuevo)   | [Docs](https://github.com/zenuevo/groovy-libpusher#usage)      | [zenuevo/groovy-libpusher](https://github.com/zenuevo/groovy-libpusher) |
| pusher-plugin    | Server | [micpango](https://github.com/micpango) | [Docs](https://github.com/micpango/pusher-plugin#installation) | [micpango/pusher-plugin](https://github.com/micpango/pusher-plugin)     |

## Haskell

| Library             | Type   | Maintainer                                | Docs                                                            | Code                                                                                |
| ------------------- | ------ | ----------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| pusher-http-haskell | Server | [Will Sewell](http://willsewell.com/)     | [Docs](https://hackage.haskell.org/package/pusher-http-haskell) | [WillSewell/pusher-http-haskell](https://github.com/WillSewell/pusher-http-haskell) |
| pusher-haskell      | Server | [Sid Raval](http://sidraval.github.io/)   | [Docs](https://github.com/sidraval/pusher-haskell)              | [sidraval/pusher-haskell](https://github.com/sidraval/pusher-haskell)               |
| pusher-ws           | Client | [barrucadu](https://www.barrucadu.co.uk/) | [Docs](https://hackage.haskell.org/package/pusher-ws)           | [barrucadu/pusher-ws](https://github.com/barrucadu/pusher-ws)                       |

## iOS

also see [Objective-C](#objective-c)

| Library             | Type   | Maintainer                             | Docs                                                                     | Code                                                                                  |
| ------------------- | ------ | -------------------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| titanium_pusher_ios | Client | [Ruben Fonseca](http://blog.0x82.com/) | [Docs](https://github.com/pusher-community/titanium_pusher_ios#building) | [pusher/titanium_pusher_ios](https://github.com/pusher-community/titanium_pusher_ios) |

## Java

also see [Android](#android)

| Library            | Type   | Maintainer                                      | Docs                                                                     | Code                                                                                      |
| ------------------ | ------ | ----------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| JavaPusherClient   | Client | [Justin Schultz](http://www.justinschultz.com/) | [Docs](https://github.com/jmschultz/JavaPusherClient#examples)           | [jmschultz/JavaPusherClient](https://github.com/jmschultz/JavaPusherClient)               |
| gae-java-libpusher | Server | [Docs](https://github.com/marcbaechinger)       | [Docs](https://github.com/marcbaechinger/gae-java-libpusher#get-started) | [marcbaechinger/gae-java-libpusher](https://github.com/marcbaechinger/gae-java-libpusher) |
| Play2Pusher        | Server | [Tindr Solutions](http://tindr.co/)             | [Docs](https://github.com/tindr/Play2Pusher#installation)                | [tindr/Play2Pusher](https://github.com/tindr/Play2Pusher)                                 |
| Play-Pusher        | Server | [regisbamba](http://github.com/regisbamba)      | [Docs](https://github.com/regisbamba/Play-Pusher#usage)                  | [regisbamba/Play-Pusher](https://github.com/regisbamba/Play-Pusher)                       |

## JavaScript

| Library      | Type   | Maintainer                      | Docs                                                 | Code                                            |
| ------------ | ------ | ------------------------------- | ---------------------------------------------------- | ----------------------------------------------- |
| Laravel Echo | Client | [Laravel](https://laravel.com/) | [Docs](https://laravel.com/docs/master/broadcasting) | [laravel/echo](https://github.com/laravel/echo) |

## .NET

| Library          | Type   | Maintainer                                                  | Docs                                                            | Code                                                                            |
| ---------------- | ------ | ----------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| pusher-universal | Client | [Gateway Apps](https://www.gatewayapps.com/)                | [Docs](https://github.com/gatewayapps/pusher-universal#install) | [gatewayapps/pusher-universal](https://github.com/gatewayapps/pusher-universal) |
| Pusher.NET       | Client | [Digital Creations AS](https://github.com/digitalcreations) | [Docs](https://github.com/digitalcreations/Pusher.NET#install)  | [digitalcreations/Pusher.NET](https://github.com/digitalcreations/Pusher.NET)   |
| JDI PusherClient | Client | [Jim Stabile](http://jasdev.com/)                           | [Docs](http://jdipusherclient.codeplex.com/Docs)                | [jdipusherclient.codeplex](http://jdipusherclient.codeplex.com/)                |

## Node.js

also see [JavaScript](/docs/channels/channels_libraries/libraries#javascript)

| Library            | Type   | Maintainer                                     | Docs                                                              | Code                                                                          |
| ------------------ | ------ | ---------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| pusher-node-client | Client | [Abhishiv Saxena](https://github.com/abhishiv) | [Docs](https://github.com/abhishiv/pusher-node-client#how-to-use) | [abhishiv/pusher-node-client](https://github.com/abhishiv/pusher-node-client) |

## Objective-C

also see [iOS](#ios)

| Library | Type   | Maintainer                    | Docs                                                     | Code                                                  |
| ------- | ------ | ----------------------------- | -------------------------------------------------------- | ----------------------------------------------------- |
| Bully   | Client | [Sam Soffes](http://soff.es/) | [Docs](https://github.com/samsoffes/bully#example-usage) | [samsoffes/bully](https://github.com/samsoffes/bully) |

## Perl

| Library     | Type   | Maintainer                           | Docs                                                        | Code                                                                      |
| ----------- | ------ | ------------------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------------------- |
| WWW::Pusher | Server | [Squeeks](http://github.com/squeeks) | [Docs](https://github.com/pusher/pusher-perl-server#readme) | [pusher/pusher-perl-server](https://github.com/pusher/pusher-perl-server) |

## PHP

| Library                          | Type   | Maintainer                                           | Docs                                                                                   | Code                                                                                              |
| -------------------------------- | ------ | ---------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Laravel                          | Server | [Laravel](https://laravel.com/)                      | [Docs](https://laravel.com/docs/master/broadcasting)                                   | [laravel/laravel](https://github.com/laravel/laravel)                                             |
| ZfrPusher                        | Server | [Michaël Gallego](https://github.com/bakura10)       | [Docs](https://github.com/zf-fr/zfr-pusher#installation)                               | [zf-fr/zfr-pusher](https://github.com/zf-fr/zfr-pusher)                                           |
| Channels PHP SDK for CodeIgniter | Server | [Mattias Hedman](https://github.com/darkwhispering)  | [Docs](https://github.com/darkwhispering/pusher-for-codeigniter/blob/master/README.md) | [darkwhispering/pusher-for-codeigniter](https://github.com/darkwhispering/pusher-for-codeigniter) |
| Symfony                          | Server | [Pierre-Louis Launay](https://github.com/laupiFrpar) | [Docs](https://github.com/laupiFrpar/LopiPusherBundle#installation)                    | [laupiFrpar/LopiPusherBundle](https://github.com/laupiFrpar/LopiPusherBundle)                     |
| Zend Framework 2                 | Server | [Michaël Gallego](https://github.com/bakura10)       | [Docs](https://github.com/zf-fr/zfr-pusher-module#installation)                        | [zf-fr/zfr-pusher-module](https://github.com/zf-fr/zfr-pusher-module)                             |
| Yii PHP Framework                | Server | [nk913](http://www.yiiframework.com/user/41288/)     | [Docs](http://www.yiiframework.com/extension/pusher/)                                  | [yiiframework/pusher](http://www.yiiframework.com/extension/pusher/)                              |
| Kohana 3                         | Server | [2bj](http://github.com/2bj)                         | [Docs](https://github.com/2bj/Pushko#pushko)                                           | [2bj/Pushko](https://github.com/2bj/Pushko)                                                       |
| FuelPHP                          | Server | [Ahmad Shah](http://www.lembubintik.com/)            | [Docs](https://github.com/lembubintik/pusherapp#how-to-use-it)                         | [lembubintik/pusherapp](https://github.com/lembubintik/pusherapp)                                 |
| Drupal                           | Server | [fabianderijk](https://drupal.org/user/278745)       | [Docs](https://drupal.org/project/pusher_api)                                          | [drupal/pusher](https://drupal.org/project/pusher_api)                                            |

## Python

| Library | Type   | Maintainer                                      | Docs                                                              | Code                                                    |
| ------- | ------ | ----------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------- |
| Pysher  | Client | [Nils Diefenbach](https://github.com/nlsdfnbch) | [Docs](https://github.com/nlsdfnbch/Pysher/blob/master/README.md) | [nlsdfnbch/Pysher](https://github.com/nlsdfnbch/Pysher) |

## React

| Library          | Type   | Maintainer                            | Docs                                                       | Code                                                                  |
| ---------------- | ------ | ------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------- |
| react-pusher-hoc | Client | [Felix Wostal](http://felixwostal.de) | [Docs](https://github.com/fel1xw/react-pusher-hoc#install) | [fel1xw/react-pusher-hoc](https://github.com/fel1xw/react-pusher-hoc) |

## React Native

## QML

| Library    | Type   | Maintainer                                | Docs                                                       | Code                                                            |
| ---------- | ------ | ----------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------- |
| qml-pusher | Client | [Jason Barron](http://www.cutehacks.com/) | [Docs](https://github.com/Cutehacks/qml-pusher#installing) | [Cutehacks/qml-pusher](https://github.com/Cutehacks/qml-pusher) |

## Ruby

| Library               | Type   | Maintainer                                     | Docs                                                                 | Code                                                                            |
| --------------------- | ------ | ---------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| pusher-websocket-ruby | Client | [Logan Koester](http://blog.logankoester.com/) | [Docs](https://github.com/pusher/pusher-websocket-ruby#installation) | [pusher/pusher-websocket-ruby](https://github.com/pusher/pusher-websocket-ruby) |

## Scala

| Library               | Type   | Maintainer                                 | Docs                                             | Code                                                              |
| --------------------- | ------ | ------------------------------------------ | ------------------------------------------------ | ----------------------------------------------------------------- |
| dtaniwaki/akka-pusher | Server | [dtaniwaki](https://github.com/dtaniwaki/) | [Docs](https://github.com/dtaniwaki/akka-pusher) | [dtaniwaki/akka-pusher](https://github.com/dtaniwaki/akka-pusher) |

## Test/example applications

For an open source example application built on libPusher, see [the Github repo](http://github.com/pusher/pusher-test-iOS) and [the App Store](https://itunes.apple.com/us/app/pusher-diagnostics/id622538006)

For an open source example application built on pusher-websocket-java, see [the Github repo](http://github.com/pusher/pusher-test-android) and [the Play Store](https://play.google.com/store/apps/details?id=com.pusher.testapp)

## Don't see your platform?

We'd love to see client and server libraries for other languages. Make sure to [let us know](https://support.pusher.com/hc/en-us/requests/new) if you come up with anything so we can highlight it here.
