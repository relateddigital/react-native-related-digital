package com.reactnative_relateddigital

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager


class ReactRDPackage : ReactPackage {
  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
    return listOf(RDReactModule(reactContext))
  }

  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    //return listOf(RDStoryViewManager(reactContext), RDBannerViewManager(reactContext))
    //return emptyList()
    return listOf(RDStoryViewManager(reactContext))
  }
}

