const fs = require("fs");

const file = "mobile/src/shared/firebase/firebasePhoneAuth.ts";
const content = fs.readFileSync(file, "utf8");

const checks = [
  {
    name: "no_top_level_rnfb_import",
    passed: !content.includes('import auth from "@react-native-firebase/auth"'),
  },
  {
    name: "lazy_require_present",
    passed: content.includes('require("@react-native-firebase/auth")'),
  },
  {
    name: "native_missing_error_clear",
    passed: content.includes("Rebuild Android dev client/native APK"),
  },
  {
    name: "availability_export_present",
    passed: content.includes("isFirebaseNativePhoneAuthAvailable"),
  },
];

console.log(JSON.stringify({
  version: "OWNER-RNFB-NATIVE-SAFE-VALIDATION-001K-FIX1",
  passed: checks.every((check) => check.passed),
  checks,
}, null, 2));

process.exit(checks.every((check) => check.passed) ? 0 : 1);
