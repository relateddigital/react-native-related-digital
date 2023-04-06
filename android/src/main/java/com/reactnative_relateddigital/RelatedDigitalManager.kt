package com.reactnative_relateddigital

import android.content.Context
import android.util.Log
import com.relateddigital.relateddigital_android.RelatedDigital
import com.facebook.react.ReactInstanceManager
import com.facebook.react.bridge.ReactContext
import com.relateddigital.relateddigital_android.model.RDNotificationPriority


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
    context: Context,
    organizationId: String,
    profileId: String,
    dataSource: String,
    appAlias: String?,
    huaweiAppAlias: String?,
    enableGeofence: Boolean,
    notificationSmallIcon: Int = 0,
    notificationSmallIconDarkMode: Int = 0,
    isNotificationLargeIcon: Boolean = false,
    notificationLargeIcon: Int = 0,
    notificationLargeIconDarkMode: Int = 0,
    notificationPushIntent: String = "",
    notificationChannelName: String = "",
    notificationColor: String = "",
    notificationPriority: RDNotificationPriority = RDNotificationPriority.NORMAL
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
      true, // TODO: hep true mu olmalı?
      googleAlias,
      huaweiAlias,
      token,
      notificationSmallIcon,
      notificationSmallIconDarkMode,
      isNotificationLargeIcon,
      notificationLargeIcon,
      notificationLargeIconDarkMode,
      notificationPushIntent,
      notificationChannelName,
      notificationColor,
      notificationPriority
    )
    RelatedDigital.sync(context)

  }

  companion object {
    private const val LOG_TAG: String = "RelatedDigitalManager"
    var sharedInstance = RelatedDigitalManager()
  }
}
