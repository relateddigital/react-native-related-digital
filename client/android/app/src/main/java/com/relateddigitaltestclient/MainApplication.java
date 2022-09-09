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
import com.relateddigitaltestclient.newarchitecture.MainApplicationReactNativeHost;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import com.visilabs.Visilabs;
import euromsg.com.euromobileandroid.EuroMobileManager;

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
    String appAlias = "RnPushSdk";
      String huaweiAppAlias = "rnsdk-client-huawei";
      String organizationId = "676D325830564761676D453D";
      String siteId = "356467332F6533766975593D";
      String datasource = "visistore";
      String channel = "Android";
      String segmentUrl = "http://lgr.visilabs.net";
      String realtimeUrl = "http://rt.visilabs.net";
      String targetUrl = "http://s.visilabs.net/json";
      String actionUrl = "http://s.visilabs.net/actjson";
      String geofenceUrl = "http://s.visilabs.net/geojson";

      Visilabs.CreateAPI(organizationId, siteId, segmentUrl,
              datasource, realtimeUrl, channel, this, targetUrl, actionUrl, 30000, geofenceUrl, true);

      EuroMobileManager euroMobileManager = EuroMobileManager.init(appAlias, huaweiAppAlias, this);

      // optional
      euroMobileManager.setPushIntent("com.relateddigital.pushsdk.MainActivity", this);
      euroMobileManager.setNotificationTransparentSmallIcon(R.drawable.ic_launcher, this);
      euroMobileManager.setNotificationTransparentSmallIconDarkMode(R.drawable.ic_launcher, this);
      euroMobileManager.useNotificationLargeIcon(true);
      euroMobileManager.setNotificationLargeIcon(R.drawable.ic_launcher, this);
      euroMobileManager.setNotificationLargeIconDarkMode(R.drawable.ic_launcher, this);
      euroMobileManager.setNotificationColor("#d1dbbd");
      euroMobileManager.setChannelName("Channel", this);
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
