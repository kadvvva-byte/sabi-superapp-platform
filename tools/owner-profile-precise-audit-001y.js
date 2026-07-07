const fs = require("fs");
const path = require("path");

const languageFile = "mobile/src/shared/data/languages.ts";
const profileFiles = [
  "mobile/src/modules/profile/routes/ProfileMainRoute.tsx",
  "mobile/src/modules/profile/routes/ProfileCompleteRoute.tsx",
  "mobile/src/modules/profile/routes/ProfileVerificationRoute.tsx",
];

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function lineHits(file, regex) {
  return read(file)
    .split(/\r?\n/)
    .map((line, index) => ({ file, line: index + 1, text: line.trim() }))
    .filter((item) => regex.test(item.text));
}

const languagesText = read(languageFile);
const typeBlock = languagesText.match(/export type SupportedLanguageCode =([\s\S]*?);/);
const supportedLanguages = typeBlock
  ? [...typeBlock[1].matchAll(/"([^"]+)"/g)].map((m) => m[1])
  : [];

const profileKeyRegex = /t\(\s*["'](profile\.[^"']+|common\.[^"']+)["']/g;
const usedKeys = [];

for (const file of profileFiles) {
  const text = read(file);
  let match;
  while ((match = profileKeyRegex.exec(text))) {
    usedKeys.push({ file, key: match[1] });
  }
}

const uniqueUsedKeys = [...new Set(usedKeys.map((item) => item.key))].sort();

const localeCandidates = [];
for (const lang of supportedLanguages) {
  localeCandidates.push(`mobile/src/shared/i18n/locales/${lang}.ts`);
  localeCandidates.push(`mobile/src/shared/i18n/locales/mobile-completion/${lang}.ts`);
}

const existingLocaleFiles = [...new Set(localeCandidates.filter((file) => fs.existsSync(file)))];

const missingKeysByLocale = existingLocaleFiles.map((file) => {
  const text = read(file);
  const missing = uniqueUsedKeys.filter((key) => !text.includes(key));
  return {
    file,
    missingCount: missing.length,
    missing,
  };
});

const exactProfileProblems = {
  rawKeyFallbacks: profileFiles.flatMap((file) =>
    lineHits(file, /return\s+key\s*;|translated\s*===\s*key\s*\?\s*key/)
  ),
  emptyFallbacks: profileFiles.flatMap((file) =>
    lineHits(file, /translated\s*===\s*key\s*\?\s*""|return\s+""\s*;/)
  ),
  duplicatePlaceholders: profileFiles.flatMap((file) =>
    lineHits(file, /placeholder=\{t\("profile\.completeScreen\.(firstName|lastName|username)"\)\}/)
  ),
  duplicateUsernamePreview: profileFiles.flatMap((file) =>
    lineHits(file, /profile\.completeScreen\.username"\)\}:/)
  ),
  realAccessBlockers: profileFiles.flatMap((file) =>
    lineHits(file, /openActivationRequiredAlert|shouldBlockSurfaceBeforeFullActivation|isFullActivationRequiredForSurface|isSurfaceAllowedBeforeFullActivation/)
  ),
};

const report = {
  version: "OWNER-PROFILE-PRECISE-AUDIT-001Y",
  createdAt: new Date().toISOString(),
  scope: "precise audit only, no file changes",
  supportedLanguages,
  supportedLanguagesCount: supportedLanguages.length,
  profileFiles,
  profileKeyUsageCount: usedKeys.length,
  uniqueProfileKeyCount: uniqueUsedKeys.length,
  uniqueUsedKeys,
  existingLocaleFiles,
  existingLocaleFilesCount: existingLocaleFiles.length,
  missingKeysByLocale,
  exactProfileProblems,
  summary: {
    rawKeyFallbackCount: exactProfileProblems.rawKeyFallbacks.length,
    emptyFallbackCount: exactProfileProblems.emptyFallbacks.length,
    duplicatePlaceholderCount: exactProfileProblems.duplicatePlaceholders.length,
    duplicateUsernamePreviewCount: exactProfileProblems.duplicateUsernamePreview.length,
    realAccessBlockerCount: exactProfileProblems.realAccessBlockers.length,
    localesWithMissingKeys: missingKeysByLocale.filter((item) => item.missingCount > 0).length,
  },
};

fs.writeFileSync("profile-precise-audit-001y.json", JSON.stringify(report, null, 2), "utf8");

const md = [
  "# OWNER PROFILE PRECISE AUDIT 001Y",
  "",
  "Scope: precise audit only, no file changes.",
  "",
  "## Real supported languages",
  "",
  `Count: ${supportedLanguages.length}`,
  "",
  supportedLanguages.join(", "),
  "",
  "## Summary",
  "",
  `- Profile key usages: ${usedKeys.length}`,
  `- Unique profile/common keys used by profile: ${uniqueUsedKeys.length}`,
  `- Existing locale files checked: ${existingLocaleFiles.length}`,
  `- Locales with missing keys: ${report.summary.localesWithMissingKeys}`,
  `- Raw key fallback count: ${report.summary.rawKeyFallbackCount}`,
  `- Empty fallback count: ${report.summary.emptyFallbackCount}`,
  `- Duplicate placeholder count: ${report.summary.duplicatePlaceholderCount}`,
  `- Duplicate username preview count: ${report.summary.duplicateUsernamePreviewCount}`,
  `- Real access blocker count: ${report.summary.realAccessBlockerCount}`,
  "",
  "## Exact profile problems",
  "",
  ...Object.entries(exactProfileProblems).flatMap(([name, hits]) => [
    `### ${name}: ${hits.length}`,
    ...hits.map((hit) => `- ${hit.file}:${hit.line}: ${hit.text}`),
    "",
  ]),
  "## Missing keys by locale",
  "",
  ...missingKeysByLocale
    .filter((item) => item.missingCount > 0)
    .map((item) => `- ${item.file}: missing ${item.missingCount}`),
  "",
].join("\n");

fs.writeFileSync("profile-precise-audit-001y.md", md, "utf8");

console.log(JSON.stringify({
  version: report.version,
  reportJson: "profile-precise-audit-001y.json",
  reportMarkdown: "profile-precise-audit-001y.md",
  supportedLanguagesCount: report.supportedLanguagesCount,
  supportedLanguages: report.supportedLanguages,
  summary: report.summary,
}, null, 2));
