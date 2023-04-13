import Foundation
import UIKit
import UserNotifications
import React
import RelatedDigitalIOS

private typealias NativeRD = RelatedDigitalIOS.RelatedDigital
private typealias NC = NotificationCenter
public typealias RNCRemoteNotificationCallback = (UIBackgroundFetchResult) -> Void

@objc(RelatedDigitalManager)
public class RelatedDigitalManager: NSObject {
    
    
    static let onNotificationRegistered = "onNotificationRegistered"
    static let onNotificationReceived = "onNotificationReceived"
    static let onNotificationOpened = "onNotificationOpened"
    
    
    static let tokenKey = "RelatedDigitalManagerTokenKey"
    static let RCTRemoteNotificationReceived = "RemoteNotificationReceived"
    static let kRemoteNotificationsRegistered = "RemoteNotificationsRegistered"
    
    @objc public static let shared = RelatedDigitalManager()
    
    @objc var launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    
    @objc(
        initRelatedDigital:
            withProfileId:
            withDataSource:
            withAppAlias:
            withEnablePushNotification:
            withAppGroupsKey:
            withDeliveredBadge:
            withEnableGeofence:
            withAskLocationPermissionAtStart:
            withLoggingEnabled:
            withLaunchOptions:
    )
    public func initRelatedDigital(
        organizationId: NSString, profileId: NSString, dataSource: NSString, appAlias: NSString,
        enablePushNotification: DarwinBoolean, appGroupsKey: NSString, deliveredBadge: DarwinBoolean,
        enableGeofence: DarwinBoolean, askLocationPermissionAtStart: DarwinBoolean, loggingEnabled: DarwinBoolean,
        launchOptions: NSDictionary?
    ) {
        
        self.launchOptions = launchOptions as? [UIApplication.LaunchOptionsKey: Any]
        
        NativeRD.initialize(
            organizationId: organizationId as String, profileId: profileId as String,
            dataSource: dataSource as String, launchOptions: self.launchOptions,
            askLocationPermmissionAtStart: askLocationPermissionAtStart.boolValue)
        
        NativeRD.enablePushNotifications(
            appAlias: appAlias as String, launchOptions: self.launchOptions,
            appGroupsKey: appGroupsKey as String, deliveredBadge: deliveredBadge.boolValue)
        NativeRD.setPushNotification(permission: enablePushNotification.boolValue)
        NativeRD.geofenceEnabled = enableGeofence.boolValue
        NativeRD.loggingEnabled = loggingEnabled.boolValue
    }
    
    @objc(didRegisterForRemoteNotificationsWithDeviceToken:)
    public func didRegisterForRemoteNotificationsWithDeviceToken(deviceToken: Data) {
        NativeRD.registerToken(tokenData: deviceToken)
        let tokenString = deviceToken.reduce("", { $0 + String(format: "%02X", $1) })
        UserDefaults.standard.set(tokenString, forKey: Self.tokenKey)
    }
    
    @objc(didReceiveRemoteNotification:fetchCompletionHandler:)
    public func didReceiveRemoteNotification(
        _ notification: [AnyHashable: Any],
        fetchCompletionHandler completionHandler: @escaping RNCRemoteNotificationCallback
    ) {
        let userInfo =
        ["notification": notification, "completionHandler": completionHandler] as [String: Any]
        NC.default.post(
            name: NSNotification.Name(rawValue: Self.RCTRemoteNotificationReceived), object: self,
            userInfo: userInfo)
    }
    
    @objc(didReceiveNotificationResponse:withCompletionHandler:)
    public func didReceiveNotificationResponse(
        _ response: UNNotificationResponse,
        withCompletionHandler completionHandler: @escaping () -> Void
    ) {
        NativeRD.handlePush(pushDictionary: response.notification.request.content.userInfo)
    }
    
}
