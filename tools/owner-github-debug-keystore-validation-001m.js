const fs = require("fs");

const file = ".github/workflows/android-debug-apk.yml";
const content = fs.readFileSync(file, "utf8");

const checks = [
  {
    name: "debug_keystore_step_present",
    passed: content.includes("Generate Android debug keystore"),
  },
  {
    name: "keytool_generates_debug_keystore",
    passed: content.includes("keytool -genkeypair") &&
      content.includes("mobile/android/app/debug.keystore"),
  },
  {
    name: "android_debug_alias_present",
    passed: content.includes("androiddebugkey") &&
      content.includes("-storepass android") &&
      content.includes("-keypass android"),
  },
  {
    name: "keystore_before_build",
    passed: content.indexOf("Generate Android debug keystore") < content.indexOf("Build debug APK"),
  },
];

console.log(JSON.stringify({
  version: "OWNER-GITHUB-DEBUG-KEYSTORE-VALIDATION-001M",
  passed: checks.every((check) => check.passed),
  checks,
}, null, 2));

process.exit(checks.every((check) => check.passed) ? 0 : 1);
