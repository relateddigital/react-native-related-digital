<div style="text-align:center;">
    <img src="https://github.com/relateddigital/relateddigital-android/blob/master/app/relateddigital.png" alt=''/>
</div>

# React Native Related Digital SDK

The RelatedDigital React Native SDK provides a simple interface for integrating the RelatedDigital platform features into your React Native applications. The SDK includes methods for analytics, push notifications, and user property management.

## Installation

To install the RelatedDigital React Native SDK, add the package to your project:

```sh
npm install react-native-related-digital
```

## Platform Integration

### Android

- In the Firebase console, click on the Android icon to add an Android app to your project.
- Enter your Android app's package name and follow the instructions provided by Firebase.
- Download the `google-services.json` file when prompted, and add it to your Android project in the `android/app` folder.
- Add the lines below to your `android/build.gradle` file's both repositories sections. If you are going to do Huawei integration, add the `agconnect-services.json` file to the same location.

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

- Add below line to your `android/app/build.gradle` file's defaultConfig section.

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

#### Descriptions of Android Push Notification Parameters

| Optional Parameters           | Description                                                                                                                                                                                                           |
| :---------------------------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| notificationSmallIcon         | For entering the icon that is going to be shown in the status bar and the left top corner of the notification area. You should enter the ID of a resource in your project. Default Value : Application icon           |
| notificationSmallIconDarkMode | For entering the notificationSmallIcon value when the device is in dark theme mode. Default Value : Application icon                                                                                                  |
| isNotificationLargeIcon       | For determining if there is going to be a large icon in the right of the notification area. Default Value : false (no large icon)                                                                                     |
| notificationLargeIconFor      | entering the large icon that is going to be shown in the right of the notification area. You should enter the ID of a resource in your project. Default Value : Application icon (if isNotificationLargeIcon is true) |
| notificationLargeIconDarkMode | For entering the notificationLargeIcon value when the device is in dark theme mode. Default Value : Application icon (if isNotificationLargeIcon is true)                                                             |
| notificationPushIntent        | For entering the activity that is going to be triggered when the notification is clicked. You should enter the full path of the activity. Default Value : launcher activity                                           |
| notificationChannelName       | For entering the name of the notification channel. Default Value : Application name                                                                                                                                   |
| notificationColor             | For entering the accent color value that is going to be used in the notification area.                                                                                                                                |
| notificationPriority          | For setting the priority of the notification.(For heads-up notifications, the priority must be set to HIGH)                                                                                                           |

### iOS

- Enable `Push Notifications` and `Background Modes->Remote Notifications` capabilities.
-
- Modify `AppDelegate.h` as below

```objc
#import <UserNotifications/UNUserNotificationCenter.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
```

- Modify `AppDelegate.m` as below

```objc
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];

  [[RelatedDigitalManager shared] initRelatedDigital:@"organizationId"
                                       withProfileId:@"profileId"
                                      withDataSource:@"dataSource"
                                        withAppAlias:@"iosAppAlias"
                          withEnablePushNotification:YES
                                    withAppGroupsKey:@"group.com.relateddigital.RelatedDigitalExample.relateddigital"
                                  withDeliveredBadge:NO
                                  withEnableGeofence:NO
                    withAskLocationPermissionAtStart:NO
                                   withLaunchOptions:launchOptions];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"RelatedDigitalExample"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;

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
}

- (void)application:(UIApplication *)application
    didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
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

@end
```

-Add `Empty.swift` file to your project as the sdk contains Swift code and xcode requires at least one empty swift file in each target.

- To enable rich notification capabilites like showing image or video;
1. Add `Notification Service Extension` target to your project and name it `RelatedDigitalNotificationService`. Change this service's target iOS version to 11.0. Then change newly added `NotificationService.m` file contents with the following:
   (Don't forget to enter your app name instead of `APP_ALIAS`)

```objc
#import "NotificationService.h"
#import "RelatedDigitalNotificationService.h"

@interface NotificationService ()

@property (nonatomic, strong) void (^contentHandler)(UNNotificationContent *contentToDeliver);
@property (nonatomic, strong) UNMutableNotificationContent *bestAttemptContent;

@end

@implementation NotificationService

- (void)didReceiveNotificationRequest:(UNNotificationRequest *)request withContentHandler:(void (^)(UNNotificationContent * _Nonnull))contentHandler {
    self.contentHandler = contentHandler;
    self.bestAttemptContent = [request.content mutableCopy];

  [RelatedDigitalNotificationService didReceiveNotificationRequest:@"APP_ALIAS" withBestAttemptContent:self.bestAttemptContent withContentHandler:self.contentHandler];
}

- (void)serviceExtensionTimeWillExpire {
    // Called just before the extension will be terminated by the system.
    // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
  [RelatedDigitalNotificationService didReceiveNotificationRequest:@"APP_ALIAS" withBestAttemptContent:self.bestAttemptContent withContentHandler:self.contentHandler];
}

@end
```

2. Add below lines to your Podfile's root level.

```
target 'RelatedDigitalNotificationService' do
  pod 'react-native-related-digital', :path => '../node_modules/react-native-related-digital'

  use_native_modules!
end

# Post Install processing for RelatedDigitalNotificationService causing errors
def notification_service_post_install(installer)
  installer.pods_project.targets.each do |target|
    target.build_configurations.each do |config|
      config.build_settings['APPLICATION_EXTENSION_API_ONLY'] = 'NO'
    end
  end
end
```

3. Modify Podfile and have the following in main target section.

```
post_install do |installer|
  notification_service_post_install(installer)
  # Other post install function calls
end
```

4. Add `Empty.swift` file to your RelatedDigitalNotificationService target as the sdk contains Swift code and xcode requires at least one empty swift file in each target.

5. Make sure your deployment target is ios 11.

```sh
platform :ios, '11.0'
```

6. Execute `pod install` then run























## Usage

- First, import the `RelatedDigital` and `RelatedDigitalPushNotificationEmitter` modules:

```js
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
```

- Then, initialize Related Digital SDK with your organization ID, profile ID, and data source.

- To listen push notification events call `registerNotificationListeners` and `addListener` methods as below:

```js
RelatedDigital.initialize(
  'organizationId', // your organizationId
  'profileId', // your profileId
  'dataSource', // your organizationId
  false // dataSource
);

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

To send custom events, use the `customEvent` method:

```js
RelatedDigital.customEvent('pageName', { key: 'value' });
```

### User Properties

Set user properties with the `setUserProperty` method:

```js
RelatedDigital.setUserProperty('key', 'value');
```

Remove a user property with the `removeUserProperty` method:

```js
RelatedDigital.removeUserProperty('key');
```

### Using Push Notification Messages
You can access payload list of last 30 days if you have completed iOS NotificationServiceExtension and App Groups setup. Using getPushMessages method you can access these payloads. Android does not require special installation.

```js
RelatedDigital.getPushMessages().then((pushMessages) => {
  console.log(pushMessages);
});
```

## RelatedDigitalType

The `RelatedDigitalType` provides type information for the RelatedDigital module. It includes method signatures, input parameters, and return types for all the available SDK methods. To view the complete list of methods and their descriptions, refer to the `RelatedDigitalType` definition in the SDK source code.

## Example Application

For an example of how to use the RelatedDigital React Native SDK in a real-world application, please refer to the example project provided in the SDK repository.











## Example JSONs

### onNotificationReceived

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

### onNotificationOpened

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


### getPushMessages

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
      "title": "re",
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








