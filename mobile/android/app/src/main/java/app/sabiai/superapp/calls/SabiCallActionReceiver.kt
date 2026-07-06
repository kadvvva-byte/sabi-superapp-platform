package app.sabiai.superapp.calls

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.os.Build
import app.sabiai.superapp.MainActivity

class SabiCallActionReceiver : BroadcastReceiver() {
  override fun onReceive(context: Context, intent: Intent) {
    val payload = SabiCallPayload.fromExtras { key -> intent.getStringExtra(key) }
    when (intent.action) {
      SabiCallNotificationService.ACTION_ACCEPT -> {
        SabiCallNotificationService.hide(context)
        SabiCallActionReporter.report(payload, "accepted")
        val serviceIntent = Intent(context, SabiCallForegroundService::class.java).apply {
          action = SabiCallForegroundService.ACTION_START_ACTIVE
          payload.toIntentExtras().forEach { (key, value) -> putExtra(key, value) }
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) context.startForegroundService(serviceIntent) else context.startService(serviceIntent)
        openCall(context, payload, autoAccept = true)
      }
      SabiCallNotificationService.ACTION_DECLINE -> {
        SabiCallNotificationService.hide(context)
        SabiCallActionReporter.report(payload, "declined")
      }
      SabiCallNotificationService.ACTION_END -> {
        SabiCallNotificationService.hide(context)
        SabiCallActionReporter.report(payload, "ended")
      }
    }
  }

  private fun openCall(context: Context, payload: SabiCallPayload, autoAccept: Boolean = false, declined: Boolean = false) {
    val openIntent = Intent(Intent.ACTION_VIEW, payload.routeUri(autoAccept = autoAccept, declined = declined), context, MainActivity::class.java).apply {
      flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_SINGLE_TOP or Intent.FLAG_ACTIVITY_CLEAR_TOP
    }
    context.startActivity(openIntent)
  }
}
