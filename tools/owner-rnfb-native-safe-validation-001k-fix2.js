const fs = require("fs");

const file = "mobile/src/shared/firebase/firebasePhoneAuth.ts";
const content = fs.readFileSync(file, "utf8");

const checks = [
  {
    name: "uses_react_native_native_modules",
    passed: content.includes('import { NativeModules } from "react-native";'),
  },
  {
    name: "checks_rnfb_native_module_before_require",
    passed: content.includes("hasRnfbNativeAppModule") &&
      content.includes("modules.RNFBAppModule") &&
      content.indexOf("if (!hasRnfbNativeAppModule())") < content.indexOf('require("@react-native-firebase/auth")'),
  },
  {
    name: "no_top_level_rnfb_import",
    passed: !content.includes('import auth from "@react-native-firebase/auth"'),
  },
  {
    name: "lazy_require_still_present_for_native_build",
    passed: content.includes('require("@react-native-firebase/auth")'),
  },
];

console.log(JSON.stringify({
  version: "OWNER-RNFB-NATIVE-SAFE-VALIDATION-001K-FIX2",
  passed: checks.every((check) => check.passed),
  checks,
}, null, 2));

process.exit(checks.every((check) => check.passed) ? 0 : 1);
