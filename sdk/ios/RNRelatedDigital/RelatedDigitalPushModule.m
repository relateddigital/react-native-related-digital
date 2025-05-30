#import "RelatedDigitalPushModule.h"
#import <UserNotifications/UserNotifications.h>
#import <React/RCTBridge.h>
#import <React/RCTConvert.h>
#import <React/RCTEventDispatcher.h>
#import <React/RCTUtils.h>
#import "Utilities.h"
#if __has_include(<react_native_related_digital-Swift.h>)
#import <react_native_related_digital-Swift.h>
#elif __has_include(<react_native_related_digital/react_native_related_digital-Swift.h>)
#import <react_native_related_digital/react_native_related_digital-Swift.h>
#else
#error "Header file for react_native_related_digital module not found."
#endif

NSString *const RCTRemoteNotificationReceived = @"RemoteNotificationReceived";
NSString *const RCTActionButtonClicked = @"ActionButtonClicked";

static NSString *const kRemoteNotificationsRegistered = @"RemoteNotificationsRegistered";
static NSString *const kRemoteNotificationRegistrationFailed = @"RemoteNotificationRegistrationFailed";

static NSString *const kErrorUnableToRequestPermissions = @"E_UNABLE_TO_REQUEST_PERMISSIONS";

@interface RelatedDigitalPushModule ()
@property (nonatomic, strong) NSMutableDictionary *remoteNotificationCallbacks;
@end

@implementation RelatedDigitalPushModule

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

- (void)startObserving
{
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(handleRemoteNotificationReceived:)
                                               name:RCTRemoteNotificationReceived
                                             object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(handleRemoteNotificationsRegistered:)
                                               name:kRemoteNotificationsRegistered
                                             object:nil];
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(handleRemoteNotificationRegistrationError:)
                                               name:kRemoteNotificationRegistrationFailed
                                             object:nil];
}

- (void)stopObserving
{
  [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (NSArray<NSString *> *)supportedEvents
{
  return @[@"remoteNotificationReceived",
           @"remoteNotificationsRegistered",
           @"remoteNotificationRegistrationError",
           @"ActionButtonClicked"];
}

+ (void)didRegisterUserNotificationSettings:(__unused UIUserNotificationSettings *)notificationSettings
{
}

+ (void)didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  NSMutableString *hexString = [NSMutableString string];
  NSUInteger deviceTokenLength = deviceToken.length;
  const unsigned char *bytes = deviceToken.bytes;
  for (NSUInteger i = 0; i < deviceTokenLength; i++) {
    [hexString appendFormat:@"%02x", bytes[i]];
  }
  [[NSNotificationCenter defaultCenter] postNotificationName:kRemoteNotificationsRegistered
                                                      object:self
                                                    userInfo:@{@"deviceToken" : [hexString copy]}];
}

+ (void)didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  [[NSNotificationCenter defaultCenter] postNotificationName:kRemoteNotificationRegistrationFailed
                                                      object:self
                                                    userInfo:@{@"error": error}];
}

// Triggered after clicking push
+ (void)didReceiveRemoteNotification:(NSDictionary *)notification
{
  NSDictionary *userInfo = @{@"notification": notification};
  [[NSNotificationCenter defaultCenter] postNotificationName:RCTRemoteNotificationReceived
                                                      object:self
                                                    userInfo:userInfo];
}

// Triggered after clicking push
+ (void)didReceiveRemoteNotification:(NSDictionary *)notification
              fetchCompletionHandler:(RNCRemoteNotificationCallback)completionHandler
{
  NSDictionary *userInfo = @{@"notification": notification, @"completionHandler": completionHandler};
  [[NSNotificationCenter defaultCenter] postNotificationName:RCTRemoteNotificationReceived
                                                      object:self
                                                    userInfo:userInfo];
}

