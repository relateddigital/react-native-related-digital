package com.reactnative_relateddigital

import java.util.*
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.content.Intent
import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject
import com.relateddigital.relateddigital_android.model.Message


fun List<Message>.toWritableArray(): WritableArray {
  val messagesArray = Arguments.createArray()

  this.forEach { pushMessage ->
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

  return messagesArray
}

inline fun <reified T : java.io.Serializable> Bundle.serializable(key: String): T? = when {
  Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU -> getSerializable(key, T::class.java)
  else -> @Suppress("DEPRECATION") getSerializable(key) as? T
}

inline fun <reified T : java.io.Serializable> Intent.serializable(key: String): T? = when {
  Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU -> getSerializableExtra(key, T::class.java)
  else -> @Suppress("DEPRECATION") getSerializableExtra(key) as? T
}

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
        if(key.isNotEmpty() && value != null ) {
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
