---
title: Device api - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation: 
  parent: Api
  key: Device api
  title: Device API
  order: 3
---
# Device API
 
This is the API used by our Android, iOS and Web SDKs.
 <Alert danger> We want everyone to use our official Android, iOS and Web SDKs. If your use case requires this documentation, please contact us <a external="" href="mailto:betterbeams@pusher.com"> betterbeams@pusher.com </a> </Alert> 
# Register new APNs device
 
```http
{newAPNsDeviceDefinition}
```
 
## Request headers
 
The following headers are necessary:
  *  `Content-Type`: with the value always set to `application/json`.   
## Request body
 
A JSON object with the following keys:
  *  `token` (string| *required* ): The APNs gateway token.  *  `bundleIdentifier` (string| *required* ): The application bundle identifier.  *  `metadata` (apnsMetadata| *optional* ): The metadata for this device, which contains the following fields:  *  `sdkVersion`: the version of the SDK.  *  `iosVersion`: the iOS version the device has.  *  `macosVersion`: the macOS version the device has.   </Item>  
## Response Body
 
A JSON object with the following fields:
  *  `id` (string): Unique string used to identify this device.  *  `initialInterestSet` (set of string): Set of interests the device is initially subscribed to which can happen when they are migrated from other competitor products.   
## Error Responses
 <Table> <thead> <tr> <th>Title</th> <th>Status Code</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td>Invalid content type</td> <td>400</td> <td> Only `application/json` is supported. </td> </tr> <tr> <td>Incomplete Request</td> <td>400</td> <td> `instance-id` param is missing from path. </td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td> `instance-id` given is not valid. </td> </tr> <tr> <td>Bad request</td> <td>400</td> <td>Failed to read body as a JSON object.</td> </tr> <tr> <td>Bad request</td> <td>400</td> <td>Missing APNs token.</td> </tr> <tr> <td>Bad request</td> <td>400</td> <td>Missing App Bundle Identifier.</td> </tr> <tr> <td>Unauthorized</td> <td>401</td> <td>Incorrect instance credentials.</td> </tr> <tr> <td>Unauthorized</td> <td>401</td> <td>Incorrect APNs token supplied.</td> </tr> <tr> <td>Instance not found</td> <td>404</td> <td>Could not find the instance.</td> </tr> <tr> <td>Something went wrong</td> <td>500</td> <td>Internal server error.</td> </tr> </tbody> </Table> 
# Register new FCM device
 
```http
{newFCMDeviceDefinition}
```
 
## Request headers
 
The following headers are necessary:
  *  `Content-Type`: with the value always set to `application/json`.   
## Request body
 
A JSON object with the following keys:
  *  `token` (string| *required* ): The FCM gateway token.  *  `metadata` (fcmMetadata| *optional* ): The metadata for this device, which contains the following fields:  *  `sdkVersion`: the version of the SDK.  *  `androidVersion`: the Android version the device has.   </Item>  
## Response Body
 
A JSON object with the following fields:
  *  `id` (string): Unique string used to identify this device.  *  `initialInterestSet` (set of string): Set of interests the device is initially subscribed to which can happen when they are migrated from other competitor products.   
## Error Responses
 <Table> <thead> <tr> <th>Title</th> <th>Status Code</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td>Invalid content type</td> <td>400</td> <td> Only `application/json` is supported. </td> </tr> <tr> <td>Incomplete Request</td> <td>400</td> <td> `instance-id` param is missing from path. </td> </tr> <tr> <td>Bad request</td> <td>400</td> <td>Failed to read body as a JSON object.</td> </tr> <tr> <td>Bad request</td> <td>400</td> <td>Missing FCM token.</td> </tr> <tr> <td>Unauthorized</td> <td>401</td> <td>Incorrect instance credentials.</td> </tr> <tr> <td>Unauthorized</td> <td>401</td> <td>Incorrect FCM token supplied.</td> </tr> <tr> <td>Instance not found</td> <td>404</td> <td>Could not find the instance.</td> </tr> <tr> <td>Something went wrong</td> <td>500</td> <td>Internal server error.</td> </tr> </tbody> </Table> 
