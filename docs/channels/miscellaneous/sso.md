---
date: 2025-06-12
title: Pusher Channels Docs | SSO
description: SSO support for enterprise users.
layout: channels.njk
eleventyNavigation:
  parent: Miscellaneous
  key: SSO
  order: 3
---

# SSO

SSO support for enterprise users. Pusher dashboard currently supports SSO with Okta.

> **Note:** SSO support is only available to Custom plans. Contact sales for more information.

## Okta

### Step 1: Create an application on Okta

As an Okta adminstrator, create a new Application for Pusher with the following parameters:

1. Sign-in method: **OIDC - OpenID Connect**
1. Application type: **Web Application**
1. Application Name: **Pusher**
1. Sign-in redirect URIs: **https://dashboard.pusher.com/accounts/auth/okta/callback**
1. Sign-out redirect URIs: **https://dashboard.pusher.com/accounts/sign_in**
1. Initiate login URI: **https://dashboard.pusher.com/accounts/sign_in**
1. Login initiated by: **Either Okta or App**


### Step 2: Add your Okta settings to Pusher dashboard

To setup SSO with Okta, go to your account page in the Okta SSO section and:

1. Click enable
1. Fill in your Okta settings in the form
    - Organization Domain: is used to verify the ownership of login email domains
    - Issuer URL: should be in the format **https://mydomain.okta.com**
    - Client ID & Client Secret: obtained from your Okta application
    - Authorize URL: defaults to **$ISSUER_URL/oauth2/default/v1/authorize**. Change as you see fit
    - Token URL: defaults to **$ISSUER_URL/oauth2/default/v1/token**. Change as you see fit
    - User Info URL: defaults to **$ISSUER_URL/oauth2/default/v1/userinfo**. Change as you see fit
1. Click Save
1. Click Start Verification.
![Okta SSO domain verification](./img/okta-sso-domain-verification.png)
1. Follow the instructions presented in the dashboard and add the TXT record to your DNS config.
![Okta SSO domain verification](./img/okta-sso-domain-verification-2.png)
**Pusher will work to verify the domain in the background.**
1. Once the domain is verified, you will see a similar message in the dashboard:

![Okta SSO domain verified](./img/okta-sso-domain-verified.png)
1. Your Okta users can visit Pusher using the Pusher Okta app in your organization's Okta dashboard.
**Since Pusher dashboard doesn't support multi-tenancy at the moment, in order for Pusher dashboard to identify your issuer, SSO Logins can only be through the Okta dashboard Pusher app.**
1. Users can click on "Sign in with Okta" to sign in:
![Okta SSO Login Button](./img/okta-sso-login-button.png)
