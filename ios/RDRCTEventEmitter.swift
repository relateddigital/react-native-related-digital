//
//  RDRCTEventEmitter.swift
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 3.07.2023.
//

import Foundation
import React

@objc(RDRCTEventEmitter)
class RDRCTEventEmitter: NSObject {
    
    
    static let RDRCTPendingEventName = "com.relateddigital.onPendingEvent"
    static let RDRCTEventNameKey = "name"
    static let RDRCTEventBodyKey = "body"
    
    weak var bridge: RCTBridge?
    
    private static var sharedEventEmitter: RDRCTEventEmitter = {
        let eventEmitter = RDRCTEventEmitter()
        return eventEmitter
    }()
    
    var pendingEvents: [[String: Any]]
    
    private let pendingEventsQueue = DispatchQueue(label: "com.relateddigital.pendingEventsQueue", attributes: .concurrent)
    
    
    override init() {
        self.pendingEvents = [[String: Any]]()
        super.init()
    }
    
    static func shared() -> RDRCTEventEmitter {
        return sharedEventEmitter
    }
    
    func sendEvent(withName eventName: String) {
        self.pendingEventsQueue.async(flags: .barrier) { [weak self] in
            self?.pendingEvents.append([Self.RDRCTEventNameKey: eventName])
            self?.notifyPendingEvents()
        }
    }
    
    func sendEvent(withName eventName: String, body: Any?) {
        self.pendingEventsQueue.async(flags: .barrier) { [weak self] in
            var event: [String: Any] = [Self.RDRCTEventNameKey: eventName]
            if let body = body {
                event[Self.RDRCTEventBodyKey] = body
            }
            self?.pendingEvents.append(event)
            self?.notifyPendingEvents()
        }
    }
    
    
    
    func notifyPendingEvents() {
        self.bridge?.enqueueJSCall("RCTDeviceEventEmitter",
                                   method: "emit",
                                   args: [Self.RDRCTPendingEventName],
                                   completion: nil)
    }
    
    
    
    func takePendingEvents(withType type: String) -> [Any] {
        var events: [Any] = []
        pendingEventsQueue.async(flags: .barrier) { [weak self] in
            guard let self = self else { return }
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
        }
        return events
    }
    

    
    
    func onRelatedDigitalListenerAdded(forType type: String) {
        pendingEventsQueue.async(flags: .barrier) { [weak self] in
            guard let self = self else { return }
            if self.pendingEvents.contains(where: { $0[Self.RDRCTEventNameKey] as? String == type }) {
                self.notifyPendingEvents()
            }
        }
    }
    

}
