//
//  RDStoryView.swift
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 17.04.2023.
//

import Foundation
import UIKit
import React
private typealias NativeRD = RelatedDigitalIOS.RelatedDigital

@objc(RDStoryView)
class RDStoryView: RCTView, RDStoryURLDelegate {

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
        if(self.viewWithTag(RDStoryView.viewTag) != nil) {
            self.viewWithTag(RDStoryView.viewTag)?.removeFromSuperview()
        }

        let storyView: RDStoryView? = nil
        let actId = Int(actionId ?? "")
        NativeRD.getStoryViewAsync(actionId: actId, urlDelegate: self) { (rdStoryView) in
            if let storyView = rdStoryView {
                storyView.tag = RDStoryView.viewTag
                self.addSubview(storyView)
                storyView.frame = self.frame
            }
        }

        storyView?.tag = RDStoryView.viewTag
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