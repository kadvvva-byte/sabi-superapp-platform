const fs = require("fs");

const file = "mobile/src/modules/profile/utils/profileRouteTextFallback.ts";
let content = fs.readFileSync(file, "utf8");

content = content.replace(
  'return current.replaceAll(`{${key}}`, String(value ?? ""));',
  'return current.split(`{${key}}`).join(String(value ?? ""));'
);

fs.writeFileSync(file, content, "utf8");

console.log("OWNER-PROFILE-001Z-FIX1 REPLACEALL FIXED");
console.log("FIXED", file);
