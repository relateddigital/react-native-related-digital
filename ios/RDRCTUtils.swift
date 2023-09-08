//
//  RDRCTUtils.swift
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 14.07.2023.
//

import Foundation
import RelatedDigitalIOS
import UserNotifications

extension RDUser {
    func toDictionary() -> [String: Any] {
        var dict: [String: Any] = [:]
        dict["cookieId"] = cookieId ?? NSNull()
        dict["exVisitorId"] = exVisitorId ?? NSNull()
        dict["tokenId"] = tokenId ?? NSNull()
        dict["appId"] = appId ?? NSNull()
        dict["visitData"] = visitData ?? NSNull()
        dict["visitorData"] = visitorData ?? NSNull()
        dict["userAgent"] = userAgent ?? NSNull()
        dict["identifierForAdvertising"] = identifierForAdvertising ?? NSNull()
        dict["sdkVersion"] = sdkVersion ?? NSNull()
        dict["sdkType"] = sdkType ?? NSNull()
        dict["lastEventTime"] = lastEventTime ?? NSNull()
        dict["nrv"] = nrv
        dict["pviv"] = pviv
        dict["tvc"] = tvc
        dict["lvt"] = lvt ?? NSNull()
        dict["appVersion"] = appVersion ?? NSNull()
        return dict
    }
}

extension RDProduct {
    func toDictionary() -> [String: Any] {
        var dict: [String: Any] = [:]

        dict[PayloadKey.code] = code
        dict[PayloadKey.title] = title
        dict[PayloadKey.img] = img
        dict[PayloadKey.destUrl] = destUrl
        dict[PayloadKey.brand] = brand
        dict[PayloadKey.price] = price
        dict[PayloadKey.dprice] = dprice
        dict[PayloadKey.cur] = cur
        dict[PayloadKey.dcur] = dcur
        dict[PayloadKey.freeshipping] = freeshipping
        dict[PayloadKey.samedayshipping] = samedayshipping
        dict[PayloadKey.rating] = rating
        dict[PayloadKey.comment] = comment
        dict[PayloadKey.discount] = discount
        dict[PayloadKey.attr1] = attr1
        dict[PayloadKey.attr2] = attr2
        dict[PayloadKey.attr3] = attr3
        dict[PayloadKey.attr4] = attr4
        dict[PayloadKey.attr5] = attr5
        dict[PayloadKey.attr6] = attr6
        dict[PayloadKey.attr7] = attr7
        dict[PayloadKey.attr8] = attr8
        dict[PayloadKey.attr9] = attr9
        dict[PayloadKey.attr10] = attr10
        dict[PayloadKey.qs] = qs

        return dict
    }
}

extension RDRecommendationResponse {
    func toDictionary() -> [String: Any] {
        var dict: [String: Any] = [:]
        dict["products"] = products.map { $0.toDictionary() }
        dict["widgetTitle"] = widgetTitle
        return dict
    }
}

extension RDPushMessage.Alert {
    func toDictionary() -> [String: Any] {
        var dict: [String: Any] = [:]

        dict["title"] = self.title
        dict["body"] = self.body

        return dict
    }
}

extension RDPushMessage.Aps {
    func toDictionary() -> [String: Any] {
        var dict: [String: Any] = [:]

        dict["alert"] = self.alert?.toDictionary()
        dict["category"] = self.category
        dict["sound"] = self.sound
        dict["contentAvailable"] = self.contentAvailable

        return dict
    }
}

extension RDPushMessage.Element {
    func toDictionary() -> [String: Any] {
        var dict: [String: Any] = [:]

        dict["title"] = self.title
        dict["content"] = self.content
        dict["url"] = self.url
        dict["picture"] = self.picture

        return dict
    }
}

extension RDPushMessage.ActionButtons {
    func toDictionary() -> [String: Any] {
        var dict: [String: Any] = [:]

        dict["title"] = self.title
        dict["identifier"] = self.identifier
        dict["url"] = self.url

        return dict
    }
}

extension RDPushMessage {
    func toDictionary() -> [String: Any] {
        var dict: [String: Any] = [:]
        dict["title"] = self.aps?.alert?.title
        dict["body"] = self.aps?.alert?.body
        dict["formattedDateString"] = self.formattedDateString
        dict["aps"] = self.aps?.toDictionary()
        dict["altURL"] = self.altURL
        dict["cid"] = self.cid
        dict["url"] = self.url
        dict["settings"] = self.settings
        dict["pushType"] = self.pushType
        dict["altUrl"] = self.altUrl
        dict["mediaUrl"] = self.mediaUrl
        dict["deeplink"] = self.deeplink
        dict["pushId"] = self.pushId
        dict["emPushSp"] = self.emPushSp
        dict["elements"] = self.elements?.map { $0.toDictionary() }
        dict["buttons"] = self.buttons?.map { $0.toDictionary() }
        dict["utm_source"] = self.utm_source
        dict["utm_campaign"] = self.utm_campaign
        dict["utm_medium"] = self.utm_medium
        dict["utm_content"] = self.utm_content
        dict["utm_term"] = self.utm_term
        dict["notificationLoginID"] = self.notificationLoginID
        dict["status"] = self.status
        dict["openedDate"] = self.openedDate
        dict["deliver"] = self.deliver
        dict["silent"] = self.silent
        return dict
    }
}

