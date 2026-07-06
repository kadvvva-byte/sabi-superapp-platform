const fs = require("fs");

const file = "mobile/src/shared/account/unified-account-profile.ts";
let content = fs.readFileSync(file, "utf8");

const helperStart = content.indexOf("function mergeSubmittedProfileIntoApiProfile");
const helperEnd = content.indexOf("function mapAccountToUnified", helperStart);

if (helperStart < 0 || helperEnd < 0) {
  throw new Error("mergeSubmittedProfileIntoApiProfile helper range not found");
}

const before = content.slice(0, helperStart);
let helper = content.slice(helperStart, helperEnd);
const after = content.slice(helperEnd);

// Внутри helper должен быть apiProfile, не effectiveApiProfile.
helper = helper
  .replaceAll("effectiveApiProfile.username", "apiProfile.username")
  .replaceAll("effectiveApiProfile.displayName", "apiProfile.displayName")
  .replaceAll("effectiveApiProfile.bio", "apiProfile.bio")
  .replaceAll("effectiveApiProfile.firstName", "apiProfile.firstName")
  .replaceAll("effectiveApiProfile.lastName", "apiProfile.lastName")
  .replaceAll("effectiveApiProfile.phone", "apiProfile.phone")
  .replaceAll("effectiveApiProfile.profileCompleted", "apiProfile.profileCompleted")
  .replaceAll("effectiveApiProfile.createdAt", "apiProfile.createdAt")
  .replaceAll("effectiveApiProfile.updatedAt", "apiProfile.updatedAt")
  .replaceAll("effectiveApiProfile.userId", "apiProfile.userId");

content = before + helper + after;

fs.writeFileSync(file, content, "utf8");

console.log("OWNER-PROFILE-SUBMITTED-FALLBACK-001P-FIX1 APPLIED");
console.log("FIXED", file);
