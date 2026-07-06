export type SabiQrMode =
  | "merchant_presented_static"
  | "merchant_presented_dynamic"
  | "merchant_presented_private"
  | "user_presented_dynamic"
  | "identity_static"
  | "attendance_dynamic"
  | "provider_setup";

export type SabiQrSurface =
  | "profile"
  | "wallet"
  | "coin_wallet"
  | "crypto_wallet"
  | "merchant"
  | "business"
  | "messenger"
  | "marketplace"
  | "stream"
  | "taxi"
  | "delivery"
  | "school_attendance"
  | "work_attendance"
  | "virtual_card"
  | "verification";

export type SabiQrFunctionCode =
  | "profile_identity"
  | "wallet_receive"
  | "wallet_user_payment"
  | "merchant_static_entry"
  | "merchant_dynamic_order"
  | "business_invoice"
  | "coin_wallet_receive"
  | "coin_wallet_transfer"
  | "crypto_wallet_receive"
  | "messenger_profile"
  | "messenger_payment"
  | "marketplace_order"
  | "stream_donation"
  | "taxi_trip_payment"
  | "delivery_order"
  | "school_check_in"
  | "school_check_out"
  | "work_check_in"
  | "work_check_out"
  | "virtual_card_issuance"
  | "virtual_card_payment"
  | "provider_api_admin";

export type SabiQrFunctionDefinition = {
  code: SabiQrFunctionCode;
  title: string;
  surface: SabiQrSurface;
  domain: string;
  rail: string;
  mode: SabiQrMode;
  executionPolicy: string;
  riskLevel: "low" | "medium" | "high" | "critical";
  requiresAmount: boolean;
  requiresReference: boolean;
  requiresCounterparty: boolean;
  requiresKyc: boolean;
  requiresKyb: boolean;
  requiresProvider: boolean;
  requiresAdminProviderConfig: boolean;
  tokenTtlSeconds: number;
};

const base = <T extends SabiQrFunctionDefinition>(value: T): T => value;

