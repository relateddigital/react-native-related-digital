package com.pushsdk;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Debug;
import android.util.Log;

import euromsg.com.euromobileandroid.model.CarouselItem;

import static euromsg.com.euromobileandroid.Constants.CAROUSAL_ITEM_CLICKED_KEY;
import static euromsg.com.euromobileandroid.Constants.CAROUSEL_ITEM_CLICKED_URL;

public class CarouselItemClickReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Log.i("CAROUSEL_PUSH_CLICK", "BroadcastReceiver called");
        if(intent != null) {
            Bundle bundle = intent.getExtras();
            if(bundle != null) {
                CarouselItem itemClicked = (CarouselItem) bundle.getParcelable(CAROUSAL_ITEM_CLICKED_KEY);
                String itemClickedUrl = bundle.getString(CAROUSEL_ITEM_CLICKED_URL);
                if(itemClickedUrl != null && !itemClickedUrl.equals("")) {
                    Log.i("CAROUSEL_PUSH_CLICK", itemClickedUrl);
                }
            }
        }
    }
}