# Get APNs device
 
```http
{getAPNsDeviceDefinition}
```
 
## Request headers
 
The following headers are necessary:
  *  `Content-Type`: with the value always set to `application/json`.   
## Response Body
 
A JSON object representing the Device with the following fields: 
  *  `id` (string): Unique string used to identify this device.  *  `userId` (string): The User Id this device belongs to.  *  `metadata` (apnsMetadata): The metadata for this device, which contains the following fields:  *  `sdkVersion`: the version of the SDK.  *  `iosVersion`: the iOS version the device has.  *  `macosVersion`: the macOS version the device has.   </Item>  
## Error Responses
 <Table> <thead> <tr> <th>Title</th> <th>Status Code</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td>Invalid content type</td> <td>400</td> <td> Only `application/json` is supported. </td> </tr> <tr> <td>Incomplete Request</td> <td>400</td> <td> `instance-id` param is missing from path. </td> </tr> <tr> <td>Incomplete Request</td> <td>400</td> <td> `device-id` param is missing from path. </td> </tr> <tr> <td>Instance not found</td> <td>404</td> <td>Could not find the instance.</td> </tr> <tr> <td>Something went wrong</td> <td>500</td> <td>Internal server error.</td> </tr> </tbody> </Table> 
# Get FCM device
 
```http
{getFCMDeviceDefinition}
```
 
## Request headers
 
The following headers are necessary:
  *  `Content-Type`: with the value always set to `application/json`.   
## Response Body
 
A JSON object representing the Device with the following fields: 
  *  `id` (string): Unique string used to identify this device.  *  `userId` (string): The User Id this device belongs to.  *  `metadata` (fcmMetadata): The metadata for this device, which contains the following fields:  *  `sdkVersion`: the version of the SDK.  *  `androidVersion`: the iOS version the device has.   </Item>  
# Delete APNs device
 
```http
{deleteAPNsDeviceDefinition}
```
 
## Error Responses
 <Table> <thead> <tr> <th>Title</th> <th>Status Code</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td>Incomplete Request</td> <td>400</td> <td> `instance-id` param is missing from path. </td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td> `instance-id` given is not valid. </td> </tr> <tr> <td>Incomplete Request</td> <td>400</td> <td> `device-id` param is missing from path. </td> </tr> <tr> <td>Something went wrong</td> <td>500</td> <td>Internal server error.</td> </tr> </tbody> </Table> 
# Delete FCM device
 
```http
{deleteFCMDeviceDefinition}
```
 
## Request headers
 
The following headers are necessary:
  *  `Content-Type`: with the value always set to `application/json`.   
## Error Responses
 <Table> <thead> <tr> <th>Title</th> <th>Status Code</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td>Incomplete Request</td> <td>400</td> <td> `instance-id` param is missing from path. </td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td> `instance-id` given is not valid. </td> </tr> <tr> <td>Incomplete Request</td> <td>400</td> <td> `device-id` param is missing from path. </td> </tr> <tr> <td>Something went wrong</td> <td>500</td> <td>Internal server error.</td> </tr> </tbody> </Table> 
# Update APNs Device Metadata
 
```http
{updateAPNsDeviceMetadataDefinition}
```
 
## Request headers
 
The following headers are necessary:
  *  `Content-Type`: with the value always set to `application/json`.   
## Request body
 
A JSON object with the following keys:
  *  `sdkVersion`: the version of the SDK.  *  `iosVersion`: the iOS version the device has.  *  `macosVersion`: the macOS version the device has.   