- (void)didClickActionButton:(UNNotificationResponse *)response
            fetchCompletionHandler:(RNCActionButtonClickedCallback)completionHandler {
    NSDictionary *pushDictionary = response.notification.request.content.userInfo;
    
    NSError *jsonError;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:pushDictionary options:NSJSONWritingPrettyPrinted error:&jsonError];
    
    NSString *url;
    NSString *identifier;
    
    if (!jsonError) {
        NSError *decodeError;
        NSDictionary *messageDict = [NSJSONSerialization JSONObjectWithData:jsonData options:kNilOptions error:&decodeError];

        if (!decodeError) {
            NSString *actionIdentifier = response.actionIdentifier;

            if ([actionIdentifier isEqualToString:@"action_0"]) {
                
                url = messageDict[@"actions"][0][@"Url"];
                identifier = @"action_0";
            } else if ([actionIdentifier isEqualToString:@"action_1"]) {
                url = messageDict[@"actions"][1][@"Url"];
                identifier = @"action_1";
            }
        }
    }
    
    NSDictionary *userInfo = @{@"url": url, @"identifier":identifier, @"completionHandler": completionHandler};
    [[NSNotificationCenter defaultCenter] postNotificationName:RCTActionButtonClicked
                                                        object:self
                                                      userInfo:userInfo];

    [self sendEventWithName:@"ActionButtonClicked" body:userInfo];
}

// Triggered after clicking push
- (void)handleRemoteNotificationReceived:(NSNotification *)notification
{
  NSMutableDictionary *remoteNotification = [NSMutableDictionary dictionaryWithDictionary:notification.userInfo[@"notification"]];
  RNCRemoteNotificationCallback completionHandler = notification.userInfo[@"completionHandler"];
  NSString *notificationId = [[NSUUID UUID] UUIDString];
  remoteNotification[@"notificationId"] = notificationId;
  remoteNotification[@"remote"] = @YES;
  if (completionHandler) {
    if (!self.remoteNotificationCallbacks) {
      // Lazy initialization
      self.remoteNotificationCallbacks = [NSMutableDictionary dictionary];
    }
    self.remoteNotificationCallbacks[notificationId] = completionHandler;
  }
  
  [self sendEventWithName:@"remoteNotificationReceived" body:remoteNotification];
  [RelatedDigitalBridge handlePushWithUserInfo:remoteNotification];
}

- (void)handleRemoteNotificationsRegistered:(NSNotification *)notification
{
  [self sendEventWithName:@"remoteNotificationsRegistered" body:notification.userInfo];
}

- (void)handleRemoteNotificationRegistrationError:(NSNotification *)notification
{
  NSError *error = notification.userInfo[@"error"];
  NSDictionary *errorDetails = @{
    @"message": error.localizedDescription,
    @"code": @(error.code),
    @"details": error.userInfo,
  };
  [self sendEventWithName:@"remoteNotificationRegistrationError" body:errorDetails];
}

+ (void)initRelatedDigital:(NSString *)organizationId profileId:(NSString *)profileId dataSource:(NSString *)dataSource appAlias:(NSString *)appAlias inAppNotificationsEnabled:(BOOL)inAppNotificationsEnabled requestTimeoutSeconds:(int)requestTimeoutSeconds geofenceEnabled:(BOOL)geofenceEnabled askLocationPermmissionAtStart:(BOOL)askLocationPermmissionAtStart maxGeofenceCount:(int)maxGeofenceCount isIDFAEnabled:(BOOL)isIDFAEnabled loggingEnabled:(BOOL)loggingEnabled deliveredBadge:(BOOL)deliveredBadge
{
    [RelatedDigitalBridge initRelatedDigitalWithOrganizationId:organizationId profileId:profileId dataSource:dataSource appAlias:appAlias inAppNotificationsEnabled:inAppNotificationsEnabled requestTimeoutInSeconds:requestTimeoutSeconds geofenceEnabled:geofenceEnabled askLocationPermmissionAtStart:askLocationPermmissionAtStart maxGeofenceCount:maxGeofenceCount isIDFAEnabled:isIDFAEnabled loggingEnabled:loggingEnabled deliveredBadge:deliveredBadge];
}

