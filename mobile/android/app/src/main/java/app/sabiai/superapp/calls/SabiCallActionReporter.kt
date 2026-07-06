package app.sabiai.superapp.calls

import android.util.Log
import org.json.JSONObject
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL
import kotlin.concurrent.thread

internal object SabiCallActionReporter {
  fun report(payload: SabiCallPayload, action: String) {
    val url = payload.actionUrl.ifBlank { return }
    thread(name = "SabiCallActionReporter") {
      try {
        val connection = (URL(url).openConnection() as HttpURLConnection).apply {
          requestMethod = "POST"
          connectTimeout = 2500
          readTimeout = 2500
          doOutput = true
          setRequestProperty("Content-Type", "application/json")
          if (payload.actionToken.isNotBlank()) {
            setRequestProperty("Authorization", "Bearer ${payload.actionToken}")
          }
        }
        val body = JSONObject().apply {
          put("callId", payload.callId)
          put("kind", payload.kind)
          put("fromUserId", payload.fromUserId)
          put("toUserId", payload.toUserId)
          put("action", action)
          put("source", "android_native_call_action")
        }.toString()
        OutputStreamWriter(connection.outputStream).use { it.write(body) }
        connection.inputStream.close()
        connection.disconnect()
      } catch (error: Throwable) {
        Log.w("SabiCallActionReporter", "native action report skipped: ${error.message}")
      }
    }
  }
}
