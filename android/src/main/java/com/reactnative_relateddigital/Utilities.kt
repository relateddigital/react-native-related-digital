package com.reactnative_relateddigital

import java.util.*
import android.os.Build
import android.os.Bundle
import android.util.Log
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import com.google.gson.Gson
import com.relateddigital.relateddigital_android.RelatedDigital
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject
import com.relateddigital.relateddigital_android.model.Message
import com.relateddigital.relateddigital_android.util.GoogleUtils
import com.relateddigital.relateddigital_android.inapp.VisilabsResponse
import com.relateddigital.relateddigital_android.model.FavsResponse


const val KEY_WIDGET_TITLE = "widgetTitle"
const val KEY_PRODUCTS = "products"
const val KEY_FAVORITES = "favorites"
const val KEY_AGE_GROUP = "ageGroup"
const val KEY_ATTR1 = "attr1"
const val KEY_ATTR2 = "attr2"
const val KEY_ATTR3 = "attr3"
const val KEY_ATTR4 = "attr4"
const val KEY_ATTR5 = "attr5"
const val KEY_ATTR6 = "attr6"
const val KEY_ATTR7 = "attr7"
const val KEY_ATTR8 = "attr8"
const val KEY_ATTR9 = "attr9"
const val KEY_ATTR10 = "attr10"
const val KEY_BRAND = "brand"
const val KEY_CATEGORY = "category"
const val KEY_COLOR = "color"
const val KEY_GENDER = "gender"
const val KEY_MATERIAL = "material"
const val KEY_TITLE = "title"


fun VisilabsResponse?.toFavoritesWritableMap(): WritableMap {
  val map: WritableMap = WritableNativeMap()
  val favoritesMap = WritableNativeMap()
  map.putMap(KEY_FAVORITES, favoritesMap)
  this?.rawResponse?.let { rawResponse ->
    try {
      val favsResponse: FavsResponse = Gson().fromJson(rawResponse, FavsResponse::class.java)
      favsResponse.favoriteAttributeAction?.get(0)?.actiondata?.favorites?.let { favorites ->
        favoritesMap.putList(KEY_AGE_GROUP, favorites.ageGroup?.toList())
        favoritesMap.putList(KEY_ATTR1, favorites.attr1?.toList())
        favoritesMap.putList(KEY_ATTR2, favorites.attr2?.toList())
        favoritesMap.putList(KEY_ATTR3, favorites.attr3?.toList())
        favoritesMap.putList(KEY_ATTR4, favorites.attr4?.toList())
        favoritesMap.putList(KEY_ATTR5, favorites.attr5?.toList())
        favoritesMap.putList(KEY_ATTR6, favorites.attr6?.toList())
        favoritesMap.putList(KEY_ATTR7, favorites.attr7?.toList())
        favoritesMap.putList(KEY_ATTR8, favorites.attr8?.toList())
        favoritesMap.putList(KEY_ATTR9, favorites.attr9?.toList())
        favoritesMap.putList(KEY_ATTR10, favorites.attr10?.toList())
        favoritesMap.putList(KEY_BRAND, favorites.brand?.toList())
        favoritesMap.putList(KEY_CATEGORY, favorites.category?.toList())
        favoritesMap.putList(KEY_COLOR, favorites.color?.toList())
        favoritesMap.putList(KEY_GENDER, favorites.gender?.toList())
        favoritesMap.putList(KEY_MATERIAL, favorites.material?.toList())
        favoritesMap.putList(KEY_TITLE, favorites.title?.toList())
      }
    } catch (e: JSONException) {
      Log.e("VisilabsResponse", "Error while parsing VisilabsResponse to WritableMap", e)
    }
  }
  map.putMap(KEY_FAVORITES, favoritesMap)
  return map
}

fun WritableNativeMap.putList(key: String, list: List<String?>?) {
  list?.let {
    val array = WritableNativeArray().apply {
      it.forEach { item ->
        if (item != null) {
          pushString(item)
        }
      }
    }
    putArray(key, array)
  } ?: putArray(key, WritableNativeArray())
}


fun VisilabsResponse?.toRecommendationsWritableMap(): WritableMap {
  val map: WritableMap = WritableNativeMap()
  map.putString(KEY_WIDGET_TITLE, "")
  map.putArray(KEY_PRODUCTS, WritableNativeArray())
  this?.json?.let { jsonObject ->
    try {
      map.putString(KEY_WIDGET_TITLE, jsonObject.optString("title", ""))
      val recommendationsArray = jsonObject.optJSONArray("recommendations") ?: JSONArray()
      val productsArray = WritableNativeArray()
      for (i in 0 until recommendationsArray.length()) {
        val currentProductObject = recommendationsArray.optJSONObject(i) ?: continue
        productsArray.pushMap(currentProductObject.toWritableMap())
      }
      map.putArray(KEY_PRODUCTS, productsArray)
    } catch (e: JSONException) {
      Log.e("VisilabsResponse", "Error while parsing VisilabsResponse to WritableMap", e)
    }
  }
  return map
}

