const fs = require("fs");

const file = "mobile/src/modules/profile/routes/ProfileCompleteRoute.tsx";
const content = fs.readFileSync(file, "utf8");

const checks = [
  {
    name: "profile_complete_routes_direct_home",
    passed: content.includes('pathname: "/home"') && !content.includes('pathname: "/"'),
  },
  {
    name: "submitted_payload_fallback_used",
    passed:
      content.includes("savedProfile.firstName || payload.firstName") &&
      content.includes("savedProfile.lastName || payload.lastName") &&
      content.includes("savedProfile.username || payload.username"),
  },
  {
    name: "activation_source_param_present",
    passed: content.includes('activationSource: "profileComplete"'),
  },
];

console.log(JSON.stringify({
  version: "OWNER-PROFILE-COMPLETE-DIRECT-HOME-VALIDATION-001Q",
  passed: checks.every((check) => check.passed),
  checks,
}, null, 2));

process.exit(checks.every((check) => check.passed) ? 0 : 1);
