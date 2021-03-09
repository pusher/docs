---
title: Server sdk python - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation: 
  parent: Server sdks
  key: Server sdk python
  title: Python
  order: 4
---
# Python Server SDK
 
# Installation
 
The Beams Python server SDK is available on PyPi [ here ](https://pypi.python.org/pypi/pusher_push_notifications/) . 
 
You can install this SDK by using pip:
 
```http
{pipInstallExample}
```
 
# Reference
 
## `class PushNotifications`
 
Constructs a **new Beams client** instance using your instance id and secret key (you can get these from the dashboard) 
 
*Arguments* <br />  *  `instance_id` (string): The unique identifier for your Push notifications instance. This can be found in the dashboard under "Credentials".  *  `secret_key` (string): The secret key your server will use to access your Beams instance. This can be found in the dashboard under "Credentials".   
 
*Example* 
```py
{connectingExample}
```
 
 
## `.publish_to_interests`
 
Sends broadcast notifications to groups of subscribed devices using [Device Interests](/docs/beams/concepts/device-interests) 
 
*Arguments* <br />  *  `interests` (list {'<string>'} | *Min length=1, Max length=100* ): List of interests to send the push notification to, ranging from 1 to 100 per publish request. See [ Device Interests ](/docs/beams/concepts/device-interests)  *  `publish_body` (dictionary): A dictionary containing the publish request body. See [ publish API reference ](/docs/beams/reference/publish-api#request-body)   
 
*Returns* <br />A dictionary containing the publish response body. See [ publish API reference ](/docs/beams/reference/publish-api#success-response-body) 
 
*Example* <br /> 
```py
{pythonPublishToInterests}
```
 
 
## `.publish_to_users`
 
Securely send notifications to individual users of your application using [ Authenticated Users ](/docs/beams/concepts/authenticated-users) 
 
*Arguments* <br />  *  `user_ids` (list {'<string>'} | *Min length=1, Max length=1000* ): List of ids of users to send the push notification to, ranging from 1 to 1000 per publish request. See [ Authenticated Users ](/docs/beams/concepts/authenticated-users)  *  `publish_body` (dictionary): A dictionary containing the publish request body. See [ publish API reference ](/docs/beams/reference/publish-api#request-body)   
 
*Returns* <br />A dictionary containing the publish response body. See [ publish API reference ](/docs/beams/reference/publish-api#success-response-body) 
 
*Example* <br /> 
```py
{pythonPublishToUsers}
```
 
 
## `.generate_token`
 
Generate a Beams auth token to allow a user to associate their device with their user id. The token is valid for 24 hours. 
 
*Arguments* <br />  *  `user_id` (string): Id of the user you would like to generate a Beams auth token for.   
 
*Returns* <br /> Beams token string. 
 
*Example* <br /> 
```py
{generateTokenExample}
```
 
 
## `.delete_user`
 
Remove the given user (and all of their devices) from Beams. This user will no longer receive any notifications and all state stored about their devices will be deleted. 
 
*Arguments* <br />  *  `user_id` (string): Id of the user you would like to delete from Beams.   
 
*Returns* <br /> None 
 
*Example* <br /> 
```py
{deleteUserExample}
```
 

