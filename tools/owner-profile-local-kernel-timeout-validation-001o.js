const fs = require("fs");

const file = "mobile/src/shared/account/unified-account-profile.ts";
const content = fs.readFileSync(file, "utf8");

const saveFnStart = content.indexOf("export async function saveUnifiedAccountProfile");
const apiSavePos = content.indexOf("const apiProfile = await saveUserProfileToApi", saveFnStart);
const localTimeoutPos = content.indexOf("await withLocalProfileTimeout", apiSavePos);

const checks = [
  {
    name: "local_timeout_helper_present",
    passed: content.includes("function withLocalProfileTimeout") &&
      content.includes("local profile task timed out"),
  },
  {
    name: "update_profile_best_effort",
    passed: content.includes("withLocalProfileTimeout") &&
      content.includes('"updateProfile"') &&
      content.includes('"updatePublicProfile"') &&
      content.includes('"clearDraft"'),
  },
  {
    name: "backend_save_still_required_inside_save_function",
    passed:
      saveFnStart >= 0 &&
      apiSavePos > saveFnStart &&
      localTimeoutPos > apiSavePos,
  },
];

console.log(JSON.stringify({
  version: "OWNER-PROFILE-LOCAL-KERNEL-TIMEOUT-VALIDATION-001O-FIX1",
  passed: checks.every((check) => check.passed),
  positions: {
    saveFnStart,
    apiSavePos,
    localTimeoutPos,
  },
  checks,
}, null, 2));

process.exit(checks.every((check) => check.passed) ? 0 : 1);