fun JSONObject.toWritableMap(): WritableMap {
  return WritableNativeMap().apply {
    putString("code", optString("code", ""))
    putString("title", optString("title", ""))
    putString("img", optString("img", ""))
    putString("destUrl", optString("dest_url", ""))
    putString("brand", optString("brand", ""))
    putDouble("price", optDouble("price", 0.0))
    putDouble("dprice", optDouble("dprice", 0.0))
    putString("cur", optString("cur", ""))
    putString("dcur", optString("dcur", ""))
    putBoolean("freeshipping", optBoolean("freeshipping"))
    putBoolean("samedayshipping", optBoolean("samedayshipping"))
    putInt("rating", optInt("rating", 0))
    putInt("comment", optInt("comment", 0))
    putDouble("discount", optDouble("discount", 0.0))
    putString("attr1", optString("attr1", ""))
    putString("attr2", optString("attr2", ""))
    putString("attr3", optString("attr3", ""))
    putString("attr4", optString("attr4", ""))
    putString("attr5", optString("attr5", ""))
    putString("attr6", optString("attr6", ""))
    putString("attr7", optString("attr7", ""))
    putString("attr8", optString("attr8", ""))
    putString("attr9", optString("attr9", ""))
    putString("attr10", optString("attr10", ""))
    putString("qs", optString("qs", ""))
  }
}

fun List<Message>.toWritableArray(): WritableArray {
  val messagesArray = Arguments.createArray()

  this.forEach { pushMessage ->
    val messageMap: WritableMap = WritableNativeMap()
    messageMap.putString("title", pushMessage.title)
    messageMap.putString("body", pushMessage.message)
    messageMap.putString("message", pushMessage.message)
    messageMap.putString("formattedDateString", pushMessage.date)
    messageMap.putMap("aps", WritableNativeMap())
    messageMap.putString("altUrl", pushMessage.altUrl)
    messageMap.putString("cid", pushMessage.campaignId)
    messageMap.putString("url", pushMessage.url)
    messageMap.putString("pushType", pushMessage.getPushType()?.name)
    messageMap.putString("mediaUrl", pushMessage.mediaUrl)
    messageMap.putString("deeplink", pushMessage.url)
    messageMap.putString("emPushSp", pushMessage.emPushSp)
    val elementsArray = WritableNativeArray()
    pushMessage.getElements()?.forEach { element ->
      elementsArray.pushMap(WritableNativeMap().apply {
        putString("title", element.title)
        putString("content", element.content)
        putString("url", element.url)
        putString("picture", element.picture)
      })

    }
    messageMap.putArray("elements", elementsArray)
    //TODO: change buttons props
    val buttonsArray = WritableNativeArray()
    //pushMessage().buttons?.forEach { button ->
    //}
    messageMap.putArray("buttons", buttonsArray)
    //TODO: change utm params
    pushMessage.getParams().forEach { (key, value) ->
      when (key) {
        "utm_source" -> {
          messageMap.putString("utm_source", value)
        }

        "utm_campaign" -> {
          messageMap.putString("utm_campaign", value)
        }

        "utm_medium" -> {
          messageMap.putString("utm_medium", value)
        }

        "utm_content" -> {
          messageMap.putString("utm_content", value)
        }

        "utm_term" -> {
          messageMap.putString("utm_term", value)
        }
      }
    }
    //TODO: update status props
    //messageMap.putString("status", pushMessage.status)
    messageMap.putString("deliver", pushMessage.deliver)
    messageMap.putString("silent", pushMessage.silent)
    messagesArray.pushMap(messageMap)
  }

  return messagesArray
}

fun ReactApplicationContext.retrieveAppId(): String {
  return if (GoogleUtils.checkPlayService(this)) {
    RelatedDigital.getGoogleAppAlias(this)
  } else {
    RelatedDigital.getHuaweiAppAlias(this)
  }
}

fun ReactApplicationContext.getUser(): WritableMap {
  val userMap: WritableMap = WritableNativeMap()
  userMap.putString("cookieId", RelatedDigital.getCookieId(this))
  userMap.putString("exVisitorId", RelatedDigital.getExVisitorId(this))
  userMap.putString("tokenId", RelatedDigital.getToken(this))
  userMap.putString("appId", this.retrieveAppId())
  userMap.putString("visitData", "")
  userMap.putString("visitorData", RelatedDigital.getVisitorData(this))
  userMap.putString("userAgent", RelatedDigital.getUserAgent(this))
  userMap.putString("identifierForAdvertising", RelatedDigital.getAdvertisingIdentifier(this))
  userMap.putString("sdkVersion", RelatedDigital.getSdkVersion(this))
  userMap.putString("sdkType", "react-native")
  userMap.putString("appVersion", RelatedDigital.getAppVersion(this))
  return userMap
}


