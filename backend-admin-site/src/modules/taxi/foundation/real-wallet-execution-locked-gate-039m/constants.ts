export const TAXI_REAL_WALLET_EXECUTION_LOCKED_GATE_039M_VERSION = 'TAXI-039M-REAL-WALLET-EXECUTION-LOCKED-GATE-NO-MONEY-MOVEMENT-CHECK' as const;

export const TAXI_REAL_WALLET_EXECUTION_LOCKED_GATE_039M_ENDPOINTS = Object.freeze({
  publicReadiness: '/api/taxi/wallet-finance/real-wallet-execution-locked/039m/readiness',
  publicSummary: '/api/taxi/wallet-finance/real-wallet-execution-locked/039m/summary',
  adminReadiness: '/api/admin/taxi/wallet-finance/real-wallet-execution-locked/039m/readiness',
  adminSummary: '/api/admin/taxi/wallet-finance/real-wallet-execution-locked/039m/summary',
} as const);

export const TAXI_REAL_WALLET_EXECUTION_LOCKED_GATE_039M_NEXT_STEP = '039N_real_wallet_money_movement_requires_separate_exact_owner_approval_and_verified_provider_wallet_runtime' as const;
export const TAXI_REAL_WALLET_EXECUTION_LOCKED_GATE_039M_REQUIRED_OWNER_APPROVAL = 'I approve TAXI-039M real Wallet execution locked gate, no standalone Taxi wallet, direct fare 0 percent commission, Visa 2 percent cashback, lock only, no DB migrate, no DB push, no DB write, no wallet mutation, no money movement, no payment, no payout, no provider, no production launch' as const;
