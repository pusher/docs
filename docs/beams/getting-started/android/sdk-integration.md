---
title: Pusher Beams Docs | Android SDK Integration
description: Integrate the Pusher and FCM SDKs into your project so you can start sending push notifications to your Android users.
layout: beams.njk
eleventyNavigation:
  parent: Beams getting started android
  key: Sdk integration android
  title: 2. Integrate SDK
  order: 2
---

# Integrate Android SDK

Once you have [properly configured FCM](/docs/beams/getting-started/android/configure-fcm/) you will need to integrate the Pusher & FCM SDKs into your project. In this guide we will assume that you are using Gradle and Android Studio.

## Add Firebase config file to your project

Have you downloaded the `google-services.json` config file from your Firebase project console?

  <details>

  <summary><span>If not, see this video.</span></summary>

  <figure class="mh0 mv5 pa0 border-box">
    <video controls height="auto" style="max-width: 100%">
      <source src="/docs/static/video/firebase_get_config_json.webm" type="video/webm" />
      <source src="/docs/static/video/firebase_get_config_json.mp4" type="video/mp4" />
      Hey! Your browser does not support videos!
    </video>
  </figure>

  </details>

### Move config file into project

Move your `google-services.json` config file into your Android Studio project, in the `app` directory:

```http
YOUR_ANDROID_PROJECT/app/google-services.json
```

> If you are following the quick start guide in the Pusher Beams dashboard, you can return to it now.

## Update your project-level gradle config

Add the Google Services classpath to the dependencies section of your project-level `build.gradle`:

```java/10-12
// Top-level build file where you can add configuration options common to all sub-projects/modules.

buildscript {

    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:3.0.1'
        // Add this line
        classpath 'com.google.gms:google-services:4.2.0'

        // NOTE: Do not place your application dependencies here; they belong
        // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        google()
        jcenter()
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

## Update your app-level gradle config

In order to update your app-level `build.gradle` you will need to:

- Add the Firebase Messaging SDK to your dependencies _ Add the Beams SDK to your dependencies _ Add the Google Services plugin to the end of the file

```java/24-27,32-34
apply plugin: 'com.android.application'

android {
    compileSdkVersion 26
    defaultConfig {
        applicationId "com.example.exampleapp"
        minSdkVersion 19
        targetSdkVersion 26
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'com.android.support:appcompat-v7:26.1.0'
    implementation 'com.android.support.constraint:constraint-layout:1.0.2'
    // Add these lines
    implementation 'com.google.firebase:firebase-messaging:20.2.3'
    implementation 'com.pusher:push-notifications-android:${ANDROID_SDK_VERSION}'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'com.android.support.test:runner:1.0.1'
    androidTestImplementation 'com.android.support.test.espresso:espresso-core:3.0.1'
}

// Add this line to the end of the file
apply plugin: 'com.google.gms.google-services'
```

## Synchronize Gradle

Synchronize Gradle by pressing the "Sync Now" button:

![Gradle 'Sync Now' button in Android Studio](./img/gradle-sync.png)

## Where Next?

Now that you integrated the Android SDK into your project, you can
[initialize Pusher Beams](/docs/beams/getting-started/android/init-beams/).
