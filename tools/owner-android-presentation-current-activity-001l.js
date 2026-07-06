const fs = require("fs");

const target = "mobile/android/app/src/main/java/app/sabiai/superapp/presentation/SabiPresentationNativeModule.kt";
let content = fs.readFileSync(target, "utf8");

content = content.replace(
  "  private fun activeActivity(): Activity? = currentActivity",
  "  private fun activeActivity(): Activity? = reactContext.currentActivity"
);

fs.writeFileSync(target, content, "utf8");
fs.writeFileSync("tools/owner-android-presentation-current-activity-001l.js", fs.readFileSync(__filename, "utf8"), "utf8");

console.log("OWNER-ANDROID-PRESENTATION-CURRENT-ACTIVITY-001L APPLIED");
console.log("FIXED", target);