+ (void)setUserProperty:(NSString *)key value:(NSString *)value{
   if(key != nil){
       [RelatedDigitalBridge setUserPropertyWithKey:key value:value];
   }
}

RCT_REMAP_METHOD(setUserProperty,
                 setUserPropertyWithKey:(NSString *)key
                 value:(NSString *)value) {
    [RelatedDigitalBridge setUserPropertyWithKey:key value:(NSString *)value];
}

RCT_REMAP_METHOD(setNotificationLoginId,
                 setNotificationLoginIdWithNotificationLoginID:(NSString *)notificationLoginID) {
    [RelatedDigitalBridge setNotificationLoginIdWithNotificationLoginID:notificationLoginID];
}

RCT_REMAP_METHOD(setApplicationIconBadgeNumber, withNumber:(NSInteger)number)
{
  RCTSharedApplication().applicationIconBadgeNumber = number;
}

RCT_REMAP_METHOD(requestPermissions,
								 isProvisional:(BOOL)isProvisional
                  requestPermissionsWithResolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  if (RCTRunningInAppExtension()) {
    reject(kErrorUnableToRequestPermissions, nil, RCTErrorWithMessage(@"Requesting push notifications is currently unavailable in an app extension"));
    return;
  }
    
  // Add a listener to make sure that startObserving has been called
  [self addListener:@"remoteNotificationsRegistered"];
	[RelatedDigitalBridge requestPermissionWithIsProvisional:isProvisional];
	
	resolve(@YES);
  
  /*
	 UNAuthorizationOptions types = UIUserNotificationTypeAlert | UIUserNotificationTypeBadge | UIUserNotificationTypeSound;
  
  [UNUserNotificationCenter.currentNotificationCenter
    requestAuthorizationWithOptions:types
    completionHandler:^(BOOL granted, NSError *_Nullable error) {

    if (error != NULL) {
      reject(@"-1", @"Error - Push authorization request failed.", error);
    } else {
      dispatch_async(dispatch_get_main_queue(), ^(void){
        [RCTSharedApplication() registerForRemoteNotifications];
      });
      [UNUserNotificationCenter.currentNotificationCenter getNotificationSettingsWithCompletionHandler:^(UNNotificationSettings * _Nonnull settings) {
        resolve(RCTPromiseResolveValueForUNNotificationSettings(settings));
      }];
    }
  }];
	 */
}

static inline NSDictionary *RCTPromiseResolveValueForUNNotificationSettings(UNNotificationSettings* _Nonnull settings) {
  return RCTSettingsDictForUNNotificationSettings(settings.alertSetting == UNNotificationSettingEnabled,
                                                  settings.badgeSetting == UNNotificationSettingEnabled,
                                                  settings.soundSetting == UNNotificationSettingEnabled);
  }

static inline NSDictionary *RCTSettingsDictForUNNotificationSettings(BOOL alert, BOOL badge, BOOL sound) {
  return @{@"alert": @(alert), @"badge": @(badge), @"sound": @(sound)};
}


RCT_REMAP_METHOD(getDeviceParameters,
                  getDeviceParametersWithResolver:(RCTPromiseResolveBlock)resolve
                    rejecter:(__unused RCTPromiseRejectBlock)reject) {
  NSMutableDictionary<NSString *, NSString *> *result = [[NSMutableDictionary alloc] init];
  
  [result setValue:[Utilities getOsVersion] forKey:@"osVersion"];
  [result setValue:[Utilities getSdkVersion] forKey:@"sdkVersion"];
  [result setValue:[Utilities getDeviceName] forKey:@"deviceName"];
  [result setValue:[Utilities getDeviceType] forKey:@"deviceType"];
  [result setValue:[Utilities getLocale] forKey:@"locale"];
  [result setValue:[Utilities getCarrier] forKey:@"carrier"];
  [result setValue:[Utilities getAppVersion] forKey:@"appVersion"];
  [result setValue:[Utilities getDeviceUDID] forKey:@"udid"];
  
  resolve(result);
}