## Error Responses
 <Table> <thead> <tr> <th>Title</th> <th>Status Code</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td>Invalid content type</td> <td>400</td> <td> Only `application/json` is supported. </td> </tr> <tr> <td>Incomplete Request</td> <td>400</td> <td> `instance-id` param is missing from path. </td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td> `instance-id` given is not valid. </td> </tr> <tr> <td>Incomplete Request</td> <td>400</td> <td> `device-id` param is missing from path. </td> </tr> <tr> <td>Bad request</td> <td>400</td> <td>Failed to read body as a JSON object.</td> </tr> <tr> <td>Device not found</td> <td>404</td> <td>Could not find the device.</td> </tr> <tr> <td>Something went wrong</td> <td>500</td> <td>Internal server error.</td> </tr> </tbody> </Table> 
# Update FCM Device Metadata
 
```http
{updateFCMDeviceMetadataDefinition}
```
 
## Request headers
 
The following headers are necessary:
  *  `Content-Type`: with the value always set to `application/json`.   
## Request body
 
A JSON object with the following keys:
  *  `sdkVersion`: the version of the SDK.  *  `androidVersion`: the iOS version the device   
## Error Responses
 <Table> <thead> <tr> <th>Title</th> <th>Status Code</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td>Invalid content type</td> <td>400</td> <td> Only `application/json` is supported. </td> </tr> <tr> <td>Incomplete Request</td> <td>400</td> <td> `instance-id` param is missing from path. </td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td> `instance-id` given is not valid. </td> </tr> <tr> <td>Incomplete Request</td> <td>400</td> <td> `device-id` param is missing from path. </td> </tr> <tr> <td>Bad request</td> <td>400</td> <td>Failed to read body as a JSON object.</td> </tr> <tr> <td>Device not found</td> <td>404</td> <td>Could not find the device.</td> </tr> <tr> <td>Something went wrong</td> <td>500</td> <td>Internal server error.</td> </tr> </tbody> </Table> 
# Update FCM Device Token
 
```http
{updateFCMDeviceTokenDefinition}
```
 
## Request headers
 
The following headers are necessary:
  *  `Content-Type`: with the value always set to `application/json`.   
## Request body
 
A JSON object with the following keys:
  *  `token`: the updated FCM token for this device.   
## Error Responses
 <Table> <thead> <tr> <th>Title</th> <th>Status Code</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td>Invalid content type</td> <td>400</td> <td> Only `application/json` is supported. </td> </tr> <tr> <td>Incomplete Request</td> <td>400</td> <td> `instance-id` param is missing from path. </td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td> `instance-id` given is not valid. </td> </tr> <tr> <td>Incomplete Request</td> <td>400</td> <td> `device-id` param is missing from path. </td> </tr> <tr> <td>Bad request</td> <td>400</td> <td>Failed to read body as a JSON object.</td> </tr> <tr> <td>Bad request</td> <td>400</td> <td>Missing token field with the FCM Registration Id.</td> </tr> <tr> <td>Device not found</td> <td>404</td> <td>Could not find the device.</td> </tr> <tr> <td>Something went wrong</td> <td>500</td> <td>Internal server error.</td> </tr> </tbody> </Table> 
# Set APNs Device User Id
 
```http
{setAPNsDeviceUserIdDefinition}
```
 
## Request headers
 
The following headers are necessary:
  *  `Authorization`: with the value in the following format: `{'Bearer <BEAMS_USER_JWT_TOKEN>'}`.   
## Error Responses
 <Table> <thead> <tr> <th>Title</th> <th>Status Code</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td>Invalid content type</td> <td>400</td> <td> Only `application/json` is supported. </td> </tr> <tr> <td>Incomplete Request</td> <td>400</td> <td> `instance-id` param is missing from path. </td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td> `instance-id` given is not valid. </td> </tr> <tr> <td>Incomplete Request</td> <td>400</td> <td> `device-id` param is missing from path. </td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td>Missing expiration (exp) field in JWT</td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td>Missing subject (sub) field in JWT</td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td>JWT subject (sub) must be between 1-164 characters long</td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td>Missing issuer (iss) field in JWT</td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td>A User Id is already associated with this device.</td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td>Invalid device id.</td> </tr> <tr> <td>Unauthorized</td> <td>401</td> <td> `Authorization` header token is missing. </td> </tr> <tr> <td>Unauthorized</td> <td>401</td> <td> `Authorization` header token is malformed. </td> </tr> <tr> <td>Forbidden</td> <td>403</td> <td>Invalid JWT issuer.</td> </tr> <tr> <td>Device not found</td> <td>404</td> <td>Could not find the device.</td> </tr> <tr> <td>Unprocessable Entity</td> <td>422</td> <td>User already has reached the maximum of 100 devices.</td> </tr> <tr> <td>Something went wrong</td> <td>500</td> <td>Internal server error.</td> </tr> </tbody> </Table> 
