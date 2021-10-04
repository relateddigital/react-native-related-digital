<p align="center">
  <img src="https://raw.githubusercontent.com/relateddigital/relateddigital-flutter/master/screenshots/related-digital-logo.svg" width="400px;"/>
</p>

[![npm package](https://img.shields.io/npm/v/react-native-related-digital?color=gree&label=npm%20package)](https://www.npmjs.com/package/react-native-related-digital)


## Supported versions

**"react": ">=16.8.6"**

**"react-native": ">=0.60.0"**

## Installation
* Install prerequisites.
```
$ yarn add @react-native-async-storage/async-storage
```
* Install package.
```
$ yarn add react-native-related-digital
```
* Install pods (IOS only).
```
$ cd ios
$ pod install
```

## Platform Integrations

### Android
* Create a Firebase project and register your app. Download google-services.json file and place it in `android/app` folder.
* Add below line to your `android/build.gradle` file's both repositories sections. If you are going to do Huawei integration, add the `agconnect-services.json` file to the same location.
```gradle
maven {url 'http://developer.huawei.com/repo/'}
```
* Add below lines to your `android/build.gradle` file's dependencies section.
```gradle
classpath 'com.google.gms:google-services:4.3.3'
classpath 'com.huawei.agconnect:agcp:1.4.1.300'
```
* Change your `minSdkVersion` to 17.
* Add below lines to your `android/app/build.gradle` file's bottom.
```gradle
apply plugin: 'com.google.gms.google-services'
apply plugin: 'com.huawei.agconnect'
```
* Add below line to your `android/app/build.gradle` file's defaultConfig section.
```gradle
multiDexEnabled true
```
* Add below code to your `AndroidManifest.xml` file's `application` section to receive notifications when the app is foreground.
```xml
<service
    android:name="euromsg.com.euromobileandroid.service.EuroFirebaseMessagingService"
    android:exported="false">
    <intent-filter>
        <action android:name="com.google.firebase.MESSAGING_EVENT" />
    </intent-filter>
</service>
```

* If you are going to do Huawei integration, add the following lines to the file.
```xml
<service
    android:name="euromsg.com.euromobileandroid.service.EuroHuaweiMessagingService"
    android:exported="false">
    <intent-filter>
      <action  android:name="com.huawei.push.action.MESSAGING_EVENT"  />
    </intent-filter>
</service>
```

* In order to send push to Huawei devices, you need to follow the steps in the link from the Huawei Developer panel.
https://developer.huawei.com/consumer/en/doc/HMS-Plugin-Guides-V1/config-agc-0000001050178043-V1

* Add below code to your `AndroidManifest.xml` file's `application` section to enable geofence capability.
```xml
<service
    android:name="com.visilabs.gps.geofence.GeofenceTransitionsIntentService"
    android:enabled="true"
    android:permission="android.permission.BIND_JOB_SERVICE" />

<service
    android:name="com.visilabs.gps.geofence.GeofenceMonitor"
    android:enabled="true"
    android:exported="true" />

<receiver
    android:name="com.visilabs.gps.geofence.GeofenceTransitionsReceiver"
    android:enabled="true"
    android:exported="true">
    <intent-filter>
        <action android:name="com.visilabs.android.gps.geofence.ACTION_RECEIVE_GEOFENCE" />
    </intent-filter>
</receiver>

<receiver
    android:name="com.visilabs.gps.geofence.VisilabsAlarm"
    android:exported="false" />

<receiver
    android:name="com.visilabs.gps.geofence.GeofenceBroadcastReceiver"
    android:enabled="true"
    android:exported="true" />
```
* Modify your `MainApplication.java` as below to init library. Change geofenceEnabled parameter as you want.
```java
import com.visilabs.Visilabs;
import euromsg.com.euromobileandroid.EuroMobileManager;
```
```java
@Override
public void onCreate() {
  // ...

  initEuroMessage();
}

private void initEuroMessage() {
    String appAlias = "demo-alias";
    String huaweiAppAlias = "demo-alias-huawei";
    String organizationId = "OID";
    String siteId = "SID";
    String datasource = "datasource";
    String channel = "Android";
    String segmentUrl = "http://lgr.visilabs.net";
    String realtimeUrl = "http://rt.visilabs.net";
    String targetUrl = "http://s.visilabs.net/json";
    String actionUrl = "http://s.visilabs.net/actjson";
    String geofenceUrl = "http://s.visilabs.net/geojson";

    Visilabs.CreateAPI(organizationId, siteId, segmentUrl,
            datasource, realtimeUrl, channel, this, targetUrl, actionUrl, 30000, geofenceUrl, true);

    EuroMobileManager euroMobileManager = EuroMobileManager.init(appAlias, huaweiAppAlias, this);
    
    // optional
    euroMobileManager.setPushIntent("com.pushsdk.MainActivity", this);
    euroMobileManager.setNotificationTransparentSmallIcon(R.drawable.ic_launcher, this);
    euroMobileManager.setNotificationTransparentSmallIconDarkMode(R.drawable.ic_launcher, this);
    euroMobileManager.useNotificationLargeIcon(true);
    euroMobileManager.setNotificationLargeIcon(R.drawable.ic_launcher, this);
    euroMobileManager.setNotificationLargeIconDarkMode(R.drawable.ic_launcher, this);
    euroMobileManager.setNotificationColor("#d1dbbd");
    euroMobileManager.setChannelName("Channel", this);
}
```
* If you want to track installed apps, call below method.
```javascript
  await visilabsApi.sendTheListOfAppsInstalled()
```
Also, add one of the below sections to your `AndroidManifest.xml`

**Option 1**
```xml
<manifest package="com.example.myApp">
    <queries>
        <package android:name="com.example.app1" />
        <package android:name="com.example.app2" />
    </queries>
</manifest>
```

**Option 2**
```xml
<uses-permission android:name="android.permission.QUERY_ALL_PACKAGES" 
tools:ignore="QueryAllPackagesPermission" />
```

### IOS
* Enable **Push Notifications** and **Background Modes->Remote Notifications** capabilities.
* Import library in `AppDelegate.h`
```objective-c
#import <UserNotifications/UNUserNotificationCenter.h>
```
* Modify `AppDelegate.h` and add UNUserNotificationCenterDelegate. (Classical React Native Project)
```objective-c
@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, UNUserNotificationCenterDelegate>
```
* Modify `AppDelegate.h` and add UNUserNotificationCenterDelegate. (Expo Project)
```objective-c
@interface AppDelegate : UMAppDelegateWrapper <RCTBridgeDelegate, EXUpdatesAppControllerDelegate, UNUserNotificationCenterDelegate>
```
* Import libraries in `AppDelegate.m`

```objective-c
#import "RelatedDigitalPushModule.h"
#import <UserNotifications/UserNotifications.h>
```

* Modify `AppDelegate.m` file's `didFinishLaunchingWithOptions` method and add the following just before return statement.
```objective-c
UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
center.delegate = self;
```
* Modify `AppDelegate.m` and add following methods.
```objective-c
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
 [RelatedDigitalPushModule didRegisterUserNotificationSettings:notificationSettings];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
 [RelatedDigitalPushModule didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RelatedDigitalPushModule didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
 [RelatedDigitalPushModule didFailToRegisterForRemoteNotificationsWithError:error];
}

-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge);
}
```
* Modify `AppDelegate.m` file's `didFinishLaunchingWithOptions` method and add the following just before return statement. Modify inAppNotificationsEnabled and geofenceEnabled parameters as you want.
```objective-c
[RelatedDigitalPushModule initVisilabs:@"organization_id" profileId:@"profile_id" dataSource:@"datasource" inAppNotificationsEnabled:true requestTimeoutSeconds:30 geofenceEnabled:true maxGeofenceCount:20 isIDFAEnabled:true];

```
* Add `Empty.swift` file to your project as the sdk contains Swift code and xcode requires at least one empty swift file in each target.
* Add `NSUserTrackingUsageDescription` to your `Info.plist` file to be able to use AdvertisingTrackingID on iOS 14 and later. If you don't want to use it, set `isIDFAEnabled` to `false` among the `initVisilabs` parameters.
* If you have any issues while building the app due to `_swift_getFunctionReplacement` or any swift related errors, try editing your project's (not target) `Library Search Paths` and remove `$(TOOLCHAIN_DIR)/usr/lib/swift-5.0/$(PLATFORM_NAME)` line.
* If you are going to use in app notifications feature, add below lines to your project target's `Build Phases`->`Copy Bundle Resources` section. Select `Create folder references` when prompted.
`Pods/VisilabsIOS/VisilabsIOS/Classes/TargetingAction/InAppNotification/Views/VisilabsMiniNotificationViewController.xib`
`Pods/VisilabsIOS/VisilabsIOS/Classes/TargetingAction/InAppNotification/Views/VisilabsFullNotificationViewController.xib`
* To enable rich notification capabilites like showing image or video;
1. Add `Notification Service Extension` target to your project and name it `RelatedDigitalNotificationService`. Change this service's target iOS version to 10.0. Then change newly added `NotificationService.m` file contents with the following:
```objective-c
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
    
  [RelatedDigitalNotificationService didReceiveNotificationRequest:self.bestAttemptContent withContentHandler:self.contentHandler];
}

- (void)serviceExtensionTimeWillExpire {
    // Called just before the extension will be terminated by the system.
    // Use this as an opportunity to deliver your "best attempt" at modified content, otherwise the original push payload will be used.
    [RelatedDigitalNotificationService didReceiveNotificationRequest:self.bestAttemptContent withContentHandler:self.contentHandler];
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
5. Make sure your deployment target is ios 10.
```
platform :ios, '10.0'
```
6. Execute `pod install` then run.
* To enable push notification carousel;
1. Add `Notification Content Extension` target to your project and name it `RelatedDigitalNotificationContent`. Change this service's target iOS version to 11.0. Remove newly added files under RelatedDigitalNotificationContent except Info.plist. Then add EMNotificationViewController.swift file with the following content.
```swift
import UIKit
import UserNotifications
import UserNotificationsUI
import Euromsg

@available(iOS 10.0, *)
@objc(EMNotificationViewController)
class EMNotificationViewController: UIViewController, UNNotificationContentExtension {

    let appUrl = URL(string: "euromsgExample://")
    let carouselView = EMNotificationCarousel.initView()
    var completion: ((_ url: URL?, _ userInfo: [AnyHashable: Any]?) -> Void)?
    func didReceive(_ notification: UNNotification) {
        carouselView.didReceive(notification)
    }
    func didReceive(_ response: UNNotificationResponse,
                    completionHandler completion: @escaping (UNNotificationContentExtensionResponseOption) -> Void) {
        carouselView.didReceive(response, completionHandler: completion)
    }
    override func loadView() {
        completion = { [weak self] url, userInfo in
            if let url = url {
                self?.extensionContext?.open(url)
                if url.scheme != self?.appUrl?.scheme, let userInfo = userInfo {
                    Euromsg.handlePush(pushDictionary: userInfo)
                }
            }
            else if let url = self?.appUrl {
                self?.extensionContext?.open(url)
            }
        }
        carouselView.completion = completion
        self.view = carouselView
    }
}
```
2. Add or replace the following lines in newly added `RelatedDigitalNotificationContent/Info.plist`
```
<key>NSExtension</key>
<dict>
  <key>NSExtensionAttributes</key>
  <dict>
    <key>UNNotificationExtensionUserInteractionEnabled</key>
    <true/>
    <key>UNNotificationExtensionDefaultContentHidden</key>
    <false/>
    <key>UNNotificationExtensionCategory</key>
    <string>carousel</string>
    <key>UNNotificationExtensionInitialContentSizeRatio</key>
    <real>1</real>
  </dict>
  <key>NSExtensionPrincipalClass</key>
  <string>RelatedDigitalNotificationContent.EMNotificationViewController</string>
  <key>NSExtensionPointIdentifier</key>
  <string>com.apple.usernotifications.content-extension</string>
</dict>
```
3. Add below lines to your Podfile's root level.
```
target 'RelatedDigitalNotificationContent' do
  use_native_modules!
  
  pod 'Euromsg', '>= 2.0.0'
end
```
4. In Xcode, select `RelatedDigitalNotificationContent` target and add below files to `Build Phases`->`Copy Bundle Resources` section. Select `Create folder references` when prompted.
`Pods/Euromsg/Euromsg/Classes/EMNotificationCarousel/CarouselCell.xib`
`Pods/Euromsg/Euromsg/Classes/EMNotificationCarousel/EMNotificationCarousel.xib`
5. Make sure your deployment target is ios 10.
```
platform :ios, '10.0'
```
6. Execute `pod install` then run.
### Recommendations
To view recommendations, use `visilabsApi.getRecommendations(zoneId, productCode, filters)` method.
### Story
To add story view to your app, import `RDStoryView` and use as below:
```jsx
<RDStoryView
  actionId={'1'} // optional
  onItemClicked={(data) => { 
    console.log('Story data', data)
  }}
  style={{ flex: 1 }}
/>
```
### Provisional Push (iOS Only)
To use provisional push feature on iOS, call `requestPermissions` method with parameter `false`
```javascript
const isProvisional = true
requestPermissions(isProvisional)
```
### Spin to win & Scratch to win
To use these features, call `customEvent` method with the page name you created on RMC dashboard.
```javascript
visilabsApi.customEvent('*spintowin*', {
  'OM.pv': '77',
  'OM.pn': 'Nectarine Blossom & Honey Body & Hand Lotion',
  'OM.ppr': '39'
})

visilabsApi.customEvent('*scratchtowin*', {
  'OM.pv': '77',
  'OM.pn': 'Nectarine Blossom & Honey Body & Hand Lotion',
  'OM.ppr': '39'
})
```


## Usage
```jsx
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  View,
  ActivityIndicator,
  Platform
} from 'react-native';

import { addEventListener, removeEventListener, requestPermissions, EuroMessageApi, VisilabsApi, setApplicationIconBadgeNumber, logToConsole, RDStoryView } from 'react-native-related-digital'

const App = () => {
  const [loading, setLoading] = useState(false)

  const appAlias = 'alias'

  const siteId = "SID";
  const organizationId = "OID";
  const dataSource = "datasource";

  const euroMessageApi = new EuroMessageApi(appAlias)
  const visilabsApi = new VisilabsApi(appAlias, siteId, organizationId, dataSource)

  useEffect(() => {
    logToConsole(true)

    addExtra()
    addListeners()

    return () => removeListeners()
  }, [])

  const addListeners = () => {

    addEventListener('register', async (token) => {
      const subscribeResult = await euroMessageApi.subscribe(token)

      visilabsApi.register(token, (result) => {
        
      })
    }, (notificationPayload) => {
      console.log('notification payload', notificationPayload)
    }, euroMessageApi, visilabsApi)

    addEventListener('registrationError', async (registrationError) => {
      console.log('registrationError is ', registrationError)
    }, euroMessageApi)
  }

  const addExtra = async () => {
    await euroMessageApi.setUserProperty('extra', 1)
  }

  const setBadgeNumber = () => {
    const number = 3
    setApplicationIconBadgeNumber(number)
  }

  const sendCustomEvent = () => {
    visilabsApi.customEvent('*', {
      'id': '1',
      'name': 'Product Name'
    })
  }

  const getRecommendations = async () => {
    try {
      const zoneId = '6'
      const productCode = ''

      // optional
      const filters = [{
        attribute: RecommendationAttribute.PRODUCTNAME,
        filterType: RecommendationFilterType.like,
        value: 'laptop'
      }]

      const recommendations = await visilabsApi.getRecommendations(zoneId, productCode, filters)
      console.log('recommendations', recommendations)
    }
    catch (e) {
      console.log('recommendations error', e)
    }
  }

  const showMailSubscriptionForm = () => {
    visilabsApi.customEvent('*pagename*', {
      'OM.pv': '77',
      'OM.pn': 'Product',
      'OM.ppr': '39'
    })
  }

  const getFavoriteAttributeActions = async () => {
    try {
      const actionId = '474'

      const favoriteAttrs = await visilabsApi.getFavoriteAttributeActions(actionId)
      console.log('favoriteAttributeActions', favoriteAttrs)
    }
    catch (e) {
      console.log('favoriteAttributeActions error', e)
    }
  }

  const showSpinToWin = () => {
    visilabsApi.customEvent('*pragma_spintowin*', {
      'OM.pv': '77',
      'OM.pn': 'Nectarine Blossom & Honey Body & Hand Lotion',
      'OM.ppr': '39'
    })
  }

  const trackInstalledApps = async () => {
    // android only
    await visilabsApi.sendTheListOfAppsInstalled()
  }

  const showScratchToWin = () => {
    visilabsApi.customEvent('*pragma_scratch*', {
      'OM.pv': '77',
      'OM.pn': 'Nectarine Blossom & Honey Body & Hand Lotion',
      'OM.ppr': '39'
    })
  }

  const removeListeners = () => {
    removeEventListener('register')
    removeEventListener('registrationError')
  }

  return (
    <>
      <SafeAreaView>
        {
          loading ?
          <ActivityIndicator 
            size='large'
            animating={loading} /> :
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <RDStoryView
              actionId={'1'} // optional
              onItemClicked={(data) => {
                console.log('Story data', data)
              }}
              style={{ flex: 1 }}
            />
            <Button 
              title='REQUEST PERMISSONS'
              onPress={() => {
                const isProvisional = false
                requestPermissions(isProvisional)
              }} 
            />
            <Button 
              title='SET BADGE NUMBER TO 3 (IOS)'
              onPress={() => {
                setBadgeNumber()
              }} 
            />
            <Button 
              title='SEND CUSTOM EVENT'
              onPress={() => {
                sendCustomEvent()
              }} 
            />
            <Button
              title='GET RECOMMENDATIONS'
              onPress={async () => {
                await getRecommendations()
              }}
            />
            <Button
              title='SHOW MAIL FORM'
              onPress={() => {
                showMailSubscriptionForm()
              }}
            />

            <Button
              title='GET FAVORITE ATTRIBUTE ACTIONS'
              onPress={async () => {
                await getFavoriteAttributeActions()
              }}
            />

            <Button
                title='SPIN TO WIN'
                onPress={() => {
                  showSpinToWin()
                }}
              />

            <Button
                title='SCRATCH TO WIN'
                onPress={() => {
                  showScratchToWin()
                }}
              />

              <Button
                title='TRACK INSTALLED APPS'
                onPress={() => {
                  trackInstalledApps()
                }}
              />
          </ScrollView>
        }
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#FFF',
    padding: 20
  },
  divider: {
    height: 20
  }
});

export default App;

```
