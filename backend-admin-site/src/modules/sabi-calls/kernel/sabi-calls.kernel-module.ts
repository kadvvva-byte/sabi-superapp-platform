import type { Router } from "express";
import type { SuperAppModule } from "../../../core/kernel/module.interface";
import {
  getCallsKernelHealthSnapshot,
  markCallsKernelFailed,
  markCallsKernelInitialized,
  markCallsKernelStarted,
  markCallsKernelStopped,
  registerCallsKernelRuntime,
} from "../../../core/kernel/calls";
import {
  createSabiCallsModule,
  type SabiCallsModule,
} from "../sabi-calls.module";
import type { SabiCallsKernelHealth } from "../contracts";
import { getSabiCallsKernelConfig } from "./sabi-calls.kernel-bindings";

export class SabiCallsKernelModule implements SuperAppModule {
  readonly name = "sabi-calls";

  private module: SabiCallsModule | null = null;
  private initialized = false;
  private started = false;

  async init(): Promise<void> {
    if (this.initialized) {
      this.syncRegistryFromModule();
      return;
    }

    try {
      this.ensureModule();
      this.initialized = true;
      this.syncRegistryFromModule();
      markCallsKernelInitialized({ initialized: true, started: this.started });
    } catch (error) {
      markCallsKernelFailed(error);
      throw error;
    }
  }

  async start(): Promise<void> {
    try {
      if (!this.initialized) {
        await this.init();
      }

      const module = this.ensureModule();

      if (!this.started) {
        module.gateway?.register();
        this.started = true;
      }

      this.syncRegistryFromModule();
      markCallsKernelStarted({ initialized: true, started: true });
    } catch (error) {
      markCallsKernelFailed(error);
      throw error;
    }
  }

  async stop(): Promise<void> {
    try {
      if (this.module?.gateway) {
        this.module.gateway.unregister();
      }

      this.started = false;
      this.syncRegistryFromModule();
      markCallsKernelStopped({ initialized: this.initialized, started: false });
    } catch (error) {
      markCallsKernelFailed(error);
      throw error;
    }
  }

  getRouter(): Router {
    return this.ensureModule().router;
  }

  getService(): SabiCallsModule["service"] {
    return this.ensureModule().service;
  }

  getHealth(): SabiCallsKernelHealth {
    this.syncRegistryFromModule();

    return {
      ...getCallsKernelHealthSnapshot(),
      name: "sabi-calls",
      module: this.module?.getHealth() ?? null,
      ownsMessengerCalls: false,
    };
  }

  private ensureModule(): SabiCallsModule {
    if (this.module) {
      return this.module;
    }

    const config = getSabiCallsKernelConfig();

    this.module = createSabiCallsModule({
      io: config.io ?? null,
      translationProvider: config.translationProvider ?? null,
    });

    this.syncRegistryFromModule();

    return this.module;
  }

  private syncRegistryFromModule(): void {
    const health = this.module?.getHealth() ?? null;

    registerCallsKernelRuntime({
      initialized: this.initialized,
      started: this.started,
      repositoryReady: Boolean(health?.repositoryReady),
      serviceReady: Boolean(health?.serviceReady),
      routerReady: Boolean(health?.routerReady),
      realtimeConfigured: Boolean(health?.realtimeConfigured),
      realtimeReady: Boolean(health?.realtimeReady),
      realtimeRegistered: Boolean(health?.realtimeRegistered),
      translationProviderReady: Boolean(health?.translationProviderReady),
      translationProviderKey: health?.translationProviderKey ?? null,
      translationReason: health?.translationReason ?? null,
    });
  }
}
