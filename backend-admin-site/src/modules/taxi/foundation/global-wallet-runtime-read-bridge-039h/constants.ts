export const TAXI_GLOBAL_WALLET_RUNTIME_READ_BRIDGE_039H_VERSION = 'TAXI-039H-GLOBAL-WALLET-RUNTIME-READ-BRIDGE-DIRECT-FARE-VISA-CASHBACK-NO-MONEY-MOVEMENT-CHECK' as const;

export const TAXI_GLOBAL_WALLET_RUNTIME_READ_BRIDGE_039H_ENDPOINTS = Object.freeze({
  publicReadiness: '/api/taxi/wallet-finance/global-wallet-direct-fare-visa-cashback/039h/readiness',
  publicSummary: '/api/taxi/wallet-finance/global-wallet-direct-fare-visa-cashback/039h/summary',
  adminReadiness: '/api/admin/taxi/wallet-finance/global-wallet-direct-fare-visa-cashback/039h/readiness',
  adminSummary: '/api/admin/taxi/wallet-finance/global-wallet-direct-fare-visa-cashback/039h/summary',
} as const);

export const TAXI_GLOBAL_WALLET_RUNTIME_READ_BRIDGE_039H_NEXT_STEP = '039I_global_wallet_direct_fare_visa_cashback_admin_mobile_runtime_bridge_no_money_movement' as const;

export const TAXI_GLOBAL_WALLET_RUNTIME_READ_BRIDGE_039H_REQUIRED_OWNER_APPROVAL = 'I approve TAXI-039H global Wallet runtime read bridge for direct fare 0 percent commission and Visa 2 percent cashback, no standalone Taxi wallet, no secrets, no DB migrate, no DB push, no DB write, no wallet mutation, no money movement, no payment, no payout, no provider, no production launch' as const;
