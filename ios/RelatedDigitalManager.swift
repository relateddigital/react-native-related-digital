import Foundation
import UIKit
import UserNotifications
import React
import RelatedDigitalIOS

private typealias NativeRD = RelatedDigitalIOS.RelatedDigital
public typealias RNCRemoteNotificationCallback = (UIBackgroundFetchResult) -> Void

@objc public class RelatedDigitalManager: NSObject {
    
    
    //public static let onNotificationRegistered = "onNotificationRegistered"
    //public static let onNotificationReceived = "onNotificationReceived"
    //public static let onNotificationOpened = "onNotificationOpened"
    
    @objc public static let shared = RelatedDigitalManager()
    
    @objc var launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    
    //var sendRelatedDigitalEvent : ((String, [AnyHashable : Any]) -> Void)?
    
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
        var body = [String:String]()
        body["token"] = tokenString
        self.sendRelatedDigitalEvent(EventType.NotificationRegistered.rawValue, body)
    }
    
    
    @objc(didReceiveRemoteNotification:)
    public func didReceiveRemoteNotification(_ notification: UNNotification) {
        let userInfo = notification.request.content.userInfo
        self.sendRelatedDigitalEvent(EventType.NotificationReceived.rawValue, userInfo)
    }
    
    @objc(didReceiveRemoteNotification:fetchCompletionHandler:)
    public func didReceiveRemoteNotification(
        _ userInfo: NSDictionary?,
        fetchCompletionHandler completionHandler: @escaping RNCRemoteNotificationCallback
    ) {
        if let body = userInfo as? [UIApplication.LaunchOptionsKey: Any] {
            self.sendRelatedDigitalEvent(EventType.NotificationReceived.rawValue, body)
        }
        completionHandler(.noData)
    }
    
    @objc(didReceiveNotificationResponse:withCompletionHandler:)
    public func didReceiveNotificationResponse(
        _ response: UNNotificationResponse,
        withCompletionHandler completionHandler: @escaping () -> Void
    ) {
        let userInfo = response.notification.request.content.userInfo
        NativeRD.handlePush(pushDictionary: userInfo)
        RDRCTEventEmitter.shared().sendEvent(withName: EventType.NotificationOpened.rawValue, body: userInfo)
        completionHandler()
    }
    
    @objc(didReceive:withContentHandler:)
    public func didReceive(_ bestAttemptContent: UNMutableNotificationContent?,
                           withContentHandler contentHandler: @escaping (UNNotificationContent) -> Void) {
        RDPush.didReceive(bestAttemptContent, withContentHandler: contentHandler)
    }
    
    
    public func sendRelatedDigitalEvent(_ eventName: String, _ body:  [AnyHashable : Any] ) {
        RDRCTEventEmitter.shared().sendEvent(withName: eventName, body: body)
        //self.sendRelatedDigitalEvent?(eventName, body)
    }
    
    
    
}
