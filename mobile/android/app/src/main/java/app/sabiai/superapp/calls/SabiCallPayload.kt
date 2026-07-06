package app.sabiai.superapp.calls

import android.net.Uri
import com.facebook.react.bridge.ReadableMap
import org.json.JSONObject

internal data class SabiCallPayload(
  val callId: String,
  val kind: String,
  val callerName: String,
  val callerAvatarUrl: String,
  val fromUserId: String,
  val toUserId: String,
  val routePath: String,
  val routeParamsJson: String,
  val actionUrl: String = "",
  val actionToken: String = "",
) {
  fun routeUri(autoAccept: Boolean = false, declined: Boolean = false): Uri {
    val builder = Uri.Builder()
      .scheme("superappmobile")
      .path(routePath.trim().ifBlank { if (kind == "video") "/calls/video" else "/calls/audio" }.removePrefix("/"))
      .appendQueryParameter("callId", callId)
      .appendQueryParameter("kind", kind)
      .appendQueryParameter("incoming", if (declined) "0" else "1")
      .appendQueryParameter("incomingCall", if (declined) "0" else "1")
      .appendQueryParameter("autoAccept", if (autoAccept) "1" else "0")
      .appendQueryParameter("notificationAction", if (declined) "decline" else if (autoAccept) "accept" else "open")
      .appendQueryParameter("action", if (declined) "decline" else if (autoAccept) "accept" else "incoming")
      .appendQueryParameter("fromUserId", fromUserId)
      .appendQueryParameter("peerId", fromUserId)
      .appendQueryParameter("peerUserId", fromUserId)
      .appendQueryParameter("callerId", fromUserId)
      .appendQueryParameter("toUserId", toUserId)
      .appendQueryParameter("targetUserId", toUserId)
      .appendQueryParameter("callerName", callerName)
      .appendQueryParameter("name", callerName)
      .appendQueryParameter("routeParams", routeParamsJson)

    if (callerAvatarUrl.isNotBlank()) builder.appendQueryParameter("avatarUrl", callerAvatarUrl)
    return builder.build()
  }

  fun toIntentExtras(): Map<String, String> = mapOf(
    "callId" to callId,
    "kind" to kind,
    "callerName" to callerName,
    "callerAvatarUrl" to callerAvatarUrl,
    "fromUserId" to fromUserId,
    "toUserId" to toUserId,
    "routePath" to routePath,
    "routeParamsJson" to routeParamsJson,
    "actionUrl" to actionUrl,
    "actionToken" to actionToken,
  )

  companion object {
    private fun normalizeKind(raw: String): String = if (raw.lowercase().contains("video")) "video" else "audio"

    fun fromReadableMap(map: ReadableMap?): SabiCallPayload {
      fun string(key: String): String = try {
        if (map != null && map.hasKey(key) && !map.isNull(key)) map.getString(key)?.trim().orEmpty() else ""
      } catch (_: Throwable) { "" }

      val kind = normalizeKind(listOf(string("kind"), string("type"), string("callType")).joinToString(" "))
      val routePath = string("routePath").ifBlank { if (kind == "video") "/calls/video" else "/calls/audio" }
      val callId = string("callId").ifBlank { string("id") }.ifBlank { System.currentTimeMillis().toString() }
      val callerName = string("callerName").ifBlank { string("contactName") }.ifBlank { string("name") }.ifBlank { "Sabi" }
      val fromUserId = string("fromUserId").ifBlank { string("callerId") }.ifBlank { string("peerId") }
      val toUserId = string("toUserId").ifBlank { string("targetUserId") }.ifBlank { string("receiverUserId") }
      val routeParamsJson = try {
        if (map != null && map.hasKey("routeParams") && !map.isNull("routeParams")) {
          val params = map.getMap("routeParams")
          val json = JSONObject()
          params?.toHashMap()?.forEach { (key, value) -> json.put(key, value?.toString() ?: "") }
          json.toString()
        } else "{}"
      } catch (_: Throwable) { "{}" }

      return SabiCallPayload(
        callId = callId,
        kind = kind,
        callerName = callerName,
        callerAvatarUrl = string("callerAvatarUrl").ifBlank { string("avatarUrl") },
        fromUserId = fromUserId,
        toUserId = toUserId,
        routePath = routePath,
        routeParamsJson = routeParamsJson,
        actionUrl = string("actionUrl"),
        actionToken = string("actionToken"),
      )
    }

    fun fromExtras(get: (String) -> String?): SabiCallPayload {
      val kind = normalizeKind(get("kind") ?: "audio")
      return SabiCallPayload(
        callId = get("callId") ?: System.currentTimeMillis().toString(),
        kind = kind,
        callerName = get("callerName") ?: "Sabi",
        callerAvatarUrl = get("callerAvatarUrl") ?: "",
        fromUserId = get("fromUserId") ?: "",
        toUserId = get("toUserId") ?: "",
        routePath = get("routePath") ?: if (kind == "video") "/calls/video" else "/calls/audio",
        routeParamsJson = get("routeParamsJson") ?: "{}",
        actionUrl = get("actionUrl") ?: "",
        actionToken = get("actionToken") ?: "",
      )
    }

    fun fromData(data: Map<String, String>): SabiCallPayload {
      val kind = normalizeKind(listOf(data["kind"], data["type"], data["callType"]).joinToString(" "))
      val routePath = data["routePath"]?.trim().takeUnless { it.isNullOrBlank() } ?: if (kind == "video") "/calls/video" else "/calls/audio"
      val routeParams = data["routeParams"] ?: data["routeParamsJson"] ?: "{}"
      return SabiCallPayload(
        callId = data["callId"] ?: data["id"] ?: System.currentTimeMillis().toString(),
        kind = kind,
        callerName = data["callerName"] ?: data["fromName"] ?: data["senderName"] ?: data["name"] ?: "Sabi",
        callerAvatarUrl = data["callerAvatarUrl"] ?: data["avatarUrl"] ?: data["photoUrl"] ?: "",
        fromUserId = data["fromUserId"] ?: data["callerId"] ?: data["senderUserId"] ?: data["peerId"] ?: "",
        toUserId = data["toUserId"] ?: data["targetUserId"] ?: data["receiverUserId"] ?: data["userId"] ?: "",
        routePath = routePath,
        routeParamsJson = routeParams,
        actionUrl = data["actionUrl"] ?: "",
        actionToken = data["actionToken"] ?: "",
      )
    }
  }
}
