package com.relateddigitaltestclient;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.config.ReactFeatureFlags;
import com.facebook.soloader.SoLoader;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.relateddigitaltestclient.model.Profile;
import com.relateddigitaltestclient.newarchitecture.MainApplicationReactNativeHost;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Type;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import com.visilabs.Visilabs;
import euromsg.com.euromobileandroid.EuroMobileManager;
import euromsg.com.euromobileandroid.enums.RDNotificationPriority;

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
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  private final ReactNativeHost mNewArchitectureNativeHost =
      new MainApplicationReactNativeHost(this);

  @Override
  public ReactNativeHost getReactNativeHost() {
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      return mNewArchitectureNativeHost;
    } else {
      return mReactNativeHost;
    }
  }

  @Override
  public void onCreate() {
    super.onCreate();
    // If you opted-in for the New Architecture, we enable the TurboModule system
    ReactFeatureFlags.useTurboModules = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
    initEuroMessage();
  }

  private void initEuroMessage() {
      // String appAlias = "rnandroidtestapptest";
      // String appAlias = "RnPushSdk";
      String appAlias = "rnandroidtestappprod";
      String huaweiAppAlias = "rnsdk-client-huawei";
      String organizationId = "676D325830564761676D453D";
      String siteId = "356467332F6533766975593D";
      String datasource = "visistore";

      //search-test
      if(getProfile("search-test") != null){
          organizationId = Objects.requireNonNull(getProfile("search-test")).getOrganizationId();
          siteId = Objects.requireNonNull(getProfile("search-test")).getProfileId();
          datasource = Objects.requireNonNull(getProfile("search-test")).getDataSource();
      }


      String channel = "Android";
      String segmentUrl = "http://lgr.visilabs.net";
      String realtimeUrl = "http://rt.visilabs.net";
      String targetUrl = "http://s.visilabs.net/json";
      String actionUrl = "http://s.visilabs.net/actjson";
      String geofenceUrl = "http://s.visilabs.net/geojson";
      Visilabs.CreateAPI(organizationId, siteId, segmentUrl,
              datasource, realtimeUrl, channel, this, targetUrl, actionUrl, 30000, geofenceUrl, true, "reactnative");

      EuroMobileManager euroMobileManager = EuroMobileManager.init(appAlias, huaweiAppAlias, this);

      // optional
      euroMobileManager.setPushIntent("com.relateddigital.pushsdk.MainActivity", this);
      euroMobileManager.setNotificationTransparentSmallIcon(R.drawable.ic_txt_foreground, this);
      euroMobileManager.setNotificationTransparentSmallIconDarkMode(R.drawable.ic_txt_foreground, this);
      euroMobileManager.useNotificationLargeIcon(true);
      euroMobileManager.setNotificationLargeIcon(R.drawable.ic_txt_foreground, this);
      euroMobileManager.setNotificationLargeIconDarkMode(R.drawable.ic_txt_foreground, this);
      euroMobileManager.setNotificationColor("#d1dbbd");
      euroMobileManager.setChannelName("Channel", this);
      euroMobileManager.setNotificationPriority(RDNotificationPriority.HIGH, this); // Set to HIGH for push notifications to appear as temporary banners

  }

    private String getProfiles() {
        try {
            InputStream inputStream = getApplicationContext().getAssets().open("profiles.json");
            BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
            StringBuilder builder = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                builder.append(line);
            }
            return builder.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    private Profile getProfile(String key) {
        try {
            String profilesString = getProfiles();
            Gson gson = new Gson();
            Type listUserType = new TypeToken<Map<String, Profile>>() {
            }.getType();
            Map<String, Profile> profiles = gson.fromJson(profilesString, listUserType);
            return profiles != null ? profiles.get(key) : null;
        } catch (Exception e) {
            e.printStackTrace();
            return new Profile();
        }
    }



  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.relateddigitaltestclient.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
