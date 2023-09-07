//
//  RDRCTEventEmitter.swift
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 14.07.2023.
//

import Foundation
import React

@objc public class RDRCTEventEmitter: NSObject {
    
    static let RDRCTPendingEventName = "com.relateddigital.onPendingEvent"
    static let RDRCTEventNameKey = "name"
    static let RDRCTEventBodyKey = "body"
    
    @objc public weak var bridge: RCTBridge?
    
    
    var pendingEvents: [[String: Any]] = []
    
    private let lock = DispatchSemaphore(value: 1)
    
    
    override init() {
        self.pendingEvents = [[String: Any]]()
        super.init()
    }
    
    @objc public static let shared = RDRCTEventEmitter()
    
    @objc public func sendEvent(withName eventName: String) {
        lock.wait()
        self.pendingEvents.append([RDRCTEventEmitter.RDRCTEventNameKey: eventName])
        self.notifyPendingEvents()
        lock.signal()
    }
    
    @objc public func sendEvent(withName eventName: String, body: Any?) {
        lock.wait()
        var event: [String: Any] = [Self.RDRCTEventNameKey: eventName]
        if let body = body {
            event[Self.RDRCTEventBodyKey] = body
        }
        self.pendingEvents.append(event)
        self.notifyPendingEvents()
        lock.signal()
        
    }
    
    @objc public func notifyPendingEvents() {
        self.bridge?.enqueueJSCall(
            "RCTDeviceEventEmitter",
            method: "emit",
            args: [Self.RDRCTPendingEventName],
            completion: nil)
    }
    
    @objc public func takePendingEvents(withType type: String) -> [Any] {
        lock.wait()
        var events: [Any] = []
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
        lock.signal()
        return events
        
    }
    
    @objc public func onRelatedDigitalListenerAdded(forType type: String) {
        lock.wait()
        if self.pendingEvents.contains(where: { $0[Self.RDRCTEventNameKey] as? String == type }) {
            self.notifyPendingEvents()
        }
        lock.signal()
        
    }
    
    
}
