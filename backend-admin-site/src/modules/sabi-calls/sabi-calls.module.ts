import { Router } from "express";
import type { Server } from "socket.io";
import { SabiCallService } from "./application";
import { InMemorySabiCallRepository } from "./infrastructure/persistence";
import { createSabiCallRouter } from "./infrastructure/routes";
import {
  SabiCallGateway,
  SabiCallRealtimeSocketPublisher,
} from "./infrastructure/realtime";
import {
  createSabiCallTranslationBridge,
  type SabiCallTranslationProvider,
} from "./infrastructure/translation";

export type SabiCallsModuleOptions = {
  io?: Server | null;
  translationProvider?: SabiCallTranslationProvider | null;
};

export type SabiCallsModuleHealth = {
  module: "sabi-calls";
  runtimeId: string;
  repositoryReady: boolean;
  routerReady: boolean;
  serviceReady: boolean;
  realtimeConfigured: boolean;
  realtimeReady: boolean;
  realtimeRegistered: boolean;
  translationProviderReady: boolean;
  translationProviderKey: string | null;
  translationReason: "provider_not_configured" | null;
  createdAt: string;
};

export type SabiCallsModule = {
  router: Router;
  service: SabiCallService;
  gateway: SabiCallGateway | null;
  getHealth(): SabiCallsModuleHealth;
};

function createRuntimeId(): string {
  return `sabi-calls-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
}

export function createSabiCallsModule(
  options: SabiCallsModuleOptions = {}
): SabiCallsModule {
  const createdAt = new Date().toISOString();
  const runtimeId = createRuntimeId();
  const translationBridge = createSabiCallTranslationBridge(
    options.translationProvider ?? null
  );
  const repository = new InMemorySabiCallRepository();
  const publisher = new SabiCallRealtimeSocketPublisher(options.io ?? null);
  const service = new SabiCallService({
    repository,
    realtime: publisher,
    translationProvider: translationBridge.provider,
  });
  const router = createSabiCallRouter(service);
  const gateway = options.io ? new SabiCallGateway(options.io, service) : null;

  return {
    router,
    service,
    gateway,
    getHealth: () => {
      const translationHealth = translationBridge.getHealth();
      const realtimeRegistered = Boolean(gateway?.isRegistered());

      return {
        module: "sabi-calls",
        runtimeId,
        repositoryReady: true,
        routerReady: true,
        serviceReady: true,
        realtimeConfigured: Boolean(options.io),
        realtimeReady: realtimeRegistered,
        realtimeRegistered,
        translationProviderReady: translationHealth.ready,
        translationProviderKey: translationHealth.providerKey,
        translationReason: translationHealth.reason,
        createdAt,
      };
    },
  };
}
