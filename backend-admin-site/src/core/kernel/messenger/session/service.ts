import { MessengerKernelError } from "../core/errors";
import type {
  MessengerKernelFetch,
  MessengerKernelSessionConfig,
  MessengerKernelSessionSnapshot,
} from "./types";

let runtimeConfig: MessengerKernelSessionConfig | null = null;

function resolveFetchImplementation(
  customFetch?: MessengerKernelFetch,
): MessengerKernelFetch {
  if (customFetch) {
    return customFetch;
  }

  if (typeof fetch === "function") {
    return fetch.bind(globalThis) as MessengerKernelFetch;
  }

  throw new MessengerKernelError({
    code: "MESSENGER_KERNEL_NOT_CONFIGURED",
    message: "Messenger kernel fetch implementation is missing",
  });
}

function normalizeRequiredString(
  value: string | null | undefined,
  fieldName: "apiBaseUrl" | "currentUserId" | "accessToken",
): string {
  const normalized = value?.trim();

  if (!normalized) {
    throw new MessengerKernelError({
      code: "MESSENGER_KERNEL_NOT_CONFIGURED",
      message: `Messenger kernel session returned empty ${fieldName}`,
    });
  }

  return normalized;
}

function normalizeSessionSnapshot(
  snapshot: MessengerKernelSessionSnapshot | null | undefined,
): MessengerKernelSessionSnapshot {
  const apiBaseUrl = normalizeRequiredString(snapshot?.apiBaseUrl, "apiBaseUrl");
  const currentUserId = normalizeRequiredString(
    snapshot?.currentUserId,
    "currentUserId",
  );
  const accessToken = normalizeRequiredString(snapshot?.accessToken, "accessToken");

  return {
    apiBaseUrl: apiBaseUrl.replace(/\/+$/, ""),
    accessToken,
    currentUserId,
  };
}

export function configureMessengerKernelSession(
  config: MessengerKernelSessionConfig,
) {
  runtimeConfig = config;
}

export function resetMessengerKernelSession() {
  runtimeConfig = null;
}

export function assertMessengerKernelSessionConfigured(): MessengerKernelSessionConfig {
  if (!runtimeConfig) {
    throw new MessengerKernelError({
      code: "MESSENGER_KERNEL_NOT_CONFIGURED",
      message: "Messenger kernel session is not configured",
    });
  }

  return runtimeConfig;
}

export async function getMessengerKernelSessionSnapshot(): Promise<MessengerKernelSessionSnapshot> {
  const config = assertMessengerKernelSessionConfigured();
  const snapshot = await config.resolveSession();

  return normalizeSessionSnapshot(snapshot);
}

export async function requireMessengerKernelSessionSnapshot(): Promise<MessengerKernelSessionSnapshot> {
  return getMessengerKernelSessionSnapshot();
}

export function getMessengerKernelFetch(): MessengerKernelFetch {
  const config = assertMessengerKernelSessionConfigured();
  return resolveFetchImplementation(config.fetchImpl);
}