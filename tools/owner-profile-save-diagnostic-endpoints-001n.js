const fs = require("fs");

const apiFile = "mobile/src/shared/api/user-profile-api.ts";
const routeFile = "mobile/src/modules/profile/routes/ProfileCompleteRoute.tsx";

let api = fs.readFileSync(apiFile, "utf8");
let route = fs.readFileSync(routeFile, "utf8");

const oldSave = `export async function saveUserProfileToApi(
  payload: Partial<UserProfileApiSnapshot> & { userId?: string | null },
  session?: UserProfileApiSession | null,
): Promise<UserProfileApiSnapshot> {
  const targetUserId = normalizeString(payload.userId || session?.currentUserId);
  if (!targetUserId) throw new Error("user_profile_id_required");

  const encoded = encodePath(targetUserId);
  const data = await requestProfileEndpoint(\`/api/v2/users/\${encoded}/profile\`, session, {
    method: "PUT",
    headers: buildHeaders(session, { includeJson: true, includeUser: true }),
    body: JSON.stringify({ ...payload, userId: targetUserId }),
  });

  return normalizeUserProfileSnapshot(data, targetUserId);
}`;

const newSave = `export async function saveUserProfileToApi(
  payload: Partial<UserProfileApiSnapshot> & { userId?: string | null },
  session?: UserProfileApiSession | null,
): Promise<UserProfileApiSnapshot> {
  const targetUserId = normalizeString(payload.userId || session?.currentUserId);
  if (!targetUserId) throw new Error("user_profile_id_required");

  const encoded = encodePath(targetUserId);
  const body = JSON.stringify({ ...payload, userId: targetUserId });
  const headers = buildHeaders(session, { includeJson: true, includeUser: true });

  const candidates: Array<{ method: "PUT" | "PATCH" | "POST"; path: string }> = [
    { method: "PUT", path: \`/api/v2/users/\${encoded}/profile\` },
    { method: "PATCH", path: \`/api/v2/users/\${encoded}/profile\` },
    { method: "PUT", path: \`/api/v2/users/\${encoded}\` },
    { method: "PATCH", path: \`/api/v2/users/\${encoded}\` },
    { method: "POST", path: "/api/v2/users/profile" },
    { method: "POST", path: "/api/v2/profile" },
    { method: "PUT", path: \`/api/users/\${encoded}/profile\` },
    { method: "PATCH", path: \`/api/users/\${encoded}/profile\` },
    { method: "POST", path: "/api/users/profile" },
    { method: "POST", path: "/api/profile" },
  ];

  const errors: string[] = [];

  for (const candidate of candidates) {
    try {
      const data = await requestProfileEndpoint(candidate.path, session, {
        method: candidate.method,
        headers,
        body,
      });

      return normalizeUserProfileSnapshot(data, targetUserId);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error ?? "unknown_profile_save_error");
      errors.push(\`\${candidate.method} \${candidate.path}: \${message}\`);

      if (!/profile_api_404|user_not_found|profile_not_found|not_found|endpoint not found/i.test(message)) {
        console.warn("[user-profile-api] profile save endpoint failed", candidate.method, candidate.path, message);
      }
    }
  }

  console.warn("[user-profile-api] all profile save endpoints failed", errors.join(" | "));
  throw new Error(\`profile_save_failed: \${errors.join(" | ")}\`);
}`;

if (!api.includes(oldSave)) {
  throw new Error("saveUserProfileToApi original block not found");
}

api = api.replace(oldSave, newSave);

route = route.replace(
`    } catch {
      Alert.alert(
        t("profile.completeScreen.saveErrorTitle"),
        t("profile.completeScreen.saveErrorMessage"),
      );
`,
`    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : t("profile.completeScreen.saveErrorMessage");

      console.warn("[ProfileCompleteRoute] profile save failed", message);

      Alert.alert(
        t("profile.completeScreen.saveErrorTitle"),
        message,
      );
`
);

fs.writeFileSync(apiFile, api, "utf8");
fs.writeFileSync(routeFile, route, "utf8");

console.log("OWNER-PROFILE-SAVE-DIAGNOSTIC-ENDPOINTS-001N APPLIED");
console.log("FIXED", apiFile);
console.log("FIXED", routeFile);
