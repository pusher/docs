---
title: Sdk integration - Beams - Pusher Docs
layout: beams.njk
eleventyNavigation: 
  parent: Beams getting started android
  key: Sdk integration android
  title: 2. Integrate SDK
  order: 2
---
# Integrate Android SDK
 
Once you have [properly configured FCM]({urls.android.step1}) you will need to integrate the Pusher & FCM SDKs into your project. In this guide we will assume that you are using Gradle and Android Studio. 
 
# Add Firebase config file to your project
 
Have you downloaded the `google-services.json` config file from your Firebase project console? If not, <Anchor role="button" onClick={this.toggleConfigJsonVisible}> see this video. {PlayIcon} </Anchor> 
 {configJsonVideoVisible && <ConfigJsonVideo />} 
## Move config file into project
 
Move your `google-services.json` config file into your Android Studio project, in the `app` directory: 
 
```http
YOUR_ANDROID_PROJECT/app/google-services.json
```
 <Alert primary> If you are following the quick start guide in the Pusher Beams dashboard, you can return to it now. </Alert> 
# Update your project-level gradle config
 
Add the Google Services classpath to the dependencies section of your project-level `build.gradle`: 
 <CodeDiff language="plaintext">{projectGradle}</CodeDiff> 
# Update your app-level gradle config
 
In order to update your app-level `build.gradle` you will need to: 
  * Add the Firebase Messaging SDK to your dependencies * Add the Beams SDK to your dependencies * Add the Google Services plugin to the end of the file  <CodeDiff language="plaintext">{appGradle}</CodeDiff> 
# Synchronize Gradle
 
Synchronize Gradle by pressing the "Sync Now" button:

        <Image
          alt="Gradle 'Sync Now' button in Android Studio"
          src="/docs/static/beams/media/gradle-sync.png"
        />
        
#  Where Next?

        Now that you integrated the Android SDK into your project, you can
        [initialize Pusher Beams]({urls.android.step3}).
