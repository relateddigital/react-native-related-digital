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
npm i @react-native-async-storage/async-storage
```
```
yarn add @react-native-async-storage/async-storage
```
* Install package.
```
npm i react-native-related-digital
```
```
yarn add react-native-related-digital
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
mavenCentral()
maven {
    url 'http://developer.huawei.com/repo/'
    allowInsecureProtocol = true
}
```
* Add below lines to your `android/build.gradle` file's dependencies section.
```gradle
classpath 'com.google.gms:google-services:4.3.10'
classpath 'com.huawei.agconnect:agcp:1.6.5.300'
```
* Change your `minSdkVersion` to 21.
* Change your `compileSdkVersion` and `targetSdkVersion` to 32.
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
            datasource, realtimeUrl, channel, this, targetUrl, actionUrl, 30000, geofenceUrl, true, "reactnative");

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
    euroMobileManager.setNotificationPriority(RDNotificationPriority.NORMAL, this); // Set to HIGH for push notifications to appear as temporary banners
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
* Add below listener to be able to handle carousel push notification's item click.
```javascript
  addEventListener('carouselItemClicked', async (carouselItemInfo) => {
    console.log('carouselItemInfo is ', carouselItemInfo)
  }, euroMessageApi)
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
If you don't want the location permission to be taken on startup, set the `askLocationPermmissionAtStart` parameter to false. Then you can request permission at any time with the `requestLocationPermission()` function.
```objective-c
[RelatedDigitalPushModule initRelatedDigital:@"organization_id" profileId:@"profile_id" dataSource:@"datasource" appAlias:@"app_alias" inAppNotificationsEnabled:true requestTimeoutSeconds:30 geofenceEnabled:true askLocationPermmissionAtStart:true maxGeofenceCount:20 isIDFAEnabled:true loggingEnabled:true];

```
* Add `Empty.swift` file to your project as the sdk contains Swift code and xcode requires at least one empty swift file in each target.
* Add `NSUserTrackingUsageDescription` to your `Info.plist` file to be able to use AdvertisingTrackingID on iOS 14 and later. If you don't want to use it, set `isIDFAEnabled` to `false` among the `initRelatedDigital` parameters.
* If you have any issues while building the app due to `_swift_getFunctionReplacement` or any swift related errors, try editing your project's (not target) `Library Search Paths` and remove `$(TOOLCHAIN_DIR)/usr/lib/swift-5.0/$(PLATFORM_NAME)` line.
* If you are going to use in app notifications feature, add below lines to your project target's `Build Phases`->`Copy Bundle Resources` section. Select `Create folder references` when prompted.
  * `Pods/VisilabsIOS/Sources/TargetingAction/InAppNotification/Views/VisilabsMiniNotificationViewController.xib`
  * `Pods/VisilabsIOS/Sources/TargetingAction/InAppNotification/Views/VisilabsFullNotificationViewController.xib`
  * `Pods/VisilabsIOS/Sources/TargetingAction/sideBar/sideBarView.xib`
  * `Pods/VisilabsIOS/Sources/TargetingAction/InAppNotification/BannerView/BannerView.xib`
  * `Pods/VisilabsIOS/Sources/TargetingAction/InAppNotification/BannerView/BannerCollectionViewCell.xib`
