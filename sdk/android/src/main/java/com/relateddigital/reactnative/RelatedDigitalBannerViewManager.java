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

import java.util.HashMap;
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
        Log.i("BannerRequestListener", "dolu");
        if (!isAvailable) {

        //    binding.bannerListView.visibility = View.GONE;
        }
    }
    };

    BannerItemClickListener _bannerItemClickListener = new BannerItemClickListener() {
        @Override
        public void bannerItemClicked(String bannerLink) {
            if(bannerLink == null || bannerLink.isEmpty()) {
                return;
            }
            Toast.makeText(mContext.getApplicationContext(), bannerLink, Toast.LENGTH_SHORT).show();
            Log.i("link banner", bannerLink);
            try {
                Intent viewIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(bannerLink));
                //startActivity(viewIntent);
            } catch (Exception e) {
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
        final HashMap<String, String> properties = new HashMap<>();//args;
        int commandIdInt = Integer.parseInt(commandId);

        if(commandIdInt == COMMAND_GET_BANNERS) {
            requestBannerCarousel(root);
        }
    }

    public void requestBannerCarousel(final BannerRecyclerView bannerRecyclerView){
        try{
            HashMap<String, String> properties = new HashMap<>();
            properties.put("OM.inapptype", "banner_carousel");
            // BannerRecyclerView bannerListView = (BannerRecyclerView) findViewById(R.layout.banner_view);
            //LayoutInflater inflater = LayoutInflater.from(mContext);
            //BannerRecyclerView bannerListView = (BannerRecyclerView) inflater.inflate(R.layout.banner_view, null);

            bannerRecyclerView.requestBannerCarouselAction(mContext,properties,bannerRequestListener,_bannerItemClickListener);
        }
        catch(Exception ex){
            ex.printStackTrace();
        }
    }
}
