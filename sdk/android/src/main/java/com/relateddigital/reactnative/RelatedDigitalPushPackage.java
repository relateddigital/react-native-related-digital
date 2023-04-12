package com.relateddigital.reactnative;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class RelatedDigitalPushPackage implements ReactPackage {
    @NonNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new RelatedDigitalPushModule(reactContext));

        return modules;
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
        // return Arrays.<ViewManager>asList(
        //         new RelatedDigitalStoryViewManager(reactContext),
        //         new RelatedDigitalBannerViewManager(reactContext)
        // );
        List<ViewManager> viewManagers = Arrays.asList(
                new RelatedDigitalStoryViewManager(reactContext),
                new RelatedDigitalBannerViewManager(reactContext)
        );
        return viewManagers;
    }
}