* #### To enable rich notification capabilites like showing image or video;
1. Add `Notification Service Extension` target to your project and name it `RelatedDigitalNotificationService`. Change this service's target iOS version to 10.0. Then change newly added `NotificationService.m` file contents with the following:
(Don't forget to enter your app name instead of `APP_ALIAS`)
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
5. Make sure your deployment target is ios 10.
```
platform :ios, '10.0'
```
6. Execute `pod install` then run.
* #### To enable push notification carousel;
1. Add `Notification Content Extension` target to your project and name it `RelatedDigitalNotificationContent`. Change this service's target iOS version to 11.0. Remove newly added files under RelatedDigitalNotificationContent except Info.plist. Then add EMNotificationViewController.swift file with the following content.
```swift
import UIKit
import UserNotifications
import UserNotificationsUI
import Euromsg

@objc(EMNotificationViewController)
class EMNotificationViewController: UIViewController, UNNotificationContentExtension {
    
    let carouselView = EMNotificationCarousel.initView()
    var completion: ((_ url: URL?, _ bestAttemptContent: UNMutableNotificationContent?) -> Void)?
    
    var notificationRequestIdentifier = ""
    
    func didReceive(_ notification: UNNotification) {
        notificationRequestIdentifier = notification.request.identifier
        Euromsg.configure(appAlias: "APP_ALIAS", launchOptions: nil, enableLog: true)
        carouselView.didReceive(notification)
    }
    func didReceive(_ response: UNNotificationResponse, completionHandler completion: @escaping (UNNotificationContentExtensionResponseOption) -> Void) {
        carouselView.didReceive(response, completionHandler: completion)

    }
    override func loadView() {
        completion = { [weak self] url, bestAttemptContent in
            if let identifier = self?.notificationRequestIdentifier {
                UNUserNotificationCenter.current().removeDeliveredNotifications(withIdentifiers: [identifier])
                UNUserNotificationCenter.current().getDeliveredNotifications(completionHandler: { notifications in
                    bestAttemptContent?.badge =  NSNumber(value: notifications.count)
                })
            }
            if let url = url {
                if #available(iOSApplicationExtension 12.0, *) {
                    self?.extensionContext?.dismissNotificationContentExtension()
                }
                self?.extensionContext?.open(url)
            } else {
                if #available(iOSApplicationExtension 12.0, *) {
                    self?.extensionContext?.performNotificationDefaultAction()
                }
            }
        }
        carouselView.completion = completion
        carouselView.delegate = self
        self.view = carouselView
    }
}

/**
 Add if you want to track which carousel element has been selected
 */
extension EMNotificationViewController: CarouselDelegate {
    
    func selectedItem(_ element: EMMessage.Element) {
        // Add your work...
        print("Selected element is => \(element)")
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
    * `Pods/Euromsg/Sources/Euromsg/Classes/EMNotificationCarousel/CarouselCell.xib`
    * `Pods/Euromsg/Sources/Euromsg/Classes/EMNotificationCarousel/EMNotificationCarousel.xib`
5. Make sure your deployment target is ios 10.
```
platform :ios, '10.0'
```
6. Execute `pod install` then run.

### App Groups

Enable `App Groups` Capability for your targets. App Groups allow your app to execute code when a notification is recieved, even if your app is not active. This is required for Related Digital's analytics features and to store and access notification payloads of the last 30 days.

- In your Main App Target go to `Signing & Capabilities > All`. 
- Click `+ Capability` if you do not have App Groups in your app yet.
- Select App Groups.
- Under App Groups click the `+` button.
- Set the `App Groups` container to be `group.BUNDLE_ID.relateddigital` where `BUNDLE_ID` is the same as set in `Bundle Identifier`.
- Press OK.
- In the NotificationServiceExtension Target
- Go to `Signing & Capabilities > All`
- Click `+ Capability` if you do not have App Groups in your app yet.
- Select App Groups
- In the NotificationContentExtension Target go to `Signing & Capabilities` > All`.
- Click `+ Capability`.
- Select App Groups
- Under App Groups click the `+` button.
- Set the `App Groups` container to be `group.BUNDLE_ID.relateddigital` where `BUNDLE_ID` is the same as your Main App Target `Bundle Identifier`. Do Not Include `NotificationServiceExtension` and `NotificationContentExtension`.
- Press OK

![App Groups](https://raw.githubusercontent.com/relateddigital/euromessage-ios/master/screenshots/appgroups.png)

![App Groups Name](https://raw.githubusercontent.com/relateddigital/euromessage-ios/master/screenshots/appgroups-name.png)


#### Errors and Solutions
  If you are getting errors regarding the firebase app, update all Define Module parameters to YES as shown in the screenshots.
  
  ![Pods Defines Module](https://raw.githubusercontent.com/relateddigital/euromessage-ios/master/screenshots/podsdefinesmodule.png)
  ![Main Target Defines Module](https://raw.githubusercontent.com/relateddigital/euromessage-ios/master/screenshots/maintargetdefinesmodule.png)
  ![Service Target Defines Module](https://raw.githubusercontent.com/relateddigital/euromessage-ios/master/screenshots/servicetargetdefinesmodule.png)
  ![Content Target Defines Module](https://raw.githubusercontent.com/relateddigital/euromessage-ios/master/screenshots/contenttargetdefinesmodule.png)

### Recommendations

To view recommendations, use `visilabsApi.getRecommendations(zoneId, productCode, properties, filters)` method.

```json
{
    "recommendations": [
        {
            "attr1": "420494",
            "attr10": "",
            "attr2": "",
            "attr3": "",
            "attr4": "",
            "attr5": "",
            "attr6": "",
            "attr7": "",
            "attr8": "",
            "attr9": "",
            "brand": "Related Digital",
            "code": "1159092",
            "comment": 0,
            "cur": "TRY",
            "dcur": "TRY",
            "dest_url": "https://relateddigital.com/example-product?OM.zn=You%20Viewed-w60&OM.zpc=1159092",
            "discount": 0,
            "dprice": 5.25,
            "freeshipping": false,
            "img": "https://cdn.relateddigital.com/example.png",
            "price": 5.25,
            "qs": "OM.zn=You Viewed-w60&OM.zpc=1159092",
            "rating": 0,
            "samedayshipping": false,
            "title": "Titiz TP-115 Yeşil Ayakkabı"
        }
    ],
    "title": "Display You Viewed"
}
```

After clicking on each product, run the following function with the `qs` parameter. This parameter is included in the response returned from the `getRecommendations` function.
```js
visilabsApi.trackRecommendationClick(qs)
```

More information [Rmc Docs](https://relateddigital.atlassian.net/wiki/spaces/RMCKBT/pages/1746403404/React+Native+-+Recommendations)

### Story
Follow the step below to add a countdown to your stories.

**iOS**

Add below lines to your project target's `Build Phases`->`Copy Bundle Resources` section. Select `Create folder references` when prompted.
  * `Pods/VisilabsIOS/Sources/TargetingAction/Story/Views/timerView/timerView.xib`

**Android**

No special installation required

**Usage**

To add story view to your app, import `RDStoryView` and use as below:
```jsx
import { RDStoryView } from 'react-native-related-digital'
...
...
<RDStoryView
  actionId={'1'} // optional
  onItemClicked={(data) => { 
    console.log('Story data', data)
  }}
  style={{ flex: 1 }}
/>
```


### App Banner

**iOS**

Add below lines to your project target's `Build Phases`->`Copy Bundle Resources` section. Select `Create folder references` when prompted.
  * `Pods/VisilabsIOS/Sources/TargetingAction/InAppNotification/BannerView/BannerView.xib`
  * `Pods/VisilabsIOS/Sources/TargetingAction/InAppNotification/BannerView/BannerCollectionViewCell.xib`

**Android**

No special installation required

**Usage**

To add banner view to your app, import `RDBannerView` and use as below:
```jsx
import { RDBannerView } from 'react-native-related-digital'
...
...
<RDBannerView
  properties={{
    // 'OM.inapptype': 'banner_carousel',
  }}
  onRequestResult={isAvailable => 
    console.log('Related Digital - Banners', isAvailable)
  }
  onItemClicked={data => 
    console.log('Related Digital - Banner data', data)
  }
  style={{
    flex: 1,
  }}
/>
```

`onRequestResult` response
```js
{ "isAvailable": true } // or false
```

`onItemClicked` response
```js
{ "bannerLink": "URL" }
```

### Provisional Push (iOS Only)
To use provisional push feature on iOS, call `requestPermissions` method with parameter `false`
```javascript
const isProvisional = true
requestPermissions(isProvisional)
```
### Request and Send IDFA (iOS Only)
You can call the `requestIDFA` function whenever you want to show `App Tracking Transparency` prompt to request IDFA and send the value to Visilabs servers. If you are going to use this function, you should set the `isIDFAEnabled` parameter to `false` in the initial parameters.
```javascript
requestIDFA()
```
### Request Location Permission
If you have set the (iOS only)`askLocationPermmissionAtStart` parameter in `initRelatedDigital` to false in the `AppDelegate.m` file, you can request location permission wherever you want with this function.
```javascript
requestLocationPermission()
```
### Geofencing Interval (Android Only)
(Android only) You can change the geofence location update interval with the `setGeofencingIntervalInMinute` function.
```javascript
setGeofencingIntervalInMinute(15)
```
### Sending Location Status Information
You can call the `sendLocationPermission` method to to send the location permission status of your users to Visilabs servers and use this information on the panel later.
```javascript
await visilabsApi.sendLocationPermission()
```
This information is sent with the `OM.locpermit` parameter and can take one of the following 3 values:

* "always" : Location permission is obtained while the application is open and closed.
* "appopen" : Location permission is only obtained when the app is open.
* "none" : Location permission is not obtained.

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

### Using Push Notification Messages
You can access payload list of last 30 days if you have completed iOS `NotificationServiceExtension` and `App Groups` setup. Using `getPushMessages` method you can access these payloads. Android does not require special installation.
```javascript
const getPushMessages = async () => {
    const messages = await euroMessageApi.getPushMessages()
    console.log('messages', messages)
}
```
Messages are sorted by date. The most recent message is displayed at the top of the list.
```json
// Android response
[
    {
        "altUrl": "",
        "date": "2021-12-01 17:17:15",
        "emPushSp": "CF203B70D23C40DF84167C339648CC94|2CCE03D672E4492EB6C85CDBD8AB9D5E|D61E3546732A454C9F304F92942B6BEB|485350|1|0|true|false|0|0|05b89538-3840-4726-a950-e2045a74bc2e",
        "mediaUrl": "https://live.relateddigital.com/a02/img/ios-logo.png",
        "message": "text message",
        "params": {
            "altUrl": "",
            "badgeCount": "0",
            "emPushSp": "CF203B70D23C40DF84167C339648CC94|2CCE03D672E4492EB6C85CDBD8AB9D5E|D61E3546732A454C9F304F92942B6BEB|485350|1|0|true|false|0|0|05b89538-3840-4726-a950-e2045a74bc2e",
            "mediaUrl": "https://live.relateddigital.com/a02/img/ios-logo.png",
            "message": "text message",
            "pushId": "6d827ae9-bcaa-47e1-b2c4-f8ace771f3f5",
            "pushType": "Image",
            "sound": "",
            "title": "text message",
            "url": ""
        },
        "pushId": "6d827ae9-bcaa-47e1-b2c4-f8ace771f3f5",
        "pushType": "Image",
        "sound": "",
        "title": "text message",
        "url": ""
    }
]

// iOS response
[
    {
        "altUrl": "",
        "pushId": "00763ff4-3ec4-426c-953e-a27a8eee9fed",
        "aps": {
            "alert": {
                "title": "Message Title",
                "body": "Message body"
            }
        },
        "emPushSp": "CF203B70D23C40DF84167C339648CC94|2CCE03D672E4492EB6C85CDBD8AB9D5E|EFBFBB2E69FD4531B758C7A248446068|486816|2|0|true|false|0|0|73b4512a-2d35-48af-9ede-fe3f0ad9797b",
        "mediaUrl": "https:\/\/raw.githubusercontent.com\/relateddigital\/euromessage-ios\/master\/screenshots\/appgroups-name.png",
        "formattedDateString": "2021-12-08 01:34:59",
        "pushType": "Image",
        "url": "www.example.com"
    }
] 
```


### Get User Data
You can use `getUserAllData` method to access user data.
```javascript
import {getUserAllData} from 'react-native-related-digital'
...
...
...
 getUser = async () => {
    const result = await getUserAllData();
    console.log("ALL Storage Data", result);
    console.log("Visilabs - Exvisitorid", result.visilabs.exVisitorId);
    console.log("Euromsg - Keyid", result.euromsg.extra.Keyid);
    console.log("Euromsg - Email", result.euromsg.extra.Email);
    console.log("JS Euromsg - Keyid", result.js.euromsgsubextra?.Keyid);
    console.log("JS Euromsg - Email", result.js.euromsgsubextra?.Email);
}
```
Response
```json
{
    "euromsg": {
        "appKey": "rniostestapp",
        "appVersion": "1.0",
        "deviceName": "iPhone 14 Pro",
        "deviceType": "x86_64",
        "extra": {
            "ConsentSource": "HS_MOBIL",
            "ConsentTime": "2022-11-12 10:00:00",
            "Email": "baris.arslan@euromsg.com",
            "Keyid": "1234-B-5678",
            "PushPermit": "Y",
            "RecipientType": "BIREYSEL"
        },
        "firstTime": 0,
        "identifierForVendor": "57BA15B3-9B97-4B2D-AB21-211DDE7D56C6",
        "local": "tr-US",
        "method": "POST",
        "osName": "iOS",
        "osVersion": "16.2",
        "path": "subscription",
        "prodBaseUrl": ".euromsg.com",
        "sdkVersion": "2.6.6",
        "subdomain": "pushs"
    },
    "js": {
        "euromsgsub": {
            "advertisingIdentifier": "",
            "appKey": "rniostestapp",
            "appVersion": "1.0",
            "carrier": "",
            "deviceName": "iPhone 14 Pro",
            "deviceType": "x86_64",
            "extra": {
                "ConsentSource": "HS_MOBIL",
                "ConsentTime": "2022-11-12 10:00:00",
                "Email": "baris.arslan@euromsg.com",
                "Keyid": "1234-B-5678",
                "PushPermit": "Y",
                "RecipientType": "BIREYSEL"
            },
            "firstTime": 1,
            "identifierForVendor": "57BA15B3-9B97-4B2D-AB21-211DDE7D56C6",
            "local": "tr-US",
            "os": "ios",
            "osVersion": "16.2",
            "sdkVersion": "2.4.1",
            "token": null
        },
        "euromsgsubextra": {
            "ConsentSource": "HS_MOBIL",
            "ConsentTime": "2022-11-12 10:00:00",
            "Email": "baris.arslan@euromsg.com",
            "Keyid": "1234-B-5678",
            "PushPermit": "Y",
            "RecipientType": "BIREYSEL"
        },
        "expiresubscribecheckdate": 1681132339166
    },
    "visilabs": {
        "apiver": "IOS",
        "appVersion": "1.0",
        "channel": "IOS",
        "cookieId": "6EA1D2E6-74CF-4A61-A845-D297BCEE0108",
        "exVisitorId": "1234-B-5678",
        "mappl": "true",
        "sdkVersion": "3.9.0",
        "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
        "vchannel": "IOS"
    }
}
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

import { addEventListener, removeEventListener, requestPermissions, requestIDFA, EuroMessageApi, VisilabsApi, setApplicationIconBadgeNumber, logToConsole, RDStoryView, RecommendationAttribute, RecommendationFilterType, requestLocationPermission, setGeofencingIntervalInMinute } from 'react-native-related-digital'

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

    addEventListener('carouselItemClicked', async (carouselItemInfo) => {
      console.log('carouselItemInfo is ', carouselItemInfo)
    }, euroMessageApi)
  }

  const addExtra = async () => {
    // IYS parameters
    // await euroMessageApi.setUserProperty('ConsentTime', '2021-06-05 10:00:00')
    // await euroMessageApi.setUserProperty('RecipientType', 'BIREYSEL')
    // await euroMessageApi.setUserProperty('ConsentSource', 'HS_MOBIL')

    // Single
    // await euroMessageApi.setUserProperty('Email', EMAIL)
    // await euroMessageApi.setUserProperty('keyid', KEYID)
    // await euroMessageApi.setUserProperty('PushPermit', 'Y')

    // Or Object
    let userData = {
      "KeyId":KEYID,
      "Email":EMAIL,
      "PushPermit":"Y" // Y=active, N=passive
    }
    return euroMessageApi.setUserProperties(userData)
  }

  const login = async () => {
    addExtra().then(() =>
      euroMessageApi.subscribe(token)
    );
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

      const properties =  {
        "OM.cat":"65" // Category code
      }

      // optional
      const filters = [{
        attribute: RecommendationAttribute.PRODUCTCODE,
        filterType: RecommendationFilterType.equals,
        value: '78979,21312,45345'
      }]

      const recommendations = await visilabsApi.getRecommendations(zoneId, productCode, properties, filters)
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

  const sendLocationPermissionEvent = async () => {
    await visilabsApi.sendLocationPermission()
  }

  const getPushMessages = async () => {
    const messages = await euroMessageApi.getPushMessages()
    console.log('messages', messages)
  }

  const getUser = async () => {
    const user = await visilabsApi.getUser()
    console.log('USER DATA', user)
  }

  const removeListeners = () => {
    removeEventListener('register')
    removeEventListener('registrationError')
    removeEventListener('carouselItemClicked')
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
              title='REQUEST IDFA'
              onPress={() => {
                requestIDFA()
              }}
            />
            <Button
              title='REQUEST LOCATION PERMISSION'
              onPress={() => {
                requestLocationPermission()
              }}
            />
            <Button
              title='LOGIN/SIGNUP'
              onPress={() => {
                login()
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

              <Button
                title='SEND LOCATION PERMISSION'
                onPress={() => {
                  sendLocationPermissionEvent()
                }}
              />

              <Button
                title='GET PUSH MESSAGES'
                onPress={() => {
                  getPushMessages()
                }}
              />

              <Button
                title='GET USER DATA'
                onPress={() => {
                  getUser()
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
