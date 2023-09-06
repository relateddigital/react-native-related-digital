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
        var dictionary: [String: Any] = [:]
        dictionary["cookieId"] = cookieId ?? NSNull()
        dictionary["exVisitorId"] = exVisitorId ?? NSNull()
        dictionary["tokenId"] = tokenId ?? NSNull()
        dictionary["appId"] = appId ?? NSNull()
        dictionary["visitData"] = visitData ?? NSNull()
        dictionary["visitorData"] = visitorData ?? NSNull()
        dictionary["userAgent"] = userAgent ?? NSNull()
        dictionary["identifierForAdvertising"] = identifierForAdvertising ?? NSNull()
        dictionary["sdkVersion"] = sdkVersion ?? NSNull()
        dictionary["sdkType"] = sdkType ?? NSNull()
        dictionary["lastEventTime"] = lastEventTime ?? NSNull()
        dictionary["nrv"] = nrv
        dictionary["pviv"] = pviv
        dictionary["tvc"] = tvc
        dictionary["lvt"] = lvt ?? NSNull()
        dictionary["appVersion"] = appVersion ?? NSNull()
        return dictionary
    }
}

extension RDProduct {
    func toDictionary() -> [String: Any] {
        var dictionary: [String: Any] = [:]

        dictionary[PayloadKey.code] = code
        dictionary[PayloadKey.title] = title
        dictionary[PayloadKey.img] = img
        dictionary[PayloadKey.destUrl] = destUrl
        dictionary[PayloadKey.brand] = brand
        dictionary[PayloadKey.price] = price
        dictionary[PayloadKey.dprice] = dprice
        dictionary[PayloadKey.cur] = cur
        dictionary[PayloadKey.dcur] = dcur
        dictionary[PayloadKey.freeshipping] = freeshipping
        dictionary[PayloadKey.samedayshipping] = samedayshipping
        dictionary[PayloadKey.rating] = rating
        dictionary[PayloadKey.comment] = comment
        dictionary[PayloadKey.discount] = discount
        dictionary[PayloadKey.attr1] = attr1
        dictionary[PayloadKey.attr2] = attr2
        dictionary[PayloadKey.attr3] = attr3
        dictionary[PayloadKey.attr4] = attr4
        dictionary[PayloadKey.attr5] = attr5
        dictionary[PayloadKey.attr6] = attr6
        dictionary[PayloadKey.attr7] = attr7
        dictionary[PayloadKey.attr8] = attr8
        dictionary[PayloadKey.attr9] = attr9
        dictionary[PayloadKey.attr10] = attr10
        dictionary[PayloadKey.qs] = qs

        return dictionary
    }
}

extension RDRecommendationResponse {
    func toDictionary() -> [String: Any] {
        var dictionary: [String: Any] = [:]
        dictionary["products"] = products.map { $0.toDictionary() }
        dictionary["widgetTitle"] = widgetTitle
        return dictionary
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
