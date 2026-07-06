const fs = require("fs");

const file = "mobile/src/shared/account/unified-account-profile.ts";
const content = fs.readFileSync(file, "utf8");

const saveFnStart = content.indexOf("export async function saveUnifiedAccountProfile");
const backendSave = content.indexOf("const apiProfile = await saveUserProfileToApi", saveFnStart);
const submittedFallback = content.indexOf("const submittedFallback =", saveFnStart);
const effectiveProfile = content.indexOf("const effectiveApiProfile = mergeSubmittedProfileIntoApiProfile", saveFnStart);
const unifiedMap = content.indexOf("const unified = mapApiProfileToUnified(effectiveApiProfile", saveFnStart);

const checks = [
  {
    name: "helper_present",
    passed: content.includes("function mergeSubmittedProfileIntoApiProfile"),
  },
  {
    name: "backend_save_still_required_first",
    passed: saveFnStart >= 0 && backendSave > saveFnStart && submittedFallback > backendSave,
  },
  {
    name: "submitted_fallback_after_backend_success",
    passed: submittedFallback > backendSave && effectiveProfile > submittedFallback && unifiedMap > effectiveProfile,
  },
  {
    name: "profile_completed_preserved",
    passed: content.includes("profileCompleted: Boolean(firstName && lastName && username)"),
  },
  {
    name: "public_profile_uses_effective_response",
    passed:
      content.includes("effectiveApiProfile.displayName") &&
      content.includes("effectiveApiProfile.username"),
  },
];

console.log(JSON.stringify({
  version: "OWNER-PROFILE-SUBMITTED-FALLBACK-VALIDATION-001P",
  passed: checks.every((check) => check.passed),
  positions: { saveFnStart, backendSave, submittedFallback, effectiveProfile, unifiedMap },
  checks,
}, null, 2));

process.exit(checks.every((check) => check.passed) ? 0 : 1);
