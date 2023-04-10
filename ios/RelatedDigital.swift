import Foundation
import UIKit
import RelatedDigitalIOS

fileprivate typealias NativeRD = RelatedDigitalIOS.RelatedDigital


@objc(RelatedDigital)
class RelatedDigital: RCTEventEmitter {


    //TODO: DELETE
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
            NativeRD.initialize(organizationId: organizationId as String,
                          profileId: profileId as String,
                          dataSource: dataSource as String,
                          launchOptions: nil,
                          askLocationPermmissionAtStart: askLocationPermissionAtStart)
        }


    }


    @objc(setIsInAppNotificationEnabled:)
    public func setIsInAppNotificationEnabled(isInAppNotificationEnabled: Bool){
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

    @objc(setIsPushNotificationEnabled:withAppAlias:withDeliveredBadge:)
    public func setIsPushNotificationEnabled(isPushNotificationEnabled: Bool,
                                             appAlias: String,
                                             deliveredBadge: Bool) {
        if isPushNotificationEnabled {
            NativeRD.enablePushNotifications(appAlias: appAlias,
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

}
