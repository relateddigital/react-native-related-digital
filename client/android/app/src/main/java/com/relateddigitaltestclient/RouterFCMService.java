package com.relateddigitaltestclient;

import android.util.Log;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;
import java.util.Map;
import euromsg.com.euromobileandroid.service.EuroMsgFCMHelper;

public class RouterFCMService extends FirebaseMessagingService {

    private static final String TAG = "FCMService";

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
        Map<String, String> data = remoteMessage.getData();

        String emPushSp = data.get("emPushSp");
        if(emPushSp != null) {
            EuroMsgFCMHelper.onMessageReceived(this,remoteMessage);
        }
        else {
            dispatchNonRMCMessage(remoteMessage);
        }
    }

    @Override
    public void onNewToken(String token) {
        Log.d(TAG, "Refreshed token: " + token);

        EuroMsgFCMHelper.onNewToken(this,token);
    }

    private void dispatchNonRMCMessage(RemoteMessage remoteMessage) {
        // RMC Harici Push işleme mantığınızı buraya uygulayın
    }
}