public enum EventType: String {
    case NotificationRegistered = "com.relateddigital.notification_registered"
    case NotificationReceived = "com.relateddigital.notification_received"
    case NotificationOpened = "com.relateddigital.notification_opened"
}

@objc public enum RDNotificationOptions: Int {
    case none = 0
    case badge
    case sound
    case alert
    case carPlay
    case criticalAlert
    case providesAppNotificationSettings
    case provisional
    case announcement

}

@objc public enum RDAuthorizedNotificationSettings: Int {
    case none = 0
    case badge
    case sound
    case alert
    case carPlay
    case lockScreen
    case notificationCenter
    case criticalAlert
    case announcement
    case scheduledDelivery
    case timeSensitive
}

@objc public enum RDAuthorizationStatus: Int {
    case notDetermined = 0
    case denied
    case authorized
    case provisional
    case ephemeral
}

struct RDFeatures: OptionSet, Hashable {
    let rawValue: Int
    var hashValue: Int {
        return self.rawValue
    }

    static let none = RDFeatures([])

    // Enables In-App Automation.
    static let inAppAutomation = RDFeatures(rawValue: 1 << 0)

    // Enables Message Center.
    static let messageCenter = RDFeatures(rawValue: 1 << 1)

    // Enables push.
    static let push = RDFeatures(rawValue: 1 << 2)

    static let chat = RDFeatures(rawValue: 1 << 3)

    // Enables analytics.
    static let analytics = RDFeatures(rawValue: 1 << 4)

    // Enables tags and attributes.
    static let tagsAndAttributes = RDFeatures(rawValue: 1 << 5)

    // Enables contacts.
    static let contacts = RDFeatures(rawValue: 1 << 6)

    // Enables location (with Location module).
    static let location = RDFeatures(rawValue: 1 << 7)

    // Sets enabled features to all.
    static let all: RDFeatures = [.inAppAutomation, .messageCenter, .push, .chat, .analytics, .tagsAndAttributes, .contacts, .location]
}

class RDRCTUtils: NSObject {

    static func authorizedStatusString(status: RDAuthorizationStatus) -> String {
        switch status {
        case .denied:
            return "denied"
        case .ephemeral:
            return "ephemeral"
        case .authorized:
            return "authorized"
        case .provisional:
            return "provisional"
        case .notDetermined:
            fallthrough
        default:
            return "notDetermined"
        }
    }

    static func optionsFromOptionsArray(_ options: [String]) -> [RDNotificationOptions] {
        var notificationOptions = [RDNotificationOptions]()

        if options.contains("alert") {
            notificationOptions.append(.alert)
        }

        if options.contains("badge") {
            notificationOptions.append(.badge)
        }

        if options.contains("sound") {
            notificationOptions.append(.sound)
        }

        if options.contains("carPlay") {
            notificationOptions.append(.carPlay)
        }

        if options.contains("criticalAlert") {
            notificationOptions.append(.criticalAlert)
        }

        if options.contains("providesAppNotificationSettings") {
            notificationOptions.append(.providesAppNotificationSettings)
        }

        if options.contains("provisional") {
            notificationOptions.append(.provisional)
        }

        return notificationOptions
    }

    static func authorizedSettingsArray(settings: [RDAuthorizedNotificationSettings]) -> [String] {
        var settingsArray: [String] = []
        if settings.contains(.alert) {
            settingsArray.append("alert")
        }
        if settings.contains(.badge) {
            settingsArray.append("badge")
        }
        if settings.contains(.sound) {
            settingsArray.append("sound")
        }
        if settings.contains(.carPlay) {
            settingsArray.append("carPlay")
        }
        if settings.contains(.lockScreen) {
            settingsArray.append("lockScreen")
        }
        if settings.contains(.notificationCenter) {
            settingsArray.append("notificationCenter")
        }
        if settings.contains(.announcement) {
            settingsArray.append("announcement")
        }
        if settings.contains(.scheduledDelivery) {
            settingsArray.append("scheduledDelivery")
        }
        if settings.contains(.timeSensitive) {
            settingsArray.append("timeSensitive")
        }
        return settingsArray
    }

