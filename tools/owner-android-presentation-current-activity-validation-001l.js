const fs = require("fs");

const file = "mobile/android/app/src/main/java/app/sabiai/superapp/presentation/SabiPresentationNativeModule.kt";
const content = fs.readFileSync(file, "utf8");

const checks = [
  {
    name: "uses_react_context_current_activity",
    passed: content.includes("private fun activeActivity(): Activity? = reactContext.currentActivity"),
  },
  {
    name: "does_not_use_unresolved_current_activity",
    passed: !content.includes("= currentActivity"),
  },
];

console.log(JSON.stringify({
  version: "OWNER-ANDROID-PRESENTATION-CURRENT-ACTIVITY-VALIDATION-001L",
  passed: checks.every((check) => check.passed),
  checks,
}, null, 2));

process.exit(checks.every((check) => check.passed) ? 0 : 1);
