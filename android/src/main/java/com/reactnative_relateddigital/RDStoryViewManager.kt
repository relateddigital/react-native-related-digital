package com.reactnative_relateddigital


import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.relateddigital.relateddigital_android.inapp.story.StoryItemClickListener
import com.relateddigital.relateddigital_android.inapp.story.StoryRecyclerView


class RDStoryViewManager(
  val context: ReactApplicationContext
) : SimpleViewManager<StoryRecyclerView>() {

  companion object {
    const val VIEW_NAME = "RDRCTStoryView"
    const val COMMAND_GET_STORIES = 1
  }

  private var actionId: String? = null

  override fun getName() = VIEW_NAME

  override fun createViewInstance(reactContext: ThemedReactContext): StoryRecyclerView {
    val story = StoryRecyclerView(reactContext)
    return story
  }

  override fun getCommandsMap(): Map<String, Int> {
    return MapBuilder.of("getStories", COMMAND_GET_STORIES)
  }

  override fun receiveCommand(
    root: StoryRecyclerView,
    commandId: String,
    args: ReadableArray?
  ) {
    super.receiveCommand(root, commandId, args)
    val viewId = args?.getInt(0) ?: return
    val commandIdInt = commandId.toIntOrNull() ?: return

    if (commandIdInt == COMMAND_GET_STORIES) {
      getStories(root, viewId)
    }
  }

  @ReactProp(name = "actionId")
  fun setActionId(view: StoryRecyclerView, actionId: String?) {
    this.actionId = actionId
  }

  fun getStories( rdRecyclerView: StoryRecyclerView, viewId: Int) {

    val storyItemClickListener = object : StoryItemClickListener {
      override fun storyItemClicked(storyLink: String?) {
        val data = Arguments.createMap()
        data.putString("storyLink", storyLink)
        sendData(data, viewId)
      }
    }


    actionId?.let {
      rdRecyclerView.setStoryActionId(
        context,
        it,
        storyItemClickListener
      )
    } ?: rdRecyclerView.setStoryAction(
      context,
      storyItemClickListener
    )



  }

  override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> {
    return MapBuilder.builder<String, Any>()
      .put(
        "onItemClicked",
        MapBuilder.of(
          "phasedRegistrationNames",
          MapBuilder.of("bubbled", "onItemClicked")
        )
      )
      .build()
  }

  private fun sendData(data: WritableMap, viewId: Int) {
    context.getJSModule(RCTEventEmitter::class.java)
      .receiveEvent(viewId, "onItemClicked", data)
  }
}



