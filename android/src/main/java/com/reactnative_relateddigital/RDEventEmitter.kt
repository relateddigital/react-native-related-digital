package com.reactnative_relateddigital

import android.os.Handler
import android.os.Looper
import androidx.annotation.RestrictTo
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.modules.core.RCTNativeAppEventEmitter


interface Event {
  val name: String
  val body: ReadableMap
  val isForeground: Boolean
}

class RDEventEmitter {
  private val pendingForegroundEvents: MutableList<Event> = ArrayList<Event>()
  private val pendingBackgroundEvents: MutableList<Event> = ArrayList<Event>()
  private val mainHandler = Handler(Looper.getMainLooper())
  private val lock = Any()
  private var reactContext: ReactContext? = null

  /**
   * Attaches the react context.
   *
   * @param reactContext The react context.
   */
  fun attachReactContext(reactContext: ReactContext?) {
    mainHandler.post {
      this@RDEventEmitter.reactContext = reactContext
      synchronized(lock) {
        if (!pendingForegroundEvents.isEmpty()) {
          notifyPendingForegroundEvents()
        }
      }
    }
  }

  @RestrictTo(RestrictTo.Scope.LIBRARY_GROUP)
  fun sendEvent(event: Event) {
    mainHandler.post {
      synchronized(lock) {
        if (event.isForeground) {
          pendingForegroundEvents.add(event)
          notifyPendingForegroundEvents()
        } else {
          pendingBackgroundEvents.add(event)
          if (reactContext != null) {
            //RDHeadlessEventService.startService(reactContext!!.applicationContext)
          }
        }
      }
    }
  }

  fun takePendingForegroundEvents(type: String): List<Event> {
    synchronized(lock) {
      val filteredEvents: List<Event> = filter(pendingForegroundEvents, type)
      pendingForegroundEvents.removeAll(filteredEvents)
      return filteredEvents
    }
  }

  fun takePendingBackgroundEvents(type: String): List<Event> {
    synchronized(lock) {
      val filteredEvents: List<Event> = filter(pendingBackgroundEvents, type)
      pendingBackgroundEvents.removeAll(filteredEvents)
      return filteredEvents
    }
  }

  fun onHostResume() {
    synchronized(lock) {
      if (!pendingBackgroundEvents.isEmpty() && reactContext != null) {
        //RDHeadlessEventService.startService(reactContext!!.applicationContext)
      }
      if (!pendingForegroundEvents.isEmpty()) {
        notifyPendingForegroundEvents()
      }
    }
  }


  fun onRDListenerAdded(listener: String) {
    mainHandler.post {
      synchronized(lock) {
        if (contains(
            pendingBackgroundEvents, listener
          ) && reactContext != null
        ) {
          //RDHeadlessEventService.startService(reactContext)
        }
        if (contains(pendingForegroundEvents, listener)) {
          notifyPendingForegroundEvents()
        }
      }
    }
  }

  private fun notifyPendingForegroundEvents() {
    val reactContext = reactContext
    if (reactContext == null || !reactContext.hasActiveCatalystInstance()) {
      return
    }
    try {
      reactContext.getJSModule(RCTNativeAppEventEmitter::class.java)
        .emit("com.relateddigital.onPendingForegroundEvent", null)
    } catch (e: Exception) {
      //Logger.error("RDReactModule - Failed to emit event", e)
    }
  }

  companion object {
    private val sharedInstance = RDEventEmitter()

    fun shared(): RDEventEmitter {
      return sharedInstance
    }

    private fun filter(events: List<Event>, eventType: String): List<Event> {
      val filtered: MutableList<Event> = ArrayList<Event>()
      for (event in events) {
        if (eventType == event.name) {
          filtered.add(event)
        }
      }
      return filtered
    }

    private fun contains(events: List<Event>, eventType: String): Boolean {
      for (event in events) {
        if (eventType == event.name) return true
      }
      return false
    }


  }
}
