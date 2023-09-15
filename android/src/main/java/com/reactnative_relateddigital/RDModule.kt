package com.reactnative_relateddigital

import android.content.Intent
import android.content.IntentFilter
import android.os.Bundle
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
import com.facebook.react.bridge.WritableNativeArray
import com.facebook.react.bridge.WritableNativeMap
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


//sendPushNotificationOpenReport

class RDModule internal constructor(reactContext: ReactApplicationContext) :
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
  fun setIsInAppNotificationEnabled(enabled: Boolean) {
    RelatedDigital.setIsInAppNotificationEnabled(
      reactApplicationContext, enabled
    )
  }

  @ReactMethod
  fun setIsGeofenceEnabled(enabled: Boolean) {
    RelatedDigital.setIsGeofenceEnabled(reactApplicationContext, enabled)
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
    RelatedDigital.setGoogleAppAlias(reactApplicationContext, googleAppAlias)
    RelatedDigital.setHuaweiAppAlias(reactApplicationContext, huaweiAppAlias)
    val token = RelatedDigital.getToken(reactApplicationContext)
    RelatedDigital.setIsPushNotificationEnabled(
      reactApplicationContext,
      enabled,
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
    RelatedDigital.registerEmail(reactApplicationContext,
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
      RelatedDigital.getPushMessages(it, object : PushMessageInterface {
        override fun success(pushMessages: List<Message>) {

          val messagesArray = Arguments.createArray()

          for (pushMessage in pushMessages) {
            val messageMap: WritableMap = WritableNativeMap()
            messageMap.putString("title", pushMessage.title)
            messageMap.putString("body", pushMessage.message)
            messageMap.putString("message", pushMessage.message)
            messageMap.putString("formattedDateString", pushMessage.date)
            messageMap.putMap("aps",  WritableNativeMap())
            messageMap.putString("altUrl", pushMessage.altUrl)
            messageMap.putString("cid", pushMessage.campaignId)
            messageMap.putString("url", pushMessage.url)
            messageMap.putString("pushType", pushMessage.getPushType()?.name)
            messageMap.putString("mediaUrl", pushMessage.mediaUrl)
            messageMap.putString("deeplink", pushMessage.url)
            messageMap.putString("emPushSp", pushMessage.emPushSp)
            //TODO: change elements props
            val elementsArray: WritableNativeArray = WritableNativeArray()
            pushMessage.getElements()?.forEach { element ->
            }
            messageMap.putArray("elements", elementsArray)
            //TODO: change buttons props
            val buttonsArray: WritableNativeArray = WritableNativeArray()
            //pushMessage().buttons?.forEach { button ->
            //}
            messageMap.putArray("buttons", elementsArray)
            //TODO: change utm params
            //messageMap.putString("utm_source", pushMessage)
            //messageMap.putString("utm_campaign", pushMessage)
            //messageMap.putString("utm_medium", pushMessage)
            //messageMap.putString("utm_content", pushMessage)
            //messageMap.putString("utm_term", pushMessage)
            //messageMap.putString("notificationLoginID", pushMessage.loginID)
            //messageMap.putString("status", pushMessage.status)
            messageMap.putString("deliver", pushMessage.deliver)
            messageMap.putString("silent", pushMessage.silent)
            //TODO: change extras
            //messageMap.putMap("extras", extrasMap)
            messagesArray.pushMap(messageMap)
          }
          promise.resolve(messagesArray)
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
      RelatedDigital.getPushMessagesWithID(it, object : PushMessageInterface {
        override fun success(pushMessages: List<Message>) {

          val messagesArray = Arguments.createArray()

          for (pushMessage in pushMessages) {
            val messageMap: WritableMap = WritableNativeMap()
            messageMap.putString("title", pushMessage.title)
            messageMap.putString("body", pushMessage.message)
            messageMap.putString("message", pushMessage.message)
            messageMap.putString("formattedDateString", pushMessage.date)
            messageMap.putMap("aps",  WritableNativeMap())
            messageMap.putString("altUrl", pushMessage.altUrl)
            messageMap.putString("cid", pushMessage.campaignId)
            messageMap.putString("url", pushMessage.url)
            messageMap.putString("pushType", pushMessage.getPushType()?.name)
            messageMap.putString("mediaUrl", pushMessage.mediaUrl)
            messageMap.putString("deeplink", pushMessage.url)
            messageMap.putString("emPushSp", pushMessage.emPushSp)
            //TODO: change elements props
            val elementsArray: WritableNativeArray = WritableNativeArray()
            pushMessage.getElements()?.forEach { element ->
            }
            messageMap.putArray("elements", elementsArray)
            //TODO: change buttons props
            val buttonsArray: WritableNativeArray = WritableNativeArray()
            //pushMessage().buttons?.forEach { button ->
            //}
            messageMap.putArray("buttons", elementsArray)
            //TODO: change utm params
            //messageMap.putString("utm_source", pushMessage)
            //messageMap.putString("utm_campaign", pushMessage)
            //messageMap.putString("utm_medium", pushMessage)
            //messageMap.putString("utm_content", pushMessage)
            //messageMap.putString("utm_term", pushMessage)
            //messageMap.putString("notificationLoginID", pushMessage.loginID)
            //messageMap.putString("status", pushMessage.status)
            messageMap.putString("deliver", pushMessage.deliver)
            messageMap.putString("silent", pushMessage.silent)
            //TODO: change extras
            //messageMap.putMap("extras", extrasMap)
            messagesArray.pushMap(messageMap)
          }
          promise.resolve(messagesArray)
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
    val token = RelatedDigital.getToken(reactApplicationContext)
    promise.resolve(token)
  }


  @ReactMethod
  fun getUser(promise: Promise) {
    val cookieId = RelatedDigital.getCookieId(reactApplicationContext)
    val exVisitorId = RelatedDigital.getExVisitorId(reactApplicationContext)
    val tokenId = RelatedDigital.getToken(reactApplicationContext)
    //TODO: google vs huawei
    val appId = RelatedDigital.getGoogleAppAlias(reactApplicationContext)
    val visitorData = RelatedDigital.getVisitorData(reactApplicationContext)
    val userAgent = RelatedDigital.getUserAgent(reactApplicationContext)
    val identifierForAdvertising = RelatedDigital.getAdvertisingIdentifier(reactApplicationContext)
    val sdkVersion = RelatedDigital.getSdkVersion(reactApplicationContext)
    val appVersion = RelatedDigital.getAppVersion(reactApplicationContext)
    val userMap: WritableMap = WritableNativeMap()
    userMap.putString("cookieId", cookieId)
    userMap.putString("exVisitorId", exVisitorId)
    userMap.putString("tokenId", tokenId)
    userMap.putString("appId", appId)
    userMap.putString("visitData", "")
    userMap.putString("visitorData", visitorData)
    userMap.putString("userAgent", userAgent)
    userMap.putString("identifierForAdvertising", identifierForAdvertising)
    userMap.putString("sdkVersion", sdkVersion)
    userMap.putString("sdkType", "react-native")
    userMap.putString("appVersion", appVersion)
    promise.resolve(userMap)
  }

  @ReactMethod
  fun requestIDFA() {
    Log.d(LOG_TAG, "requestIDFA ios only.")
  }

  @ReactMethod
  fun sendLocationPermission() {
    RelatedDigital.sendLocationPermission(reactApplicationContext)
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
    const val NAME = "RelatedDigital"
    private const val LOG_TAG: String = "RelatedDigitalModule"
  }
}
