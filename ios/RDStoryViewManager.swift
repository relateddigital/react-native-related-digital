//
//  RDStoryViewManager.swift
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 17.04.2023.
//

import Foundation
import UIKit
import React
import RelatedDigitalIOS

@objc(RDStoryViewManager)
class RDStoryViewManager: RCTViewManager {

    override static func moduleName() -> String {
        "RDStoryView"
    }

    override func view() -> UIView! {
        RDStoryView(frame: .zero)
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }

    override func constantsToExport() -> [AnyHashable: Any] {
        return [:]
    }

    func supportedEvents() -> [String] {
        ["onItemClicked"]
        //["onLoadStarted", "onLoadFinished", "onLoadError", "onClose", "onItemClicked"]
    }


    /*
    @objc func setMessageId(_ messageId: String, viewTag: NSNumber) {
        DispatchQueue.main.async { [weak self] in
            self?.bridge.uiManager.addUIBlock { (uiManager, viewRegistry) in
                guard let view = viewRegistry[viewTag]?.reactSubviews().first as? RDStoryView else {
                    return
                }
                view.messageID = messageId
            }
        }
    }
     */

}

