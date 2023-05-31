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

  }
}
