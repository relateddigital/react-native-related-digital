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
  fun gg() {
    RelatedDigital.logout(reactApplicationContext)
  }

  @ReactMethod
  fun hh() {
    RelatedDigital.logout(reactApplicationContext)
  }

  @ReactMethod
  fun sdf() {
    RelatedDigital.logout(reactApplicationContext)
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

  fun registerEmail(email: String, permission: Boolean, isCommercial: Boolean, promise: Promise) {
    RelatedDigital.registerEmail(
      reactApplicationContext,
      email,
      if (permission) EmailPermit.ACTIVE else EmailPermit.PASSIVE,
      isCommercial,
      object : EuromessageCallback {
        override fun success() {
          promise.resolve(true)
        }

        override fun fail(errorMessage: String?) {
          val message = errorMessage ?: ""
          Log.e("ERROR", message)
          promise.reject(Exception(message))
        }
      }
    )
  }

  fun getPushMessages(promise: Promise) {
    if (currentActivity != null) {
      RelatedDigital.getPushMessages(
        currentActivity!!,
        object : PushMessageInterface {
          override fun success(pushMessages: List<Message>) {
            val map: HashMap<String, List<Message>> = HashMap()
            map["pushMessages"] = pushMessages
            val gson = Gson()
            promise.resolve(gson.toJson(map))
          }

          override fun fail(errorMessage: String) {
            val message = errorMessage ?: ""
            Log.e("ERROR", message)
            promise.reject(Exception(message))
          }
        }
      )
    } else {
      val message = "currentActivity is null"
      Log.e("ERROR", message)
      promise.reject(Exception(message))
    }
  }

  /*
    fun getPushMessagesWithID(result: MethodChannel.Result) {
      RelatedDigital
        .getPushMessagesWithID(mActivity, object : PushMessageInterface {
          override fun success(pushMessages: List<Message>) {
            val map: HashMap<String, List<Message>> = HashMap()
            map["pushMessages"] = pushMessages
            val gson = Gson()
            result.success(gson.toJson(map))
          }

          override fun fail(errorMessage: String) {
            result.error("ERROR", errorMessage, null)
          }
        })
    }

    fun sendLocationPermission() {
      try {
        RelatedDigital.sendLocationPermission(mContext)
      } catch (ex: Exception) {
        ex.printStackTrace()
      }
    }

    fun getFavoriteAttributeActions(actionId: String?, result: MethodChannel.Result) {
      try {
        RelatedDigital.getFavorites(mContext, actionId)


        val visilabsActionRequest: VisilabsActionRequest
        visilabsActionRequest = if (actionId != null && !actionId.isEmpty()) {
          Visilabs.CallAPI().requestActionId(actionId)
        } else {
          Visilabs.CallAPI().requestActionId(VisilabsConstant.FavoriteAttributeAction)
        }
        visilabsActionRequest.executeAsyncAction(object : VisilabsCallback() {
          @Override
          fun success(response: VisilabsResponse) {
            val gson = Gson()
            val favsResponse: FavsResponse =
              gson.fromJson(response.getRawResponse(), FavsResponse::class.java)
            if (favsResponse.getFavoriteAttributeAction().size() > 0) {
              val favs: Favorites =
                favsResponse.getFavoriteAttributeAction().get(0).getActiondata()
                  .getFavorites()
              result.success(gson.toJson(favs))
            } else {
              result.success(null)
            }
          }

          @Override
          fun fail(response: VisilabsResponse?) {
            result.success(null)
          }
        })
      } catch (e: Exception) {
        result.error("ERROR", e.getMessage(), null)
      }
    }

  */

  companion object {
    const val NAME = "RelatedDigital"
  }
}

