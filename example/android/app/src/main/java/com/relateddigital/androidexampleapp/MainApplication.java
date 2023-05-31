package com.relateddigital.androidexampleapp;

import android.app.Application;
import android.content.Context;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import com.reactnative_relateddigital.RelatedDigitalManager;
import com.relateddigital.relateddigital_android.model.RDNotificationPriority;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
    new ReactNativeHost(this) {
      @Override
      public boolean getUseDeveloperSupport() {
        return BuildConfig.DEBUG;
      }

      @Override
      protected List<ReactPackage> getPackages() {
        @SuppressWarnings("UnnecessaryLocalVariable")
        List<ReactPackage> packages = new PackageList(this).getPackages();
        return packages;
      }

      @Override
      protected String getJSMainModuleName() {
        return "index";
      }
    };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this,false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager()); // Remove this line if you don't want Flipper enabled
    RelatedDigitalManager rdManager = RelatedDigitalManager.Companion.getSharedInstance();
    rdManager.injectReactInstanceManager(getReactNativeHost().getReactInstanceManager());
    rdManager.initRelatedDigital(getApplicationContext(),
      "676D325830564761676D453D",
      "356467332F6533766975593D",
      "visistore",
      "relateddigital-android-test",
      "relateddigital-android-huawei-test",
      true,
      false,
      R.drawable.text_icon,
      R.drawable.text_icon_dark_mode,
      true,
      R.mipmap.ic_launcher,
      R.mipmap.ic_launcher,
      "com.relateddigital.androidexampleapp.MainActivity",
      "Android",
      "#d1dbbd",
      RDNotificationPriority.NORMAL
    );
  }

  private static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        Class<?> aClass = Class.forName("com.relateddigital.androidexampleapp.ReactNativeFlipper");
        aClass
          .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
          .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException | NoSuchMethodException | IllegalAccessException |
               InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}