    static func authorizedSettingsDictionary(settings: [RDAuthorizedNotificationSettings]) -> [String: Bool] {
        return [
            "alert": settings.contains(.alert),
            "badge": settings.contains(.badge),
            "sound": settings.contains(.sound),
            "carPlay": settings.contains(.carPlay),
            "lockScreen": settings.contains(.lockScreen),
            "notificationCenter": settings.contains(.notificationCenter),
            "criticalAlert": settings.contains(.notificationCenter),
            "announcement": settings.contains(.notificationCenter),
            "scheduledDelivery": settings.contains(.notificationCenter),
            "timeSensitive": settings.contains(.notificationCenter)
        ]
    }

    static func eventBodyForNotificationResponse(notificationResponse: UNNotificationResponse) -> [String: Any] {
        var body: [String: Any] = [:]
        let content = notificationResponse.notification.request.content
        body["notification"] = eventBodyForNotificationContent(userInfo: content.userInfo, notificationIdentifier: notificationResponse.notification.request.identifier)

        if notificationResponse.actionIdentifier == UNNotificationDefaultActionIdentifier {
            body["isForeground"] = true
        } else {
            if let notificationAction = notificationAction(forCategory: content.categoryIdentifier, actionIdentifier: notificationResponse.actionIdentifier) {
                let isForeground = notificationAction.options.contains(.foreground)
                body["isForeground"] = isForeground
                body["actionId"] = notificationResponse.actionIdentifier
            }
        }

        return body
    }

    static func eventBodyForNotificationContent(userInfo: [AnyHashable: Any], notificationIdentifier: String?) -> [String: Any] {
        var pushBody: [String: Any] = [:]
        if let identifier = notificationIdentifier {
            pushBody["notificationId"] = identifier
        }

        var extras: [AnyHashable: Any] = userInfo
        extras.removeValue(forKey: "aps")
        extras.removeValue(forKey: "_")
        if !extras.isEmpty {
            pushBody["extras"] = extras
        }

        if let aps = userInfo["aps"] as? [AnyHashable: Any] {
            let alert = aps["alert"]
            if let alertDict = alert as? [AnyHashable: Any] {
                pushBody["title"] = alertDict["title"]
                pushBody["alert"] = alertDict["body"]
                pushBody["subtitle"] = alertDict["subtitle"]
            } else {
                pushBody["alert"] = alert
            }
        }

        return pushBody
    }

    static func notificationAction(forCategory category: String, actionIdentifier identifier: String) -> UNNotificationAction? {
        /*
         guard let categories = RDPush.push().combinedCategories else {
         print("Unknown notification category identifier \(category)")
         return nil
         }
         
         
         var notificationAction: UNNotificationAction?
         for possibleCategory in categories {
         if possibleCategory.identifier == category {
         for possibleAction in possibleCategory.actions {
         if possibleAction.identifier == identifier {
         notificationAction = possibleAction
         break
         }
         }
         }
         }
         
         if notificationAction == nil {
         print("Unknown notification action identifier \(identifier)")
         }
         
         
         return notificationAction
         */
        return nil
    }

    static func isValidFeatureArray(stringArray: [String]) -> Bool {
        for value in stringArray {
            if featureMap.values.contains(value) {
                return true
            }
        }
        return false
    }

    static func stringArrayToFeatures(stringArray: [String]) -> RDFeatures {
        var result: RDFeatures = []
        for value in stringArray {
            if let featureValue = featureMap.first(where: { $0.value == value })?.key {
                result.insert(featureValue)
            }
        }
        return result
    }

    static func featureToStringArray(features: RDFeatures) -> [String] {
        var result: [String] = []
        for (key, value) in featureMap {
            if key == RDFeatures.all, features == RDFeatures.all {
                return [value]
            }
            if key == RDFeatures.none, features == RDFeatures.none {
                return [value]
            }
            if features.contains(key) {
                result.append(value)
            }
        }
        return result
    }

    static var featureMap: [RDFeatures: String] = {
        [
            RDFeatures.inAppAutomation: "FEATURE_IN_APP_AUTOMATION",
            RDFeatures.messageCenter: "FEATURE_MESSAGE_CENTER",
            RDFeatures.push: "FEATURE_PUSH",
            RDFeatures.chat: "FEATURE_CHAT",
            RDFeatures.analytics: "FEATURE_ANALYTICS",
            RDFeatures.tagsAndAttributes: "FEATURE_TAGS_AND_ATTRIBUTES",
            RDFeatures.contacts: "FEATURE_CONTACTS",
            RDFeatures.location: "FEATURE_LOCATION",
            RDFeatures.none: "FEATURE_NONE",
            RDFeatures.all: "FEATURE_ALL"
        ]
    }()
}
