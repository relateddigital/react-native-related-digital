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
    private static final int FRAME_DELAY_COUNT = 3;

    public RelatedDigitalStoryViewManager(ReactApplicationContext context) {
        mContext = context;
    }

    private void setupLayoutHack(final VisilabsRecyclerView view) {
        Choreographer.getInstance().postFrameCallback(new Choreographer.FrameCallback() {
            private int frameCount = 0;

            @Override
            public void doFrame(long frameTimeNanos) {
                manuallyLayoutChildren(view);
                view.getViewTreeObserver().dispatchOnGlobalLayout();
                
                frameCount++;
                if (frameCount < FRAME_DELAY_COUNT) {
                    Choreographer.getInstance().postFrameCallback(this);
                }
            }
        });
    }

    private void manuallyLayoutChildren(View view) {
        view.measure(
                View.MeasureSpec.makeMeasureSpec(view.getWidth(), View.MeasureSpec.EXACTLY),
                View.MeasureSpec.makeMeasureSpec(view.getHeight(), View.MeasureSpec.EXACTLY)
        );
        view.layout(view.getLeft(), view.getTop(), view.getRight(), view.getBottom());

        if (view instanceof ViewGroup) {
            ViewGroup viewGroup = (ViewGroup) view;
            for (int i = 0; i < viewGroup.getChildCount(); i++) {
                View child = viewGroup.getChildAt(i);
                manuallyLayoutChildren(child);
            }
        }
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
        
        if (args == null || args.size() == 0) {
            return;
        }
        
        final int viewId = args.getInt(0);

        if ("getStories".equals(commandId) || String.valueOf(COMMAND_GET_STORIES).equals(commandId)) {
            getStories(root, viewId);
        }
    }

    @ReactProp(name = "actionId")
    public void setActionId(VisilabsRecyclerView view, @Nullable String actionId) {
        this.actionId = actionId != null ? actionId : null;
    }

    public void getStories(final VisilabsRecyclerView visilabsRecyclerView, final int viewId) {
        try {
            if (mContext.getCurrentActivity() == null) {
                android.util.Log.e("RelatedDigitalStoryView", "Current activity is null, cannot get stories");
                return;
            }

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

            if(actionId != null && !actionId.isEmpty()) {
                visilabsRecyclerView.setStoryActionIdSync(mContext, mContext.getCurrentActivity(), actionId, storyItemClickListener);
            }
            else {
                visilabsRecyclerView.setStoryActionSync(mContext, mContext.getCurrentActivity(), storyItemClickListener);
            }

            StrictMode.setThreadPolicy(currentPolicy);

            visilabsRecyclerView.post(() -> {
                setupLayoutHack(visilabsRecyclerView);
                
                if (visilabsRecyclerView.getAdapter() != null) {
                    visilabsRecyclerView.getAdapter().notifyDataSetChanged();
                }
            });
        } catch (Exception e) {
            android.util.Log.e("RelatedDigitalStoryView", "Error getting stories", e);
            e.printStackTrace();
        }
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