export const SABI_QR_FUNCTION_CATALOG: SabiQrFunctionDefinition[] = [
  base({ code: "profile_identity", title: "Profile QR", surface: "profile", domain: "identity", rail: "messenger", mode: "identity_static", executionPolicy: "identity_open_only", riskLevel: "low", requiresAmount: false, requiresReference: false, requiresCounterparty: false, requiresKyc: false, requiresKyb: false, requiresProvider: false, requiresAdminProviderConfig: false, tokenTtlSeconds: 2592000 }),
  base({ code: "wallet_receive", title: "Sabi Wallet receive", surface: "wallet", domain: "transfer", rail: "sabi_wallet", mode: "user_presented_dynamic", executionPolicy: "wallet_payment_intent_required", riskLevel: "medium", requiresAmount: true, requiresReference: false, requiresCounterparty: false, requiresKyc: true, requiresKyb: false, requiresProvider: true, requiresAdminProviderConfig: true, tokenTtlSeconds: 180 }),
  base({ code: "wallet_user_payment", title: "Wallet payment code", surface: "wallet", domain: "payment", rail: "sabi_wallet", mode: "user_presented_dynamic", executionPolicy: "wallet_payment_intent_required", riskLevel: "high", requiresAmount: true, requiresReference: false, requiresCounterparty: false, requiresKyc: true, requiresKyb: false, requiresProvider: true, requiresAdminProviderConfig: true, tokenTtlSeconds: 90 }),
  base({ code: "merchant_static_entry", title: "Merchant static entry", surface: "merchant", domain: "payment", rail: "merchant_wallet", mode: "merchant_presented_static", executionPolicy: "server_execute_required", riskLevel: "high", requiresAmount: false, requiresReference: false, requiresCounterparty: false, requiresKyc: true, requiresKyb: true, requiresProvider: true, requiresAdminProviderConfig: true, tokenTtlSeconds: 31536000 }),
  base({ code: "merchant_dynamic_order", title: "Merchant order QR", surface: "merchant", domain: "order", rail: "merchant_wallet", mode: "merchant_presented_dynamic", executionPolicy: "server_execute_required", riskLevel: "high", requiresAmount: true, requiresReference: false, requiresCounterparty: false, requiresKyc: true, requiresKyb: true, requiresProvider: true, requiresAdminProviderConfig: true, tokenTtlSeconds: 300 }),
  base({ code: "business_invoice", title: "Business invoice QR", surface: "business", domain: "invoice", rail: "business_wallet", mode: "merchant_presented_dynamic", executionPolicy: "server_execute_required", riskLevel: "high", requiresAmount: true, requiresReference: false, requiresCounterparty: false, requiresKyc: true, requiresKyb: true, requiresProvider: true, requiresAdminProviderConfig: true, tokenTtlSeconds: 600 }),
  base({ code: "coin_wallet_receive", title: "Coin Wallet receive", surface: "coin_wallet", domain: "transfer", rail: "coin_wallet", mode: "user_presented_dynamic", executionPolicy: "coin_wallet_intent_required", riskLevel: "medium", requiresAmount: true, requiresReference: false, requiresCounterparty: false, requiresKyc: true, requiresKyb: false, requiresProvider: true, requiresAdminProviderConfig: true, tokenTtlSeconds: 180 }),
  base({ code: "coin_wallet_transfer", title: "Coin Wallet transfer", surface: "coin_wallet", domain: "transfer", rail: "coin_wallet", mode: "user_presented_dynamic", executionPolicy: "coin_wallet_intent_required", riskLevel: "medium", requiresAmount: true, requiresReference: false, requiresCounterparty: false, requiresKyc: true, requiresKyb: false, requiresProvider: true, requiresAdminProviderConfig: true, tokenTtlSeconds: 180 }),
  base({ code: "crypto_wallet_receive", title: "Crypto receive QR", surface: "crypto_wallet", domain: "transfer", rail: "crypto_wallet", mode: "identity_static", executionPolicy: "crypto_receive_only", riskLevel: "high", requiresAmount: false, requiresReference: false, requiresCounterparty: false, requiresKyc: true, requiresKyb: false, requiresProvider: true, requiresAdminProviderConfig: true, tokenTtlSeconds: 300 }),
  base({ code: "messenger_profile", title: "Messenger QR", surface: "messenger", domain: "identity", rail: "messenger", mode: "identity_static", executionPolicy: "identity_open_only", riskLevel: "low", requiresAmount: false, requiresReference: false, requiresCounterparty: false, requiresKyc: false, requiresKyb: false, requiresProvider: false, requiresAdminProviderConfig: false, tokenTtlSeconds: 2592000 }),
  base({ code: "messenger_payment", title: "Messenger payment QR", surface: "messenger", domain: "payment", rail: "messenger", mode: "user_presented_dynamic", executionPolicy: "wallet_payment_intent_required", riskLevel: "high", requiresAmount: true, requiresReference: false, requiresCounterparty: false, requiresKyc: true, requiresKyb: false, requiresProvider: true, requiresAdminProviderConfig: true, tokenTtlSeconds: 180 }),
  base({ code: "marketplace_order", title: "Marketplace order QR", surface: "marketplace", domain: "order", rail: "marketplace", mode: "merchant_presented_dynamic", executionPolicy: "server_execute_required", riskLevel: "high", requiresAmount: true, requiresReference: false, requiresCounterparty: false, requiresKyc: true, requiresKyb: true, requiresProvider: true, requiresAdminProviderConfig: true, tokenTtlSeconds: 300 }),
  base({ code: "stream_donation", title: "Stream donation QR", surface: "stream", domain: "donation", rail: "stream", mode: "merchant_presented_dynamic", executionPolicy: "server_execute_required", riskLevel: "high", requiresAmount: true, requiresReference: false, requiresCounterparty: false, requiresKyc: true, requiresKyb: false, requiresProvider: true, requiresAdminProviderConfig: true, tokenTtlSeconds: 180 }),
  base({ code: "taxi_trip_payment", title: "Taxi trip QR", surface: "taxi", domain: "payment", rail: "taxi", mode: "merchant_presented_dynamic", executionPolicy: "server_execute_required", riskLevel: "high", requiresAmount: true, requiresReference: false, requiresCounterparty: false, requiresKyc: true, requiresKyb: false, requiresProvider: true, requiresAdminProviderConfig: true, tokenTtlSeconds: 240 }),
  base({ code: "delivery_order", title: "Delivery order QR", surface: "delivery", domain: "order", rail: "delivery", mode: "merchant_presented_dynamic", executionPolicy: "server_execute_required", riskLevel: "high", requiresAmount: true, requiresReference: false, requiresCounterparty: false, requiresKyc: true, requiresKyb: true, requiresProvider: true, requiresAdminProviderConfig: true, tokenTtlSeconds: 300 }),
  base({ code: "school_check_in", title: "School check-in", surface: "school_attendance", domain: "attendance", rail: "school", mode: "attendance_dynamic", executionPolicy: "attendance_record_required", riskLevel: "medium", requiresAmount: false, requiresReference: false, requiresCounterparty: false, requiresKyc: false, requiresKyb: false, requiresProvider: false, requiresAdminProviderConfig: true, tokenTtlSeconds: 120 }),
  base({ code: "school_check_out", title: "School check-out", surface: "school_attendance", domain: "attendance", rail: "school", mode: "attendance_dynamic", executionPolicy: "attendance_record_required", riskLevel: "medium", requiresAmount: false, requiresReference: false, requiresCounterparty: false, requiresKyc: false, requiresKyb: false, requiresProvider: false, requiresAdminProviderConfig: true, tokenTtlSeconds: 120 }),
  base({ code: "work_check_in", title: "Work check-in", surface: "work_attendance", domain: "attendance", rail: "work", mode: "attendance_dynamic", executionPolicy: "attendance_record_required", riskLevel: "medium", requiresAmount: false, requiresReference: false, requiresCounterparty: false, requiresKyc: false, requiresKyb: true, requiresProvider: false, requiresAdminProviderConfig: true, tokenTtlSeconds: 120 }),
  base({ code: "work_check_out", title: "Work check-out", surface: "work_attendance", domain: "attendance", rail: "work", mode: "attendance_dynamic", executionPolicy: "attendance_record_required", riskLevel: "medium", requiresAmount: false, requiresReference: false, requiresCounterparty: false, requiresKyc: false, requiresKyb: true, requiresProvider: false, requiresAdminProviderConfig: true, tokenTtlSeconds: 120 }),
  base({ code: "virtual_card_issuance", title: "Virtual card issuing", surface: "virtual_card", domain: "card_issuing", rail: "virtual_card_provider", mode: "provider_setup", executionPolicy: "card_issuing_provider_required", riskLevel: "critical", requiresAmount: false, requiresReference: false, requiresCounterparty: false, requiresKyc: true, requiresKyb: false, requiresProvider: true, requiresAdminProviderConfig: true, tokenTtlSeconds: 120 }),
  base({ code: "virtual_card_payment", title: "Virtual card payment QR", surface: "virtual_card", domain: "payment", rail: "virtual_card_provider", mode: "user_presented_dynamic", executionPolicy: "card_issuing_provider_required", riskLevel: "critical", requiresAmount: true, requiresReference: false, requiresCounterparty: false, requiresKyc: true, requiresKyb: false, requiresProvider: true, requiresAdminProviderConfig: true, tokenTtlSeconds: 90 }),
  base({ code: "provider_api_admin", title: "Provider API setup", surface: "verification", domain: "provider_setup", rail: "admin_provider_registry", mode: "provider_setup", executionPolicy: "provider_admin_required", riskLevel: "critical", requiresAmount: false, requiresReference: false, requiresCounterparty: false, requiresKyc: true, requiresKyb: true, requiresProvider: false, requiresAdminProviderConfig: true, tokenTtlSeconds: 90 }),
];

export function findSabiQrFunction(code: unknown): SabiQrFunctionDefinition | null {
  if (typeof code !== "string") return null;
  return SABI_QR_FUNCTION_CATALOG.find((item) => item.code === code) ?? null;
}
