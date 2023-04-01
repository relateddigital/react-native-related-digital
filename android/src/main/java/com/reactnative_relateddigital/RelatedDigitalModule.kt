package com.reactnative_relateddigital

import android.util.Log
import com.facebook.react.bridge.*
import com.google.gson.Gson
import com.reactnative_relateddigital.MapUtil.stringStringMap
import com.relateddigital.relateddigital_google.RelatedDigital
import com.relateddigital.relateddigital_google.model.EmailPermit
import com.relateddigital.relateddigital_google.model.GsmPermit
import com.relateddigital.relateddigital_google.model.Message
import com.relateddigital.relateddigital_google.push.EuromessageCallback
import com.relateddigital.relateddigital_google.push.PushMessageInterface

class RelatedDigitalModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String {
    return "RelatedDigital"
  }

  @ReactMethod
  fun multiply(a: Double, b: Double, promise: Promise) {
    promise.resolve(a * b)
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
      currentActivity
    )
  }

  @ReactMethod
  fun login(exVisitorId: String, properties: ReadableMap) {
    RelatedDigital.login(
      reactApplicationContext,
      exVisitorId,
      stringStringMap(properties),
      currentActivity
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
      currentActivity
    )
  }

  @ReactMethod
  fun setIsPushNotificationEnabled(
    isPushNotificationEnabled: Boolean,
    appAlias: String,
    deliveredBadge: Boolean
  ) {
    RelatedDigital.setGoogleAppAlias(reactApplicationContext, appAlias)
    val token = RelatedDigital.getToken(reactApplicationContext)
    RelatedDigital.setIsPushNotificationEnabled(
      reactApplicationContext,
      isPushNotificationEnabled,
      appAlias,
      token
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
        override fun success(messages: List<Message>) {
          val gson = Gson()
          val json = gson.toJson(messages)
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


  companion object {
    const val NAME = "RelatedDigital"
  }
}
