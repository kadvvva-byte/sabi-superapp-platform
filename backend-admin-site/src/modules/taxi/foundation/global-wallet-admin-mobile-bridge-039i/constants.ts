export const TAXI_GLOBAL_WALLET_ADMIN_MOBILE_BRIDGE_039I_VERSION = 'TAXI-039I-GLOBAL-WALLET-DIRECT-FARE-VISA-CASHBACK-ADMIN-MOBILE-RUNTIME-BRIDGE-NO-MONEY-MOVEMENT-CHECK' as const;

export const TAXI_GLOBAL_WALLET_ADMIN_MOBILE_BRIDGE_039I_ENDPOINTS = Object.freeze({
  publicReadiness: '/api/taxi/wallet-finance/global-wallet-direct-fare-visa-cashback/039i/admin-mobile/readiness',
  mobileSummary: '/api/taxi/wallet-finance/global-wallet-direct-fare-visa-cashback/039i/mobile/summary',
  adminReadiness: '/api/admin/taxi/wallet-finance/global-wallet-direct-fare-visa-cashback/039i/readiness',
  adminSummary: '/api/admin/taxi/wallet-finance/global-wallet-direct-fare-visa-cashback/039i/summary',
} as const);

export const TAXI_GLOBAL_WALLET_ADMIN_MOBILE_BRIDGE_039I_NEXT_STEP = '039J_mobile_global_wallet_direct_fare_visa_cashback_ui_bridge_no_money_movement' as const;
export const TAXI_GLOBAL_WALLET_ADMIN_MOBILE_BRIDGE_039I_REQUIRED_OWNER_APPROVAL = 'I approve TAXI-039I global Wallet direct fare Visa cashback Admin Mobile runtime bridge, no standalone Taxi wallet, direct fare 0 percent commission, Visa 2 percent cashback, no DB migrate, no DB push, no DB write, no wallet mutation, no money movement, no payment, no payout, no provider, no production launch' as const;
