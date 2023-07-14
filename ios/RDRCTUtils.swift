//
//  RDRCTUtils.swift
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 14.07.2023.
//

import Foundation
import RelatedDigitalIOS
import UserNotifications

public struct RDNotificationOptions: OptionSet, Hashable {
    public let rawValue: Int
    
    public init(rawValue: Int) {
        self.rawValue = rawValue
    }
    
    static let none = RDNotificationOptions([])
    static let badge = RDNotificationOptions(rawValue: 1 << 0)
    static let sound = RDNotificationOptions(rawValue: 1 << 1)
    static let alert = RDNotificationOptions(rawValue: 1 << 2)
    static let carPlay = RDNotificationOptions(rawValue: 1 << 3)
    static let criticalAlert = RDNotificationOptions(rawValue: 1 << 4)
    static let providesAppNotificationSettings = RDNotificationOptions(rawValue: 1 << 5)
    static let provisional = RDNotificationOptions(rawValue: 1 << 6)
    static let announcement = RDNotificationOptions(rawValue: 1 << 7)
}

public struct RDAuthorizedNotificationSettings: OptionSet {
    public let rawValue: Int
    
    public init(rawValue: Int) {
        self.rawValue = rawValue
    }
    
    static let none = RDAuthorizedNotificationSettings([])
    static let badge = RDAuthorizedNotificationSettings(rawValue: 1 << 0)
    static let sound = RDAuthorizedNotificationSettings(rawValue: 1 << 1)
    static let alert = RDAuthorizedNotificationSettings(rawValue: 1 << 2)
    static let carPlay = RDAuthorizedNotificationSettings(rawValue: 1 << 3)
    static let lockScreen = RDAuthorizedNotificationSettings(rawValue: 1 << 4)
    static let notificationCenter = RDAuthorizedNotificationSettings(rawValue: 1 << 5)
    static let criticalAlert = RDAuthorizedNotificationSettings(rawValue: 1 << 6)
    static let announcement = RDAuthorizedNotificationSettings(rawValue: 1 << 7)
    static let scheduledDelivery = RDAuthorizedNotificationSettings(rawValue: 1 << 8)
    static let timeSensitive = RDAuthorizedNotificationSettings(rawValue: 1 << 9)
}

public enum RDAuthorizationStatus: Int {
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
    
    static func optionsFromOptionsArray(_ options: [String]) -> RDNotificationOptions {
        var notificationOptions: RDNotificationOptions = []
        
        if options.contains("alert") {
            notificationOptions.insert(.alert)
        }
        
        if options.contains("badge") {
            notificationOptions.insert(.badge)
        }
        
        if options.contains("sound") {
            notificationOptions.insert(.sound)
        }
        
        if options.contains("carPlay") {
            notificationOptions.insert(.carPlay)
        }
        
        if options.contains("criticalAlert") {
            notificationOptions.insert(.criticalAlert)
        }
        
        if options.contains("providesAppNotificationSettings") {
            notificationOptions.insert(.providesAppNotificationSettings)
        }
        
        if options.contains("provisional") {
            notificationOptions.insert(.provisional)
        }
        
        return notificationOptions
    }
    
    static func authorizedSettingsArray(settings: RDAuthorizedNotificationSettings) -> [String] {
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
    
    static func authorizedSettingsDictionary(settings: RDAuthorizedNotificationSettings) -> [String: Bool] {
        return [
            "alert" : settings.contains(.alert),
            "badge" : settings.contains(.badge),
            "sound" : settings.contains(.sound),
            "carPlay" : settings.contains(.carPlay),
            "lockScreen" : settings.contains(.lockScreen),
            "notificationCenter" : settings.contains(.notificationCenter),
            "criticalAlert" : settings.contains(.notificationCenter),
            "announcement" : settings.contains(.notificationCenter),
            "scheduledDelivery" : settings.contains(.notificationCenter),
            "timeSensitive" : settings.contains(.notificationCenter)
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