# Set FCM Device User Id
 
```http
{setFCMDeviceUserIdDefinition}
```
 
## Request headers
 
The following headers are necessary:
  *  `Authorization`: with the value in the following format: `{'Bearer <BEAMS_USER_JWT_TOKEN>'}`.   
## Error Responses
 <Table> <thead> <tr> <th>Title</th> <th>Status Code</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td>Invalid content type</td> <td>400</td> <td> Only `application/json` is supported. </td> </tr> <tr> <td>Incomplete Request</td> <td>400</td> <td> `instance-id` param is missing from path. </td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td> `instance-id` given is not valid. </td> </tr> <tr> <td>Incomplete Request</td> <td>400</td> <td> `device-id` param is missing from path. </td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td>Missing expiration (exp) field in JWT</td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td>Missing subject (sub) field in JWT</td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td>JWT subject (sub) must be between 1-164 characters long</td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td>Missing issuer (iss) field in JWT</td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td>A User Id is already associated with this device.</td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td>Invalid device id.</td> </tr> <tr> <td>Unauthorized</td> <td>401</td> <td> `Authorization` header token is missing. </td> </tr> <tr> <td>Unauthorized</td> <td>401</td> <td> `Authorization` header token is malformed. </td> </tr> <tr> <td>Forbidden</td> <td>403</td> <td>Invalid JWT issuer.</td> </tr> <tr> <td>Device not found</td> <td>404</td> <td>Could not find the device.</td> </tr> <tr> <td>Unprocessable Entity</td> <td>422</td> <td>User already has reached the maximum of 100 devices.</td> </tr> <tr> <td>Something went wrong</td> <td>500</td> <td>Internal server error.</td> </tr> </tbody> </Table> 
# Get Device Interests
 
```http
{getDeviceInterestsDefinition}
```
 
## Request Query Parameters
 
The request can have the following query parameters:
  *  `limit`: the maximum number of interests to be returned from a single request. By default, it's the maximum value of 100.  *  `cursor`: the cursor returned from a previous request to continue fetching the list of interests.   
## Response Body
 
A JSON object with the following fields:
  *  `interests` (array of string): The array of interests the device is currently subscribed to. This array might be incomplete and more requests might be needed to get the complete list.  *  `responseMetadata` (responseMetadata): which contains the following fields:  *  `nextCursor`: if present, use this to perform the next request   </Item>  
## Error Responses
 <Table> <thead> <tr> <th>Title</th> <th>Status Code</th> <th>Description</th> </tr> </thead> <tbody> <tr> <td>Incomplete Request</td> <td>400</td> <td> `instance-id` param is missing from path. </td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td> `instance-id` given is not valid. </td> </tr> <tr> <td>Incomplete Request</td> <td>400</td> <td> `device-id` param is missing from path. </td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td> `limit` given is not valid. </td> </tr> <tr> <td>Bad Request</td> <td>400</td> <td> `cursor` given is not valid. </td> </tr> <tr> <td>Instance not found</td> <td>404</td> <td>Could not find the instance.</td> </tr> <tr> <td>Device not found</td> <td>404</td> <td>Could not find the device.</td> </tr> <tr> <td>Something went wrong</td> <td>500</td> <td>Internal server error.</td> </tr> </tbody> </Table> 
# Set Device Interests
 
```http
{setDeviceInterestsDefinition}
```
 
## Request Body
 
