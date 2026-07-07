const fs = require("fs");

const file = "mobile/app/home.tsx";
const content = fs.readFileSync(file, "utf8");

const checks = [
  {
    name: "direct_gesture_screen_import_present",
    passed: content.includes('import GestureScreen from "../src/modules/home/gesture/GestureScreen";'),
  },
  {
    name: "dynamic_import_removed",
    passed: !content.includes('import("../src/modules/home/gesture/GestureScreen")'),
  },
  {
    name: "lazy_cache_removed",
    passed:
      !content.includes("cachedGestureScreen") &&
      !content.includes("setGestureScreen") &&
      !content.includes("loadingTooLong") &&
      !content.includes("loadFailed"),
  },
  {
    name: "home_returns_gesture_screen_after_auth",
    passed: content.includes("return <GestureScreen />;"),
  },
  {
    name: "safe_fallback_text_preserved",
    passed:
      content.includes("БЕЗОПАСНЫЙ ЗАПУСК") &&
      content.includes("Этот экран не выполняет платежи"),
  },
];

console.log(JSON.stringify({
  version: "OWNER-HOME-DIRECT-GESTURESCREEN-VALIDATION-001R",
  passed: checks.every((check) => check.passed),
  checks,
}, null, 2));

process.exit(checks.every((check) => check.passed) ? 0 : 1);
