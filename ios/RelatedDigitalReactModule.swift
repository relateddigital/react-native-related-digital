//
//  RelatedDigitalReactModule.swift
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 22.06.2023.
//

import Foundation
import React
import RelatedDigitalIOS

private typealias NativeRD = RelatedDigitalIOS.RelatedDigital


@objc(RelatedDigitalReactModule)
class RelatedDigitalReactModule: NSObject, RCTBridgeModule {

    static func moduleName() -> String! {
        "RelatedDigitalReactModule"
    }

    let RDRCTErrorCodeMessageNotFound = 0
    let RDRCTErrorCodeInboxRefreshFailed = 1
    let RDRCTErrorDomain = "com.relateddigital.react"
    let RDRCTStatusInvalidFeature = "INVALID_FEATURE"
    let RDRCTErrorDescriptionInvalidFeature = "Invalid feature, cancelling the action."
    let RDRCTErrorCodeInvalidFeature = 2
    var rdListener: RDRCTListener?

    @objc static func requiresMainQueueSetup() -> Bool {
        return true
    }

    @objc func addListener(_ eventName: String) {}

    @objc func removeListeners(_ count: Int) {}

    @objc func onRelatedDigitalListenerAdded(_ eventName: String) {
        RDRCTEventEmitter.shared().onRelatedDigitalListenerAdded(forType: eventName)
    }

    @objc func setUserNotificationsEnabled(_ enabled: Bool) {
        guard self.ensureRelatedDigitalReady() else { return }
        //RelatedDigital.push().userPushNotificationsEnabled = enabled
    }

    @objc(setNotificationOptions:)
    func setNotificationOptions(_ options: [Any]) {
        guard self.ensureRelatedDigitalReady() else { return }
        //let notificationOptions = RDRCTUtils.options(fromOptionsArray: options)
        //RelatedDigital.push().notificationOptions = notificationOptions
        //RelatedDigital.push().updateRegistration()
    }

    @objc(setAutobadgeEnabled:)
    func setAutobadgeEnabled(_ enabled: Bool) {
        guard self.ensureRelatedDigitalReady() else { return }
        //RelatedDigital.push().autobadgeEnabled = enabled
    }

    @objc(setBadgeNumber:)
    func setBadgeNumber(_ badgeNumber: Int) {
        guard self.ensureRelatedDigitalReady() else { return }
        //RelatedDigital.push().setBadgeNumber(badgeNumber)
    }

    @objc(clearNotifications)
    func clearNotifications() {
        UNUserNotificationCenter.current().removeAllDeliveredNotifications()
    }

    @objc(clearNotification:)
    func clearNotification(_ identifier: String) {
        //if let identifier = identifier {
        //    UNUserNotificationCenter.current().removeDeliveredNotifications(withIdentifiers: [identifier])
        //}
    }

    func ensureRelatedDigitalReady() -> Bool {
        return self.ensureRelatedDigitalReady(reject: nil)
    }

    func ensureRelatedDigitalReady(reject: RCTPromiseRejectBlock?) -> Bool {
        //if RelatedDigital.isFlying {
        //    return true
        //}
        if let reject = reject {
            reject("TAKE_OFF_NOT_CALLED", "RelatedDigital not ready, init not called", nil)
        }
        return false
    }

    // MARK: - TODO
    // You need to implement the below methods yourself, because
    // their implementations are missing in the provided Objective-C code.

    @objc(setForegroundPresentationOptions:)
    func setForegroundPresentationOptions(_ options: [Any]) {
        // Implement this
    }

    @objc(getNotificationStatus:rejecter:)
    func getNotificationStatus(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        // Implement this
    }

    @objc(isAutobadgeEnabled:rejecter:)
    func isAutobadgeEnabled(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        //if ensureRelatedDigitalReady(reject: reject) {
        //    resolve(RelatedDigital.push().autobadgeEnabled)
        //}
    }

    @objc(getBadgeNumber:rejecter:)
    func getBadgeNumber(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) {
        //if ensureRelatedDigitalReady(reject: reject) {
        //    resolve(UIApplication.shared.applicationIconBadgeNumber)
        //}
    }

    @objc(getInboxMessages:rejecter:)
    func getInboxMessages(_ resolve: RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
        if !ensureRelatedDigitalReady(reject: reject) { return }

        var messages: [[String: Any]] = []

        /*
        for message in RDMessageCenter.shared().messageList.messages {
            if let icons = message.rawMessageObject["icons"] as? [String: Any],
               let iconUrl = icons["list_icon"] as? String,
               let sentDate = message.messageSent {
                var messageInfo: [String: Any] = [:]
                messageInfo["title"] = message.title
                messageInfo["id"] = message.messageID
                messageInfo["sentDate"] = sentDate.timeIntervalSince1970 * 1000
                messageInfo["isRead"] = message.unread ? false : true
                messageInfo["extras"] = message.extra
                messageInfo["iconUrl"] = iconUrl

                messages.append(messageInfo)
            }
        }
        */

        resolve(messages)
    }

    // TODO: Implement the remaining methods
}

