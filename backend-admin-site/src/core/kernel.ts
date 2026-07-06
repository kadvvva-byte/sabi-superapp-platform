// Backend compatibility bridge.
// The real kernel surface lives in src/core/kernel/index.ts.
// This file exists because TypeScript/Node resolve "@/core/kernel" to src/core/kernel.ts before the folder.
// Do not redefine AggregateRoot/DomainError/ports here: re-export the real kernel to avoid fake contract drift.
export * from "./kernel/index";

export type ProvisionUserProfileResult = {
  userId: string;
  profileId?: string | null;
  username?: string | null;
  created?: boolean;
  [key: string]: unknown;
};
