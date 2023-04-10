package com.reactnative_relateddigital

import android.content.Intent
import android.content.IntentFilter
import android.util.Log
import com.facebook.react.bridge.*
import com.google.gson.Gson
import com.reactnative_relateddigital.MapUtil.stringStringMap
import com.relateddigital.relateddigital_android.RelatedDigital
import com.relateddigital.relateddigital_android.constants.Constants
import com.relateddigital.relateddigital_android.model.EmailPermit
import com.relateddigital.relateddigital_android.model.GsmPermit
import com.relateddigital.relateddigital_android.model.Message
import com.relateddigital.relateddigital_android.push.EuromessageCallback
import com.relateddigital.relateddigital_android.push.PushMessageInterface
import org.json.JSONObject


class RelatedDigitalModule internal constructor(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String {
    return "RelatedDigital"
  }

  private val mActivityEventListener: ActivityEventListener = object : BaseActivityEventListener() {
    override fun onNewIntent(intent: Intent) {
      val bundle = intent.extras
      if (bundle != null) {
        Log.d(LOG_TAG, "opened push notification.")
        val message: Message? = bundle.getSerializable("message") as Message?
        if (message != null) {
          Log.d(LOG_TAG, "opened push notification ${message.pushId}.")
          PushUtils.sendEvent(
            PushUtils.ON_NOTIFICATION_OPENED,
            MapUtil.convertJsonToMap(JSONObject(Gson().toJson(message))),
            reactApplicationContext
          )
        }
      }
    }
  }

  init {
    reactApplicationContext.addActivityEventListener(mActivityEventListener)
  }

  @ReactMethod
  fun initialize(
    organizationId: String,
    profileId: String,
    dataSource: String,
    askLocationPermissionAtStart: Boolean
  ) {
    RelatedDigital.init(reactApplicationContext, organizationId, profileId, dataSource)
  }

  @ReactMethod
  fun setIsInAppNotificationEnabled(isInAppNotificationEnabled: Boolean) {
    RelatedDigital.setIsInAppNotificationEnabled(
      reactApplicationContext,
      isInAppNotificationEnabled
    )
  }

  @ReactMethod
  fun setIsGeofenceEnabled(isGeofenceEnabled: Boolean) {
    RelatedDigital.setIsGeofenceEnabled(reactApplicationContext, isGeofenceEnabled)
  }

  @ReactMethod
  fun setAdvertisingIdentifier(advertisingIdentifier: String) {
    RelatedDigital.setAdvertisingIdentifier(reactApplicationContext, advertisingIdentifier)
  }

  @ReactMethod
  fun signUp(exVisitorId: String, properties: ReadableMap) {
    RelatedDigital.signUp(
      reactApplicationContext,
      exVisitorId,
      stringStringMap(properties),
      if (RelatedDigital.getIsInAppNotificationEnabled(reactApplicationContext)) currentActivity else null
    )
  }

  @ReactMethod
  fun login(exVisitorId: String, properties: ReadableMap) {
    RelatedDigital.login(
      reactApplicationContext,
      exVisitorId,
      stringStringMap(properties),
      if (RelatedDigital.getIsInAppNotificationEnabled(reactApplicationContext)) currentActivity else null
    )
  }

  @ReactMethod
  fun logout() {
    RelatedDigital.logout(reactApplicationContext)
    RelatedDigital.sync(reactApplicationContext)
  }

  @ReactMethod
  fun customEvent(pageName: String, parameters: ReadableMap) {
    RelatedDigital.customEvent(
      reactApplicationContext,
      pageName,
      stringStringMap(parameters),
      if (RelatedDigital.getIsInAppNotificationEnabled(reactApplicationContext)) currentActivity else null
    )
  }

  @ReactMethod
  fun askForPushNotificationPermission() {
    Log.d(LOG_TAG, "askForPushNotificationPermission ios only.")
  }

  @ReactMethod
  fun setIsPushNotificationEnabled(
    isPushNotificationEnabled: Boolean,
    iosAppAlias: String,
    googleAppAlias: String,
    huaweiAppAlias: String,
    deliveredBadge: Boolean
  ) {
    RelatedDigital.setGoogleAppAlias(reactApplicationContext, googleAppAlias)
    RelatedDigital.setHuaweiAppAlias(reactApplicationContext, huaweiAppAlias)
    val token = RelatedDigital.getToken(reactApplicationContext)
    RelatedDigital.setIsPushNotificationEnabled(
      reactApplicationContext,
      isPushNotificationEnabled,
      googleAppAlias,
      huaweiAppAlias,
      token,
    )
    RelatedDigital.sync(reactApplicationContext)
  }

  @ReactMethod
  fun setEmail(email: String, permission: Boolean) {
    RelatedDigital.setEmail(reactApplicationContext, email)
    val emailPermit = if (permission) EmailPermit.ACTIVE else EmailPermit.PASSIVE
    RelatedDigital.setEmailPermit(reactApplicationContext, emailPermit)
    RelatedDigital.sync(reactApplicationContext)
  }

  @ReactMethod
  fun sendCampaignParameters(parameters: ReadableMap) {
    RelatedDigital.sendCampaignParameters(reactApplicationContext, stringStringMap(parameters))
  }

  @ReactMethod
  fun setTwitterId(twitterId: String) {
    RelatedDigital.setTwitterId(reactApplicationContext, twitterId)
    RelatedDigital.sync(reactApplicationContext)
  }

  @ReactMethod
  fun setFacebookId(facebookId: String) {
    RelatedDigital.setFacebookId(reactApplicationContext, facebookId)
    RelatedDigital.sync(reactApplicationContext)
  }

  @ReactMethod
  fun setRelatedDigitalUserId(relatedDigitalUserId: String) {
    RelatedDigital.setRelatedDigitalUserId(reactApplicationContext, relatedDigitalUserId)
    RelatedDigital.sync(reactApplicationContext)
  }

  @ReactMethod
  fun setNotificationLoginId(notificationLoginId: String) {
    RelatedDigital.setNotificationLoginID(notificationLoginId, reactApplicationContext)
    RelatedDigital.sync(reactApplicationContext)
  }

  @ReactMethod
  fun setPhoneNumber(msisdn: String, permission: Boolean) {
    val gsmPermit = if (permission) GsmPermit.ACTIVE else GsmPermit.PASSIVE
    RelatedDigital.setPhoneNumber(reactApplicationContext, msisdn)
    RelatedDigital.setGsmPermit(reactApplicationContext, gsmPermit)
    RelatedDigital.sync(reactApplicationContext)
  }

  @ReactMethod
  fun setUserProperty(key: String, value: String) {
    RelatedDigital.setUserProperty(reactApplicationContext, key, value)
    RelatedDigital.sync(reactApplicationContext)
  }

  @ReactMethod
  fun removeUserProperty(key: String) {
    RelatedDigital.removeUserProperty(reactApplicationContext, key)
    RelatedDigital.sync(reactApplicationContext)
  }

  @ReactMethod
  fun registerEmail(email: String, permission: Boolean, isCommercial: Boolean, promise: Promise) {
    val emailPermit = if (permission) EmailPermit.ACTIVE else EmailPermit.PASSIVE
    RelatedDigital.registerEmail(
      reactApplicationContext,
      email,
      emailPermit,
      isCommercial,
      object : EuromessageCallback {
        override fun success() {
          promise.resolve(true)
        }

        override fun fail(errorMessage: String?) {
          promise.reject(Exception(errorMessage))
        }
      })
  }

  @ReactMethod
  fun getPushMessages(promise: Promise) {
    currentActivity?.let {
      RelatedDigital.getPushMessages(it, object : PushMessageInterface {
        override fun success(pushMessages: List<Message>) {
          val gson = Gson()
          val json = gson.toJson(pushMessages)
          promise.resolve(json)
        }

        override fun fail(errorMessage: String) {
          promise.reject(Exception(errorMessage))
        }
      })
    } ?: run {
      promise.reject(Exception("Activity is null"))
    }
  }

  @ReactMethod
  fun getToken(promise: Promise) {
    val token = RelatedDigital.getToken(reactApplicationContext)
    promise.resolve(token)
  }

  @ReactMethod
  fun registerNotificationListeners() {
    Log.d(LOG_TAG, "registerNotificationListeners")
    val filter = IntentFilter()
    filter.addAction(Constants.PUSH_REGISTER_EVENT)
    filter.addAction(Constants.PUSH_RECEIVE_EVENT)
    val notifReceiver = RelatedDigitalNotificationReceiver(reactApplicationContext)
    reactApplicationContext.currentActivity?.registerReceiver(notifReceiver, filter)
  }

  companion object {
    const val NAME = "RelatedDigital"
    private const val LOG_TAG: String = "RelatedDigitalModule"
  }
}