inline fun <reified T : java.io.Serializable> Bundle.serializable(key: String): T? = when {
  Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU -> getSerializable(key, T::class.java)
  else -> @Suppress("DEPRECATION") getSerializable(key) as? T
}

/*
inline fun <reified T : java.io.Serializable> Intent.serializable(key: String): T? = when {
  Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU -> getSerializableExtra(key, T::class.java)
  else -> @Suppress("DEPRECATION") getSerializableExtra(key) as? T
}
*/

object ArrayUtil {
  @Throws(JSONException::class)
  fun toJSONArray(readableArray: ReadableArray?): JSONArray {
    val jsonArray = JSONArray()
    for (i in 0 until readableArray!!.size()) {
      when (readableArray.getType(i)) {
        ReadableType.Null -> jsonArray.put(i, null)
        ReadableType.Boolean -> jsonArray.put(i, readableArray.getBoolean(i))
        ReadableType.Number -> jsonArray.put(i, readableArray.getDouble(i))
        ReadableType.String -> jsonArray.put(i, readableArray.getString(i))
        ReadableType.Map -> jsonArray.put(i, MapUtil.toJSONObject(readableArray.getMap(i)))
        ReadableType.Array -> jsonArray.put(i, toJSONArray(readableArray.getArray(i)))
      }
    }
    return jsonArray
  }

  @Throws(JSONException::class)
  fun toArray(jsonArray: JSONArray): Array<Any?> {
    val array = arrayOfNulls<Any>(jsonArray.length())
    for (i in 0 until jsonArray.length()) {
      var value = jsonArray[i]
      if (value is JSONObject) {
        value = MapUtil.toMap(value)
      }
      if (value is JSONArray) {
        value = toArray(value)
      }
      array[i] = value
    }
    return array
  }

  fun toArray(readableArray: ReadableArray?): Array<Any?> {
    val array = arrayOfNulls<Any>(readableArray!!.size())
    for (i in 0 until readableArray.size()) {
      when (readableArray.getType(i)) {
        ReadableType.Null -> array[i] = null
        ReadableType.Boolean -> array[i] = readableArray.getBoolean(i)
        ReadableType.Number -> array[i] = readableArray.getDouble(i)
        ReadableType.String -> array[i] = readableArray.getString(i)
        ReadableType.Map -> array[i] = MapUtil.toMap(readableArray.getMap(i))
        ReadableType.Array -> array[i] = toArray(readableArray.getArray(i))
      }
    }
    return array
  }
}

object MapUtil {

  fun stringStringMap(readableMap: ReadableMap?): HashMap<String, String> {
    val stringMap: HashMap<String, String> = HashMap()
    if (readableMap != null) {
      val iterator = readableMap.keySetIterator()
      while (iterator.hasNextKey()) {
        val key = iterator.nextKey()
        val value = readableMap.getString(key)
        if (key.isNotEmpty() && value != null) {
          stringMap[key] = value
        }
      }
    }
    return stringMap
  }

  @Throws(JSONException::class)
  fun toJSONObject(readableMap: ReadableMap?): JSONObject {
    val jsonObject = JSONObject()
    val iterator = readableMap!!.keySetIterator()
    while (iterator.hasNextKey()) {
      val key = iterator.nextKey()
      when (readableMap.getType(key)) {
        ReadableType.Null -> jsonObject.put(key, null)
        ReadableType.Boolean -> jsonObject.put(key, readableMap.getBoolean(key))
        ReadableType.Number -> jsonObject.put(key, readableMap.getDouble(key))
        ReadableType.String -> jsonObject.put(key, readableMap.getString(key))
        ReadableType.Map -> jsonObject.put(key, toJSONObject(readableMap.getMap(key)))
        ReadableType.Array ->
          jsonObject.put(key, ArrayUtil.toJSONArray(readableMap.getArray(key)))
      }
    }
    return jsonObject
  }

  @Throws(JSONException::class)
  fun toMap(jsonObject: JSONObject): Map<String, Any> {
    val map: MutableMap<String, Any> = HashMap()
    val iterator = jsonObject.keys()
    while (iterator.hasNext()) {
      val key = iterator.next()
      var value = jsonObject[key]
      if (value is JSONObject) {
        value = toMap(value)
      }
      if (value is JSONArray) {
        value = ArrayUtil.toArray(value)
      }
      map[key] = value
    }
    return map
  }

