---
title: Server sdk node - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation: 
  parent: Server sdks
  key: Server sdk node
  title: Node
  order: 3
---
# Node.js Server SDK
 
The SDK includes a typings file for TypeScript compatibility.
 
# Installation
 
The Beams Node.js server SDK is available on NPM [here](https://www.npmjs.com/package/${SDK_NAME}). 
 
## Install
 
You can install this SDK by using NPM or Yarn:
 
{% snippets ['http', 'http'] %}
 
```http
{npmInstallExample}
```
 
```http
{yarnInstallExample}
```
 
{% endsnippets %}
 
# Reference
 
## `constructor PushNotifications`
 **new PushNotifications(options)** 
Construct a new Pusher Beams Client connected to your Beams instance. 
 
You only need to do this once.
 
*Arguments* <br /> `options` (object)  *  `instanceId` (string | *required*) - The unique identifier for your Beams instance. This can be found in the dashboard under "Credentials".  *  `secretKey` (string | *required*) - The secret key your server will use to access your Beams instance. This can be found in the dashboard under "Credentials".   
 
*Returns* <br />A Pusher Beams client 
 
*Example* 
```js
{connectingExample}
```
 
 
## `.publishToInterests`
 
Publish a push notification to devices subscribed to given Interests, with the given payload. 
 
*Arguments* <br /> `interests` ({'Array<string>'}) - Interests to send the push notification to, ranging from 1 to 100 per publish request. See [ Concept: Device Interests ](/docs/beams/concepts/device-interests) .<br /> `publishBody` (object) - See [ publish API reference ](/docs/beams/reference/publish-api#request-body) . 
 
*Returns* <br /> (Promise) - A promise that resolves to a `publishResponse`. See [ publish API reference ](/docs/beams/reference/publish-api#success-response-body) . 
 
*Example* 
```js
{nodePublishToInterests}
```
 
 
## `.publishToUsers`
 
Publish a push notification to devices belonging to specific users, with the given payload. 
 
*Arguments* <br /> `userIDs` ({'Array<string>'}) User IDs to send the push notification to, ranging from 1 to 1000 per publish request. See [ Concept: Authenticated Users ](/docs/beams/concepts/authenticated-users) .<br /> `publishBody` (object) - See [ publish API reference ](/docs/beams/reference/publish-api#request-body) . 
 
*Returns* <br /> (Promise) - A promise that resolves to a `publishResponse`. See [ publish API reference ](/docs/beams/reference/publish-api#success-response-body) . 
 
*Example* 
```js
{nodePublishToUsers}
```
 
 
## `.generateToken`
 
Generate a Beams auth token to allow a user to associate their device with their user id. The token is valid for 24 hours. 
 
*Arguments* <br /> `userID` (string) - User ID of the user for whom you want to generate a Beams token. <br /> 
 
*Returns* <br /> (string) - A Beams token for the given user. 
 
*Example* 
```js
{nodeGenerateToken}
```
 
 
## `.deleteUser`
 
Delete a user and all their devices from Pusher Beams.
 
*Arguments* <br /> `userID` (string) - The user ID of the user you wish to delete. 
 
*Returns* <br /> (Promise) - A promise that resolves with no arguments. If deletion fails, the promise will reject. 
 
*Example* 
```js
{nodeDeleteUser}
```
 

