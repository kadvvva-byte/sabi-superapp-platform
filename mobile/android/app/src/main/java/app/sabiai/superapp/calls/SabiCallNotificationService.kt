package app.sabiai.superapp.calls

import android.Manifest
import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.media.AudioAttributes
import android.media.RingtoneManager
import android.os.Build
import androidx.core.app.ActivityCompat
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import androidx.core.app.Person
import app.sabiai.superapp.MainActivity
import app.sabiai.superapp.R

internal object SabiCallNotificationService {
  const val INCOMING_CHANNEL_ID = "sabi_calls_incoming_fullscreen_v2"
  const val ACTIVE_CHANNEL_ID = "sabi_calls_active_v2"
  const val INCOMING_NOTIFICATION_ID = 7701001
  const val ACTIVE_NOTIFICATION_ID = 7701002

  const val ACTION_ACCEPT = "app.sabiai.superapp.calls.ACCEPT"
  const val ACTION_DECLINE = "app.sabiai.superapp.calls.DECLINE"
  const val ACTION_END = "app.sabiai.superapp.calls.END"

  fun ensureChannels(context: Context) {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return

    val manager = context.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
    val ringtone = RingtoneManager.getDefaultUri(RingtoneManager.TYPE_RINGTONE)
    val incoming = NotificationChannel(
      INCOMING_CHANNEL_ID,
      "Sabi incoming calls",
      NotificationManager.IMPORTANCE_HIGH,
    ).apply {
      description = "Incoming Sabi audio and video calls"
      lockscreenVisibility = Notification.VISIBILITY_PUBLIC
      enableVibration(true)
      vibrationPattern = longArrayOf(0, 700, 300, 700, 300, 700)
      setSound(
        ringtone,
        AudioAttributes.Builder()
          .setUsage(AudioAttributes.USAGE_NOTIFICATION_RINGTONE)
          .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
          .build(),
      )
    }

    val active = NotificationChannel(
      ACTIVE_CHANNEL_ID,
      "Sabi active calls",
      NotificationManager.IMPORTANCE_LOW,
    ).apply {
      description = "Active Sabi call status"
      lockscreenVisibility = Notification.VISIBILITY_PUBLIC
      setSound(null, null)
      enableVibration(false)
    }

    manager.createNotificationChannel(incoming)
    manager.createNotificationChannel(active)
  }

  fun showIncomingCall(context: Context, payload: SabiCallPayload) {
    ensureChannels(context)

    // Native system notification is for background/closed/locked state only.
    // Foreground app uses realtime JS incoming-call UI and should not be interrupted.
    if (SabiCallAppVisibility.isForeground()) return

    val fullScreenIntent = Intent(Intent.ACTION_VIEW, payload.routeUri(autoAccept = false), context, MainActivity::class.java).apply {
      flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_SINGLE_TOP or Intent.FLAG_ACTIVITY_CLEAR_TOP
    }
    val fullScreenPendingIntent = PendingIntent.getActivity(
      context,
      requestCode(payload.callId, 10),
      fullScreenIntent,
      pendingIntentFlags(),
    )

    val acceptPendingIntent = actionPendingIntent(context, ACTION_ACCEPT, payload, 20)
    val declinePendingIntent = actionPendingIntent(context, ACTION_DECLINE, payload, 30)

    val title = payload.callerName.ifBlank { "Sabi" }
    val text = if (payload.kind == "video") "Видеовызов" else "Аудиовызов"
    val caller = Person.Builder().setName(title).setImportant(true).build()

    val notification = NotificationCompat.Builder(context, INCOMING_CHANNEL_ID)
      .setSmallIcon(R.mipmap.ic_launcher)
      .setContentTitle(title)
      .setContentText(text)
      .setCategory(NotificationCompat.CATEGORY_CALL)
      .setPriority(NotificationCompat.PRIORITY_MAX)
      .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
      .setOngoing(true)
      .setAutoCancel(false)
      .setFullScreenIntent(fullScreenPendingIntent, true)
      .setContentIntent(fullScreenPendingIntent)
      .setStyle(NotificationCompat.CallStyle.forIncomingCall(caller, declinePendingIntent, acceptPendingIntent))
      .addAction(0, "Отклонить", declinePendingIntent)
      .addAction(0, "Принять", acceptPendingIntent)
      .build()

    val manager = NotificationManagerCompat.from(context)
    if (Build.VERSION.SDK_INT < 33 || ActivityCompat.checkSelfPermission(context, Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED) {
      manager.notify(INCOMING_NOTIFICATION_ID, notification)
    }
  }

  fun showActiveCall(context: Context, payload: SabiCallPayload): Notification {
    ensureChannels(context)
    val openIntent = Intent(Intent.ACTION_VIEW, payload.routeUri(autoAccept = false), context, MainActivity::class.java).apply {
      flags = Intent.FLAG_ACTIVITY_NEW_TASK or Intent.FLAG_ACTIVITY_SINGLE_TOP or Intent.FLAG_ACTIVITY_CLEAR_TOP
    }
    val openPendingIntent = PendingIntent.getActivity(context, requestCode(payload.callId, 40), openIntent, pendingIntentFlags())
    val endPendingIntent = actionPendingIntent(context, ACTION_END, payload, 50)

    return NotificationCompat.Builder(context, ACTIVE_CHANNEL_ID)
      .setSmallIcon(R.mipmap.ic_launcher)
      .setContentTitle(payload.callerName.ifBlank { "Sabi call" })
      .setContentText(if (payload.kind == "video") "Видео вызов активен" else "Аудио вызов активен")
      .setCategory(NotificationCompat.CATEGORY_CALL)
      .setPriority(NotificationCompat.PRIORITY_LOW)
      .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
      .setOngoing(true)
      .setContentIntent(openPendingIntent)
      .addAction(0, "Завершить", endPendingIntent)
      .build()
  }

  fun hide(context: Context) {
    NotificationManagerCompat.from(context).cancel(INCOMING_NOTIFICATION_ID)
    NotificationManagerCompat.from(context).cancel(ACTIVE_NOTIFICATION_ID)
    try { context.stopService(Intent(context, SabiCallForegroundService::class.java)) } catch (_: Throwable) {}
  }

  private fun actionPendingIntent(context: Context, action: String, payload: SabiCallPayload, salt: Int): PendingIntent {
    val intent = Intent(context, SabiCallActionReceiver::class.java).apply {
      this.action = action
      payload.toIntentExtras().forEach { (key, value) -> putExtra(key, value) }
    }
    return PendingIntent.getBroadcast(context, requestCode(payload.callId, salt), intent, pendingIntentFlags())
  }

  private fun pendingIntentFlags(): Int =
    PendingIntent.FLAG_UPDATE_CURRENT or if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) PendingIntent.FLAG_IMMUTABLE else 0

  private fun requestCode(callId: String, salt: Int): Int = (callId.hashCode() * 31 + salt).let { if (it == Int.MIN_VALUE) salt else kotlin.math.abs(it) }
}
