package app.sabiai.superapp.presentation

import android.Manifest
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.content.pm.ActivityInfo
import android.hardware.display.DisplayManager
import android.net.ConnectivityManager
import android.net.wifi.WpsInfo
import android.net.wifi.p2p.WifiP2pConfig
import android.net.wifi.p2p.WifiP2pDevice
import android.net.wifi.p2p.WifiP2pDeviceList
import android.net.wifi.p2p.WifiP2pManager
import android.os.Build
import android.os.Handler
import android.os.Looper
import android.provider.Settings
import android.view.Display
import android.view.View
import android.view.WindowManager
import androidx.core.content.ContextCompat
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableArray
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.PermissionAwareActivity
import com.facebook.react.modules.core.PermissionListener
import java.util.Locale

class SabiPresentationNativeModule(
  private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext), PermissionListener {

  override fun getName(): String = "SabiPresentationNative"

  private val handler = Handler(Looper.getMainLooper())
  private var wifiP2pManager: WifiP2pManager? = null
  private var wifiP2pChannel: WifiP2pManager.Channel? = null
  private var permissionPromise: Promise? = null

  private val castActions = listOf(
    Settings.ACTION_CAST_SETTINGS,
    "android.settings.WIFI_DISPLAY_SETTINGS",
    Settings.ACTION_DISPLAY_SETTINGS,
    Settings.ACTION_WIRELESS_SETTINGS,
    Settings.ACTION_WIFI_SETTINGS,
    Settings.ACTION_SETTINGS,
  )

  private val wifiActions = listOf(
    Settings.ACTION_WIFI_SETTINGS,
    Settings.ACTION_WIRELESS_SETTINGS,
    Settings.ACTION_SETTINGS,
  )

  private val displayActions = listOf(
    Settings.ACTION_DISPLAY_SETTINGS,
    Settings.ACTION_CAST_SETTINGS,
    "android.settings.WIFI_DISPLAY_SETTINGS",
    Settings.ACTION_SETTINGS,
  )

  private fun activeActivity(): Activity? = currentActivity

  private fun launchFirstAvailable(actions: List<String>): WritableMap {
    val result = Arguments.createMap()
    var lastError = ""

    for (action in actions) {
      try {
        val intent = Intent(action).apply {
          addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        }
        val activity = activeActivity()
        val canHandle = intent.resolveActivity(reactContext.packageManager) != null
        if (!canHandle) {
          lastError = "not_available:$action"
          continue
        }

        if (activity != null) {
          activity.startActivity(intent)
        } else {
          reactContext.startActivity(intent)
        }

        result.putBoolean("opened", true)
        result.putString("action", action)
        result.putString("error", "")
        return result
      } catch (error: Throwable) {
        lastError = error.message ?: action
      }
    }

    try {
      val fallback = Intent(Settings.ACTION_SETTINGS).apply { addFlags(Intent.FLAG_ACTIVITY_NEW_TASK) }
      val activity = activeActivity()
      if (activity != null) activity.startActivity(fallback) else reactContext.startActivity(fallback)
      result.putBoolean("opened", true)
      result.putString("action", Settings.ACTION_SETTINGS)
      result.putString("error", lastError)
      return result
    } catch (error: Throwable) {
      result.putBoolean("opened", false)
      result.putString("action", "")
      result.putString("error", error.message ?: lastError)
      return result
    }
  }

  @ReactMethod
  fun openCastPicker(promise: Promise) {
    promise.resolve(launchFirstAvailable(castActions))
  }

  @ReactMethod
  fun openWifiSettings(promise: Promise) {
    promise.resolve(launchFirstAvailable(wifiActions))
  }

  @ReactMethod
  fun openDisplaySettings(promise: Promise) {
    promise.resolve(launchFirstAvailable(displayActions))
  }

  @ReactMethod
  fun openSystemSettings(promise: Promise) {
    promise.resolve(launchFirstAvailable(listOf(Settings.ACTION_SETTINGS)))
  }

  @ReactMethod
  fun enterPresentationMode(landscape: Boolean, promise: Promise) {
    val activity = activeActivity()
    if (activity == null) {
      val result = Arguments.createMap()
      result.putBoolean("applied", false)
      result.putString("reason", "activity_unavailable")
      promise.resolve(result)
      return
    }

    activity.runOnUiThread {
      try {
        activity.window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O_MR1) {
          activity.setShowWhenLocked(false)
          activity.setTurnScreenOn(true)
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
          activity.window.attributes = activity.window.attributes.apply {
            layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES
          }
        }

        @Suppress("DEPRECATION")
        activity.window.decorView.systemUiVisibility =
          View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY or
            View.SYSTEM_UI_FLAG_FULLSCREEN or
            View.SYSTEM_UI_FLAG_HIDE_NAVIGATION or
            View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN or
            View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION or
            View.SYSTEM_UI_FLAG_LAYOUT_STABLE

        activity.requestedOrientation = if (landscape) {
          ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE
        } else {
          ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED
        }

        val result = Arguments.createMap()
        result.putBoolean("applied", true)
        result.putBoolean("keepAwake", true)
        result.putBoolean("fullscreen", true)
        result.putBoolean("landscape", landscape)
        promise.resolve(result)
      } catch (error: Throwable) {
        promise.reject("sabi_presentation_mode_failed", error.message, error)
      }
    }
  }

  @ReactMethod
  fun exitPresentationMode(promise: Promise) {
    val activity = activeActivity()
    if (activity == null) {
      val result = Arguments.createMap()
      result.putBoolean("applied", false)
      result.putString("reason", "activity_unavailable")
      promise.resolve(result)
      return
    }

    activity.runOnUiThread {
      try {
        activity.window.clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
        @Suppress("DEPRECATION")
        activity.window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_LAYOUT_STABLE
        activity.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT

        val result = Arguments.createMap()
        result.putBoolean("applied", true)
        promise.resolve(result)
      } catch (error: Throwable) {
        promise.reject("sabi_presentation_exit_failed", error.message, error)
      }
    }
  }

  @ReactMethod
  fun getPresentationStatus(promise: Promise) {
    try {
      val displayManager = reactContext.getSystemService(Context.DISPLAY_SERVICE) as? DisplayManager
      val allDisplays = displayManager?.displays ?: emptyArray()
      val presentationDisplays = displayManager?.getDisplays(DisplayManager.DISPLAY_CATEGORY_PRESENTATION) ?: emptyArray()
      val routeDisplays = Arguments.createArray()

      allDisplays.forEach { display ->
        routeDisplays.pushMap(displayToMap(display))
      }

      val result = Arguments.createMap()
      result.putBoolean("nativeAvailable", true)
      result.putInt("displayCount", allDisplays.size)
      result.putInt("presentationDisplayCount", presentationDisplays.size)
      result.putBoolean("externalDisplayConnected", presentationDisplays.isNotEmpty() || allDisplays.any { it.displayId != Display.DEFAULT_DISPLAY })
      result.putArray("displays", routeDisplays)
      result.putBoolean("networkConnected", isNetworkConnected())
      promise.resolve(result)
    } catch (error: Throwable) {
      promise.reject("sabi_presentation_status_failed", error.message, error)
    }
  }

  @ReactMethod
  fun getWifiDirectStatus(promise: Promise) {
    try {
      promise.resolve(buildWifiDirectStatus())
    } catch (error: Throwable) {
      promise.reject("sabi_wifi_direct_status_failed", error.message, error)
    }
  }

  @ReactMethod
  fun requestWifiDirectPermissions(promise: Promise) {
    try {
      val missing = missingDangerousPermissions()
      if (missing.isEmpty()) {
        promise.resolve(buildWifiDirectStatus())
        return
      }

      val activity = activeActivity()
      if (activity !is PermissionAwareActivity) {
        val result = buildWifiDirectStatus()
        result.putBoolean("requestStarted", false)
        result.putString("requestError", "permission_activity_unavailable")
        promise.resolve(result)
        return
      }

      permissionPromise = promise
      activity.requestPermissions(missing.toTypedArray(), WIFI_DIRECT_PERMISSION_REQUEST, this)
    } catch (error: Throwable) {
      permissionPromise = null
      promise.reject("sabi_wifi_direct_permission_failed", error.message, error)
    }
  }

  override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, grantResults: IntArray): Boolean {
    if (requestCode != WIFI_DIRECT_PERMISSION_REQUEST) return false
    val promise = permissionPromise
    permissionPromise = null
    val result = buildWifiDirectStatus()
    result.putBoolean("requestStarted", true)
    result.putBoolean("allGrantedAfterRequest", grantResults.isNotEmpty() && grantResults.all { it == PackageManager.PERMISSION_GRANTED })
    promise?.resolve(result)
    return true
  }

  @ReactMethod
  fun scanWifiDirectDevices(timeoutMs: Double, promise: Promise) {
    try {
      val status = buildWifiDirectStatus()
      if (!status.getBooleanSafe("wifiDirectSupported") || !status.getBooleanSafe("permissionsGranted")) {
        val result = Arguments.createMap()
        result.putBoolean("nativeAvailable", true)
        result.putBoolean("scanStarted", false)
        result.putString("error", "wifi_direct_unavailable_or_permission_missing")
        result.putMap("status", status)
        result.putArray("devices", Arguments.createArray())
        promise.resolve(result)
        return
      }

      val manager = getWifiP2pManager()
      val channel = getWifiP2pChannel(manager)
      if (manager == null || channel == null) {
        val result = Arguments.createMap()
        result.putBoolean("nativeAvailable", true)
        result.putBoolean("scanStarted", false)
        result.putString("error", "wifi_p2p_manager_unavailable")
        result.putMap("status", status)
        result.putArray("devices", Arguments.createArray())
        promise.resolve(result)
        return
      }

      manager.discoverPeers(channel, object : WifiP2pManager.ActionListener {
        override fun onSuccess() {
          val delay = timeoutMs.toLong().coerceIn(1500L, 6500L)
          handler.postDelayed({
            requestWifiPeers(manager, channel, true, "", promise)
          }, delay)
        }

        override fun onFailure(reason: Int) {
          val error = wifiP2pReason(reason)
          requestWifiPeers(manager, channel, false, error, promise)
        }
      })
    } catch (error: Throwable) {
      promise.reject("sabi_wifi_direct_scan_failed", error.message, error)
    }
  }

  @ReactMethod
  fun connectWifiDirectDevice(deviceAddress: String, promise: Promise) {
    try {
      val status = buildWifiDirectStatus()
      if (!status.getBooleanSafe("wifiDirectSupported") || !status.getBooleanSafe("permissionsGranted")) {
        val result = Arguments.createMap()
        result.putBoolean("nativeAvailable", true)
        result.putBoolean("connectStarted", false)
        result.putString("deviceAddress", deviceAddress)
        result.putString("error", "wifi_direct_unavailable_or_permission_missing")
        result.putMap("status", status)
        promise.resolve(result)
        return
      }

      val manager = getWifiP2pManager()
      val channel = getWifiP2pChannel(manager)
      if (manager == null || channel == null) {
        val result = Arguments.createMap()
        result.putBoolean("nativeAvailable", true)
        result.putBoolean("connectStarted", false)
        result.putString("deviceAddress", deviceAddress)
        result.putString("error", "wifi_p2p_manager_unavailable")
        promise.resolve(result)
        return
      }

      val config = WifiP2pConfig().apply {
        this.deviceAddress = deviceAddress
        this.wps.setup = WpsInfo.PBC
      }

      manager.connect(channel, config, object : WifiP2pManager.ActionListener {
        override fun onSuccess() {
          val result = Arguments.createMap()
          result.putBoolean("nativeAvailable", true)
          result.putBoolean("connectStarted", true)
          result.putString("deviceAddress", deviceAddress)
          result.putString("error", "")
          result.putString("note", "confirm_on_tv_or_android_if_prompted")
          promise.resolve(result)
        }

        override fun onFailure(reason: Int) {
          val result = Arguments.createMap()
          result.putBoolean("nativeAvailable", true)
          result.putBoolean("connectStarted", false)
          result.putString("deviceAddress", deviceAddress)
          result.putString("error", wifiP2pReason(reason))
          promise.resolve(result)
        }
      })
    } catch (error: Throwable) {
      promise.reject("sabi_wifi_direct_connect_failed", error.message, error)
    }
  }

  private fun requestWifiPeers(
    manager: WifiP2pManager,
    channel: WifiP2pManager.Channel,
    scanStarted: Boolean,
    scanError: String,
    promise: Promise,
  ) {
    try {
      manager.requestPeers(channel) { peers: WifiP2pDeviceList? ->
        val result = Arguments.createMap()
        result.putBoolean("nativeAvailable", true)
        result.putBoolean("scanStarted", scanStarted)
        result.putString("error", scanError)
        result.putMap("status", buildWifiDirectStatus())
        result.putArray("devices", devicesToArray(peers))
        promise.resolve(result)
      }
    } catch (error: Throwable) {
      promise.reject("sabi_wifi_direct_peer_request_failed", error.message, error)
    }
  }

  private fun devicesToArray(peers: WifiP2pDeviceList?): WritableArray {
    val array = Arguments.createArray()
    val sorted = peers?.deviceList?.sortedWith(
      compareByDescending<WifiP2pDevice> { looksLikeTvDevice(it.deviceName, it.primaryDeviceType, it.secondaryDeviceType) }
        .thenBy { it.deviceName?.lowercase(Locale.ROOT) ?: "" }
    ) ?: emptyList()

    sorted.forEach { device ->
      array.pushMap(deviceToMap(device))
    }

    return array
  }

  private fun deviceToMap(device: WifiP2pDevice): WritableMap {
    val model = detectModelFamily(device.deviceName, device.primaryDeviceType, device.secondaryDeviceType)
    val map = Arguments.createMap()
    map.putString("deviceName", device.deviceName ?: "Unknown display")
    map.putString("deviceAddress", device.deviceAddress ?: "")
    map.putString("primaryDeviceType", device.primaryDeviceType ?: "")
    map.putString("secondaryDeviceType", device.secondaryDeviceType ?: "")
    map.putInt("statusCode", device.status)
    map.putString("statusText", wifiDeviceStatus(device.status))
    map.putString("modelFamily", model)
    map.putBoolean("looksLikeTv", looksLikeTvDevice(device.deviceName, device.primaryDeviceType, device.secondaryDeviceType))
    map.putBoolean("connectable", device.deviceAddress?.isNotBlank() == true)
    return map
  }

  private fun detectModelFamily(name: String?, primaryType: String?, secondaryType: String?): String {
    val value = listOfNotNull(name, primaryType, secondaryType).joinToString(" ").lowercase(Locale.ROOT)
    return when {
      value.contains("samsung") || value.contains("smart view") || value.contains("tizen") -> "Samsung Smart View"
      value.contains("lg") || value.contains("webos") || value.contains("screen share") -> "LG Screen Share"
      value.contains("sony") || value.contains("bravia") -> "Sony BRAVIA"
      value.contains("xiaomi") || value.contains("mi tv") || value.contains("mitv") || value.contains("redmi") -> "Xiaomi / Mi TV"
      value.contains("hisense") || value.contains("vidaa") -> "Hisense / VIDAA"
      value.contains("tcl") -> "TCL / Android TV"
      value.contains("philips") || value.contains("ambilight") -> "Philips TV"
      value.contains("panasonic") || value.contains("viera") -> "Panasonic TV"
      value.contains("sharp") || value.contains("aquos") -> "Sharp AQUOS"
      value.contains("toshiba") || value.contains("regza") -> "Toshiba REGZA"
      value.contains("haier") || value.contains("aiwa") -> "Haier / Aiwa TV"
      value.contains("skyworth") || value.contains("coocaa") -> "Skyworth / Coocaa TV"
      value.contains("vizio") || value.contains("smartcast") -> "Vizio SmartCast"
      value.contains("vestel") || value.contains("jvc") || value.contains("grundig") -> "Vestel / JVC / Grundig TV"
      value.contains("huawei") || value.contains("honor") -> "Huawei / Honor Cast"
      value.contains("android tv") || value.contains("google tv") -> "Android / Google TV"
      value.contains("chromecast") || value.contains("google cast") -> "Google Cast"
      value.contains("roku") -> "Roku"
      value.contains("mirascreen") || value.contains("anycast") || value.contains("ezcast") -> "Miracast dongle"
      value.contains("microsoft") && value.contains("display") -> "Microsoft Wireless Display"
      value.contains("aoc") || value.contains("benq") || value.contains("dell") || value.contains("hp") || value.contains("lenovo") -> "Wireless monitor"
      value.contains("tv") || value.contains("display") || value.contains("monitor") || value.contains("miracast") || value.contains("wfd") -> "Wireless display"
      else -> "Nearby Wi‑Fi Direct device"
    }
  }

  private fun looksLikeTvDevice(name: String?, primaryType: String?, secondaryType: String?): Boolean {
    val value = listOfNotNull(name, primaryType, secondaryType).joinToString(" ").lowercase(Locale.ROOT)
    val tvTokens = listOf(
      "tv", "display", "monitor", "screen", "miracast", "wfd", "cast", "smart view",
      "bravia", "webos", "vidaa", "android tv", "google tv", "chromecast", "roku",
      "samsung", "tizen", "lg", "sony", "xiaomi", "mi tv", "mitv", "redmi", "hisense", "tcl",
      "philips", "ambilight", "panasonic", "viera", "sharp", "aquos", "toshiba", "regza",
      "haier", "aiwa", "skyworth", "coocaa", "vizio", "smartcast", "vestel", "jvc", "grundig",
      "huawei", "honor", "mirascreen", "anycast", "ezcast", "microsoft wireless display",
      "aoc", "benq", "dell", "hp", "lenovo"
    )
    return tvTokens.any { value.contains(it) }
  }

  private fun wifiDeviceStatus(status: Int): String {
    return when (status) {
      WifiP2pDevice.AVAILABLE -> "available"
      WifiP2pDevice.INVITED -> "invited"
      WifiP2pDevice.CONNECTED -> "connected"
      WifiP2pDevice.FAILED -> "failed"
      WifiP2pDevice.UNAVAILABLE -> "unavailable"
      else -> "unknown"
    }
  }

  private fun wifiP2pReason(reason: Int): String {
    return when (reason) {
      WifiP2pManager.P2P_UNSUPPORTED -> "p2p_unsupported"
      WifiP2pManager.BUSY -> "p2p_busy"
      WifiP2pManager.ERROR -> "p2p_error"
      else -> "p2p_failure_$reason"
    }
  }

  private fun getWifiP2pManager(): WifiP2pManager? {
    if (wifiP2pManager == null) {
      wifiP2pManager = reactContext.getSystemService(Context.WIFI_P2P_SERVICE) as? WifiP2pManager
    }
    return wifiP2pManager
  }

  private fun getWifiP2pChannel(manager: WifiP2pManager?): WifiP2pManager.Channel? {
    if (manager == null) return null
    if (wifiP2pChannel == null) {
      wifiP2pChannel = manager.initialize(reactContext, Looper.getMainLooper(), null)
    }
    return wifiP2pChannel
  }

  private fun buildWifiDirectStatus(): WritableMap {
    val required = dangerousRuntimePermissions()
    val missing = missingDangerousPermissions()
    val result = Arguments.createMap()
    val requiredArray = Arguments.createArray()
    val missingArray = Arguments.createArray()

    required.forEach { requiredArray.pushString(it) }
    missing.forEach { missingArray.pushString(it) }

    result.putBoolean("nativeAvailable", true)
    result.putBoolean("wifiDirectSupported", reactContext.packageManager.hasSystemFeature(PackageManager.FEATURE_WIFI_DIRECT))
    result.putBoolean("permissionsGranted", missing.isEmpty())
    result.putArray("requiredPermissions", requiredArray)
    result.putArray("missingPermissions", missingArray)
    result.putInt("androidSdk", Build.VERSION.SDK_INT)
    return result
  }

  private fun dangerousRuntimePermissions(): List<String> {
    val permissions = mutableListOf<String>()
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
      permissions.add(Manifest.permission.NEARBY_WIFI_DEVICES)
    }
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
      permissions.add(Manifest.permission.ACCESS_FINE_LOCATION)
    }
    return permissions.distinct()
  }

  private fun missingDangerousPermissions(): List<String> {
    return dangerousRuntimePermissions().filter { permission ->
      ContextCompat.checkSelfPermission(reactContext, permission) != PackageManager.PERMISSION_GRANTED
    }
  }

  private fun WritableMap.getBooleanSafe(key: String): Boolean {
    return try {
      this.getBoolean(key)
    } catch (_: Throwable) {
      false
    }
  }

  private fun displayToMap(display: Display): WritableMap {
    val map = Arguments.createMap()
    map.putInt("id", display.displayId)
    map.putString("name", display.name ?: "Display ${display.displayId}")
    map.putBoolean("isDefault", display.displayId == Display.DEFAULT_DISPLAY)
    map.putBoolean("isExternal", display.displayId != Display.DEFAULT_DISPLAY)
    map.putInt("rotation", display.rotation)
    @Suppress("DEPRECATION")
    map.putInt("width", display.width)
    @Suppress("DEPRECATION")
    map.putInt("height", display.height)
    return map
  }

  @Suppress("DEPRECATION")
  private fun isNetworkConnected(): Boolean {
    return try {
      val manager = reactContext.getSystemService(Context.CONNECTIVITY_SERVICE) as? ConnectivityManager
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
        val network = manager?.activeNetwork ?: return false
        val capabilities = manager.getNetworkCapabilities(network) ?: return false
        capabilities.hasCapability(android.net.NetworkCapabilities.NET_CAPABILITY_INTERNET)
      } else {
        manager?.activeNetworkInfo?.isConnected == true
      }
    } catch (_: Throwable) {
      false
    }
  }

  companion object {
    private const val WIFI_DIRECT_PERMISSION_REQUEST = 7301
  }
}
