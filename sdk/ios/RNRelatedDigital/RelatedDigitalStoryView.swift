//
//  RDStoryView.swift
//  react-native-related-digital
//
//  Created by Halil Kaya on 18.05.2021.
//

import UIKit
import VisilabsIOS

class RDStoryView: UIView, VisilabsStoryURLDelegate {
	
	static let viewTag: Int = 999
	
	@objc var actionId: String? {
		didSet {
			self.layoutSubviews()
		}
	}
	 
	@objc var onItemClicked: RCTBubblingEventBlock?
	
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
		
		let storyView: VisilabsStoryHomeView
		if(actionId != nil && actionId != "") {
			storyView = Visilabs.callAPI().getStoryView(actionId: Int(actionId!), urlDelegate: self)
		}
		else {
			storyView = Visilabs.callAPI().getStoryView(actionId: nil, urlDelegate: self)
		}
		
		storyView.tag = RDStoryView.viewTag
		
		self.addSubview(storyView)
		storyView.frame = self.frame
	}
	
	func urlClicked(_ url: URL) {
		if(self.onItemClicked != nil) {
			let storyData: [String : Any] = ["storyLink": url.absoluteString]
			self.onItemClicked!(storyData)
		}
	}
}

@objc (StoryViewManager)
class StoryViewManager: RCTViewManager {
 
	override static func requiresMainQueueSetup() -> Bool {
		return true
	}
 
	override func view() -> UIView! {
		return RDStoryView()
	}
 
}
