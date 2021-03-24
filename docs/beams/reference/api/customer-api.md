---
title: Customer api - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation: 
  parent: Api
  key: Customer api
  title: Customer API
  order: 2
---
# Customer API
 
# Deleting a User
 
```http
{deleteUserDefinition}
```
 <Alert primary> When sending the User ID in the path, make sure it's URL encoded. </Alert> 
## Request headers
 
The following headers are necessary:

    
      *  `Authorization`: with the value in the following format: `{'Bearer <YOUR_SECRET_KEY>'}`. 
    

    
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
          <td>Incomplete Request</td>
          <td>400</td>
          <td>Authorization header is missing.</td>
        </tr>
        <tr>
          <td>Unauthorized</td>
          <td>401</td>
          <td>Incorrect API Key.</td>
        </tr>
        <tr>
          <td>Instance not found</td>
          <td>404</td>
          <td>Could not find the instance.</td>
        </tr>
        <tr>
          <td>Rate Limited</td>
          <td>429</td>
          <td>
            Too many requests being made in quick succession (max 100 RPS).
          </td>
        </tr>
        <tr>
          <td>Something went wrong</td>
          <td>500</td>
          <td>Internal server error.</td>
        </tr>
      </tbody>
    </Table>
