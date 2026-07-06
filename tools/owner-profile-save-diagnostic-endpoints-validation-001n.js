const fs = require("fs");

const api = fs.readFileSync("mobile/src/shared/api/user-profile-api.ts", "utf8");
const route = fs.readFileSync("mobile/src/modules/profile/routes/ProfileCompleteRoute.tsx", "utf8");

const checks = [
  {
    name: "profile_save_candidates_present",
    passed:
      api.includes("const candidates: Array") &&
      api.includes("/api/v2/users/profile") &&
      api.includes("/api/v2/profile") &&
      api.includes("/api/profile"),
  },
  {
    name: "profile_save_no_fake_success",
    passed:
      api.includes("throw new Error(`profile_save_failed:") &&
      !api.includes("return payload as UserProfileApiSnapshot"),
  },
  {
    name: "profile_complete_logs_real_error",
    passed:
      route.includes("[ProfileCompleteRoute] profile save failed") &&
      route.includes("error instanceof Error && error.message"),
  },
];

console.log(JSON.stringify({
  version: "OWNER-PROFILE-SAVE-DIAGNOSTIC-ENDPOINTS-VALIDATION-001N",
  passed: checks.every((check) => check.passed),
  checks,
}, null, 2));

process.exit(checks.every((check) => check.passed) ? 0 : 1);
