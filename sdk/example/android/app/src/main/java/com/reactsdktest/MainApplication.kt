package com.reactsdktest

import android.app.Application
import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.content.IntentFilter
import android.os.Build
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader
import com.visilabs.Visilabs
import euromsg.com.euromobileandroid.EuroMobileManager
import euromsg.com.euromobileandroid.enums.RDNotificationPriority

class MainApplication : Application(), ReactApplication {

    override val reactNativeHost: ReactNativeHost =
        object : DefaultReactNativeHost(this) {
            override fun getPackages(): List<ReactPackage> =
                PackageList(this).packages.apply {
                    // Packages that cannot be autolinked yet can be added manually here, for example:
                    // add(MyReactNativePackage())
                }

            override fun getJSMainModuleName(): String = "index"

            override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

            override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
        }

    override val reactHost: ReactHost
        get() = getDefaultReactHost(applicationContext, reactNativeHost)

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, OpenSourceMergedSoMapping)
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            load()
        }

        initEuroMessage()
    }

    private fun initEuroMessage() {
        var appAlias = "rnandroidtestapptest2"
        // var appAlias = "RnPushSdk"
        // var appAlias = "rnandroidtestappprod"
        var huaweiAppAlias = "rnsdk-client-huawei"
        var organizationId = "676D325830564761676D453D"
        var siteId = "356467332F6533766975593D"
        var datasource = "visistore"

        var channel = "Android"
        var segmentUrl = "http://lgr.visilabs.net"
        var realtimeUrl = "http://rt.visilabs.net"
        var targetUrl = "http://s.visilabs.net/json"
        var actionUrl = "http://s.visilabs.net/actjson"
        var geofenceUrl = "http://s.visilabs.net/geojson"

        if (false) {
            organizationId = "394A48556A2F76466136733D"
            siteId = "75763259366A3345686E303D"
            datasource = "mrhp"
            actionUrl = "http://tests.visilabs.net/"
            targetUrl = "http://tests.visilabs.net/"
        }


        Visilabs.CreateAPI(
            organizationId,
            siteId,
            segmentUrl,
            datasource,
            realtimeUrl,
            channel,
            this,
            targetUrl,
            actionUrl,
            30000,
            geofenceUrl,
            true,
            "reactnative"
        )

        val euroMobileManager = EuroMobileManager.init(appAlias, huaweiAppAlias, this)

        // Optional settings
        euroMobileManager.setPushIntent("com.pushsdk.MainActivity", this)
        euroMobileManager.setNotificationTransparentSmallIcon(R.mipmap.ic_launcher, this)
        euroMobileManager.setNotificationTransparentSmallIconDarkMode(R.mipmap.ic_launcher, this)
        euroMobileManager.useNotificationLargeIcon(true)
        euroMobileManager.setNotificationLargeIcon(R.mipmap.ic_launcher, this)
        euroMobileManager.setNotificationLargeIconDarkMode(R.mipmap.ic_launcher, this)
        euroMobileManager.setNotificationColor("#d1dbbd")
        euroMobileManager.setChannelName("Channel", this)
        euroMobileManager.setNotificationPriority(RDNotificationPriority.NORMAL, this)
    }

    override fun registerReceiver(receiver: BroadcastReceiver?, filter: IntentFilter?): Intent? {
        return if (Build.VERSION.SDK_INT >= 34 && applicationInfo.targetSdkVersion >= 34) {
            super.registerReceiver(receiver, filter, Context.RECEIVER_EXPORTED)
        } else {
            super.registerReceiver(receiver, filter)
        }
    }
}
