const fs = require("fs");

const file = "mobile/src/shared/account/unified-account-profile.ts";
let content = fs.readFileSync(file, "utf8");

const helper = `
function mergeSubmittedProfileIntoApiProfile(
  apiProfile: UserProfileApiSnapshot,
  submitted: {
    userId: string;
    phone: string;
    firstName: string;
    lastName: string;
    username: string;
    displayName: string;
    fullName: string;
    profileCompleted: boolean;
  },
): UserProfileApiSnapshot {
  const firstName =
    normalizeProfileName(normalizeAccountText(apiProfile.firstName)) ||
    submitted.firstName;

  const lastName =
    normalizeProfileName(normalizeAccountText(apiProfile.lastName)) ||
    submitted.lastName;

  const username =
    normalizeUnifiedUsername(normalizeAccountText(apiProfile.username)) ||
    submitted.username;

  const phone =
    normalizeAccountText(apiProfile.phone) ||
    submitted.phone;

  const displayName =
    normalizeProfileName(normalizeAccountText(apiProfile.displayName)) ||
    submitted.displayName ||
    [firstName, lastName].filter(Boolean).join(" ").trim() ||
    username ||
    phone ||
    submitted.userId;

  const now = new Date().toISOString();

  return {
    ...apiProfile,
    userId: normalizeAccountText(apiProfile.userId) || submitted.userId,
    phone,
    firstName,
    lastName,
    username,
    displayName,
    fullName:
      normalizeProfileName(normalizeAccountText((apiProfile as Record<string, unknown>).fullName)) ||
      submitted.fullName ||
      displayName,
    profileCompleted: Boolean(
      apiProfile.profileCompleted ||
      submitted.profileCompleted ||
      (firstName && lastName && username),
    ),
    createdAt: normalizeAccountText(apiProfile.createdAt) || now,
    updatedAt: normalizeAccountText(apiProfile.updatedAt) || now,
  } as UserProfileApiSnapshot;
}

`;

if (!content.includes("function mergeSubmittedProfileIntoApiProfile")) {
  const anchor = "function mapAccountToUnified(account: any): UnifiedAccountProfile | null {";
  if (!content.includes(anchor)) {
    throw new Error("mapAccountToUnified anchor not found");
  }
  content = content.replace(anchor, helper + anchor);
}

const oldUnified = `  const unified = mapApiProfileToUnified(apiProfile, current);`;

const newUnified = `  const submittedFallback = {
    userId: authenticatedUserId,
    phone,
    firstName,
    lastName,
    username,
    displayName,
    fullName: displayName,
    profileCompleted: Boolean(firstName && lastName && username),
  };

  const effectiveApiProfile = mergeSubmittedProfileIntoApiProfile(
    apiProfile,
    submittedFallback,
  );

  const unified = mapApiProfileToUnified(effectiveApiProfile, {
    ...current,
    ...submittedFallback,
  });`;

if (!content.includes("const effectiveApiProfile = mergeSubmittedProfileIntoApiProfile")) {
  if (!content.includes(oldUnified)) {
    throw new Error("unified mapping block not found");
  }
  content = content.replace(oldUnified, newUnified);
}

content = content.replace(
  "toKernelAccount(unified, apiProfile, current) as any",
  "toKernelAccount(unified, effectiveApiProfile, { ...current, ...submittedFallback }) as any"
);

content = content.replaceAll("apiProfile.displayName", "effectiveApiProfile.displayName");
content = content.replaceAll("apiProfile.username", "effectiveApiProfile.username");
content = content.replaceAll("apiProfile.bio", "effectiveApiProfile.bio");

fs.writeFileSync(file, content, "utf8");

console.log("OWNER-PROFILE-SUBMITTED-FALLBACK-001P APPLIED");
console.log("FIXED", file);
