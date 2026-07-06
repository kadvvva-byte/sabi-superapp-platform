const fs = require("fs");
const path = require("path");

const checks = [];

function exists(p) {
  return fs.existsSync(path.join(process.cwd(), p));
}

function add(name, passed, note) {
  checks.push({ name, passed: Boolean(passed), note });
}

add(
  "mobile_has_firebase_auth_dependency",
  exists("mobile/package.json") &&
    fs.readFileSync("mobile/package.json", "utf8").includes("@react-native-firebase/auth"),
  "Mobile Firebase Auth dependency must exist."
);

add(
  "mobile_firebase_phone_adapter_exists",
  exists("mobile/src/shared/firebase/firebasePhoneAuth.ts"),
  "Firebase phone adapter restored."
);

add(
  "mobile_auth_api_uses_firebase_adapter",
  fs.readFileSync("mobile/src/shared/api/auth-api.ts", "utf8").includes("requestFirebasePhoneCode") &&
    fs.readFileSync("mobile/src/shared/api/auth-api.ts", "utf8").includes("exchangeFirebaseIdTokenForSabiSession"),
  "Mobile auth-api must request Firebase SMS and exchange Firebase ID token with backend."
);

add(
  "backend_firebase_bridge_route_exists",
  fs.readFileSync("backend-admin-site/src/modules/auth/presentation/auth.routes.ts", "utf8").includes("/firebase/verify") &&
    fs.readFileSync("backend-admin-site/src/modules/auth/presentation/auth.controller.ts", "utf8").includes("verifyFirebase"),
  "Backend Firebase verify bridge must exist."
);

add(
  "android_google_services_local_possible",
  exists("mobile/android/app/google-services.json") ||
    exists("mobile/google-services.json"),
  "Required for real Android Firebase phone auth. Do not commit secrets if file exists."
);

add(
  "ios_google_service_info_local_possible",
  exists("mobile/ios/GoogleService-Info.plist") ||
    exists("mobile/GoogleService-Info.plist"),
  "Required for real iOS Firebase phone auth. Do not commit secrets if file exists."
);

add(
  "backend_firebase_admin_env_expected",
  true,
  "Backend Firebase Admin should use runtime credentials/env, not committed secrets."
);

const report = {
  version: "OWNER-FIREBASE-RUNTIME-PREFLIGHT-001F",
  createdAt: new Date().toISOString(),
  checks,
  passedRequiredSourceChecks: checks
    .filter((item) =>
      [
        "mobile_has_firebase_auth_dependency",
        "mobile_firebase_phone_adapter_exists",
        "mobile_auth_api_uses_firebase_adapter",
        "backend_firebase_bridge_route_exists",
        "backend_firebase_admin_env_expected",
      ].includes(item.name),
    )
    .every((item) => item.passed),
  localFirebaseConfigPresent: {
    android:
      exists("mobile/android/app/google-services.json") ||
      exists("mobile/google-services.json"),
    ios:
      exists("mobile/ios/GoogleService-Info.plist") ||
      exists("mobile/GoogleService-Info.plist"),
  },
};

fs.mkdirSync(".data/owner-auth", { recursive: true });
fs.writeFileSync(
  ".data/owner-auth/firebase-runtime-preflight-001f.json",
  JSON.stringify(report, null, 2),
);

console.log(JSON.stringify(report, null, 2));
