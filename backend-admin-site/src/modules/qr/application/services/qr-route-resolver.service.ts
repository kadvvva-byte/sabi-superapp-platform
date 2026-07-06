export type QrRail = "sabi_wallet" | "coin_wallet";
export type QrPayloadType =
  | "merchant_payment"
  | "user_transfer"
  | "coin_send"
  | "coin_receive";

export type ResolvedQrPayload = {
  version?: string;
  rail: QrRail;
  domain: string;
  payloadType: QrPayloadType;
  destinationId: string;
  amount?: string;
  currency?: string;
  reference?: string;
  signature?: string;
  expiresAt?: string;
  issuer?: string;
};

export type ResolvedQrRoute =
  | "sabi_merchant_payment"
  | "sabi_user_transfer"
  | "coin_send"
  | "coin_receive";

export type ResolveQrRouteOutput = {
  route: ResolvedQrRoute;
  payload: ResolvedQrPayload;
};

export class QrRouteResolverService {
  resolve(rawPayload: string | Record<string, unknown>): ResolveQrRouteOutput {
    const parsed =
      typeof rawPayload === "string"
        ? (JSON.parse(rawPayload || "{}") as Partial<ResolvedQrPayload>)
        : (rawPayload as Partial<ResolvedQrPayload>);

    const payload: ResolvedQrPayload = {
      version: parsed.version,
      rail: parsed.rail === "coin_wallet" ? "coin_wallet" : "sabi_wallet",
      domain: parsed.domain ?? "payment",
      payloadType: (parsed.payloadType as QrPayloadType) ?? "merchant_payment",
      destinationId: parsed.destinationId ?? "",
      amount: parsed.amount,
      currency: parsed.currency ?? "USD",
      reference: parsed.reference,
      signature: parsed.signature,
      expiresAt: parsed.expiresAt,
      issuer: parsed.issuer,
    };

    if (payload.rail === "coin_wallet") {
      return {
        route: payload.payloadType === "coin_receive" ? "coin_receive" : "coin_send",
        payload,
      };
    }

    return {
      route: payload.payloadType === "user_transfer"
        ? "sabi_user_transfer"
        : "sabi_merchant_payment",
      payload,
    };
  }
}