  fun toMap(readableMap: ReadableMap?): Map<String, Any?> {
    val map: MutableMap<String, Any?> = HashMap()
    val iterator = readableMap!!.keySetIterator()
    while (iterator.hasNextKey()) {
      val key = iterator.nextKey()
      when (readableMap.getType(key)) {
        ReadableType.Null -> map[key] = null
        ReadableType.Boolean -> map[key] = readableMap.getBoolean(key)
        ReadableType.Number -> map[key] = readableMap.getDouble(key)
        ReadableType.String -> map[key] = readableMap.getString(key)
        ReadableType.Map -> map[key] = toMap(readableMap.getMap(key))
        ReadableType.Array -> map[key] = ArrayUtil.toArray(readableMap.getArray(key))
      }
    }
    return map
  }

  @Throws(JSONException::class)
  fun convertJsonToMap(jsonObject: JSONObject): WritableMap {
    val map: WritableMap = WritableNativeMap()
    val iterator = jsonObject.keys()
    while (iterator.hasNext()) {
      val key = iterator.next()
      val value = jsonObject[key]
      if (value is JSONObject) {
        map.putMap(key, convertJsonToMap(value))
      } else if (value is JSONArray) {
        map.putArray(key, convertJsonToArray(value))
        if ("option_values" == key) {
          map.putArray("options", convertJsonToArray(value))
        }
      } else if (value is Boolean) {
        map.putBoolean(key, value)
      } else if (value is Int) {
        map.putInt(key, value)
      } else if (value is Double) {
        map.putDouble(key, value)
      } else if (value is String) {
        map.putString(key, value)
      } else {
        map.putString(key, value.toString())
      }
    }
    return map
  }

  @Throws(JSONException::class)
  fun convertJsonToArray(jsonArray: JSONArray): WritableArray {
    val array: WritableArray = WritableNativeArray()
    for (i in 0 until jsonArray.length()) {
      when (val value = jsonArray[i]) {
        is JSONObject -> {
          array.pushMap(convertJsonToMap(value))
        }

        is JSONArray -> {
          array.pushArray(convertJsonToArray(value))
        }

        is Boolean -> {
          array.pushBoolean(value)
        }

        is Int -> {
          array.pushInt(value)
        }

        is Double -> {
          array.pushDouble(value)
        }

        is String -> {
          array.pushString(value)
        }

        else -> {
          array.pushString(value.toString())
        }
      }
    }
    return array
  }

  @Throws(JSONException::class)
  fun convertMapToJson(readableMap: ReadableMap?): JSONObject {
    val `object` = JSONObject()
    val iterator = readableMap!!.keySetIterator()
    while (iterator.hasNextKey()) {
      val key = iterator.nextKey()
      when (readableMap.getType(key)) {
        ReadableType.Null -> `object`.put(key, JSONObject.NULL)
        ReadableType.Boolean -> `object`.put(key, readableMap.getBoolean(key))
        ReadableType.Number -> `object`.put(key, readableMap.getDouble(key))
        ReadableType.String -> `object`.put(key, readableMap.getString(key))
        ReadableType.Map -> `object`.put(key, convertMapToJson(readableMap.getMap(key)))
        ReadableType.Array ->
          `object`.put(key, convertArrayToJson(readableMap.getArray(key)))
      }
    }
    return `object`
  }

  @Throws(JSONException::class)
  fun convertArrayToJson(readableArray: ReadableArray?): JSONArray {
    val array = JSONArray()
    for (i in 0 until readableArray!!.size()) {
      when (readableArray.getType(i)) {
        ReadableType.Null -> {}
        ReadableType.Boolean -> array.put(readableArray.getBoolean(i))
        ReadableType.Number -> array.put(readableArray.getDouble(i))
        ReadableType.String -> array.put(readableArray.getString(i))
        ReadableType.Map -> array.put(convertMapToJson(readableArray.getMap(i)))
        ReadableType.Array -> array.put(convertArrayToJson(readableArray.getArray(i)))
      }
    }
    return array
  }
}


object PushUtils {

  const val ON_NOTIFICATION_REGISTERED = "onNotificationRegistered"
  const val ON_NOTIFICATION_RECEIVED = "onNotificationReceived"
  const val ON_NOTIFICATION_OPENED = "onNotificationOpened"

  private const val LOG_TAG = "PushUtils"

  fun sendEvent(eventName: String, data: WritableMap, context: ReactApplicationContext) {
    if (context.hasActiveReactInstance()) {
      Log.d(LOG_TAG, "sending event.")
      context
        .getJSModule(RCTDeviceEventEmitter::class.java)
        .emit(eventName, data)
    }
  }

}
