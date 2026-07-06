package app.sabiai.superapp.calls

import android.util.Log
import com.google.firebase.messaging.FirebaseMessagingService
import com.google.firebase.messaging.RemoteMessage

class SabiFirebaseMessagingService : FirebaseMessagingService() {
  override fun onMessageReceived(message: RemoteMessage) {
    val data = message.data
    val type = (data["sabiType"] ?: data["type"] ?: data["callType"] ?: "").lowercase()
    val hasCallId = !data["callId"].isNullOrBlank() || !data["id"].isNullOrBlank()
    val isIncomingCall = type.contains("incoming_call") || type.contains("call") && hasCallId
    if (!isIncomingCall) return

    val payload = SabiCallPayload.fromData(data)

    // System push is for background/closed/locked-phone states only.
    // When the app is already open, realtime JS incoming-call UI handles the call.
    if (SabiCallAppVisibility.isForeground()) {
      Log.d("SabiFirebaseMessaging", "foreground incoming call push suppressed: ${payload.callId}")
      return
    }

    SabiCallNotificationService.showIncomingCall(applicationContext, payload)
  }

  override fun onNewToken(token: String) {
    Log.d("SabiFirebaseMessaging", "FCM token refreshed")
  }
}
