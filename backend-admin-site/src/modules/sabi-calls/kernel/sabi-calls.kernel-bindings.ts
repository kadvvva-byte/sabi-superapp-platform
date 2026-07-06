import type { Server } from "socket.io";
import type { SabiCallTranslationProvider } from "../infrastructure/translation";

export type SabiCallsKernelConfig = {
  io?: Server | null;
  translationProvider?: SabiCallTranslationProvider | null;
};

let config: SabiCallsKernelConfig = {
  io: null,
  translationProvider: null,
};

export function configureSabiCallsKernelModule(next: SabiCallsKernelConfig): void {
  config = {
    io: next.io ?? null,
    translationProvider: next.translationProvider ?? null,
  };
}

export function getSabiCallsKernelConfig(): SabiCallsKernelConfig {
  return config;
}

export function resetSabiCallsKernelModuleConfig(): void {
  config = {
    io: null,
    translationProvider: null,
  };
}
