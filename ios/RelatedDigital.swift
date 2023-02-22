import Foundation
import UIKit
import RelatedDigitalIOS

typealias RD = RelatedDigitalIOS.RelatedDigital


@objc(RelatedDigital)
class RelatedDigital: RCTEventEmitter {
    
    @objc(multiply:withB:withResolver:withRejecter:)
    func multiply(a: Float, b: Float, resolve:RCTPromiseResolveBlock,reject:RCTPromiseRejectBlock) -> Void {
        resolve(a*b)
    }
    
    //@objc var launchOptions: [UIApplication.LaunchOptionsKey: Any]?
    
    @objc(initialize:withProfileId:withDataSource:withAskLocationPermissionAtStart:)
    public func initialize(organizationId:NSString,
                           profileId:NSString,
                           dataSource:NSString,
                           askLocationPermissionAtStart: Bool) {
        
        DispatchQueue.main.async {
            RD.initialize(organizationId: organizationId as String,
                          profileId: profileId as String,
                          dataSource: dataSource as String,
                          launchOptions: nil,
                          askLocationPermmissionAtStart: askLocationPermissionAtStart)
        }
        
        
    }
    
    
    @objc(setIsInAppNotificationEnabled:)
    public func setIsInAppNotificationEnabled(isInAppNotificationEnabled: Bool){
        RD.inAppNotificationsEnabled = isInAppNotificationEnabled
    }
    
    @objc(setIsGeofenceEnabled:)
    public func setIsGeofenceEnabled(isGeofenceEnabled: Bool) {
        RD.geofenceEnabled = isGeofenceEnabled
    }
    
    @objc(setAdvertisingIdentifier:)
    public func setAdvertisingIdentifier(advertisingIdentifier: String) {
        RD.setAdvertisingIdentifier(adIdentifier: advertisingIdentifier)
    }
    
    @objc(signUp:withProperties:)
    public func signUp(exVisitorId: String, properties: [String: String]) {
        RD.signUp(exVisitorId: exVisitorId, properties: properties)
    }
    
    @objc(login:withProperties:)
    public func login(exVisitorId: String, properties: [String: String]) {
        RD.login(exVisitorId: exVisitorId, properties: properties)
    }
    
    @objc(logout)
    public func logout() {
        RD.logout()
    }
    
    @objc(customEvent:withParameters:)
    public func customEvent(pageName: String, parameters: [String: String]) {
        RD.customEvent(pageName, properties: parameters)
    }
    
    @objc(setIsPushNotificationEnabled:withAppAlias:withDeliveredBadge:)
    public func setIsPushNotificationEnabled(isPushNotificationEnabled: Bool,
                                             appAlias: String,
                                             deliveredBadge: Bool) {
        if isPushNotificationEnabled {
            RD.enablePushNotifications(appAlias: appAlias,
                                                   launchOptions: nil,
                                                   deliveredBadge: deliveredBadge)
            RD.setPushNotification(permission: true)
        } else {
            RD.setPushNotification(permission: false)
        }
    }
    
    @objc(setEmail:withPermission:)
    public func setEmail(email: String, permission: Bool) {
        RD.setEmail(email: email, permission: permission)
    }
    
    @objc(sendCampaignParameters:)
    public func sendCampaignParameters(parameters: [String: String]) {
        RD.sendCampaignParameters(properties: parameters)
    }
    
    @objc(setTwitterId:)
    public func setTwitterId(twitterId: String) {
        RD.setTwitterId(twitterId: twitterId)
        RD.sync()
    }
    
    @objc(setFacebookId:)
    public func setFacebookId(facebookId: String) {
        RD.setFacebook(facebookId: facebookId)
        RD.sync()
    }
    
    @objc(setRelatedDigitalUserId:)
    public func setRelatedDigitalUserId(relatedDigitalUserId: String) {
        RD.setEuroUserId(userKey: relatedDigitalUserId)
        RD.sync()
    }
    
    @objc(setNotificationLoginId:)
    public func setNotificationLoginId(notificationLoginId: String) {
        RD.setNotificationLoginID(notificationLoginID: notificationLoginId)
    }
    
    @objc(setPhoneNumber:withPermission:)
    public func setPhoneNumber(msisdn: String, permission: Bool) {
        RD.setPhoneNumber(msisdn: msisdn, permission: permission)
        RD.sync()
    }
    
    @objc(setUserProperty:withValue:)
    public func setUserProperty(key: String, value: String) {
        RD.setUserProperty(key: key, value: value)
        RD.sync()
    }
    
    @objc(removeUserProperty:)
    public func removeUserProperty(key: String) {
        RD.removeUserProperty(key: key)
        RD.sync()
    }
    
}
