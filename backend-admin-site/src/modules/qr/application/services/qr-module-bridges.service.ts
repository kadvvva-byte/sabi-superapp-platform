export type QrExecuteWalletRouteInput = {
  rail: "sabi_wallet" | "coin_wallet";
  route: "sabi_merchant_payment" | "sabi_user_transfer" | "coin_send" | "coin_receive";
  payerWalletId?: string;
  receiverWalletId?: string;
  amount?: string;
  currency?: string;
  reference?: string;
  rawPayload?: string;
};

export type QrExecuteWalletRouteResult = {
  ok: boolean;
  transactionId?: string;
  status: "success" | "failed";
  reason?: string;
};

export type QrModuleBridgeDeps = {
  withIdempotency?: <T>(key: string | undefined, job: () => Promise<T>) => Promise<T>;
  publishEvent?: (type: string, payload: Record<string, unknown>) => Promise<void>;
  publishRealtime?: (channel: string, event: string, payload: Record<string, unknown>) => Promise<void>;
  recordActivity?: (input: { userId?: string; type: string; data?: Record<string, unknown> }) => Promise<void>;
  pushNotification?: (input: { userId?: string; title: string; body: string; data?: Record<string, unknown> }) => Promise<void>;
  executeWalletRoute?: (input: QrExecuteWalletRouteInput) => Promise<QrExecuteWalletRouteResult>;
};

export class QrModuleBridgesService {
  constructor(private readonly deps: QrModuleBridgeDeps = {}) {}

  async withIdempotency<T>(key: string | undefined, job: () => Promise<T>): Promise<T> {
    if (this.deps.withIdempotency) {
      return this.deps.withIdempotency(key, job);
    }
    return job();
  }

  async publishEvent(type: string, payload: Record<string, unknown>): Promise<void> {
    if (this.deps.publishEvent) {
      await this.deps.publishEvent(type, payload);
    }
  }

  async publishRealtime(channel: string, event: string, payload: Record<string, unknown>): Promise<void> {
    if (this.deps.publishRealtime) {
      await this.deps.publishRealtime(channel, event, payload);
    }
  }

  async recordActivity(input: { userId?: string; type: string; data?: Record<string, unknown> }): Promise<void> {
    if (this.deps.recordActivity) {
      await this.deps.recordActivity(input);
    }
  }

  async pushNotification(input: { userId?: string; title: string; body: string; data?: Record<string, unknown> }): Promise<void> {
    if (this.deps.pushNotification) {
      await this.deps.pushNotification(input);
    }
  }

  async executeWalletRoute(input: QrExecuteWalletRouteInput): Promise<QrExecuteWalletRouteResult> {
    if (this.deps.executeWalletRoute) {
      return this.deps.executeWalletRoute(input);
    }

    return {
      ok: true,
      transactionId: [
        input.rail,
        input.route,
        input.payerWalletId ?? "payer",
        input.receiverWalletId ?? "receiver",
        Date.now(),
      ].join(":"),
      status: "success",
    };
  }
}
