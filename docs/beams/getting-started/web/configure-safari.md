---
date: 2021-09-13
title: Pusher Beams Docs | Build web notifications for Safari users
description: Use our Safari configuration guide to set up push notifications for your Safari web browser users with the Beams Web SDK.
layout: beams.njk
eleventyNavigation:
  parent: Beams getting started Web
  key: Safari configuration
  order: 2
  title: 2. Safari configuration
---

# Safari configuration (optional)

> You should have already integrated the Beams Web SDK before following this guide. If you have not yet integrated the Web SDK, first follow [this guide](/docs/beams/getting-started/web/sdk-integration).

## Prerequisites

- Completion of the [getting started guide for integrating the Web SDK](/docs/beams/getting-started/web/sdk-integration)

- An [Apple Developer](https://developer.apple.com) account with access to a paid [Apple Developer Program](https://developer.apple.com/programs/) membership. You must have the ability to create an identifier

- A Mac computer

- An icon for your app, to be shown alongside your notifications. This should be a PNG at least 256 by 256 pixels in size

## Ensure you are using the correct SDK version

Check out the latest version under [Web Client SDK](https://pusher.com/docs/beams/reference/web/).

## Create a certificate signing request (CSR)

In order to send push notifications to Safari, you need a certificate signed by Apple. These are generated using your Apple Developer account. Before you can request this certificate, you must generate a Certificate Signing Request. You will then submit this to Apple, who will generate a certificate based on the provided configuration.

1. Open “Keychain Access” on your Mac
2. In the top menu, select “Keychain Access” > “Certificate Assistant” > “Request a Certificate From a Certificate Authority…”
   ![Screenshot showing Keychain Access](./img/safari_start_csr_generation.png)
3. A “Certificate Assistant” window will appear.
   ![Screenshot showing Keychain Access](./img/safari_generate_csr.png)
   Fill in the following fields:
   - User Email Address
   - Common Name
     The common name can just be a helpful name for you to identify the key pair that will be generated and stored within keychain. E.g. “Safari Push Notifications”.
   - Select “Saved to disk”
     Then click “Continue”
4. Save the `CertificateSigningRequest.certSigningRequest` file somewhere so that it can be used in subsequent steps.
   ![Screenshot showing Keychain Access](./img/safari_save_csr.png)

## Create a Website Push ID and submit your CSR

1. Open the [Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources/identifiers/add/bundleId) page of the Apple Developer site to begin registering a new identifier.
2. Select “Website Push IDs” then “Continue”.
   ![Screenshot showing the creation of a new Website Push ID on the Apple Developer website](./img/safari_new_identifier.png)
3. The "Register a Website Push ID" page will open.
   ![Screenshot showing the creation of a new Website Push ID on the Apple Developer website](./img/safari_create_identifier.png)
   Enter a **Description** (this is just for you) and an **Identifier**.
   The identifier must start with `web.` and it is recommended to use a [reverse-domain name style](https://en.wikipedia.org/wiki/Reverse_domain_name_notation) string.
   Click “Continue”, then “Register”.

4. Click on the identifier you just created, then click “Create Certificate”.
5. The "Create A New Certificate" page will open.
   ![Screenshot showing the creation of a new certificate on the Apple Developer website](./img/safari_upload_csr.png)
   Upload the `CertificateSigningRequest.certSigningRequest` file that you generated in the earlier step.
   Click “Continue”.

6. You will be taken to a page titled "Download Your Certificate”. Click “Download” and store the certificate on your computer.

# Generate a p12 file

Now that you have your certificate from Apple, you need to combine it with the private key generated when you created your certificate signing request. This creates a p12 file, which is what you will then upload to Beams.

1. Double click on the certificate you downloaded to open it in Keychain Access. You may be shown a prompt asking where to add the certificate. If so, you can add it to your **login** keychain. Sometimes the certificate will be added to your Keychain without showing a prompt. If you do not see a prompt then move on to the next step.
   ![Screenshot showing a certificate being added to Keychain Access](./img/safari_keychain_add_certificate.png)
2. In Keychain Access, select the “My Certificates” category. Search for "website push id” in the search box in the top right of the window. You should see a certificate named “Website Push ID:” followed by the identifier name you created in the previous step.
3. Select the certificate then click "File" > "Export items..." in the top menu. Change the “File Format” to “Personal Information Exchange (.p12)” and save the file to disk.
   ![Screenshot showing a p12 file being exported from Keychain Access](./img/safari_save_p12.png)
   You will be asked to set a password, which you should leave blank.
   ![Screenshot showing a dialog box asking for a password for the exported file](./img/safari_p12_password.png)
   You may also be prompted to enter your system password in a separate window in order to export from Keychain Access.

You should now have a .p12 file on your machine.

> The p12 file should be kept secure. It contains all the credentials that are needed to send notifications to your users.

## Configure your Beams instance in the dashboard

Now that you have your p12 file, you can configure Safari in the [Beams dashboard](https://dashboard.pusher.com/beams). Select the instance that you would like to enable Safari notifications for, and navigate to the “Settings” page.

Scroll down to **Safari Integration**.

![Screenshot showing the Safari Integration section of the settings page on the Beams dashboard](./img/safari_dashboard.png)

Fill in the following fields (all required):

#### Upload .p12

Select the p12 file that you generated in the previous step. The p12 must not have a password/passphrase.

#### Upload icon

Select an icon that will be displayed next to each notification. This should be a PNG at least 256 by 256 pixels in size. It will be automatically resized to all the sizes required by Safari.

> Once a user allows notifications using the permissions dialog, it is not possible to change the icon for that user. Only new signups will receive the new icon. This is due to a Safari limitation rather than a limitation with Beams.

#### Website Name

This is the name that appears in the notification heading and as the heading in Notification Center.

> As with the icon, it isn’t possible to update the website name for users that have already accepted notifications. If you change your website name at a later date then only new users will see the new name. This is a limitation with Safari rather than Beams.

#### Allowed Domains

This is a comma-separated list of domains on which you will use the Beams SDK. These should include the protocol (and port if necessary) but no path. E.g.`http://localhost:8080`, `https://www.example.com`. If a domain isn’t in this list then you won’t be able to show the permission dialog on that domain.

#### Default URL

**This must be a HTTPS URL**

In other browsers, it’s possible to send notifications that do nothing when clicked. In Safari, all notifications must have a link to be opened when the notification is clicked. If you send a notification without providing a [deep_link](/docs/beams/reference/publish-payloads#notification-object-format) then the default URL will be opened when the notification is clicked.

Once you have filled out all these fields, click “Save changes”.

## Try it out

#### Request permission

> As with other browsers (such as Firefox), the notification permission dialog can only be triggered in response to a user action such as a button click.

You shouldn't need to make any changes to your client code other than installing the`2.0.0-beta` release of the [Beams Web SDK](https://github.com/pusher/push-notifications-web). Open your website in Safari and call `start` in the Web SDK. Remember, this must be done within an onclick handler. Safari will present a dialog box requesting permission to send notifications.

![Screenshot showing the Safari notification permission dialog](./img/safari_permission.png)

#### Send a notification

Safari uses the `web` key of the publish payload therefore you can trigger notifications in the same way as you did in the [Web SDK integration guide](/docs/beams/getting-started/web/sdk-integration#send-a-notification).

![Screenshot showing a Safari notification](./img/safari_notification.png)

## Troubleshooting

#### The notification permission dialog doesn’t show

- Ensure you are calling `start` in response to a user event such as a button press. You should see an error in the browser console if this is the issue.
- Ensure your [Allowed Domains](#allowed-domains) include the domain and port from which you are loading the page which is calling `start`.

## Safari limitations

- [Insights](/docs/beams/concepts/insights) do not currently work in Safari. We are planning to add open rate support, but acknowledgements are not technically possible due to Safari limitations. This means you will not receive the corresponding`UserNotificationAcknowledgement` and `UserNotificationOpen`[webhooks](https://pusher.com/docs/beams/concepts/webhooks) for Safari devices. Please bear in mind that you will still receive the`PublishToUsersAttempt` webhook.
- It is not possible to update the icon or website name for users that have already allowed notifications. If you change your website name or icon at a later date then only new users will receive the new name and icon. This is a limitation with Safari rather than Beams.
- You can’t send data or run JavaScript in response to receiving notifications as you can in other browsers. This is a limitation with Safari rather than Beams.
- Safari does not support Web Push Notifications on iOS or iPadOS devices. Safari only supports notifications on desktop devices. This is a limitation with Safari rather than Beams. 
- Not all the publish payload keys have an effect in Safari. You can find out more in the [publish payload format docs](/docs/beams/reference/publish-payloads#web-format).

## Certificate expiration

The certificate issued to you by Apple will expire after one year. You should replace this certificate before it expires otherwise new users will not be able to sign up for notifications and you will not be able to send notifications to any users. You can find out more in the [certificate expiration guide](/docs/beams/guides/safari-certificate-expiration).

## Where next?

- Read the [guide on publishing to a specific user](/docs/beams/guides/publish-to-specific-user/web) to learn about securely publishing to individual users
- [Web SDK reference docs](/docs/beams/reference/web)
- [Web publish format](/docs/beams/reference/publish-payloads#web-format)
