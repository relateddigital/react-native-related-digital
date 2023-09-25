package com.reactnative_relateddigital

import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp

import com.relateddigital.relateddigital_android.inapp.bannercarousel.BannerRecyclerView

class RDBannerViewManager {
  companion object {
    const val REACT_CLASS = "RDRCTBannerView"
  }
}

/*
class RDBannerViewManager : SimpleViewManager<BannerRecyclerView>() {

  override fun getName(): String {
    return REACT_CLASS
  }

  override fun createViewInstance(reactContext: ThemedReactContext): BannerRecyclerView {
    val messageView = BannerRecyclerView(reactContext)
    reactContext.addLifecycleEventListener(messageView)
    return messageView
  }

  override fun onDropViewInstance(messageView: BannerRecyclerView) {
    super.onDropViewInstance(messageView)
    (messageView.context as ThemedReactContext).removeLifecycleEventListener(messageView)
    messageView.cleanup()
  }

  @ReactProp(name = "messageId")
  override fun setMessageId(view: BannerRecyclerView, messageId: String?) {
    messageId?.let {
      view.loadMessage(it)
    }
  }

  override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
    val events = if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      listOf(
        ReactMessageView.EVENT_CLOSE_REGISTRATION_NAME to ReactMessageView.EVENT_CLOSE_HANDLER_NAME,
        ReactMessageView.EVENT_LOAD_ERROR_REGISTRATION_NAME to ReactMessageView.EVENT_LOAD_ERROR_HANDLER_NAME,
        ReactMessageView.EVENT_LOAD_FINISHED_REGISTRATION_NAME to ReactMessageView.EVENT_LOAD_FINISHED_HANDLER_NAME,
        ReactMessageView.EVENT_LOAD_STARTED_REGISTRATION_NAME to ReactMessageView.EVENT_LOAD_STARTED_HANDLER_NAME
      )
    } else {
      listOf(
        ReactMessageView.EVENT_CLOSE_HANDLER_NAME to ReactMessageView.EVENT_CLOSE_HANDLER_NAME,
        ReactMessageView.EVENT_LOAD_ERROR_HANDLER_NAME to ReactMessageView.EVENT_LOAD_ERROR_HANDLER_NAME,
        ReactMessageView.EVENT_LOAD_FINISHED_HANDLER_NAME to ReactMessageView.EVENT_LOAD_FINISHED_HANDLER_NAME,
        ReactMessageView.EVENT_LOAD_STARTED_HANDLER_NAME to ReactMessageView.EVENT_LOAD_STARTED_HANDLER_NAME
      )
    }

    val builder = MapBuilder.builder<String, Any>()

    for ((name, handlerName) in events) {
      builder.put(
        name,
        MapBuilder.of(
          "phasedRegistrationNames",
          MapBuilder.of("bubbled", handlerName)
        )
      )
    }

    return builder.build()
  }

  companion object {
    const val REACT_CLASS = "RDRCTBannerView"
  }
}
*/