/*
FLUTTER

package com.relateddigital.flutter

import android.app.Activity
import android.content.Context
import android.content.Intent
import androidx.annotation.NonNull
import java.util.ArrayList
import java.util.HashMap
import io.flutter.embedding.engine.plugins.FlutterPlugin
import io.flutter.embedding.engine.plugins.activity.ActivityAware
import io.flutter.embedding.engine.plugins.activity.ActivityPluginBinding
import io.flutter.plugin.common.MethodCall
import io.flutter.plugin.common.MethodChannel
import io.flutter.plugin.common.MethodChannel.MethodCallHandler
import io.flutter.plugin.common.MethodChannel.Result


import com.relateddigital.relateddigital_android.RelatedDigital

class RelatedDigitalPlugin : FlutterPlugin, MethodCallHandler, ActivityAware {

    private lateinit var channel: MethodChannel
    private lateinit var appContext: Context
    private lateinit var appActivity: Activity
    private lateinit var functionHandler: RDFunctionHandler


    override fun onAttachedToEngine(binding: FlutterPlugin.FlutterPluginBinding) {
        channel = MethodChannel(binding.binaryMessenger, Constants.channelName)
        channel.setMethodCallHandler(this)
        binding.platformViewRegistry.registerViewFactory(
            Constants.storyView, RDStoryViewFactory(binding.binaryMessenger, channel)
        )
    }

    override fun onMethodCall(call: MethodCall, result: Result) {
        try {
            if (call.method.equals(Constants.initialize)) {
                val organizationId: String? = call.argument(Constants.organizationId)
                val profileId: String? = call.argument(Constants.profileId)
                val dataSource: String? = call.argument(Constants.dataSource)
                if (organizationId != null && profileId != null && dataSource != null) {
                    functionHandler.initRD(organizationId, profileId, dataSource)
                    functionHandler.checkReportRead(appActivity.getIntent())
                }
                result.success(null)
            } else if (call.method.equals(Constants.setIsInAppNotificationEnabled)) {
                val isInAppNotificationEnabled: Boolean? = call.argument(Constants.isInAppNotificationEnabled)
                if(isInAppNotificationEnabled != null) {
                    functionHandler.setIsInAppNotificationEnabled(isInAppNotificationEnabled)
                }
                result.success(null)
            } else if (call.method.equals(Constants.setIsGeofenceEnabled)) {
                val isGeofenceEnabled: Boolean? = call.argument(Constants.isGeofenceEnabled)
                if(isGeofenceEnabled != null) {
                    functionHandler.setIsGeofenceEnabled(isGeofenceEnabled)
                }
                result.success(null)
            } else if(call.method.equals(Constants.setAdvertisingIdentifier)) {
                val advertisingIdentifier: String? = call.argument(Constants.advertisingIdentifier)
                if(advertisingIdentifier != null) {
                    functionHandler.setAdvertisingIdentifier(advertisingIdentifier)
                }
                result.success(null)
            }














            else if (call.method.equals(Constants.M_PERMISSION)) {
                functionHandler.getToken()
                result.success(null)
            } else if (call.method.equals(Constants.M_EURO_USER_ID)) {
                val userId: String = call.argument("userId")
                functionHandler.setEuroUserId(userId)
                result.success(null)
            } else if (call.method.equals(Constants.M_SET_EMAIL)) {
                val email: String = call.argument("email")
                functionHandler.setEmail(email)
                result.success(null)
            } else if (call.method.equals(Constants.M_EMAIL_WITH_PERMISSION)) {
                val email: String = call.argument("email")
                val permission: Boolean = call.argument("permission")
                functionHandler.setEmailWithPermission(email, permission)
                result.success(null)
            } else if (call.method.equals(Constants.M_USER_PROPERTY)) {
                val key: String = call.argument("key")
                val value: String = call.argument("value")
                functionHandler.setUserProperty(key, value)
                result.success(null)
            } else if (call.method.equals(Constants.M_REMOVE_USER_PROPERTY)) {
                val key: String = call.argument("key")
                functionHandler.removeUserProperty(key)
                result.success(null)
            } else if (call.method.equals(Constants.M_APP_VERSION)) {
                val appVersion: String = call.argument("appVersion")
                functionHandler.setAppVersion(appVersion)
                result.success(null)
            } else if (call.method.equals(Constants.M_NOTIFICATION_PERMISSION)) {
                val permission: Boolean = call.argument("permission")
                functionHandler.setPushNotificationPermission(permission)
                result.success(null)
            } else if (call.method.equals(Constants.M_EMAIL_PERMISSION)) {
                result.notImplemented()
            } else if (call.method.equals(Constants.M_PHONE_PERMISSION)) {
                val permission: Boolean = call.argument("permission")
                functionHandler.setPhonePermission(permission)
                result.success(null)
            } else if (call.method.equals(Constants.M_BADGE)) {
                result.notImplemented()
            } else if (call.method.equals(Constants.M_ADVERTISING)) {
                result.notImplemented()
            } else if (call.method.equals(Constants.M_TWITTER)) {
                val twitterId: String = call.argument("twitterId")
                functionHandler.setTwitterId(twitterId)
                result.success(null)
            } else if (call.method.equals(Constants.M_FACEBOOK)) {
                val facebookId: String = call.argument("facebookId")
                functionHandler.setFacebookId(facebookId)
                result.success(null)
            } else if (call.method.equals(Constants.M_CUSTOM_EVENT)) {
                val pageName: String = call.argument("pageName")
                val parameters: HashMap<String, String> = call.argument("parameters")
                functionHandler.customEvent(pageName, parameters)
                result.success(null)
            } else if (call.method.equals(Constants.M_REGISTER_EMAIL)) {
                val email: String = call.argument("email")
                val permission: Boolean = call.argument("permission")
                val isCommercial: Boolean = call.argument("isCommercial")
                functionHandler.registerEmail(email, permission, isCommercial, result)
            } else if (call.method.equals(Constants.M_RECOMMENDATIONS)) {
                val zoneId: String = call.argument("zoneId")
                val productCode: String = call.argument("productCode")
                val filters: ArrayList<HashMap<String, Object>> = call.argument("filters")
                functionHandler.getRecommendations(zoneId, productCode, filters, result)
            } else if (call.method.equals(Constants.M_STORY_CLEAR_CACHE)) {
                functionHandler.clearStoryCache()
            } else if (call.method.equals(Constants.M_FAV_ATTRIBUTE)) {
                val actionId: String = call.argument("actionId")
                functionHandler.getFavoriteAttributeActions(actionId, result)
            } else if (call.method.equals(Constants.M_LOGOUT)) {
                functionHandler.logout()
                result.success(null)
            } else if (call.method.equals(Constants.M_LOGIN)) {
                val exVisitorId: String = call.argument("exVisitorId")
                val properties: HashMap<String, String> = call.argument("properties")
                functionHandler.login(exVisitorId, properties)
            } else if (call.method.equals(Constants.M_SIGNUP)) {
                val exVisitorId: String = call.argument("exVisitorId")
                val properties: HashMap<String, String> = call.argument("properties")
                functionHandler.signUp(exVisitorId, properties)
            } else if (call.method.equals(Constants.M_GET_EXVISITORID)) {
                val exVisitorID: String = functionHandler.getExVisitorID()
                result.success(exVisitorID)
            } else if (call.method.equals(Constants.M_APP_TRACKER)) {
                functionHandler.sendTheListOfAppsInstalled()
                result.success(null)
            } else if (call.method.equals(Constants.M_GET_PUSH_MESSAGES)) {
                functionHandler.getPushMessages(result)
            } else if (call.method.equals(Constants.M_SEND_LOCATION_PERMISSION)) {
                functionHandler.sendLocationPermission()
                result.success(null)
            } else {
                result.notImplemented()
            }
        } catch (ex: Exception) {
            ex.printStackTrace()
        }
    }

    @Override
    fun onDetachedFromEngine(@NonNull binding: FlutterPluginBinding?) {
        channel.setMethodCallHandler(null)
    }

    @Override
    fun onNewIntent(intent: Intent?): Boolean {
        return functionHandler.checkReportRead(intent)
    }

    @Override
    fun onAttachedToActivity(@NonNull binding: ActivityPluginBinding) {
        binding.addOnNewIntentListener(this)
        mActivity = binding.activity
        functionHandler = RDFunctionHandler(mActivity, channel)
    }

    @Override
    fun onDetachedFromActivityForConfigChanges() {
        mActivity = null
    }

    @Override
    fun onReattachedToActivityForConfigChanges(@NonNull binding: ActivityPluginBinding) {
        binding.addOnNewIntentListener(this)
        mActivity = binding.activity
        functionHandler = RDFunctionHandler(mActivity, channel)
    }

    @Override
    fun onDetachedFromActivity() {
        mActivity = null
    }
}
 */