RCT_REMAP_METHOD(customEvent,
								 customEventWithPageName:(NSString *)pageName
										properties:(NSDictionary *)properties) {
	[RelatedDigitalBridge customEventWithPageName:pageName properties:properties];
}

RCT_REMAP_METHOD(logout,
                  logoutNativeWithOnlyEM: (BOOL *)onlyEM){
    [RelatedDigitalBridge logoutNativeWithOnlyEM:onlyEM];
}

RCT_REMAP_METHOD(getRecommendations,
								 getRecommendationsWithZoneId:(NSString *)zoneId
										productCode:(NSString *)productCode
                    properties:(NSDictionary *)properties
										filters:(NSArray<NSDictionary *> *)filters
								 resolver:(RCTPromiseResolveBlock)resolve
								 rejecter:(RCTPromiseRejectBlock)reject) {
	[RelatedDigitalBridge getRecommendationsWithZoneId:zoneId productCode:productCode properties:properties filters: filters  completion:^(NSString *response) {
		resolve(response);
	}];
}

RCT_REMAP_METHOD(trackRecommendationClick,
								 trackRecommendationClickWithQs:(NSString *)qs) {
	[RelatedDigitalBridge trackRecommendationClickWithQs:qs];
}

RCT_REMAP_METHOD(searchRecommendation,
                 searchRecommendationWithKeyword:(NSString *)keyword
                                        searchType:(NSString *)searchType
                                 resolver:(RCTPromiseResolveBlock)resolve
                                 rejecter:(RCTPromiseRejectBlock)reject) {
    [RelatedDigitalBridge searchRecommendationWithKeyword:keyword searchType:searchType completion:^(NSString *response) {
        resolve(response);
    }];
}

RCT_REMAP_METHOD(trackSearchRecommendationClick,
                 trackSearchRecommendationClickWithSearchReport:(NSDictionary *)searchReport) {
    [RelatedDigitalBridge trackSearchRecommendationClickWithSearchReport: searchReport];
}


// RCT_REMAP_METHOD(getPushMessages,
// 								 resolver:(RCTPromiseResolveBlock)resolve
// 								 rejecter:(RCTPromiseRejectBlock)reject) {
// 	[RelatedDigitalBridge getPushMessages completion:^(NSString *response) {
// 		resolve(response);
// 	}];
// }

RCT_EXPORT_METHOD(getPushMessages:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [RelatedDigitalBridge getPushMessagesWithCompletion:^(NSString *response) {
        resolve(response);
    }];
}

RCT_EXPORT_METHOD(getPushMessagesUserBased:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [RelatedDigitalBridge getPushMessagesUserBasedWithCompletion:^(NSString *response) {
        resolve(response);
    }];
}

RCT_REMAP_METHOD(readPushMessages,
                 readPushMessagesWithPushId:(NSString *)pushId
                 readPushMessagesResolver:(RCTPromiseResolveBlock)resolve
                 readPushMessagesRejecter:(RCTPromiseRejectBlock)reject) {
    [RelatedDigitalBridge readPushMessagesWithPushId:pushId completion:^(NSString *response) {
            resolve(response);
    }];
}

RCT_REMAP_METHOD(readPushMessagesUserBased,
                 readPushMessagesUserBasedWithPushId:(NSString *)pushId
                 readPushMessagesUserBasedResolver:(RCTPromiseResolveBlock)resolve
                 readPushMessagesUserBasedRejecter:(RCTPromiseRejectBlock)reject) {
    [RelatedDigitalBridge readPushMessagesUserBasedWithPushId:pushId completion:^(NSString *response) {
            resolve(response);
    }];
}

