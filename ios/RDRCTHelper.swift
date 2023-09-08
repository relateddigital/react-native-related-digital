//
//  RDRCTHelper.swift
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 13.07.2023.
//

import Foundation
import UIKit
import React
import RelatedDigitalIOS

private typealias NativeRD = RelatedDigitalIOS.RelatedDigital
public typealias Resolve = RCTPromiseResolveBlock
public typealias Reject = RCTPromiseRejectBlock

@objc public class RDRCTHelper: NSObject {

    private var rdManager: RelatedDigitalManager?

    @objc public static let shared = RDRCTHelper()

    override init() {
        super.init()
        rdManager = RelatedDigitalManager.shared
    }

    @objc(setIsInAppNotificationEnabled:)
    public func setIsInAppNotificationEnabled(enabled: Bool) {
        NativeRD.inAppNotificationsEnabled = enabled
    }

    @objc(setIsGeofenceEnabled:)
    public func setIsGeofenceEnabled(enabled: Bool) {
        NativeRD.geofenceEnabled = enabled
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

    @objc(askForNotificationPermission)
    public func askForNotificationPermission() {
        if RCTRunningInAppExtension() {
            print("askForNotificationPermission is unavailable in an app extension")
        } else {
            NativeRD.askForNotificationPermission(register: true)
        }
    }

    @objc(askForNotificationPermissionProvisional)
    public func askForNotificationPermissionProvisional() {
        if RCTRunningInAppExtension() {
            print("askForNotificationPermission is unavailable in an app extension")
        } else {
            NativeRD.askForNotificationPermissionProvisional(register: true)
        }
    }

    @objc(
        setIsPushNotificationEnabled:withIosAppAlias:withGoogleAppAlias:withHuaweiAppAlias:
            withDeliveredBadge:
    )
    public func setIsPushNotificationEnabled(
        enabled: Bool,
        iosAppAlias: String,
        googleAppAlias: String,
        huaweiAppAlias: String,
        deliveredBadge: Bool
    ) {
        if enabled {
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
        email: String, permission: Bool, isCommercial: Bool, resolve: @escaping Resolve,
        reject: @escaping Reject
    ) {
        NativeRD.registerEmail(email: email, permission: permission, isCommercial: isCommercial)
        NativeRD.sync()
        resolve(true)
    }

    @objc(getPushMessages:withReject:)
    public func getPushMessages(
        resolve: @escaping Resolve, reject: @escaping Reject
    ) {
        NativeRD.getPushMessages { nativeMessages in
            let messages = nativeMessages.map { $0.toDictionary() }
            resolve(messages)
        }
    }

    @objc(getPushMessagesWithId:withReject:)
    public func getPushMessagesWithId(
        resolve: @escaping Resolve, reject: @escaping Reject
    ) {
        NativeRD.getPushMessagesWithID { nativeMessages in
            let messages = nativeMessages.map { $0.toDictionary() }
            resolve(messages)
        }
    }

    @objc(getToken:withReject:)
    public func getToken(
        resolve: @escaping Resolve, reject: @escaping Reject
    ) {
        NativeRD.getToken { token in
            resolve(token)
        }
    }

    @objc(getUser:withReject:)
    public func getUser(
        resolve: @escaping Resolve, reject: @escaping Reject
    ) {
        resolve(NativeRD.rdUser.toDictionary())
    }

    @objc(requestIDFA)
    public func requestIDFA() {
        NativeRD.requestIDFA()
    }

    @objc(sendLocationPermission)
    public func sendLocationPermission() {
        NativeRD.sendLocationPermission()
    }

    @objc(requestLocationPermissions)
    public func requestLocationPermissions() {
        NativeRD.requestLocationPermissions()
    }

    @objc(sendTheListOfAppsInstalled)
    public func sendTheListOfAppsInstalled() {
        return
    }

    @objc(recommend:withProductCode:withFilters:withProperties:withResolve:withReject:)
    public func recommend(
        zoneId: String, productCode: String, filters: [NSDictionary] = [],
        properties: [String: String], resolve: @escaping Resolve, reject: @escaping Reject
    ) {

        var recommendationFilters = [RDRecommendationFilter]()
        for filter in filters {
            if let attribute = filter["attribute"] as? RDProductFilterAttribute,
               let filterType = filter["filterType"] as? RDRecommendationFilterType,
               let value = filter["value"] as? String {
                let recoFilter = RDRecommendationFilter(attribute: attribute, filterType: filterType, value: value)
                recommendationFilters.append(recoFilter)

            }
        }

        NativeRD.recommend(zoneId: zoneId, productCode: productCode, filters: recommendationFilters, properties: properties) { response in
            resolve(response.toDictionary())
        }

    }

    @objc(trackRecommendationClick:)
    public func trackRecommendationClick(qs: String) {
        NativeRD.trackRecommendationClick(qs: qs)
    }

    @objc(getFavoriteAttributeActions:withResolve:withReject:)
    public func getFavoriteAttributeActions(actionId: String, resolve: @escaping Resolve, reject: @escaping Reject) {
        NativeRD.getFavoriteAttributeActions(actionId: Int(actionId)) { response in
            resolve(RDRCTFavoriteAttributeActionResponse(from: response))
        }
    }

    @objc(registerNotificationListeners)
    public func registerNotificationListeners() {
        listenersRegistered = true
    }

    public var listenersRegistered = false
    public var hasListeners = false

    func startObserving() {
        hasListeners = true
    }

    func stopObserving() {
        hasListeners = false
    }

    /*
     public func sendRelatedDigitalEvent(_ eventName: String, _ body:  [AnyHashable : Any] ) {
     if listenersRegistered, hasListeners {
     self.sendEvent(withName: eventName, body: body)
     }
     }
     */

}
