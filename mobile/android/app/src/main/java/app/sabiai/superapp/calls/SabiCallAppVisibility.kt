package app.sabiai.superapp.calls

import android.app.Activity
import android.app.Application
import android.os.Bundle
import java.util.concurrent.atomic.AtomicInteger

object SabiCallAppVisibility : Application.ActivityLifecycleCallbacks {
  private val started = AtomicInteger(0)
  @Volatile private var installed = false

  fun install(application: Application) {
    if (installed) return
    installed = true
    application.registerActivityLifecycleCallbacks(this)
  }

  fun isForeground(): Boolean = started.get() > 0

  override fun onActivityStarted(activity: Activity) { started.incrementAndGet() }
  override fun onActivityStopped(activity: Activity) { started.updateAndGet { value -> if (value > 0) value - 1 else 0 } }
  override fun onActivityCreated(activity: Activity, savedInstanceState: Bundle?) {}
  override fun onActivityResumed(activity: Activity) {}
  override fun onActivityPaused(activity: Activity) {}
  override fun onActivitySaveInstanceState(activity: Activity, outState: Bundle) {}
  override fun onActivityDestroyed(activity: Activity) {}
}
