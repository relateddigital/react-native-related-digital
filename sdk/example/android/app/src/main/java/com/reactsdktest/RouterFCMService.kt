package com.reactsdktest

import android.util.Log
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage
import euromsg.com.euromobileandroid.service.EuroMsgFCMHelper

class RouterFCMService : FirebaseMessagingService() {

    companion object {
        private const val TAG = "RouterFCMService"
    }

    override fun onMessageReceived(remoteMessage: RemoteMessage) {
        val emPushSp = remoteMessage.data["emPushSp"]
        if (emPushSp != null) {
            EuroMsgFCMHelper.onMessageReceived(this, remoteMessage)
        } else {
            dispatchNonRMCMessage(remoteMessage)
        }
    }

    override fun onNewToken(token: String) {
        Log.d(TAG, "Refreshed token: $token")
        EuroMsgFCMHelper.onNewToken(this, token)
    }

    private fun dispatchNonRMCMessage(remoteMessage: RemoteMessage) {
        // RMC dışındaki FCM servislerinden gelen push bildirimlerini burada işleyin
    }
}
