package com.relateddigital.reactnative;

import android.content.Intent;
import android.net.Uri;
import android.os.StrictMode;
import android.util.Log;
import android.view.Choreographer;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.visilabs.inApp.bannercarousel.BannerItemClickListener;
import com.visilabs.inApp.bannercarousel.BannerRecyclerView;
import com.visilabs.inApp.bannercarousel.BannerRequestListener;
import com.visilabs.story.VisilabsRecyclerView;
import com.visilabs.story.model.StoryItemClickListener;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import euromsg.com.euromobileandroid.utils.AppUtils;

public class RelatedDigitalBannerViewManager extends SimpleViewManager<BannerRecyclerView> {
    public static final String VIEW_NAME = "BannerView";
    public final ReactApplicationContext mContext;
    public final int COMMAND_GET_BANNERS = 1;
    String actionId;

    public RelatedDigitalBannerViewManager(ReactApplicationContext context) {
        mContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return VIEW_NAME;
    }

    @NonNull
    @Override
    protected BannerRecyclerView createViewInstance(@NonNull final ThemedReactContext reactContext) {
        LayoutInflater inflater = LayoutInflater.from(mContext);
        return (BannerRecyclerView) inflater.inflate(R.layout.banner_view, null);
    }

    BannerRequestListener bannerRequestListener = new BannerRequestListener() {
        @Override
        public void onRequestResult(boolean isAvailable) {
            if (!isAvailable) {
            //    binding.bannerListView.visibility = View.GONE;
            }
        }
    };

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of("requestBannerCarousel", COMMAND_GET_BANNERS);
    }

    @Override
    public void receiveCommand(@NonNull final BannerRecyclerView root, String commandId, @Nullable ReadableArray args) {
        super.receiveCommand(root, commandId, args);
        int commandIdInt = Integer.parseInt(commandId);

        if(commandIdInt == COMMAND_GET_BANNERS) {
            requestBannerCarousel(root,args);
        }
    }

    public void requestBannerCarousel(final BannerRecyclerView bannerRecyclerView, @Nullable ReadableArray args){
        try{
            final int viewId = args.getInt(0);

            //List<Object> innerList = Arrays.asList((Object[]) args[1]);

            ReadableArray innerArray = args.getArray(1);
            List<Object> innerList = new ArrayList<>();
            for (int i = 0; i < innerArray.size(); i++) {
                innerList.add(innerArray.getMap(i));
            }
            HashMap<String, Object> propertiesMap = (HashMap<String, Object>) innerList.get(0);

            //HashMap<String, Object> properties = (HashMap<String, Object>) args.getArray(1);
            // properties.put("OM.inapptype", "banner_carousel");

            HashMap<String, String> params = new HashMap<>();
            //HashMap<String, Object> propertiesMap = properties;

            for (Map.Entry<String, Object> entry : propertiesMap.entrySet()) {
                if(entry.getValue() instanceof String){
                    params.put(entry.getKey(), (String) entry.getValue());
                }
                else {
                    params.put(entry.getKey(), entry.getValue().toString());
                }
            }

            BannerItemClickListener _bannerItemClickListener = new BannerItemClickListener() {
                @Override
                public void bannerItemClicked(String bannerLink) {
                    if(bannerLink == null || bannerLink.isEmpty()) {
                        return;
                    }
                    try {
                        WritableMap data = Arguments.createMap();
                        data.putString("bannerLink", bannerLink);

                        sendData(data, viewId);
                        // Intent viewIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(bannerLink));
                        //startActivity(viewIntent);
                    } catch (Exception e) {
                    }
                }
            };

            bannerRecyclerView.requestBannerCarouselAction(mContext,params,bannerRequestListener,_bannerItemClickListener);
        }
        catch(Exception ex){
            ex.printStackTrace();
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
