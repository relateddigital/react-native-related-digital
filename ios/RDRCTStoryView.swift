//
//  RDRCTStoryView.swift
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 17.04.2023.
//

import Foundation
import UIKit
import React
import RelatedDigitalIOS
private typealias NativeRD = RelatedDigitalIOS.RelatedDigital

@objc(RDRCTStoryView)
class RDRCTStoryView: RCTView, RDStoryURLDelegate {

    static let viewTag: Int = 999

    @objc var actionId: String? {
        didSet {
            layoutSubviews()
        }
    }

    @objc var onItemClicked: RCTBubblingEventBlock?
    //var onLoadStarted: RCTDirectEventBlock?

    override init(frame: CGRect) {
        super.init(frame: frame)
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

    override func layoutSubviews() {
        setupView()
    }

    private func setupView() {
        if(self.viewWithTag(RDRCTStoryView.viewTag) != nil) {
            self.viewWithTag(RDRCTStoryView.viewTag)?.removeFromSuperview()
        }

        let storyView: RDRCTStoryView? = nil
        let actId = Int(actionId ?? "")
        NativeRD.getStoryViewAsync(actionId: actId, urlDelegate: self) { (rdStoryView) in
            if let storyView = rdStoryView {
                storyView.tag = RDRCTStoryView.viewTag
                self.addSubview(storyView)
                storyView.frame = self.frame
            }
        }

        storyView?.tag = RDRCTStoryView.viewTag
        if let storyView = storyView {
            self.addSubview(storyView)
        }
        storyView?.frame = self.frame
    }

    func urlClicked(_ url: URL) {
        if(onItemClicked != nil) {
            let storyData: [String : Any] = ["storyLink": url.absoluteString]
            self.onItemClicked!(storyData)
        }
    }
}
