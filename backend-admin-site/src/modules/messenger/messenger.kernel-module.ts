import type { Server } from "socket.io";

import type { SuperAppModule } from "../../core/kernel/module.interface";
import { MessengerGateway } from "./realtime/messenger.gateway";
import { PresenceGateway } from "./realtime/presence.gateway";
import { PresenceService } from "./realtime/presence.service";

type MessengerKernelRealtimeConfig = {
  io: Server;
};

type MessengerKernelRuntimeState =
  | "idle"
  | "initialized"
  | "started"
  | "stopped"
  | "failed";

type MessengerKernelHealth = {
  name: "messenger";
  state: MessengerKernelRuntimeState;
  hasRealtimeTransport: boolean;
  realtimeAttached: boolean;
  presenceReady: boolean;
  messengerGatewayReady: boolean;
  ownsCalls: false;
  callGatewayAttached: false;
  webRtcGatewayAttached: false;
  webRtcRelayAttached: false;
  initializedAt: string | null;
  startedAt: string | null;
  stoppedAt: string | null;
  updatedAt: string;
  lastError: string | null;
};

let realtimeConfig: MessengerKernelRealtimeConfig | null = null;
let realtimeAttached = false;
let activeMessengerKernel: MessengerKernelModule | null = null;

function nowIso(): string {
  return new Date().toISOString();
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export function configureMessengerKernelModule(config: MessengerKernelRealtimeConfig): void {
  realtimeConfig = config;
}

export function resetMessengerKernelModuleConfig(): void {
  if (activeMessengerKernel) {
    activeMessengerKernel.forceDetachRealtime();
  }

  realtimeConfig = null;
  realtimeAttached = false;
  activeMessengerKernel = null;
}

export class MessengerKernelModule implements SuperAppModule {
  readonly name = "messenger";

  private messengerGateway: MessengerGateway | null = null;
  private presenceService: PresenceService | null = null;
  private presenceGateway: PresenceGateway | null = null;
  private io: Server | null = null;
  private state: MessengerKernelRuntimeState = "idle";
  private initializedAt: string | null = null;
  private startedAt: string | null = null;
  private stoppedAt: string | null = null;
  private updatedAt: string = nowIso();
  private lastError: string | null = null;

  async init(): Promise<void> {
    if (this.state === "initialized" || this.state === "started") {
      this.touch();
      return;
    }

    this.state = "initialized";
    this.initializedAt = this.initializedAt ?? nowIso();
    this.stoppedAt = null;
    this.lastError = null;
    this.touch();

    console.log("[kernel] messenger module initialized");
  }

  async start(): Promise<void> {
    const io = realtimeConfig?.io ?? null;

    if (!io) {
      this.state = "initialized";
      this.lastError = "messenger_realtime_transport_not_configured";
      this.touch();
      console.warn(
        "[kernel] messenger realtime transport is not configured; messenger realtime bootstrap skipped",
      );
      return;
    }

    if (realtimeAttached && activeMessengerKernel && activeMessengerKernel !== this) {
      this.state = "started";
      this.lastError = null;
      this.touch();
      console.log("[kernel] messenger realtime transport already attached by another module instance");
      return;
    }

    if (realtimeAttached && activeMessengerKernel === this) {
      this.state = "started";
      this.lastError = null;
      this.touch();
      console.log("[kernel] messenger realtime transport already attached");
      return;
    }

    try {
      this.io = io;
      this.presenceService = new PresenceService();
      this.presenceGateway = new PresenceGateway(io, this.presenceService);

      this.messengerGateway = new MessengerGateway(io, {
        presenceService: this.presenceService,
        presenceGateway: this.presenceGateway,
      });

      this.messengerGateway.register();

      realtimeAttached = true;
      activeMessengerKernel = this;
      this.state = "started";
      this.startedAt = nowIso();
      this.stoppedAt = null;
      this.lastError = null;
      this.touch();

      console.log("[kernel] messenger module started");
      console.log("[kernel] messenger realtime transport attached");
    } catch (error) {
      this.state = "failed";
      this.lastError = errorMessage(error);
      this.touch();
      this.forceDetachRealtime();
      throw error;
    }
  }

  async stop(): Promise<void> {
    this.forceDetachRealtime();
    this.state = "stopped";
    this.stoppedAt = nowIso();
    this.lastError = null;
    this.touch();

    console.log("[kernel] messenger module stopped");
  }

  forceDetachRealtime(): void {
    if (this.messengerGateway && typeof this.messengerGateway.unregister === "function") {
      this.messengerGateway.unregister();
    }

    this.messengerGateway = null;
    this.presenceGateway = null;
    this.presenceService = null;
    this.io = null;

    if (activeMessengerKernel === this) {
      activeMessengerKernel = null;
    }

    realtimeAttached = false;
    this.touch();
  }

  getHealth(): MessengerKernelHealth {
    return {
      name: this.name,
      state: this.state,
      hasRealtimeTransport: Boolean(realtimeConfig?.io),
      realtimeAttached,
      presenceReady: Boolean(this.presenceService && this.presenceGateway),
      messengerGatewayReady: Boolean(this.messengerGateway),
      ownsCalls: false,
      callGatewayAttached: false,
      webRtcGatewayAttached: false,
      webRtcRelayAttached: false,
      initializedAt: this.initializedAt,
      startedAt: this.startedAt,
      stoppedAt: this.stoppedAt,
      updatedAt: this.updatedAt,
      lastError: this.lastError,
    };
  }

  private touch(): void {
    this.updatedAt = nowIso();
  }
}
