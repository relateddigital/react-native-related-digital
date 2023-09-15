package com.reactnative_relateddigital

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.google.gson.Gson
import com.reactnative_relateddigital.MapUtil.convertJsonToMap
import com.relateddigital.relateddigital_android.constants.Constants
import com.relateddigital.relateddigital_android.model.Message
import org.json.JSONObject

class RDNotificationReceiver(reactAppContext: ReactApplicationContext) :
  BroadcastReceiver() {

  companion object {
    private const val LOG_TAG: String = "RelatedDigitalNotificationReceiver"
  }

  private val reactApplicationContext: ReactApplicationContext = reactAppContext

  override fun onReceive(context: Context, intent: Intent?) {

    val bundle = intent?.extras
    val intentAction = intent?.action
    if (bundle != null && intentAction != null) {
      if (intentAction == Constants.PUSH_REGISTER_EVENT) {
        Log.d(LOG_TAG, "registered push notifications.")
        val token = bundle.getString("token")
        if (token != null) {
          Log.d(LOG_TAG, "token: $token")
          val jsonObject = JSONObject()
          jsonObject.put("token", token)
          PushUtils.sendEvent(
            PushUtils.ON_NOTIFICATION_REGISTERED,
            convertJsonToMap(JSONObject(Gson().toJson(jsonObject))),
            reactApplicationContext
          )
        }
      } else if (intentAction == Constants.PUSH_RECEIVE_EVENT) {
        Log.d(LOG_TAG, "received new push notification.")
        val message: Message? = bundle.getSerializable("message") as Message?
        if (message != null) {
          Log.d(LOG_TAG, "received new push notification ${message.pushId}.")
          PushUtils.sendEvent(
            PushUtils.ON_NOTIFICATION_RECEIVED,
            convertJsonToMap(JSONObject(Gson().toJson(message))),
            reactApplicationContext
          )
        }
      }
    }
  }
}
