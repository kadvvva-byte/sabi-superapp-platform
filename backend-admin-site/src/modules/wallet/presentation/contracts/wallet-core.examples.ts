import type {
  WalletCoreBusinessTransferRequest,
  WalletCoreCreateBusinessWalletRequest,
  WalletCoreCreateMerchantWalletRequest,
  WalletCoreMerchantPaymentRequest,
  WalletCoreMerchantSettlementRequest,
} from "./wallet-core.contract"

export const walletCoreExamples = {
  createBusinessWallet(): WalletCoreCreateBusinessWalletRequest {
    return {
      id: "biz_wallet_demo_001",
      ownerUserId: "user_001",
      businessId: "business_001",
      businessName: "Sabi Trade LLC",
      displayName: "Sabi Trade",
      defaultCurrency: "USD",
      availableCurrencies: ["USD"],
      balance: 0,
      holdBalance: 0,
      serviceFeePercent: 1.5,
      isBusinessEnabled: true,
      isMerchantEnabled: false,
      status: "active",
    }
  },

  createMerchantWallet(): WalletCoreCreateMerchantWalletRequest {
    return {
      id: "merchant_wallet_demo_001",
      ownerUserId: "user_001",
      businessWalletId: "biz_wallet_demo_001",
      merchantId: "merchant_001",
      merchantName: "Sabi Merchant",
      displayName: "Sabi Merchant POS",
      defaultCurrency: "USD",
      availableCurrencies: ["USD"],
      balance: 0,
      holdBalance: 0,
      serviceFeePercent: 2.5,
      settlementFeePercent: 1,
      isMerchantEnabled: true,
      isSettlementEnabled: true,
      status: "active",
    }
  },

  previewBusinessTransfer(): WalletCoreBusinessTransferRequest {
    return {
      idempotencyKey: "biz-transfer-preview-001",
      amount: 25,
      currency: "USD",
      senderWalletId: "biz_wallet_sender_001",
      senderWalletMeta: {
        ownerUserId: "user_sender",
        businessName: "Sender Business",
        serviceFeePercent: 1.5,
      },
      recipientWalletId: "biz_wallet_recipient_001",
      recipientWalletMeta: {
        ownerUserId: "user_recipient",
        businessName: "Recipient Business",
      },
    }
  },

  executeBusinessTransfer(): WalletCoreBusinessTransferRequest {
    return {
      idempotencyKey: "biz-transfer-execute-001",
      amount: 25,
      currency: "USD",
      senderWalletId: "biz_wallet_sender_001",
      senderWalletMeta: {
        ownerUserId: "user_sender",
        businessName: "Sender Business",
        serviceFeePercent: 1.5,
      },
      recipientWalletId: "biz_wallet_recipient_001",
      recipientWalletMeta: {
        ownerUserId: "user_recipient",
        businessName: "Recipient Business",
      },
    }
  },

  previewMerchantPayment(): WalletCoreMerchantPaymentRequest {
    return {
      idempotencyKey: "merchant-payment-preview-001",
      amount: 50,
      currency: "USD",
      merchantWalletId: "merchant_wallet_demo_001",
      merchantWalletMeta: {
        ownerUserId: "user_001",
        merchantName: "Sabi Merchant",
        businessWalletId: "biz_wallet_demo_001",
        serviceFeePercent: 2.5,
      },
    }
  },

  executeMerchantPayment(): WalletCoreMerchantPaymentRequest {
    return {
      idempotencyKey: "merchant-payment-execute-001",
      amount: 50,
      currency: "USD",
      merchantWalletId: "merchant_wallet_demo_001",
      merchantWalletMeta: {
        ownerUserId: "user_001",
        merchantName: "Sabi Merchant",
        businessWalletId: "biz_wallet_demo_001",
        serviceFeePercent: 2.5,
      },
    }
  },

  previewMerchantSettlement(): WalletCoreMerchantSettlementRequest {
    return {
      idempotencyKey: "merchant-settlement-preview-001",
      amount: 20,
      currency: "USD",
      merchantWalletId: "merchant_wallet_demo_001",
      merchantWalletMeta: {
        ownerUserId: "user_001",
        merchantName: "Sabi Merchant",
        businessWalletId: "biz_wallet_demo_001",
        settlementFeePercent: 1,
      },
    }
  },

  executeMerchantSettlement(): WalletCoreMerchantSettlementRequest {
    return {
      idempotencyKey: "merchant-settlement-execute-001",
      amount: 20,
      currency: "USD",
      merchantWalletId: "merchant_wallet_demo_001",
      merchantWalletMeta: {
        ownerUserId: "user_001",
        merchantName: "Sabi Merchant",
        businessWalletId: "biz_wallet_demo_001",
        settlementFeePercent: 1,
      },
    }
  },
} as const