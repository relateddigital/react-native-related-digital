package com.reactnative_relateddigital

import android.content.Context
import android.util.Log
import com.relateddigital.relateddigital_android.RelatedDigital
import com.facebook.react.ReactInstanceManager
import com.facebook.react.bridge.ReactContext


class RelatedDigitalManager private constructor() {
  private var reactInstanceManager: ReactInstanceManager? = null

  var initialized = false
    private set

  fun injectReactInstanceManager(reactInstanceManager: ReactInstanceManager) {
    if (this.reactInstanceManager != null) {
      Log.i(LOG_TAG, "RelatedDigitalManager already initialized.")
    }
    this.reactInstanceManager = reactInstanceManager

    this.reactInstanceManager!!.addReactInstanceEventListener(
      object : ReactInstanceManager.ReactInstanceEventListener {
        override fun onReactContextInitialized(context: ReactContext) {
          reactInstanceManager.removeReactInstanceEventListener(this)
          initialized = true
        }
      })

    this.reactInstanceManager!!.onNewIntent(null)
  }

  fun initRelatedDigital(
    organizationId: String,
    profileId: String,
    dataSource: String,
    appAlias: String?,
    huaweiAppAlias: String?,
    enableGeofence: Boolean,
    context: Context
  ) {

    RelatedDigital.init(
      context,
      organizationId,
      profileId,
      dataSource
    )
    RelatedDigital.setIsGeofenceEnabled(context, enableGeofence)

    val googleAlias = appAlias ?: ""
    val huaweiAlias = huaweiAppAlias ?: ""


    val token = RelatedDigital.getToken(context)
    RelatedDigital.setIsPushNotificationEnabled(
      context,
      true,
      googleAlias,
      huaweiAlias,
      token,
    )
    RelatedDigital.sync(context)

  }

  companion object {
    private const val LOG_TAG: String = "RelatedDigitalManager"
    var sharedInstance = RelatedDigitalManager()
  }
}
