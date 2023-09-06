//
//  RDRCTPushMessage.swift
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 6.09.2023.
//

import Foundation
import UIKit
import RelatedDigitalIOS

public protocol PushCodable: Codable {}
public extension PushCodable {
    var encoded: String {
        guard let data = try? JSONEncoder().encode(self) else { return "" }
        return String(data: data, encoding: .utf8) ?? ""
    }
}

public struct RDRCTPushMessage: PushCodable {

    public var formattedDateString: String?
    public var formattedOpenDateString: String?

    public let aps: Aps?
    public let altURL: String?
    public let cid: String?
    public let url: String?
    public let settings: String?
    public let pushType: String?
    public let altUrl: String?
    public let mediaUrl: String?
    public let deeplink: String?
    public let pushId: String?
    public let emPushSp: String?
    public let elements: [Element]?
    public let buttons: [ActionButton]?
    public let utm_source: String?
    public let utm_campaign: String?
    public let utm_medium: String?
    public let utm_content: String?
    public let utm_term: String?
    public var notificationLoginID: String?
    public var status: String?

    public let deliver: String?
    public let silent: String?

    // MARK: - Aps
    public struct Aps: Codable {
        public let alert: Alert?
        public let category: String?
        public let sound: String?
        public let contentAvailable: Int?
    }

    // MARK: - Alert
    public struct Alert: Codable {
        public let title: String?
        public let body: String?
    }

    // MARK: - Element
    public struct Element: Codable {
        public let title: String?
        public let content: String?
        public let url: String?
        public let picture: String?
    }

    public struct ActionButton: Codable {
        public let title: String?
        public let identifier: String?
        public let url: String?
    }
}

extension RDRCTPushMessage {
    init(from pushMessage: RDPushMessage) {
        self.formattedDateString = pushMessage.formattedDateString
        self.formattedOpenDateString = pushMessage.openedDate

        let alert = Alert(title: pushMessage.aps?.alert?.title, body: pushMessage.aps?.alert?.body)
        self.aps = Aps(alert: alert,
                       category: pushMessage.aps?.category,
                       sound: pushMessage.aps?.sound,
                       contentAvailable: pushMessage.aps?.contentAvailable)

        self.altURL = pushMessage.altURL
        self.cid = pushMessage.cid
        self.url = pushMessage.url
        self.settings = pushMessage.settings
        self.pushType = pushMessage.pushType
        self.altUrl = pushMessage.altUrl
        self.mediaUrl = pushMessage.mediaUrl
        self.deeplink = pushMessage.deeplink
        self.pushId = pushMessage.pushId
        self.emPushSp = pushMessage.emPushSp

        self.elements = pushMessage.elements?.map { Element(title: $0.title,
                                                            content: $0.content,
                                                            url: $0.url,
                                                            picture: $0.picture) }

        self.buttons = pushMessage.buttons?.map { ActionButton(title: $0.title,
                                                               identifier: $0.identifier,
                                                               url: $0.url) }

        self.utm_source = pushMessage.utm_source
        self.utm_campaign = pushMessage.utm_campaign
        self.utm_medium = pushMessage.utm_medium
        self.utm_content = pushMessage.utm_content
        self.utm_term = pushMessage.utm_term
        self.notificationLoginID = pushMessage.notificationLoginID
        self.status = pushMessage.status
        self.deliver = pushMessage.deliver
        self.silent = pushMessage.silent
    }
}
