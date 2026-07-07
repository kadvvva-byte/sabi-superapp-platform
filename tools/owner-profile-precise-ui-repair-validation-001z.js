const fs = require("fs");

const files = [
  "mobile/src/modules/profile/routes/ProfileMainRoute.tsx",
  "mobile/src/modules/profile/routes/ProfileCompleteRoute.tsx",
  "mobile/src/modules/profile/routes/ProfileVerificationRoute.tsx",
];

const helper = "mobile/src/modules/profile/utils/profileRouteTextFallback.ts";
const languages = fs.readFileSync("mobile/src/shared/data/languages.ts", "utf8");
const helperText = fs.readFileSync(helper, "utf8");
const routeText = files.map((file) => fs.readFileSync(file, "utf8")).join("\n");

const typeBlock = languages.match(/export type SupportedLanguageCode =([\s\S]*?);/);
const supportedLanguages = typeBlock
  ? [...typeBlock[1].matchAll(/"([^"]+)"/g)].map((match) => match[1])
  : [];

const checks = [
  {
    name: "real_supported_languages_count_25",
    passed: supportedLanguages.length === 25,
  },
  {
    name: "helper_uses_real_supported_language_codes",
    passed:
      helperText.includes("SUPPORTED_LANGUAGE_CODES") &&
      helperText.includes("type SupportedLanguageCode"),
  },
  {
    name: "all_profile_routes_import_helper",
    passed: files.every((file) =>
      fs.readFileSync(file, "utf8").includes("getProfileRouteTextFallback")
    ),
  },
  {
    name: "no_raw_key_return_in_profile_routes",
    passed:
      !routeText.includes("return key;") &&
      !/translated\s*===\s*key\s*\?\s*key/.test(routeText),
  },
  {
    name: "no_empty_translation_fallback_in_profile_main",
    passed:
      !/translated\s*===\s*key\s*\?\s*""/.test(routeText) &&
      !/return\s+""\s*;/.test(routeText),
  },
  {
    name: "complete_placeholders_are_unique",
    passed:
      routeText.includes("firstNamePlaceholder") &&
      routeText.includes("lastNamePlaceholder") &&
      routeText.includes("usernamePlaceholder") &&
      !routeText.includes('placeholder={t("profile.completeScreen.firstName")}') &&
      !routeText.includes('placeholder={t("profile.completeScreen.lastName")}') &&
      !routeText.includes('placeholder={t("profile.completeScreen.username")}'),
  },
  {
    name: "username_preview_no_duplicate_label",
    passed:
      routeText.includes("usernamePreview") &&
      !routeText.includes('{t("profile.completeScreen.username")}:'),
  },
  {
    name: "no_access_blockers_introduced",
    passed:
      !routeText.includes("openActivationRequiredAlert") &&
      !routeText.includes("shouldBlockSurfaceBeforeFullActivation") &&
      !routeText.includes("isFullActivationRequiredForSurface") &&
      !routeText.includes("isSurfaceAllowedBeforeFullActivation"),
  },
];

console.log(JSON.stringify({
  version: "OWNER-PROFILE-PRECISE-UI-REPAIR-VALIDATION-001Z",
  passed: checks.every((check) => check.passed),
  supportedLanguages,
  checks,
}, null, 2));

process.exit(checks.every((check) => check.passed) ? 0 : 1);
