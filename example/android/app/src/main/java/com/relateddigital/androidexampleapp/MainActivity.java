package com.relateddigital.androidexampleapp;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.reactnative_relateddigital.RelatedDigitalManager;
import com.relateddigital.relateddigital_android.model.RDNotificationPriority;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "RelatedDigitalExample";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    RelatedDigitalManager rdManager = RelatedDigitalManager.Companion.getSharedInstance();
    rdManager.injectReactInstanceManager(getReactInstanceManager());
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
      "RelatedDigital Channel",
      "#d1dbbd",
      RDNotificationPriority.NORMAL
    );
  }
}
