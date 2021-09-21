package com.relateddigital.reactnative;

import android.os.StrictMode;
import android.view.Choreographer;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.visilabs.story.VisilabsRecyclerView;
import com.visilabs.story.model.StoryItemClickListener;

import java.util.Map;

import euromsg.com.euromobileandroid.utils.AppUtils;

public class RelatedDigitalStoryViewManager extends SimpleViewManager<VisilabsRecyclerView> {
    public static final String VIEW_NAME = "StoryView";
    public final ReactApplicationContext mContext;
    public final int COMMAND_GET_STORIES = 1;
    String actionId;

    public RelatedDigitalStoryViewManager(ReactApplicationContext context) {
        mContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return VIEW_NAME;
    }

    @NonNull
    @Override
    protected VisilabsRecyclerView createViewInstance(@NonNull final ThemedReactContext reactContext) {
        LayoutInflater inflater = LayoutInflater.from(mContext);
        return (VisilabsRecyclerView) inflater.inflate(R.layout.story_view, null);
    }

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of("getStories", COMMAND_GET_STORIES);
    }

    @Override
    public void receiveCommand(@NonNull final VisilabsRecyclerView root, String commandId, @Nullable ReadableArray args) {
        super.receiveCommand(root, commandId, args);
        final int viewId = args.getInt(0);
        int commandIdInt = Integer.parseInt(commandId);

        if(commandIdInt == COMMAND_GET_STORIES) {
            getStories(root, viewId);
        }
    }

    @ReactProp(name = "actionId")
    public void setActionId(VisilabsRecyclerView view, @Nullable String actionId) {
        this.actionId = actionId;
    }

    public void getStories(final VisilabsRecyclerView visilabsRecyclerView, final int viewId) {
        final StrictMode.ThreadPolicy currentPolicy = StrictMode.getThreadPolicy();
        AppUtils.setThreadPool();

        final StoryItemClickListener storyItemClickListener = new StoryItemClickListener() {
            @Override
            public void storyItemClicked(String storyLink) {
                WritableMap data = Arguments.createMap();
                data.putString("storyLink", storyLink);

                sendData(data, viewId);
            }
        };

        if(actionId != null) {
            visilabsRecyclerView.setStoryActionIdSync(mContext, mContext.getCurrentActivity(), actionId, storyItemClickListener);
        }
        else {
            visilabsRecyclerView.setStoryActionSync(mContext, mContext.getCurrentActivity(), storyItemClickListener);
        }

        StrictMode.setThreadPolicy(currentPolicy);
    }

    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder()
                .put(
                        "onItemClicked",
                        MapBuilder.of(
                                "phasedRegistrationNames",
                                MapBuilder.of("bubbled", "onItemClicked")))
                .build();
    }

    private void sendData(WritableMap data, int viewId) {
        mContext.getJSModule(RCTEventEmitter.class)
                .receiveEvent(viewId, "onItemClicked", data);
    }
}
