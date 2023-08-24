//
//  RDRCTStoryView.swift
//  react-native-related-digital
//
//  Created by Egemen Gülkılık on 23.08.2023.
//

import UIKit
import React
import RelatedDigitalIOS

private typealias NativeRD = RelatedDigitalIOS.RelatedDigital

@objc public class RDRCTStoryView: RCTView, RDStoryURLDelegate {

    static let viewTag: Int = 1903
    static let storyItemUrlKey = "storyItemUrl"

    @objc var actionId: String? = nil

    @objc var onItemClicked: RCTBubblingEventBlock?

    override init(frame: CGRect) {
        super.init(frame: frame)
    }

    required init?(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
    }

    public override func layoutSubviews() {
        setupView()
    }

    private func setupView() {
        let storyView = UIView()
        if self.viewWithTag(RDRCTStoryView.viewTag) != nil {
            self.viewWithTag(RDRCTStoryView.viewTag)?.removeFromSuperview()
        }

        NativeRD.getStoryViewAsync(actionId: Int(actionId ?? "") , urlDelegate: self) { storyHomeView in
            if let storyHomeView = storyHomeView {
                storyHomeView.translatesAutoresizingMaskIntoConstraints = false
                storyView.addSubview(storyHomeView as UIView)

                NSLayoutConstraint.activate([storyHomeView.topAnchor.constraint(equalTo: storyView.topAnchor),
                                             storyHomeView.bottomAnchor.constraint(equalTo: storyView.bottomAnchor),
                                             storyHomeView.leadingAnchor.constraint(equalTo: storyView.leadingAnchor),
                                             storyHomeView.trailingAnchor.constraint(equalTo: storyView.trailingAnchor)])

            }
        }

        storyView.tag = RDRCTStoryView.viewTag

        self.addSubview(storyView)
        storyView.frame = self.frame
    }

    public func urlClicked(_ url: URL) {
        if self.onItemClicked != nil {
            self.onItemClicked?([RDRCTStoryView.storyItemUrlKey: url.absoluteString])
        }
    }

}