RCT_REMAP_METHOD(deleteAllPushNotifications,
                 deleteAllPushNotificationsResolver:(RCTPromiseResolveBlock)resolve
                 deleteAllPushNotificationsRejecter:(RCTPromiseRejectBlock)reject) {
    [RelatedDigitalBridge deleteAllPushNotificationsWithCompletion:^(NSString *response) {
            resolve(response);
    }];
}

RCT_REMAP_METHOD(deletePushNotification,
                 deletePushNotificationWithPushId:(NSString *)pushId
                 deletePushNotificationResolver:(RCTPromiseResolveBlock)resolve
                 deletePushNotificationRejecter:(RCTPromiseRejectBlock)reject) {
    [RelatedDigitalBridge deletePushNotificationWithPushId:pushId completion:^(NSString *response) {
            resolve(response);
    }];
}

RCT_REMAP_METHOD(deletePushMessages,
                 deletePushMessagesWithPushId:(NSString *)pushId
                 deletePushMessagesResolver:(RCTPromiseResolveBlock)resolve
                 deletePushMessagesRejecter:(RCTPromiseRejectBlock)reject) {
    [RelatedDigitalBridge deletePushMessagesWithPushId:pushId completion:^(NSString *response) {
            resolve(response);
    }];
}

RCT_REMAP_METHOD(deletePushMessagesUserBased,
                 deletePushMessagesUserBasedWithPushId:(NSString *)pushId
                 deletePushMessagesUserBasedResolver:(RCTPromiseResolveBlock)resolve
                 deletePushMessagesUserBasedRejecter:(RCTPromiseRejectBlock)reject) {
    [RelatedDigitalBridge deletePushMessagesUserBasedWithPushId:pushId completion:^(NSString *response) {
            resolve(response);
    }];
}

RCT_REMAP_METHOD(checkNotification,
								 resolver:(RCTPromiseResolveBlock)resolve
								 rejecter:(RCTPromiseRejectBlock)reject) {
	if(self.bridge.launchOptions) {
		NSMutableDictionary<NSString *, id> *notificationDict = [self.bridge.launchOptions[UIApplicationLaunchOptionsRemoteNotificationKey] mutableCopy];
				
		if(notificationDict)
		{
			NSNotification *notification = [NSNotification notificationWithName:@"notification" object:nil userInfo: @{ @"notification": notificationDict }];
			[self handleRemoteNotificationReceived: notification];
		}
	}
  
	resolve(@YES);
}

RCT_REMAP_METHOD(getFavoriteAttributeActions,
								 getFavoriteAttributeActionsWithActionId:(NSString *)actionId
								 resolver:(RCTPromiseResolveBlock)resolve
								 rejecter:(RCTPromiseRejectBlock)reject) {
	[RelatedDigitalBridge getFavoriteAttributeActionsWithActionId:actionId completion:^(NSString *response) {
			resolve(response);
	}];
}

RCT_EXPORT_METHOD(getUser:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [RelatedDigitalBridge getUserWithCompletion:^(NSString *response) {
        resolve(response);
    }];
}

RCT_EXPORT_METHOD(getSubscription:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject) {
    [RelatedDigitalBridge getSubscriptionWithCompletion:^(NSString *response) {
        resolve(response);
    }];
}

// RCT_REMAP_METHOD(getSubscription,getSubscriptionNative){
//     [RelatedDigitalBridge getSubscriptionNative];
// }


RCT_REMAP_METHOD(requestIDFA,requestIDFANative){
    [RelatedDigitalBridge requestIDFANative];
}

RCT_REMAP_METHOD(requestLocationPermission,requestLocationPermissionNative){
    [RelatedDigitalBridge requestLocationPermissionNative];
}

RCT_REMAP_METHOD(sendLocationPermission,sendLocationPermissionNative) {
	[RelatedDigitalBridge sendLocationPermissionNative];
}

@end
