<div style="text-align:center;">
    <img src="https://github.com/relateddigital/relateddigital-android/blob/master/app/relateddigital.png" alt=''/>
</div>

# React Native Related Digital SDK

#####

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Platform Integration](#platform-integration)
  - [Android](#android)
  - [iOS](#ios)
- [JavaScript(TypeScript) Integration](#javascripttypescript-integration)
  - [Registering the listeners](#registering-the-listeners)
  - [Analytics](#analytics)
  - [Push Notifications](#push-notifications)

[//]: # (  - [User Properties]&#40;#user-properties&#41;)

## Introduction

The RelatedDigital React Native SDK provides a simple interface for integrating the RelatedDigital platform features
into your React Native applications. The SDK includes methods for analytics, push notifications, and user property
management.

## Installation

To install the RelatedDigital React Native SDK, add the package to your project:

```
npm install react-native-related-digital@1.0.6
```

## Platform Integration

### Android

- In the Firebase console, click on the Android icon to add an Android app to your project.
- Enter your Android app's package name and follow the instructions provided by Firebase.
- Download the `google-services.json` file when prompted, and add it to your Android project in the `android/app`
  folder.
- If you are going to do Huawei integration, add the `agconnect-services.json` file to the same location.
- Add the lines below to your `android/build.gradle` file's both `repositories` sections.

```gradle
maven { url 'https://jitpack.io' }
maven { url 'https://developer.huawei.com/repo/' }
```

- Add the lines below to your `android/build.gradle` file's dependencies section.

```gradle
classpath 'com.google.gms:google-services:4.3.15'
classpath 'com.huawei.agconnect:agcp:1.7.2.300'
```

- Add the lines below to your `android/app/build.gradle` file's top.

```gradle
apply plugin: 'com.google.gms.google-services'
apply plugin: 'com.huawei.agconnect'
```

- Add below line to your `android/app/build.gradle` file's `defaultConfig` section.

```gradle
multiDexEnabled true
```

- Change your `minSdkVersion` to 21 or above.

- Change your `compileSdkVersion` and `targetSdkVersion` to 32 or above.

- Change `onCreate` method of `MainActivity.java` as below to initialize Related Digital SDK.

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
  super.onCreate(savedInstanceState);
  RelatedDigitalManager rdManager = RelatedDigitalManager.Companion.getSharedInstance();
  rdManager.injectReactInstanceManager(getReactInstanceManager());
  rdManager.initRelatedDigital(getApplicationContext(),
    "organizationId", // your organizationId
    "profileId", // your profileId
    "dataSource", // your dataSource
    "googleAppAlias", // your firebase app alias defined in RMC panel
    "huaweiAppAlias", // your huawei app alias defined in RMC panel
    true, // set true to enable push notifications
    false, // set true to enable geofence
    R.drawable.text_icon, // notificationSmallIcon
    R.drawable.text_icon_dark_mode, // notificationSmallIconDarkMode
    true, // isNotificationLargeIcon
    R.mipmap.ic_launcher, // notificationLargeIcon
    R.mipmap.ic_launcher, // notificationLargeIconDarkMode
    "com.relateddigital.androidexampleapp.MainActivity", // notificationPushIntent
    "RelatedDigital Channel", // notificationChannelName
    "#d1dbbd", // notificationColor
    RDNotificationPriority.NORMAL // notificationPriority
  );
}
```

#### Resolving Push Notification Conflicts


In certain scenarios, you might encounter conflicts or errors due to multiple classes extending `FirebaseMessagingService` within your project. This situation generally arises when several integrated libraries each define a class that extends `FirebaseMessagingService`.

As part of its design, Android merges all manifest files during application startup. This can lead to the multiple declarations of classes extending `FirebaseMessagingService`, causing conflicts.

To utilize the push notification feature of the Related Digital SDK, you must disable the `FirebaseMessagingService` declared in the other libraries.

Here's how to disable a service using the `tools:node="remove"` attribute in your Android Manifest file:

```xml
<service
  android:name="io.invertase.firebase.messaging.ReactNativeFirebaseMessagingService"
  tools:node="remove" />
```

In this snippet, `tools:node="remove"` effectively removes the `ReactNativeFirebaseMessagingService` from the final, merged Android manifest, thus disabling the service within your application.

Please note that for the `tools:node="remove"` attribute to function correctly, you must define the tools namespace at the beginning of your manifest file:

```
<manifest
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    package="com.example.app" />
```

#### Descriptions of Android Push Notification Parameters

| Optional Parameters           | Description                                                                                                                                                                                                             |
|:------------------------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| notificationSmallIcon         | For entering the icon that is going to be shown in the status bar and the left top corner of the notification area. You should enter the ID of a resource in your project. `Default Value : Application icon`           |
| notificationSmallIconDarkMode | For entering the notificationSmallIcon value when the device is in dark theme mode. `Default Value : Application icon`                                                                                                  |
| isNotificationLargeIcon       | For determining if there is going to be a large icon in the right of the notification area. `Default Value : false (no large icon)`                                                                                     |
| notificationLargeIconFor      | entering the large icon that is going to be shown in the right of the notification area. You should enter the ID of a resource in your project. `Default Value : Application icon (if isNotificationLargeIcon is true)` |
| notificationLargeIconDarkMode | For entering the notificationLargeIcon value when the device is in dark theme mode. `Default Value : Application icon (if isNotificationLargeIcon is true)`                                                             |
| notificationPushIntent        | For entering the activity that is going to be triggered when the notification is clicked. You should enter the full path of the activity. `Default Value : launcher activity`                                           |
| notificationChannelName       | For entering the name of the notification channel. `Default Value : Application name`                                                                                                                                   |
| notificationColor             | For entering the accent color value that is going to be used in the notification area.                                                                                                                                  |
| notificationPriority          | For setting the priority of the notification.(For heads-up notifications, the priority must be set to HIGH)                                                                                                             |


### iOS

#### Create Objective-C Bridging if your iOS project is in Objective-C

- After installing the pods, open your project's .xcworkspace file in Xcode. If your project is in Objective-C, add an empty Swift file to your project (File -> New -> Swift File), with a bridging header (you'll be prompted to auto-create one).
  - Right-click on the project's name directory & select New File.
  - Select Swift File & click Next.
  - Give a name to your file, for example, `Empty.swift`, and click Create.
  - Select Create Bridging Header.
- Endpoint Configuration in `Info.plist`

#### Add Required Capabilities

- In Xcode, select the root project and main app target. Change `Info.plist` to `Source Code` and add the following lines to the file:

```xml
<dict>
  <key>UIBackgroundModes</key>
  <array>
    <string>fetch</string>
    <string>remote-notification</string>
  </array>
</dict>
```

- In Xcode, select the root project and main app target. Change `appname.entitlemens` to `Source Code` and add the following lines to the file. The value of `BUNDLE_ID` should be your app's bundle id:

```xml
<dict>
  <key>com.apple.security.application-groups</key>
  <array>
    <string>group.BUNDLE_ID.relateddigital</string>
  </array>
</dict>
```

#### Add Notification Service Extension

- To enable rich notification capabilities like showing image or video;
- Add `Notification Service Extension` target to your project and name it `RelatedDigitalNotificationService`.
- Add Notification Service Extension related pods to your `Podfile`:

```
target 'RelatedDigitalExampleNotificationService' do
  pod 'RelatedDigitalIOS', '4.0.16'
end
```

- Change this service's target iOS version to your main app's iOS version. Then change newly added `RelatedDigitalNotificationService.swift` file contents with the following:

```swift
import UserNotifications
import RelatedDigitalIOS

class NotificationService: UNNotificationServiceExtension {

  var contentHandler: ((UNNotificationContent) -> Void)?
  var bestAttemptContent: UNMutableNotificationContent?

  override func didReceive(_ request: UNNotificationRequest, withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
    self.contentHandler = contentHandler
    bestAttemptContent = (request.content.mutableCopy() as? UNMutableNotificationContent)
    DispatchQueue.main.async {
      RelatedDigital.initialize(organizationId: "YOUR_ORGANIZATION_ID", profileId: "YOUR_PROFILE_ID",
      dataSource: "YOUR_DATA_SOURCE", launchOptions: nil, askLocationPermmissionAtStart: false)
      RelatedDigital.loggingEnabled = true
      RelatedDigital.enablePushNotifications(appAlias: "YOUR_APP_ALIAS", launchOptions: nil, appGroupsKey: "YOUR_APP_GROUPS_KEY")
      RDPush.didReceive(self.bestAttemptContent, withContentHandler: contentHandler)
    }
  }

  override func serviceExtensionTimeWillExpire() {
    guard let contentHandler = self.contentHandler else {
      return;
    }
    guard let bestAttemptContent = self.bestAttemptContent else {
      return;
    }
    contentHandler(bestAttemptContent)
  }
}
```

- In Xcode, select the root project and notification extension target. Change `appname.entitlemens` to `Source Code` and add the following lines to the file. The value of `BUNDLE_ID` should be your app's bundle id:

```xml
<dict>
  <key>com.apple.security.application-groups</key>
  <array>
    <string>group.BUNDLE_ID.relateddigital</string>
  </array>
</dict>
```

#### Setup AppDelegate

- Modify `AppDelegate.h` as below

```objc
#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <UserNotifications/UserNotifications.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>

@property (nonatomic, strong) UIWindow *window;

@end

```

- Modify `AppDelegate.m` as below

```objc
#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Firebase.h>

@import react_native_related_digital;

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application
                                                withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {


  [FIRApp configure];



#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];



  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"RelatedDigitalExample"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;




  [[RelatedDigitalManager shared] initRelatedDigital:@"YOUR_ORGANIZATION_ID"
                                       withProfileId:@"YOUR_PROFILE_ID"
                                      withDataSource:@"YOUR_DATA_SOURCE"
                                        withAppAlias:@"YOUR_APP_ALIAS"
                          withEnablePushNotification:YES
                                    withAppGroupsKey:@"group.YOUR_APP_ALIAS.relateddigital"
                                  withDeliveredBadge:YES
                                  withEnableGeofence:NO
                    withAskLocationPermissionAtStart:NO
                                  withLoggingEnabled:YES
                                   withLaunchOptions:launchOptions];


  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
       willPresentNotification:(UNNotification *)notification
         withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler {
  completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge);
  [[RelatedDigitalManager shared] didReceiveRemoteNotification:notification];
}

- (void)application:(UIApplication *)application
    didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [[RelatedDigitalManager shared] didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application
    didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo
          fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler {
  [[RelatedDigitalManager shared] didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

- (void)userNotificationCenter:(UNUserNotificationCenter *)center
    didReceiveNotificationResponse:(UNNotificationResponse *)response
             withCompletionHandler:(void (^)(void))completionHandler {
  [[RelatedDigitalManager shared] didReceiveNotificationResponse:response withCompletionHandler:completionHandler];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  NSLog(@"didFailToRegisterForRemoteNotificationsWithError %@", error.description );
}

@end
```

#### Enable Silent Push Notifications

- Follow the steps (https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_usernotifications_filtering) to allow the notification service extension to receive remote notifications without displaying the notification to the user a

#### PodFile

- Your final `PodFile` should look like this

```ruby
require_relative '../node_modules/react-native/scripts/react_native_pods'
require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'

platform :ios, '12.4'

target 'RelatedDigitalExampleNotificationService' do
  pod 'RelatedDigitalIOS', '4.0.16'
end

target 'RelatedDigitalExample' do
  config = use_native_modules!
  use_react_native!(:path => config["reactNativePath"])

  use_flipper!()
  post_install do |installer|
    flipper_post_install(installer)
    __apply_Xcode_12_5_M1_post_install_workaround(installer)
    notification_service_post_install(installer)
  end
end

def notification_service_post_install(installer)
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['APPLICATION_EXTENSION_API_ONLY'] = 'NO'
    end
  end
end
```

## JavaScript(TypeScript) Integration

### Registering the listeners

- First, import the `RelatedDigital` and `RelatedDigitalPushNotificationEmitter` modules:
- To listen push notification events call `registerNotificationListeners` and `addListener` methods as below:

```javascript
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

import {
  RelatedDigital,
  RelatedDigitalPushNotificationEmitter,
  onNotificationRegistered,
  onNotificationReceived,
  onNotificationOpened,
} from 'react-native-related-digital';

RelatedDigital.registerNotificationListeners();

RelatedDigitalPushNotificationEmitter.addListener(
  onNotificationRegistered,
  (token) => {
    console.log(onNotificationRegistered);
    console.log(token);
  }
);

RelatedDigitalPushNotificationEmitter.addListener(
  onNotificationReceived,
  (payload) => {
    console.log(onNotificationReceived);
    console.log(payload);
  }
);

RelatedDigitalPushNotificationEmitter.addListener(
  onNotificationOpened,
  (payload) => {
    console.log(onNotificationOpened);
    console.log(payload);
  }
);

AppRegistry.registerComponent(appName, () => App);
```

### Analytics



#### Sign Up

```javascript
RelatedDigital.signUp(exVisitorId, properties);
```

- `exVisitorId`: A string representing the visitor ID.
- `properties`: An object containing user properties.


#### Login

```javascript
RelatedDigital.login(exVisitorId, properties);
```

- `exVisitorId`: A string representing the visitor ID.
- `properties`: An object containing user properties.

#### Logout

```javascript
RelatedDigital.logout();
```

#### Custom Event

To send custom events, use the `customEvent` method:

```javascript
RelatedDigital.customEvent('pageName', { key: 'value' });
```

- `pageName`: The current page of your application. If your event is not related to a page view, you should pass a value related to the event. If you pass an empty String the event would be considered invalid and discarded.
- `parameters`: A collection of key/value pairs related to the event. If your event does not have additional data apart from page name, passing an empty dictionary acceptable.



### Push Notifications

#### Ask for Push Notification Permission

This method will ask for push notification permission. If the user has already granted permission, this method will not ask for permission again. Android doesn't require to ask for permission explicitly. This method is only for iOS.

```javascript
RelatedDigital.askForPushNotificationPermission();
```


#### Set Email

```javascript
RelatedDigital.setEmail('test@example.com', true);
```

- `email`: A string representing the user's email address.
- `permission`: A boolean value indicating whether the user has granted permission

#### Get Push Messages' Payloads

- You can access payload list of last 30 days if you have completed iOS NotificationServiceExtension and App Groups setup.
- Using `getPushMessages` method you can access these payloads. Android does not require special installation.

```
RelatedDigital.getPushMessages().then((pushMessages) => {
  console.log(pushMessages);
});
```

#### Get Push Notification Token

```javascript
RelatedDigital.getToken().then((token) => {
  console.log(token);
  Alert.alert('Push Token', token);
});
```

#### Example Payload JSONs

##### onNotificationReceived

```json
{
  "emPushSp": "-",
  "message": "Text Message",
  "params": {
    "emPushSp": "-",
    "message": "Text Message",
    "pushId": "cc80d835-be2d-49ec-a742-ab4d721651ed",
    "pushType": "Text",
    "silent": "True",
    "title": "sample string 1"
  },
  "pushId": "cc80d835-be2d-49ec-a742-ab4d721651ed",
  "pushType": "Text",
  "silent": "True",
  "sound": "",
  "title": "sample string 1"
}
```

##### onNotificationOpened

```json
{
  "emPushSp": "-",
  "message": "Text Message",
  "params": {
    "emPushSp": "-",
    "message": "Text Message",
    "pushId": "e4180169-0c96-4a6d-88f3-fe78e072dc62",
    "pushType": "Text",
    "silent": "False",
    "title": "sample string 1"
  },
  "pushId": "e4180169-0c96-4a6d-88f3-fe78e072dc62",
  "pushType": "Text",
  "silent": "False",
  "sound": "",
  "title": "sample string 1"
}
```

##### getPushMessages

- Android

```json
[
  {
    "date": "2023-04-11 00:28:36",
    "emPushSp": "-",
    "message": "Text Message",
    "params": {
      "pushId": "4836b750-8639-469a-8b85-f3ae056edbab",
      "silent": "False",
      "emPushSp": "-",
      "title": "Example Title",
      "message": "Text Message",
      "pushType": "Text"
    },
    "pushId": "4836b750-8639-469a-8b85-f3ae056edbab",
    "pushType": "Text",
    "silent": "False",
    "sound": "",
    "title": "re"
  },
  {
    "date": "2023-04-11 00:05:13",
    "emPushSp": "-",
    "message": "Text Message",
    "params": {
      "pushId": "e4180169-0c96-4a6d-88f3-fe78e072dc62",
      "silent": "False",
      "emPushSp": "-",
      "title": "sample string 1",
      "message": "Text Message",
      "pushType": "Text"
    },
    "pushId": "e4180169-0c96-4a6d-88f3-fe78e072dc62",
    "pushType": "Text",
    "silent": "False",
    "sound": "",
    "title": "sample string 1"
  }
]
```

- iOS

```json
[
  {
    "altUrl": "",
    "aps": {
      "alert": {
        "body": "ios-test message body",
        "title": "ios-test message title"
      },
      "mutable-content": 1,
      "sound": ""
    },
    "emPushSp": "-",
    "deepLink": "https://google.com",
    "mediaUrl": "https://media-cdn.com/example.png",
    "pushId": "e1848de5-d025-43f0-a3c5-f9dd041e49a7",
    "pushType": "Image",
    "silent": "False",
    "url": "https://google.com"
  }
]
```







