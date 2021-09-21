package com.relateddigital.reactnative;

import android.Manifest;
import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.telephony.TelephonyManager;
import android.util.Log;

import androidx.core.content.PermissionChecker;
import androidx.fragment.app.Fragment;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.Set;

import euromsg.com.euromobileandroid.EuroMobileManager;
import euromsg.com.euromobileandroid.model.Message;
import euromsg.com.euromobileandroid.utils.AppUtils;

public class Utilities {
    private ReactApplicationContext mContext;

    public Utilities(ReactApplicationContext context) {
        mContext = context;
    }

    String getOsVersion() {
        return Build.VERSION.RELEASE;
    }

    String getSdkVersion() {
        try {
            PackageInfo pInfo = mContext.getPackageManager().getPackageInfo(mContext.getPackageName(), 0);
            return String.valueOf(pInfo.versionCode);
        } catch (Exception e) {
            Log.e("ERR", "Version Code Error : " + e.toString());
        }
        return null;
    }

    String getDeviceName() {
        String manufacturer = Build.MANUFACTURER;
        String model = Build.MODEL;
        if (model.startsWith(manufacturer)) {
            return model;
        } else {
            return manufacturer + " " + model;
        }
    }

    String getDeviceType() {
        return Build.MANUFACTURER + " : " + Build.MODEL;
    }

    String getLocale() {
        return mContext.getResources().getConfiguration().locale.getLanguage();
    }

    String getCarrier() {
        TelephonyManager manager = (TelephonyManager) mContext.getSystemService(Context.TELEPHONY_SERVICE);
        return manager.getNetworkOperator();
    }

    String getAppVersion() {
        try {
            PackageInfo pInfo = mContext.getPackageManager().getPackageInfo(mContext.getPackageName(), 0);
            return pInfo.versionName;
        } catch (Exception e) {
            Log.e("ERR", "Version Name Error : " + e.toString());
        }
        return null;
    }

    String getDeviceUDID() {
        return EuroMobileManager.getInstance().getIdentifierForVendor();
    }

    Bundle getBundleFromIntent(Intent intent) {
        Bundle bundle = new Bundle();

        try {
            /*if (intent.hasExtra("notification")) {
                bundle = intent.getBundleExtra("notification");
            }*/
            if (intent.hasExtra("google.message_id")) {
                Message message = new Message(intent.getExtras());
                bundle.putSerializable("message", message);
            }
            else if (intent.hasExtra("message")) {
                Message message = (Message)intent.getExtras().get("message");
                bundle.putSerializable("message", message);
            }
        }
        catch (Exception ex) {
          ex.printStackTrace();
        }

        return bundle;
    }

    void sendEvent(String eventName, Object params) {
        if (mContext.hasActiveCatalystInstance()) {
            mContext
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit(eventName, params);
        }
    }

    public String convertJSON(Bundle bundle) {
        try {
            JSONObject json = convertJSONObject(bundle);
            return json.toString();
        } catch (JSONException e) {
            return null;
        }
    }

    private JSONObject convertJSONObject(Bundle bundle) throws JSONException {
        JSONObject json = new JSONObject();
        Set<String> keys = bundle.keySet();
        for (String key : keys) {
            Object value = bundle.get(key);
            if (value instanceof Bundle) {
                json.put(key, convertJSONObject((Bundle)value));
            } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                json.put(key, JSONObject.wrap(value));
            } else {
                json.put(key, value);
            }
        }
        return json;
    }
}
