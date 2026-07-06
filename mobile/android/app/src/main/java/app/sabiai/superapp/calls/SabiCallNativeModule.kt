package app.sabiai.superapp.calls

import android.content.Intent
import android.os.Build
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap

class SabiCallNativeModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String = "SabiCallNativeModule"

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun canShowSystemCallOverlay(): Boolean = true

  @ReactMethod
  fun showIncomingCall(payloadMap: ReadableMap?) {
    val payload = SabiCallPayload.fromReadableMap(payloadMap)
    SabiCallNotificationService.showIncomingCall(reactContext, payload)
  }

  @ReactMethod
  fun showSystemCallOverlay(payloadMap: ReadableMap?) {
    showIncomingCall(payloadMap)
  }

  @ReactMethod
  fun updateSystemCallOverlay(payloadMap: ReadableMap?) {
    showOngoingCall(payloadMap)
  }

  @ReactMethod
  fun showOngoingCall(payloadMap: ReadableMap?) {
    val payload = SabiCallPayload.fromReadableMap(payloadMap)
    val intent = Intent(reactContext, SabiCallForegroundService::class.java).apply {
      action = SabiCallForegroundService.ACTION_START_ACTIVE
      payload.toIntentExtras().forEach { (key, value) -> putExtra(key, value) }
    }
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      reactContext.startForegroundService(intent)
    } else {
      reactContext.startService(intent)
    }
  }

  @ReactMethod
  fun hideSystemCallOverlay() {
    endCall()
  }

  @ReactMethod
  fun endCall() {
    SabiCallNotificationService.hide(reactContext)
  }
}
