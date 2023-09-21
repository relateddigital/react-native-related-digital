package com.reactnative_relateddigital

import android.content.Intent
import android.content.IntentFilter
import android.util.Log
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.BaseActivityEventListener
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.WritableNativeMap
import com.google.gson.Gson
import com.reactnative_relateddigital.MapUtil.stringStringMap
import com.relateddigital.relateddigital_android.RelatedDigital as NativeRD
import com.relateddigital.relateddigital_android.constants.Constants
import com.relateddigital.relateddigital_android.model.EmailPermit
import com.relateddigital.relateddigital_android.model.GsmPermit
import com.relateddigital.relateddigital_android.model.Message
import com.relateddigital.relateddigital_android.push.EuromessageCallback
import com.relateddigital.relateddigital_android.push.PushMessageInterface
import com.relateddigital.relateddigital_android.util.GoogleUtils
import org.json.JSONObject


//sendPushNotificationOpenReport

class RDReactModule internal constructor(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String {
    return "RelatedDigitalReactModule"
  }

  private val mActivityEventListener: ActivityEventListener = object : BaseActivityEventListener() {
    override fun onNewIntent(intent: Intent) {
      val bundle = intent.extras
      if (bundle != null) {
        Log.d(LOG_TAG, "opened push notification.")
        val message: Message? = bundle.serializable("message") as Message?
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
  fun setIsInAppNotificationEnabled(enabled: Boolean) {
    NativeRD.setIsInAppNotificationEnabled(
      reactApplicationContext, enabled
    )
  }

  @ReactMethod
  fun setIsGeofenceEnabled(enabled: Boolean) {
    NativeRD.setIsGeofenceEnabled(reactApplicationContext, enabled)
  }

  @ReactMethod
  fun setAdvertisingIdentifier(advertisingIdentifier: String) {
    NativeRD.setAdvertisingIdentifier(reactApplicationContext, advertisingIdentifier)
  }

  @ReactMethod
  fun signUp(exVisitorId: String, properties: ReadableMap) {
    NativeRD.signUp(
      reactApplicationContext,
      exVisitorId,
      stringStringMap(properties),
      if (NativeRD.getIsInAppNotificationEnabled(reactApplicationContext)) currentActivity else null
    )
  }

  @ReactMethod
  fun login(exVisitorId: String, properties: ReadableMap) {
    NativeRD.login(
      reactApplicationContext,
      exVisitorId,
      stringStringMap(properties),
      if (NativeRD.getIsInAppNotificationEnabled(reactApplicationContext)) currentActivity else null
    )
  }

  @ReactMethod
  fun logout() {
    NativeRD.logout(reactApplicationContext)
    NativeRD.sync(reactApplicationContext)
  }

  @ReactMethod
  fun customEvent(pageName: String, parameters: ReadableMap) {
    NativeRD.customEvent(
      reactApplicationContext,
      pageName,
      stringStringMap(parameters),
      if (NativeRD.getIsInAppNotificationEnabled(reactApplicationContext)) currentActivity else null
    )
  }

  @ReactMethod
  fun askForNotificationPermission() {
    Log.d(LOG_TAG, "askForNotificationPermission ios only.")
  }

  @ReactMethod
  fun askForNotificationPermissionProvisional() {
    Log.d(LOG_TAG, "askForNotificationPermissionProvisional ios only.")
  }

  @ReactMethod
  fun setIsPushNotificationEnabled(
    enabled: Boolean,
    iosAppAlias: String,
    googleAppAlias: String,
    huaweiAppAlias: String,
    deliveredBadge: Boolean
  ) {
    NativeRD.setGoogleAppAlias(reactApplicationContext, googleAppAlias)
    NativeRD.setHuaweiAppAlias(reactApplicationContext, huaweiAppAlias)
    val token = NativeRD.getToken(reactApplicationContext)
    NativeRD.setIsPushNotificationEnabled(
      reactApplicationContext,
      enabled,
      googleAppAlias,
      huaweiAppAlias,
      token,
    )
    NativeRD.sync(reactApplicationContext)
  }

  @ReactMethod
  fun setEmail(email: String, permission: Boolean) {
    NativeRD.setEmail(reactApplicationContext, email)
    val emailPermit = if (permission) EmailPermit.ACTIVE else EmailPermit.PASSIVE
    NativeRD.setEmailPermit(reactApplicationContext, emailPermit)
    NativeRD.sync(reactApplicationContext)
  }

  @ReactMethod
  fun sendCampaignParameters(parameters: ReadableMap) {
    NativeRD.sendCampaignParameters(reactApplicationContext, stringStringMap(parameters))
  }

  @ReactMethod
  fun setTwitterId(twitterId: String) {
    NativeRD.setTwitterId(reactApplicationContext, twitterId)
    NativeRD.sync(reactApplicationContext)
  }

  @ReactMethod
  fun setFacebookId(facebookId: String) {
    NativeRD.setFacebookId(reactApplicationContext, facebookId)
    NativeRD.sync(reactApplicationContext)
  }

  @ReactMethod
  fun setRelatedDigitalUserId(relatedDigitalUserId: String) {
    NativeRD.setRelatedDigitalUserId(reactApplicationContext, relatedDigitalUserId)
    NativeRD.sync(reactApplicationContext)
  }

  @ReactMethod
  fun setNotificationLoginId(notificationLoginId: String) {
    NativeRD.setNotificationLoginID(notificationLoginId, reactApplicationContext)
    NativeRD.sync(reactApplicationContext)
  }

  @ReactMethod
  fun setPhoneNumber(msisdn: String, permission: Boolean) {
    val gsmPermit = if (permission) GsmPermit.ACTIVE else GsmPermit.PASSIVE
    NativeRD.setPhoneNumber(reactApplicationContext, msisdn)
    NativeRD.setGsmPermit(reactApplicationContext, gsmPermit)
    NativeRD.sync(reactApplicationContext)
  }

  @ReactMethod
  fun setUserProperty(key: String, value: String) {
    NativeRD.setUserProperty(reactApplicationContext, key, value)
    NativeRD.sync(reactApplicationContext)
  }

  @ReactMethod
  fun removeUserProperty(key: String) {
    NativeRD.removeUserProperty(reactApplicationContext, key)
    NativeRD.sync(reactApplicationContext)
  }

  @ReactMethod
  fun registerEmail(email: String, permission: Boolean, isCommercial: Boolean, promise: Promise) {
    val emailPermit = if (permission) EmailPermit.ACTIVE else EmailPermit.PASSIVE
    NativeRD.registerEmail(reactApplicationContext,
      email,
      emailPermit,
      isCommercial,
      object : EuromessageCallback {
        override fun success() {
          promise.resolve(true)
        }
        override fun fail(errorMessage: String?) {
          promise.resolve(false)
        }
      })
  }

  @ReactMethod
  fun getPushMessages(promise: Promise) {
    currentActivity?.let {
      NativeRD.getPushMessages(it, object : PushMessageInterface {
        override fun success(pushMessages: List<Message>) {
          val pushMessagesArray = pushMessages.toWritableArray()
          promise.resolve(pushMessagesArray)
        }
        override fun fail(errorMessage: String) {
          promise.resolve(Arguments.createArray())
        }
      })
    } ?: run {
      promise.resolve(Arguments.createArray())
    }
  }

  @ReactMethod
  fun getPushMessagesWithId(promise: Promise) {
    currentActivity?.let {
      NativeRD.getPushMessagesWithID(it, object : PushMessageInterface {
        override fun success(pushMessages: List<Message>) {
          val pushMessagesArray = pushMessages.toWritableArray()
          promise.resolve(pushMessagesArray)
        }
        override fun fail(errorMessage: String) {
          promise.resolve(Arguments.createArray())
        }
      })
    } ?: run {
      promise.resolve(Arguments.createArray())
    }
  }

  @ReactMethod
  fun getToken(promise: Promise) {
    val token = NativeRD.getToken(reactApplicationContext)
    promise.resolve(token)
  }

  @ReactMethod
  fun getUser(promise: Promise) {
    promise.resolve(reactApplicationContext.getUser())
  }

  @ReactMethod
  fun requestIDFA() {
    Log.d(LOG_TAG, "requestIDFA ios only.")
  }

  @ReactMethod
  fun sendLocationPermission() {
    NativeRD.sendLocationPermission(reactApplicationContext)
  }

  @ReactMethod
  fun requestLocationPermissions() {
    currentActivity?.let {
      NativeRD.requestLocationPermission(it)
    }
  }

  @ReactMethod
  fun sendTheListOfAppsInstalled() {
    NativeRD.sendTheListOfAppsInstalled(reactApplicationContext)
  }

  @ReactMethod
  fun recommend() {
    //TODO: implement
    //NativeRD.getRecommendations(reactApplicationContext)
  }

  @ReactMethod
  fun trackRecommendationClick() {
    //TODO: implement
    NativeRD.trackRecommendationClick(reactApplicationContext, "TODO:")
  }

  @ReactMethod
  fun getFavoriteAttributeActions() {
    //TODO: implement
    //NativeRD.getFavoriteAttributeActions(reactApplicationContext)
  }


  private var listenerCount = 0

  @ReactMethod
  fun addListener(eventName: String) {
    if (listenerCount == 0) {
      Log.d(LOG_TAG, "addListener")
      // Set up any upstream listeners or background tasks as necessary
    }

    listenerCount += 1
  }

  @ReactMethod
  fun removeListeners(count: Int) {
    listenerCount -= count
    if (listenerCount == 0) {
      Log.d(LOG_TAG, "removeListeners")
      // Remove upstream listeners, stop unnecessary background tasks
    }
  }

  //requestLocationPermissions
  //sendTheListOfAppsInstalled
  //recommend
  //trackRecommendationClick
  //getFavoriteAttributeActions




  @ReactMethod
  fun registerNotificationListeners() {
    Log.d(LOG_TAG, "registerNotificationListeners")
    val filter = IntentFilter()
    filter.addAction(Constants.PUSH_REGISTER_EVENT)
    filter.addAction(Constants.PUSH_RECEIVE_EVENT)
    val notifReceiver = RDNotificationReceiver(reactApplicationContext)
    reactApplicationContext.currentActivity?.registerReceiver(notifReceiver, filter)
  }

  companion object {
    const val NAME = "RDReactModule"
    private const val LOG_TAG: String = "RDReactModule"
  }
}
