//
//  RDRCTEventEmitter.swift
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 14.07.2023.
//

import Foundation

import React

@objc public class RDRCTEventEmitter: NSObject {

    @objc static let RDRCTPendingEventName = "com.relateddigital.onPendingEvent"
    @objc static let RDRCTEventNameKey = "name"
    @objc static let RDRCTEventBodyKey = "body"
    @objc public weak var bridge: RCTBridge?
    @objc public var pendingEvents: [[String: Any]] = []

    // @objc public let pendingEventsQueue = DispatchQueue(label: "com.relateddigital.pendingEventsQueue", attributes: .concurrent)

    override init() {
        super.init()
        self.pendingEvents = [[String: Any]]()
    }

    @objc public static let shared = RDRCTEventEmitter()

    @objc public func sendEvent(withName eventName: String) {
        // self.pendingEventsQueue.async(flags: .barrier) { [weak self] in
        self.pendingEvents.append([Self.RDRCTEventNameKey: eventName])
        self.notifyPendingEvents()
        // }
    }

    @objc public func sendEvent(withName eventName: String, body: Any?) {
        // self.pendingEventsQueue.async(flags: .barrier) { [weak self] in
        var event: [String: Any] = [Self.RDRCTEventNameKey: eventName]
        if let body = body {
            event[Self.RDRCTEventBodyKey] = body
        }
        self.pendingEvents.append(event)
        self.notifyPendingEvents()
        // }

    }

    @objc public func notifyPendingEvents() {
        self.bridge?.enqueueJSCall(
            "RCTDeviceEventEmitter",
            method: "emit",
            args: [Self.RDRCTPendingEventName],
            completion: nil)
    }

    @objc public func takePendingEvents(withType type: String) -> [Any] {
        var events: [Any] = []
        // pendingEventsQueue.async(flags: .barrier) { [weak self] in
        // guard let self = self else { return }
        self.pendingEvents = self.pendingEvents.filter { event in
            if event[Self.RDRCTEventNameKey] as? String == type {
                if let eventBody = event[Self.RDRCTEventBodyKey] {
                    events.append(eventBody)
                }
                return false
            } else {
                return true
            }
        }
        // }
        return events
    }

    @objc public func onRelatedDigitalListenerAdded(forType type: String) {
        // pendingEventsQueue.async(flags: .barrier) { [weak self] in
        // guard let self = self else { return }
        if self.pendingEvents.contains(where: { $0[Self.RDRCTEventNameKey] as? String == type }) {
            self.notifyPendingEvents()
        }
        // }
    }
}
