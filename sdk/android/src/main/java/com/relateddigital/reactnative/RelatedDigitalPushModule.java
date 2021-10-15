package com.relateddigital.reactnative;

import android.app.Activity;
import android.app.Application;
import android.content.Intent;
import android.os.Bundle;
import android.os.StrictMode;
import android.util.Log;
import androidx.annotation.NonNull;

import com.facebook.common.activitylistener.ActivityListener;
import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.gson.Gson;
import com.visilabs.Visilabs;
import com.visilabs.VisilabsResponse;
import com.visilabs.api.VisilabsCallback;
import com.visilabs.api.VisilabsTargetFilter;
import com.visilabs.api.VisilabsTargetRequest;
import com.visilabs.favs.Favorites;
import com.visilabs.favs.FavsResponse;
import com.visilabs.inApp.VisilabsActionRequest;
import com.visilabs.util.VisilabsConstant;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import euromsg.com.euromobileandroid.EuroMobileManager;
import euromsg.com.euromobileandroid.model.Element;
import euromsg.com.euromobileandroid.model.Message;

public class RelatedDigitalPushModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;
    private Utilities utilities;

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onNewIntent(Intent intent) {
            onNewIntentLocal(intent);
        }
    };

    RelatedDigitalPushModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;

        reactContext.addActivityEventListener(mActivityEventListener);
        utilities = new Utilities(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return "RelatedDigitalPushModule";
    }

    @ReactMethod
    public void requestPermissions(final Promise promise) {
        FirebaseMessaging.getInstance().getToken()
                .addOnCompleteListener(new OnCompleteListener<String>() {
                    @Override
                    public void onComplete(@NonNull Task<String> task) {
                        if (!task.isSuccessful()) {
                            Log.e("RelatedDigital", "exception", task.getException());
                            promise.resolve(false);
                            return;
                        }

                        WritableMap params = Arguments.createMap();
                        params.putString("deviceToken", task.getResult());
                        utilities.sendEvent("remoteNotificationsRegistered", params);

                        promise.resolve(true);
                    }
                });
    }

    private void checkIntent(Activity activity) {
        if (activity != null && activity.getIntent() != null && activity.getIntent().getExtras() != null) {
            onNewIntentLocal(activity.getIntent());
        }
    }

    public void onNewIntentLocal(Intent intent) {
        if(intent != null) {
            Bundle bundle = intent.getExtras();
            if(bundle != null) {
                Message message = (Message) intent.getExtras().getSerializable("message");

                if(message == null) {
                    // Carousel push notification : an item was clicked

                    String itemClickedUrl = bundle.getString("CarouselItemClickedUrl");
                    WritableMap params = Arguments.createMap();
                    params.putString("carouselItemClickedUrl", itemClickedUrl);

                    utilities.sendEvent("carouselItemClicked", params);
                    return;
                }
            }
        }

        Bundle bundle = utilities.getBundleFromIntent(intent);
        if (bundle != null) {
            bundle.putBoolean("foreground", false);
            intent.putExtra("notification", bundle);

            WritableMap params = Arguments.createMap();

            Set<String> keys = bundle.keySet();
            for (String key : keys) {
                Object valueObj = bundle.get(key);

                if(valueObj != null) {
                    if(valueObj instanceof String) {
                        params.putString(key, (String) valueObj);
                    }
                    else if(valueObj instanceof Message) {
                        Message messageObj = (Message)valueObj;

                        params.putString("mediaUrl", messageObj.getMediaUrl());
                        params.putString("altUrl", messageObj.getAltUrl());
                        params.putString("pushId", messageObj.getPushId());
                        params.putString("campaignId", messageObj.getCampaignId());
                        params.putString("url", messageObj.getUrl());
                        params.putString("from", messageObj.getFrom());
                        params.putString("message", messageObj.getMessage());
                        params.putString("title", messageObj.getTitle());
                        params.putString("sound", messageObj.getSound());
                        params.putString("pushType", messageObj.getPushType().toString());
                        params.putString("collapseKey", messageObj.getCollapseKey());

                        Map<String, String> messageObjParams = messageObj.getParams();
                        if(messageObjParams != null && messageObjParams.size() > 0) {
                            WritableMap paramsMap = Arguments.createMap();
                            for(String paramKey : messageObjParams.keySet()) {
                                paramsMap.putString(paramKey, messageObjParams.get(paramKey));
                            }
                            params.putMap("params", paramsMap);
                        }

                        ArrayList<Element> messageObjElements = messageObj.getElements();
                        if(messageObjElements != null && messageObjElements.size() > 0) {
                            WritableMap elementsMap = Arguments.createMap();
                            for(Element element : messageObjElements) {
                                elementsMap.putString("content", element.getContent());
                                elementsMap.putString("id", element.getId());
                                elementsMap.putString("picture", element.getPicture());
                                elementsMap.putString("title", element.getTitle());
                                elementsMap.putString("url", element.getUrl());
                            }
                            params.putMap("elements", elementsMap);
                        }
                    }
                    else {
                        params.putString(key, valueObj.toString());
                    }
                }
                else {
                    params.putNull(key);
                }
            }

            utilities.sendEvent("remoteNotificationReceived", params);
        }
    }

    @ReactMethod
    public void getDeviceParameters(Promise promise) {
        try {
            WritableMap result = Arguments.createMap();
            result.putString("osVersion", utilities.getOsVersion());
            result.putString("sdkVersion", utilities.getSdkVersion());
            result.putString("deviceName", utilities.getDeviceName());
            result.putString("deviceType", utilities.getDeviceType());
            result.putString("locale", utilities.getLocale());
            result.putString("carrier", utilities.getCarrier());
            result.putString("appVersion", utilities.getAppVersion());
            result.putString("udid", utilities.getDeviceUDID());

            promise.resolve(result);
        }
        catch (Exception ex) {
            promise.reject("ERROR", ex);
        }
    }

    @ReactMethod
    public void customEvent(String pageName, ReadableMap properties) {
        HashMap<String, String> params = new HashMap<>();
        HashMap<String, Object> paramsMap = properties.toHashMap();

        for (Map.Entry<String, Object> entry : paramsMap.entrySet()) {
            if(entry.getValue() instanceof String){
                params.put(entry.getKey(), (String) entry.getValue());
            }
            else {
                params.put(entry.getKey(), entry.getValue().toString());
            }
        }

        Visilabs.CallAPI().customEvent(pageName, params, getCurrentActivity());
    }

    @ReactMethod
    public void getRecommendations(String zoneId, String productCode, ReadableArray filters, final Promise promise) {
        try {
            List<VisilabsTargetFilter> filtersToSend = new ArrayList<VisilabsTargetFilter>();
            HashMap<String,String> properties = new HashMap<String, String>();

            if(filters != null && filters.size() > 0) {
                ArrayList array = filters.toArrayList();

                for (int i = 0; i < filters.size(); i++) {
                    ReadableMap map = filters.getMap(i);
                    VisilabsTargetFilter f = new VisilabsTargetFilter(map.getString("attribute"), String.valueOf(map.getInt("filterType")), map.getString("value"));
                    filtersToSend.add(f);
                }
            }

            VisilabsTargetRequest visilabsTargetRequest =  Visilabs.CallAPI().buildTargetRequest(zoneId, productCode, properties, filtersToSend);
            visilabsTargetRequest.executeAsync(new VisilabsCallback() {

                @Override
                public void success(VisilabsResponse response) {
                    String rawResponse = response.getRawResponse();
                    promise.resolve(rawResponse);
                }

                @Override
                public void fail(VisilabsResponse response) {
                    String rawResponse = response.getRawResponse();
                    promise.resolve(rawResponse);
                }
            });
        }
        catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void checkNotification(Promise promise) {
        checkIntent(getCurrentActivity());
        promise.resolve(true);
    }

    @ReactMethod
    public void getFavoriteAttributeActions(String actionId, final Promise promise) {
        try {
            VisilabsActionRequest visilabsActionRequest;

            if(actionId != null && !actionId.isEmpty()) {
                visilabsActionRequest = Visilabs.CallAPI().requestActionId(actionId);
            }
            else {
                visilabsActionRequest = Visilabs.CallAPI().requestActionId(VisilabsConstant.FavoriteAttributeAction);
            }

            visilabsActionRequest.executeAsyncAction(new VisilabsCallback() {

                @Override
                public void success(VisilabsResponse response) {
                    Gson gson = new Gson();

                    FavsResponse favsResponse = gson.fromJson(response.getRawResponse(), FavsResponse.class);
                    Favorites favs = favsResponse.getFavoriteAttributeAction().get(0).getActiondata().getFavorites();

                    promise.resolve(gson.toJson(favs));
                }

                @Override
                public void fail(VisilabsResponse response) {
                    String rawResponse = response.getRawResponse();
                    promise.resolve(rawResponse);
                }
            });
        }
        catch (Exception e) {
            promise.reject("ERROR", e.getMessage());
        }
    }

    @ReactMethod
    public void sendTheListOfAppsInstalled(Promise promise) {
        try {
            Visilabs.CallAPI().sendTheListOfAppsInstalled();
            promise.resolve(true);
        }
        catch (Exception ex) {
            ex.printStackTrace();
            promise.resolve(false);
        }
    }
}