A JSON object with the following keys:

    
      *  `interests` (array of string): the set of interests this device should be subscribed to. This replaces any other existing interests. Limited to 5000 interests per device. 
    

    
## Error Responses

    <Table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Status Code</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Incomplete Request</td>
          <td>400</td>
          <td>
            `instance-id` param is missing from path.
          </td>
        </tr>
        <tr>
          <td>Bad Request</td>
          <td>400</td>
          <td>
            `instance-id` given is not valid.
          </td>
        </tr>
        <tr>
          <td>Incomplete Request</td>
          <td>400</td>
          <td>
            `device-id` param is missing from path.
          </td>
        </tr>
        <tr>
          <td>Bad request</td>
          <td>400</td>
          <td>Failed to read body as a JSON object.</td>
        </tr>
        <tr>
          <td>Invalid interest name</td>
          <td>400</td>
          <td>
            `interest-name` given is not valid.
          </td>
        </tr>
        <tr>
          <td>Interest set too large</td>
          <td>400</td>
          <td>
            Too many interests are being set for this device. Only 5000
            interests per device are allowed.
          </td>
        </tr>
        <tr>
          <td>Instance not found</td>
          <td>404</td>
          <td>Could not find the instance.</td>
        </tr>
        <tr>
          <td>Device not found</td>
          <td>404</td>
          <td>Could not find the device.</td>
        </tr>
        <tr>
          <td>Something went wrong</td>
          <td>500</td>
          <td>Internal server error.</td>
        </tr>
      </tbody>
    </Table>

    
# Add Device Interest

    
```http
{addDeviceInterestsDefinition}
```


    
## Error Responses

    <Table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Status Code</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Incomplete Request</td>
          <td>400</td>
          <td>
            `instance-id` param is missing from path.
          </td>
        </tr>
        <tr>
          <td>Bad Request</td>
          <td>400</td>
          <td>
            `instance-id` given is not valid.
          </td>
        </tr>
        <tr>
          <td>Incomplete Request</td>
          <td>400</td>
          <td>
            `device-id` param is missing from path.
          </td>
        </tr>
        <tr>
          <td>Bad Request</td>
          <td>400</td>
          <td>
            `device-id` given is not valid.
          </td>
        </tr>
        <tr>
          <td>Invalid interest name</td>
          <td>400</td>
          <td>
            `interest-name` given is not valid.
          </td>
        </tr>
        <tr>
          <td>Incomplete Request</td>
          <td>400</td>
          <td>
            `interest-name` param is missing from path.
          </td>
        </tr>
        <tr>
          <td>Instance not found</td>
          <td>404</td>
          <td>Could not find the instance.</td>
        </tr>
        <tr>
          <td>Something went wrong</td>
          <td>500</td>
          <td>Internal server error.</td>
        </tr>
      </tbody>
    </Table>

    
# Remove Device Interest

    
```http
{removeDeviceInterestsDefinition}
```


    
## Error Responses

    <Table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Status Code</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Incomplete Request</td>
          <td>400</td>
          <td>
            `instance-id` param is missing from path.
          </td>
        </tr>
        <tr>
          <td>Bad Request</td>
          <td>400</td>
          <td>
            `instance-id` given is not valid.
          </td>
        </tr>
        <tr>
          <td>Incomplete Request</td>
          <td>400</td>
          <td>
            `device-id` param is missing from path.
          </td>
        </tr>
        <tr>
          <td>Incomplete Request</td>
          <td>400</td>
          <td>
            `device-id` given is not valid.
          </td>
        </tr>
        <tr>
          <td>Incomplete Request</td>
          <td>400</td>
          <td>
            `interest-name` param is missing from path.
          </td>
        </tr>
        <tr>
          <td>Instance not found</td>
          <td>404</td>
          <td>Could not find the instance.</td>
        </tr>
        <tr>
          <td>Something went wrong</td>
          <td>500</td>
          <td>Internal server error.</td>
        </tr>
      </tbody>
    </Table>
