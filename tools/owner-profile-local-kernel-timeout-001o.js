const fs = require("fs");

const file = "mobile/src/shared/account/unified-account-profile.ts";
let content = fs.readFileSync(file, "utf8");

if (!content.includes("function withLocalProfileTimeout")) {
  content = content.replace(
`function toKernelAccount(profile: UnifiedAccountProfile, apiProfile?: UserProfileApiSnapshot, currentAccount?: any) {`,
`function withLocalProfileTimeout<T>(label: string, task: Promise<T>, timeoutMs = 2500): Promise<T | null> {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const timeout = new Promise<null>((resolve) => {
    timer = setTimeout(() => {
      console.warn("[unified-account-profile] local profile task timed out", label);
      resolve(null);
    }, timeoutMs);
  });

  return Promise.race([task, timeout])
    .catch((error) => {
      console.warn(
        "[unified-account-profile] local profile task failed",
        label,
        error instanceof Error ? error.message : error,
      );
      return null;
    })
    .finally(() => {
      if (timer) clearTimeout(timer);
    });
}

function toKernelAccount(profile: UnifiedAccountProfile, apiProfile?: UserProfileApiSnapshot, currentAccount?: any) {`
  );
}

const oldBlock = `  await profileKernelFacade.updateProfile(toKernelAccount(unified, apiProfile, current) as any);
  await profileKernelFacade.updatePublicProfile({
    publicName: apiProfile.displayName,
    publicUsername: apiProfile.username,
    publicBio: apiProfile.bio || "",
    publicSubtitle: unified.sabiDisplayId,
  });
  await profileKernelFacade.clearDraft();

  return unified;`;

const newBlock = `  await withLocalProfileTimeout(
    "updateProfile",
    profileKernelFacade.updateProfile(toKernelAccount(unified, apiProfile, current) as any),
  );

  await withLocalProfileTimeout(
    "updatePublicProfile",
    profileKernelFacade.updatePublicProfile({
      publicName: apiProfile.displayName,
      publicUsername: apiProfile.username,
      publicBio: apiProfile.bio || "",
      publicSubtitle: unified.sabiDisplayId,
    }),
  );

  await withLocalProfileTimeout("clearDraft", profileKernelFacade.clearDraft());

  return unified;`;

if (!content.includes(oldBlock) && !content.includes("withLocalProfileTimeout(\"updateProfile\"")) {
  throw new Error("Expected local profile update block was not found");
}

if (content.includes(oldBlock)) {
  content = content.replace(oldBlock, newBlock);
}

fs.writeFileSync(file, content, "utf8");
fs.writeFileSync("tools/owner-profile-local-kernel-timeout-001o.js", fs.readFileSync(__filename, "utf8"), "utf8");

console.log("OWNER-PROFILE-LOCAL-KERNEL-TIMEOUT-001O APPLIED");
console.log("FIXED", file);
