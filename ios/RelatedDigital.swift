import Foundation
import UIKit
import UserNotifications
import RelatedDigitalIOS

private typealias NativeRD = RelatedDigitalIOS.RelatedDigital

@objc(RelatedDigital)
class RelatedDigital: RCTEventEmitter {
    
    @objc(initialize:withProfileId:withDataSource:withAskLocationPermissionAtStart:)
    public func initialize(
        organizationId: NSString,
        profileId: NSString,
        dataSource: NSString,
        askLocationPermissionAtStart: Bool
    ) {
        
        DispatchQueue.main.async {
            NativeRD.initialize(
                organizationId: organizationId as String,
                profileId: profileId as String,
                dataSource: dataSource as String,
                launchOptions: nil,
                askLocationPermmissionAtStart: askLocationPermissionAtStart)
        }
    }
    
    @objc(setIsInAppNotificationEnabled:)
    public func setIsInAppNotificationEnabled(isInAppNotificationEnabled: Bool) {
        NativeRD.inAppNotificationsEnabled = isInAppNotificationEnabled
    }
    
    @objc(setIsGeofenceEnabled:)
    public func setIsGeofenceEnabled(isGeofenceEnabled: Bool) {
        NativeRD.geofenceEnabled = isGeofenceEnabled
    }
    
    @objc(setAdvertisingIdentifier:)
    public func setAdvertisingIdentifier(advertisingIdentifier: String) {
        NativeRD.setAdvertisingIdentifier(adIdentifier: advertisingIdentifier)
    }
    
    @objc(signUp:withProperties:)
    public func signUp(exVisitorId: String, properties: [String: String]) {
        NativeRD.signUp(exVisitorId: exVisitorId, properties: properties)
    }
    
    @objc(login:withProperties:)
    public func login(exVisitorId: String, properties: [String: String]) {
        NativeRD.login(exVisitorId: exVisitorId, properties: properties)
    }
    
    @objc(logout)
    public func logout() {
        NativeRD.logout()
    }
    
    @objc(customEvent:withParameters:)
    public func customEvent(pageName: String, parameters: [String: String]) {
        NativeRD.customEvent(pageName, properties: parameters)
    }
    
    @objc(askForPushNotificationPermission)
    public func askForPushNotificationPermission() {
        NativeRD.askForNotificationPermission(register: true)
    }
    
    @objc(
        setIsPushNotificationEnabled:withIosAppAlias:withGoogleAppAlias:withHuaweiAppAlias:
            withDeliveredBadge:
    )
    public func setIsPushNotificationEnabled(
        isPushNotificationEnabled: Bool,
        iosAppAlias: String,
        googleAppAlias: String,
        huaweiAppAlias: String,
        deliveredBadge: Bool
    ) {
        if isPushNotificationEnabled {
            NativeRD.enablePushNotifications(
                appAlias: iosAppAlias,
                launchOptions: nil,
                deliveredBadge: deliveredBadge)
            NativeRD.setPushNotification(permission: true)
        } else {
            NativeRD.setPushNotification(permission: false)
        }
    }
    
    @objc(setEmail:withPermission:)
    public func setEmail(email: String, permission: Bool) {
        NativeRD.setEmail(email: email, permission: permission)
    }
    
    @objc(sendCampaignParameters:)
    public func sendCampaignParameters(parameters: [String: String]) {
        NativeRD.sendCampaignParameters(properties: parameters)
    }
    
    @objc(setTwitterId:)
    public func setTwitterId(twitterId: String) {
        NativeRD.setTwitterId(twitterId: twitterId)
        NativeRD.sync()
    }
    
    @objc(setFacebookId:)
    public func setFacebookId(facebookId: String) {
        NativeRD.setFacebook(facebookId: facebookId)
        NativeRD.sync()
    }
    
    @objc(setRelatedDigitalUserId:)
    public func setRelatedDigitalUserId(relatedDigitalUserId: String) {
        NativeRD.setEuroUserId(userKey: relatedDigitalUserId)
        NativeRD.sync()
    }
    
    @objc(setNotificationLoginId:)
    public func setNotificationLoginId(notificationLoginId: String) {
        NativeRD.setNotificationLoginID(notificationLoginID: notificationLoginId)
    }
    
    @objc(setPhoneNumber:withPermission:)
    public func setPhoneNumber(msisdn: String, permission: Bool) {
        NativeRD.setPhoneNumber(msisdn: msisdn, permission: permission)
        NativeRD.sync()
    }
    
    @objc(setUserProperty:withValue:)
    public func setUserProperty(key: String, value: String) {
        NativeRD.setUserProperty(key: key, value: value)
        NativeRD.sync()
    }
    
    @objc(removeUserProperty:)
    public func removeUserProperty(key: String) {
        NativeRD.removeUserProperty(key: key)
        NativeRD.sync()
    }
    
    @objc(registerEmail:withPermission:withIsCommercial:withResolve:withReject:)
    public func registerEmail(
        email: String, permission: Bool, isCommercial: Bool, resolve: @escaping RCTPromiseResolveBlock,
        reject: @escaping RCTPromiseRejectBlock
    ) {
        NativeRD.registerEmail(email: email, permission: permission, isCommercial: isCommercial)
        NativeRD.sync()
        resolve(true)
    }
    
    @objc(getPushMessages:withReject:)
    public func getPushMessages(
        resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock
    ) {
        NativeRD.getPushMessages { messages in
            if let jsonData = try? JSONEncoder().encode(messages), let json = String(data: jsonData, encoding: String.Encoding.utf8){
                resolve(json)
            } else {
                reject("getPushMessages error", "getPushMessages error description", nil)
            }
        }
    }
    
    @objc(getToken:withReject:)
    public func getToken(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock
    ) {
        let userDefaultsToken = UserDefaults.standard.string(forKey: RelatedDigitalManager.tokenKey) ?? ""
        if userDefaultsToken.isEmpty {
            let center = UNUserNotificationCenter.current()
            center.getNotificationSettings { settings in
                if settings.authorizationStatus == .authorized {
                    DispatchQueue.main.async {
                        UIA.shared.registerForRemoteNotifications()
                        resolve(userDefaultsToken)
                    }
                } else {
                    resolve(userDefaultsToken)
                }
            }
            
        } else {
            resolve(userDefaultsToken)
        }
    }
    
    @objc(registerNotificationListeners)
    public func registerNotificationListeners() {
        
    }
    
}
