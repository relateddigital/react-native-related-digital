package com.reactnative_relateddigital

import android.content.Context
import android.content.Intent
import android.util.Log
import com.facebook.react.HeadlessJsTaskService
import com.facebook.react.bridge.Arguments
import com.facebook.react.jstasks.HeadlessJsTaskConfig

class RDHeadlessEventService : HeadlessJsTaskService() {
  override fun getTaskConfig(intent: Intent): HeadlessJsTaskConfig {
    return HeadlessJsTaskConfig(TASK_KEY, Arguments.createMap(), TASK_TIMEOUT, true)
  }

  override fun onHeadlessJsTaskStart(taskId: Int) {
    Log.i(LOG_TAG, "RDHeadlessEventService - Started")
    super.onHeadlessJsTaskStart(taskId)
  }

  override fun onHeadlessJsTaskFinish(taskId: Int) {
    super.onHeadlessJsTaskFinish(taskId)
    Log.e(LOG_TAG, "RDHeadlessEventService - Finished")
  }

  companion object {
    private const val LOG_TAG: String = "RDHeadlessEventService"
    private const val TASK_TIMEOUT: Long = 60000
    private const val TASK_KEY = "RDAndroidBackgroundEventTask"
    fun startService(context: Context): Boolean {
      val intent = Intent(context, RDHeadlessEventService::class.java)
      try {
        if (context.startService(intent) != null) {
          acquireWakeLockNow(context)
          return true
        }
      } catch (e: Exception) {
        Log.i(LOG_TAG,"$LOG_TAG - Failed to start service", e)
      }
      return false
    }
  }
}
