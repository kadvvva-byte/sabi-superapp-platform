/*
  Warnings:

  - You are about to drop the `CallParticipant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CallSession` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AIRuntimeMode" AS ENUM ('PERSONAL', 'BUSINESS', 'EDUCATION');

-- CreateEnum
CREATE TYPE "AIMemoryKind" AS ENUM ('PREFERENCE', 'BUSINESS_CONTEXT', 'STUDY_CONTEXT', 'CUSTOM');

-- CreateEnum
CREATE TYPE "AIMemorySource" AS ENUM ('ASSISTANT_SUGGESTION', 'USER_SAVED', 'IMPORTED');

-- CreateEnum
CREATE TYPE "AIConnectionKind" AS ENUM ('WALLET', 'BUSINESS_WALLET', 'MESSENGER', 'NOTIFICATIONS', 'PROFILE', 'WEB_SEARCH_GATEWAY', 'TRANSLATION_GATEWAY', 'FILE_STORE', 'MEDIA_PLAYER');

-- CreateEnum
CREATE TYPE "AITaskStatus" AS ENUM ('DRAFT', 'QUEUED', 'WAITING_CONFIRMATION', 'COMPLETED', 'BLOCKED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "AIConsentScope" AS ENUM ('INTERNET_SEARCH', 'MEMORY_WRITE', 'WORKSPACE_BILLING', 'PROFILE_LEARNING', 'FILE_READ', 'WRITE_ACTION');

-- CreateEnum
CREATE TYPE "AIFunctionKey" AS ENUM ('CHAT', 'WEB_SEARCH', 'IMAGE_SEARCH', 'VIDEO_SEARCH', 'MUSIC_SEARCH', 'FILE_SEARCH', 'STUDY_ASSISTANT', 'BUSINESS_ASSISTANT', 'TRANSLATION_TEXT', 'TRANSLATION_AUDIO', 'TRANSLATION_VIDEO', 'TRANSLATION_CALL');

-- CreateEnum
CREATE TYPE "SabiCallKind" AS ENUM ('AUDIO', 'VIDEO');

-- CreateEnum
CREATE TYPE "SabiCallSessionStatus" AS ENUM ('RINGING', 'CONNECTING', 'ACTIVE', 'ENDED', 'DECLINED', 'MISSED', 'CANCELLED', 'FAILED');

-- CreateEnum
CREATE TYPE "SabiCallParticipantRole" AS ENUM ('INITIATOR', 'TARGET', 'PARTICIPANT');

-- CreateEnum
CREATE TYPE "SabiCallParticipantStatus" AS ENUM ('INVITED', 'RINGING', 'ACCEPTED', 'JOINED', 'DECLINED', 'LEFT', 'MISSED');

-- CreateEnum
CREATE TYPE "SabiCallToneState" AS ENUM ('NONE', 'INCOMING_RINGTONE', 'OUTGOING_RINGBACK');

-- CreateEnum
CREATE TYPE "SabiCallPresentationStatus" AS ENUM ('IDLE', 'ACTIVE');

-- CreateEnum
CREATE TYPE "SabiCallSignalType" AS ENUM ('OFFER', 'ANSWER', 'ICE_CANDIDATE', 'RENEGOTIATION', 'DATA');

-- CreateEnum
CREATE TYPE "SabiCallEventType" AS ENUM ('CREATED', 'RINGING', 'ACCEPTED', 'DECLINED', 'CANCELLED', 'ENDED', 'FAILED', 'MEDIA_UPDATED', 'TONE_UPDATED', 'SIGNAL_SENT', 'PRESENTATION_STARTED', 'PRESENTATION_STOPPED', 'EFFECT_UPDATED', 'TRANSLATION_REQUESTED', 'TRANSLATION_UNAVAILABLE');

-- CreateEnum
CREATE TYPE "SabiProviderKind" AS ENUM ('GOOGLE_BILLING', 'AIRWALLEX', 'SABI_WALLET_BRIDGE', 'SABI_INTERNAL_POLICY');

-- CreateEnum
CREATE TYPE "SabiProviderRuntimeState" AS ENUM ('PROVIDER_NOT_CONFIGURED', 'READY_DISABLED', 'READY_READONLY', 'LIVE_ALLOWED_LATER', 'BLOCKED');

-- CreateEnum
CREATE TYPE "SabiEntitlementKind" AS ENUM ('STREAM_PREMIUM', 'CREATOR_SUPPORT', 'DIGITAL_GIFT', 'PAID_EFFECT', 'PAID_GAME_ITEM_LOCKED', 'BUSINESS_MERCHANT_FEATURE', 'AI_PREMIUM_FEATURE');

-- CreateEnum
CREATE TYPE "SabiEntitlementStatus" AS ENUM ('PENDING_VERIFICATION', 'ACTIVE', 'HELD', 'REVOKED', 'EXPIRED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "SabiPurchaseProviderStatus" AS ENUM ('RECEIVED', 'SERVER_VERIFICATION_PENDING', 'SERVER_VERIFIED', 'SERVER_REJECTED', 'REVOKED_OR_REFUNDED');

-- CreateEnum
CREATE TYPE "SabiCreatorPayoutHoldReason" AS ENUM ('PROVIDER_SETTLEMENT_PENDING', 'REFUND_WINDOW', 'CHARGEBACK_RISK', 'COMPLIANCE_REVIEW', 'ADMIN_REVIEW', 'PAYOUT_PROVIDER_NOT_CONFIGURED');

-- CreateEnum
CREATE TYPE "StreamGiftRuntimeContext" AS ENUM ('STREAM_LIVE', 'MESSENGER', 'SHORTS', 'CREATOR_PROFILE');

-- CreateEnum
CREATE TYPE "StreamGiftSendIntentStatus" AS ENUM ('DRAFT', 'PROVIDER_AUTH_REQUIRED', 'PROVIDER_AUTHORIZED', 'LEDGER_COMMITTED', 'BLOCKED', 'VOIDED');

-- CreateEnum
CREATE TYPE "StreamGiftLedgerEntryKind" AS ENUM ('SENDER_DEBIT_AUTHORIZATION', 'RECEIVER_PENDING_CREDIT', 'PLATFORM_FEE_RESERVE', 'SETTLEMENT_RELEASE', 'REFUND_REVERSAL', 'VOID_REVERSAL', 'ADMIN_ADJUSTMENT');

-- CreateEnum
CREATE TYPE "StreamGiftCreatorEarningStatus" AS ENUM ('PENDING', 'HELD', 'AVAILABLE', 'PAYOUT_REQUESTED', 'PAID', 'VOIDED');

-- CreateEnum
CREATE TYPE "StreamGiftSettlementGateKind" AS ENUM ('PROVIDER_SETTLEMENT', 'REFUND_WINDOW', 'CHARGEBACK_RISK', 'FRAUD_REVIEW', 'COMPLIANCE_REVIEW', 'TAX_WITHHOLDING', 'KYC_KYB_AML', 'AGE_REGION_POLICY', 'ADMIN_APPROVAL');

-- CreateEnum
CREATE TYPE "StreamGiftSettlementGateStatus" AS ENUM ('PENDING', 'PASSED', 'FAILED', 'WAIVED_BY_ADMIN');

-- CreateEnum
CREATE TYPE "TaxiDriverVerificationStatus" AS ENUM ('draft', 'submitted', 'under_review', 'approved', 'rejected', 'suspended');

-- CreateEnum
CREATE TYPE "TaxiVehicleReviewStatus" AS ENUM ('draft', 'submitted', 'approved', 'rejected', 'suspended');

-- CreateEnum
CREATE TYPE "TaxiTariffRegionStatus" AS ENUM ('draft', 'active', 'paused', 'retired');

-- CreateEnum
CREATE TYPE "TaxiQuoteStatus" AS ENUM ('draft', 'quoted', 'expired', 'accepted', 'cancelled');

-- CreateEnum
CREATE TYPE "TaxiRiderRequestStatus" AS ENUM ('created', 'searching', 'matched', 'cancelled', 'expired');

-- CreateEnum
CREATE TYPE "TaxiDispatchOfferStatus" AS ENUM ('created', 'sent', 'accepted', 'declined', 'expired', 'revoked');

-- CreateEnum
CREATE TYPE "TaxiTripStatus" AS ENUM ('accepted', 'driver_arriving', 'arrived', 'rider_onboard', 'active', 'completed', 'cancelled', 'disputed');

-- CreateEnum
CREATE TYPE "TaxiPaymentHoldStatus" AS ENUM ('planned', 'requires_provider', 'authorized', 'captured', 'released', 'failed', 'refunded');

-- CreateEnum
CREATE TYPE "TaxiSettlementStatus" AS ENUM ('planned', 'under_review', 'approved', 'blocked', 'paid', 'reversed');

-- CreateEnum
CREATE TYPE "TaxiSupportCaseStatus" AS ENUM ('open', 'waiting_for_user', 'under_review', 'resolved', 'rejected', 'escalated');

-- CreateEnum
CREATE TYPE "TaxiDisputeEvidenceType" AS ENUM ('message', 'photo', 'video', 'receipt', 'location', 'system_event');

-- CreateEnum
CREATE TYPE "TaxiSafetyEventType" AS ENUM ('sos', 'route_deviation', 'harassment_report', 'accident', 'fraud_signal', 'manual_admin_flag');

-- CreateEnum
CREATE TYPE "TaxiAuditActorType" AS ENUM ('system', 'admin', 'rider', 'driver', 'provider');

-- CreateEnum
CREATE TYPE "TaxiProviderArea" AS ENUM ('maps_routes_eta', 'dispatch_matching', 'wallet_payment', 'driver_kyc', 'notifications', 'fraud_safety', 'storage_cdn');

-- CreateEnum
CREATE TYPE "TaxiIdempotencyStatus" AS ENUM ('created', 'completed', 'failed', 'expired');

-- CreateEnum
CREATE TYPE "TaxiRatingLedgerSource" AS ENUM ('rider_to_driver', 'driver_to_rider', 'admin_adjustment', 'support_resolution');

-- CreateEnum
CREATE TYPE "TaxiRealtimeShadowStatus" AS ENUM ('planned', 'safe_disabled', 'ready_for_mount', 'mounted_after_approval', 'failed_smoke');

-- DropForeignKey
ALTER TABLE "CallParticipant" DROP CONSTRAINT "CallParticipant_callId_fkey";

-- DropForeignKey
ALTER TABLE "CallParticipant" DROP CONSTRAINT "CallParticipant_userId_fkey";

-- DropForeignKey
ALTER TABLE "CallSession" DROP CONSTRAINT "CallSession_initiatedByUserId_fkey";

-- DropForeignKey
ALTER TABLE "CallSession" DROP CONSTRAINT "CallSession_roomId_fkey";

-- DropTable
DROP TABLE "CallParticipant";

-- DropTable
DROP TABLE "CallSession";

-- DropEnum
DROP TYPE "CallKind";

-- DropEnum
DROP TYPE "CallParticipantStatus";

-- DropEnum
DROP TYPE "CallPresentationStatus";

-- DropEnum
DROP TYPE "CallSessionStatus";

-- CreateTable
CREATE TABLE "AISession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mode" "AIRuntimeMode" NOT NULL DEFAULT 'PERSONAL',
    "locale" TEXT NOT NULL DEFAULT 'ru',
    "workspaceEnabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastActiveAt" TIMESTAMP(3),

    CONSTRAINT "AISession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIConsent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "allowInternetSearch" BOOLEAN NOT NULL DEFAULT true,
    "allowMemoryWrite" BOOLEAN NOT NULL DEFAULT false,
    "allowWorkspaceBilling" BOOLEAN NOT NULL DEFAULT false,
    "allowProfileLearning" BOOLEAN NOT NULL DEFAULT false,
    "allowFileRead" BOOLEAN NOT NULL DEFAULT true,
    "allowWriteActions" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIConsent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIConsentEvent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "scope" "AIConsentScope" NOT NULL,
    "allowed" BOOLEAN NOT NULL DEFAULT false,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadata" JSONB,

    CONSTRAINT "AIConsentEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIMemoryEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "kind" "AIMemoryKind" NOT NULL DEFAULT 'CUSTOM',
    "value" JSONB NOT NULL,
    "confirmedByUser" BOOLEAN NOT NULL DEFAULT false,
    "source" "AIMemorySource" NOT NULL DEFAULT 'USER_SAVED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIMemoryEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIWorkspaceConnection" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kind" "AIConnectionKind" NOT NULL,
    "label" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "config" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AIWorkspaceConnection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AITask" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "mode" "AIRuntimeMode" NOT NULL DEFAULT 'PERSONAL',
    "functionKey" "AIFunctionKey" NOT NULL,
    "status" "AITaskStatus" NOT NULL DEFAULT 'DRAFT',
    "coinPrice" INTEGER NOT NULL DEFAULT 0,
    "requiresConfirmation" BOOLEAN NOT NULL DEFAULT true,
    "input" JSONB,
    "output" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AITask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIUsageEvent" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "featureKey" TEXT NOT NULL,
    "coinAmount" INTEGER NOT NULL DEFAULT 0,
    "status" TEXT NOT NULL DEFAULT 'preview',
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AIUsageEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SabiCallSession" (
    "id" TEXT NOT NULL,
    "kind" "SabiCallKind" NOT NULL,
    "status" "SabiCallSessionStatus" NOT NULL DEFAULT 'RINGING',
    "contextType" TEXT NOT NULL DEFAULT 'direct',
    "contextId" TEXT,
    "initiatedByUserId" TEXT NOT NULL,
    "toneState" "SabiCallToneState" NOT NULL DEFAULT 'OUTGOING_RINGBACK',
    "presentationStatus" "SabiCallPresentationStatus" NOT NULL DEFAULT 'IDLE',
    "presenterUserId" TEXT,
    "presentationStartedAt" TIMESTAMP(3),
    "presentationEndedAt" TIMESTAMP(3),
    "effectState" JSONB,
    "translationState" JSONB,
    "metadata" JSONB,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "failureReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SabiCallSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SabiCallParticipant" (
    "id" TEXT NOT NULL,
    "callId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "SabiCallParticipantRole" NOT NULL DEFAULT 'PARTICIPANT',
    "status" "SabiCallParticipantStatus" NOT NULL DEFAULT 'INVITED',
    "audioEnabled" BOOLEAN NOT NULL DEFAULT true,
    "videoEnabled" BOOLEAN NOT NULL DEFAULT false,
    "speakerEnabled" BOOLEAN NOT NULL DEFAULT false,
    "screenShareEnabled" BOOLEAN NOT NULL DEFAULT false,
    "cameraFacing" TEXT NOT NULL DEFAULT 'front',
    "joinedAt" TIMESTAMP(3),
    "leftAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SabiCallParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SabiCallSignal" (
    "id" TEXT NOT NULL,
    "callId" TEXT NOT NULL,
    "type" "SabiCallSignalType" NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SabiCallSignal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SabiCallEvent" (
    "id" TEXT NOT NULL,
    "callId" TEXT NOT NULL,
    "type" "SabiCallEventType" NOT NULL,
    "actorUserId" TEXT,
    "payload" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SabiCallEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SabiProviderKeyReference" (
    "id" TEXT NOT NULL,
    "providerKind" "SabiProviderKind" NOT NULL,
    "providerKey" TEXT NOT NULL,
    "environment" TEXT NOT NULL,
    "secretReference" TEXT,
    "secretValueStored" BOOLEAN NOT NULL DEFAULT false,
    "rawSecretOutputAllowed" BOOLEAN NOT NULL DEFAULT false,
    "configured" BOOLEAN NOT NULL DEFAULT false,
    "runtimeState" "SabiProviderRuntimeState" NOT NULL DEFAULT 'PROVIDER_NOT_CONFIGURED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SabiProviderKeyReference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SabiProviderReadinessGate" (
    "id" TEXT NOT NULL,
    "providerKind" "SabiProviderKind" NOT NULL,
    "runtimeState" "SabiProviderRuntimeState" NOT NULL DEFAULT 'PROVIDER_NOT_CONFIGURED',
    "providerActivationAllowed" BOOLEAN NOT NULL DEFAULT false,
    "providerCallAllowed" BOOLEAN NOT NULL DEFAULT false,
    "dbWriteAllowed" BOOLEAN NOT NULL DEFAULT false,
    "walletMutationAllowed" BOOLEAN NOT NULL DEFAULT false,
    "moneyMovementAllowed" BOOLEAN NOT NULL DEFAULT false,
    "rawSecretOutputAllowed" BOOLEAN NOT NULL DEFAULT false,
    "rawPurchaseTokenOutputAllowed" BOOLEAN NOT NULL DEFAULT false,
    "lastCheckedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SabiProviderReadinessGate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SabiEntitlement" (
    "id" TEXT NOT NULL,
    "ownerUserId" TEXT,
    "businessAccountId" TEXT,
    "entitlementKind" "SabiEntitlementKind" NOT NULL,
    "status" "SabiEntitlementStatus" NOT NULL DEFAULT 'PENDING_VERIFICATION',
    "sourceProviderKind" "SabiProviderKind" NOT NULL,
    "sourceReferenceId" TEXT,
    "startsAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SabiEntitlement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SabiEntitlementEvent" (
    "id" TEXT NOT NULL,
    "entitlementId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "fromStatus" "SabiEntitlementStatus",
    "toStatus" "SabiEntitlementStatus",
    "reasonCode" TEXT,
    "idempotencyKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SabiEntitlementEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SabiPurchaseVerificationAttempt" (
    "id" TEXT NOT NULL,
    "providerKind" "SabiProviderKind" NOT NULL,
    "providerPurchaseRef" TEXT,
    "purchaseTokenHash" TEXT,
    "rawPurchaseTokenStored" BOOLEAN NOT NULL DEFAULT false,
    "rawPurchaseTokenOutputAllowed" BOOLEAN NOT NULL DEFAULT false,
    "status" "SabiPurchaseProviderStatus" NOT NULL DEFAULT 'RECEIVED',
    "serverVerificationRequired" BOOLEAN NOT NULL DEFAULT true,
    "providerCallAllowedAtCreate" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SabiPurchaseVerificationAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SabiCreatorEarningsLedgerEntry" (
    "id" TEXT NOT NULL,
    "creatorUserId" TEXT NOT NULL,
    "sourceEntitlementId" TEXT,
    "sourceProviderKind" "SabiProviderKind" NOT NULL,
    "amountMinor" BIGINT NOT NULL,
    "currency" TEXT NOT NULL,
    "ledgerDirection" TEXT NOT NULL,
    "payoutEligible" BOOLEAN NOT NULL DEFAULT false,
    "payoutExecutionAllowed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SabiCreatorEarningsLedgerEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SabiCreatorPayoutHold" (
    "id" TEXT NOT NULL,
    "creatorUserId" TEXT NOT NULL,
    "reason" "SabiCreatorPayoutHoldReason" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "payoutExecutionAllowed" BOOLEAN NOT NULL DEFAULT false,
    "releasedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SabiCreatorPayoutHold_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SabiRevenueSharePolicyVersion" (
    "id" TEXT NOT NULL,
    "policyKey" TEXT NOT NULL,
    "version" INTEGER NOT NULL,
    "providerKind" "SabiProviderKind" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "effectiveFrom" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SabiRevenueSharePolicyVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SabiProviderRuntimeAuditEvent" (
    "id" TEXT NOT NULL,
    "providerKind" "SabiProviderKind" NOT NULL,
    "eventType" TEXT NOT NULL,
    "providerActivationAllowed" BOOLEAN NOT NULL DEFAULT false,
    "providerCallAllowed" BOOLEAN NOT NULL DEFAULT false,
    "dbWriteAllowed" BOOLEAN NOT NULL DEFAULT false,
    "walletMutationAllowed" BOOLEAN NOT NULL DEFAULT false,
    "moneyMovementAllowed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SabiProviderRuntimeAuditEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamGiftCatalogItem" (
    "id" TEXT NOT NULL,
    "giftKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "runtimeContexts" "StreamGiftRuntimeContext"[],
    "diamondPrice" INTEGER NOT NULL,
    "assetId" TEXT,
    "assetPosterUrl" TEXT,
    "assetAnimationUrl" TEXT,
    "premiumTier" TEXT NOT NULL DEFAULT 'standard',
    "active" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StreamGiftCatalogItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamGiftSendIntent" (
    "id" TEXT NOT NULL,
    "context" "StreamGiftRuntimeContext" NOT NULL,
    "senderUserId" TEXT NOT NULL,
    "receiverUserId" TEXT NOT NULL,
    "roomId" TEXT,
    "conversationId" TEXT,
    "giftCatalogItemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "grossDiamondMicros" BIGINT NOT NULL,
    "receiverPendingDiamondMicros" BIGINT NOT NULL,
    "platformFeeDiamondMicros" BIGINT NOT NULL,
    "idempotencyKeyHash" TEXT NOT NULL,
    "providerReferenceHash" TEXT,
    "status" "StreamGiftSendIntentStatus" NOT NULL DEFAULT 'DRAFT',
    "blockedReasons" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StreamGiftSendIntent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamGiftLedgerEntry" (
    "id" TEXT NOT NULL,
    "sendIntentId" TEXT NOT NULL,
    "entryKind" "StreamGiftLedgerEntryKind" NOT NULL,
    "partyUserId" TEXT NOT NULL,
    "amountDiamondMicros" BIGINT NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'DIAMOND_MICROS',
    "idempotencyKeyHash" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StreamGiftLedgerEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamGiftCreatorEarning" (
    "id" TEXT NOT NULL,
    "creatorUserId" TEXT NOT NULL,
    "sendIntentId" TEXT NOT NULL,
    "ledgerEntryId" TEXT NOT NULL,
    "pendingDiamondMicros" BIGINT NOT NULL,
    "availableDiamondMicros" BIGINT NOT NULL DEFAULT 0,
    "status" "StreamGiftCreatorEarningStatus" NOT NULL DEFAULT 'PENDING',
    "holdReasons" JSONB,
    "payoutEligible" BOOLEAN NOT NULL DEFAULT false,
    "payoutExecutionAllowed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StreamGiftCreatorEarning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamGiftSettlementGate" (
    "id" TEXT NOT NULL,
    "sendIntentId" TEXT NOT NULL,
    "creatorUserId" TEXT,
    "gateKind" "StreamGiftSettlementGateKind" NOT NULL,
    "status" "StreamGiftSettlementGateStatus" NOT NULL DEFAULT 'PENDING',
    "reasonCode" TEXT,
    "evidenceHash" TEXT,
    "adminReviewRequired" BOOLEAN NOT NULL DEFAULT false,
    "payoutReleaseAllowed" BOOLEAN NOT NULL DEFAULT false,
    "checkedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StreamGiftSettlementGate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StreamGiftDeliveryReceiptAudit" (
    "id" TEXT NOT NULL,
    "sendIntentId" TEXT NOT NULL,
    "clientReceiptId" TEXT NOT NULL,
    "clientPlatform" TEXT NOT NULL DEFAULT 'unknown',
    "ackMode" TEXT NOT NULL DEFAULT 'unknown',
    "receivedEventName" TEXT NOT NULL,
    "receivedAtClientIso" TEXT,
    "deliveredPayloadHash" TEXT,
    "senderUserId" TEXT,
    "receiverUserId" TEXT,
    "roomId" TEXT,
    "conversationId" TEXT,
    "receiptStatus" TEXT NOT NULL DEFAULT 'VERIFIED_AUDIT_ONLY',
    "availableBalanceReleased" BOOLEAN NOT NULL DEFAULT false,
    "payoutReleaseAllowed" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StreamGiftDeliveryReceiptAudit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxiRiderProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "trustStatus" TEXT NOT NULL DEFAULT 'standard',
    "safetyFlagsJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxiRiderProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxiDriverProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "status" "TaxiDriverVerificationStatus" NOT NULL DEFAULT 'draft',
    "adminApprovedAt" TIMESTAMP(3),
    "balanceReserveMinor" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxiDriverProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxiDriverApplication" (
    "id" TEXT NOT NULL,
    "driverProfileId" TEXT NOT NULL,
    "status" "TaxiDriverVerificationStatus" NOT NULL DEFAULT 'submitted',
    "documentBundleJson" JSONB NOT NULL,
    "reviewerAdminId" TEXT,
    "decisionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxiDriverApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxiVehicle" (
    "id" TEXT NOT NULL,
    "driverProfileId" TEXT NOT NULL,
    "status" "TaxiVehicleReviewStatus" NOT NULL DEFAULT 'draft',
    "plateNumberHash" TEXT NOT NULL,
    "vehicleClass" TEXT NOT NULL,
    "inspectionBundleJson" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxiVehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxiDriverVehicleAssignment" (
    "id" TEXT NOT NULL,
    "driverProfileId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxiDriverVehicleAssignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxiTariffRegion" (
    "id" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "zoneId" TEXT NOT NULL,
    "tariffCode" TEXT NOT NULL,
    "status" "TaxiTariffRegionStatus" NOT NULL DEFAULT 'draft',
    "baseFareMinor" INTEGER NOT NULL,
    "perKmMinor" INTEGER NOT NULL,
    "perMinuteMinor" INTEGER NOT NULL,
    "commissionBasisPoints" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxiTariffRegion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxiQuote" (
    "id" TEXT NOT NULL,
    "riderProfileId" TEXT NOT NULL,
    "tariffRegionId" TEXT NOT NULL,
    "status" "TaxiQuoteStatus" NOT NULL DEFAULT 'draft',
    "pickupGeoJson" JSONB NOT NULL,
    "dropoffGeoJson" JSONB NOT NULL,
    "routeProviderRef" TEXT,
    "estimatedFareMinor" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxiQuote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxiRiderRequest" (
    "id" TEXT NOT NULL,
    "riderProfileId" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "tariffRegionId" TEXT NOT NULL,
    "status" "TaxiRiderRequestStatus" NOT NULL DEFAULT 'created',
    "pickupGeoJson" JSONB NOT NULL,
    "dropoffGeoJson" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxiRiderRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxiDispatchOffer" (
    "id" TEXT NOT NULL,
    "riderRequestId" TEXT NOT NULL,
    "driverProfileId" TEXT NOT NULL,
    "status" "TaxiDispatchOfferStatus" NOT NULL DEFAULT 'created',
    "offerExpiresAt" TIMESTAMP(3) NOT NULL,
    "matchingScore" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxiDispatchOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxiTrip" (
    "id" TEXT NOT NULL,
    "dispatchOfferId" TEXT NOT NULL,
    "driverProfileId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "status" "TaxiTripStatus" NOT NULL DEFAULT 'accepted',
    "pickupStartedAt" TIMESTAMP(3),
    "pickedUpAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "finalFareMinor" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxiTrip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxiPaymentHold" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "status" "TaxiPaymentHoldStatus" NOT NULL DEFAULT 'planned',
    "providerReferenceLabel" TEXT,
    "amountMinor" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxiPaymentHold_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxiDriverSettlement" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "driverProfileId" TEXT NOT NULL,
    "status" "TaxiSettlementStatus" NOT NULL DEFAULT 'planned',
    "grossFareMinor" INTEGER NOT NULL,
    "commissionMinor" INTEGER NOT NULL,
    "driverNetMinor" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxiDriverSettlement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxiSupportCase" (
    "id" TEXT NOT NULL,
    "tripId" TEXT,
    "riderProfileId" TEXT,
    "status" "TaxiSupportCaseStatus" NOT NULL DEFAULT 'open',
    "caseType" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "assignedAdminId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxiSupportCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxiDisputeEvidence" (
    "id" TEXT NOT NULL,
    "supportCaseId" TEXT NOT NULL,
    "evidenceType" "TaxiDisputeEvidenceType" NOT NULL,
    "storageReferenceLabel" TEXT NOT NULL,
    "submittedByActorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaxiDisputeEvidence_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxiSafetyEvent" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "eventType" "TaxiSafetyEventType" NOT NULL,
    "severity" INTEGER NOT NULL,
    "payloadJson" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaxiSafetyEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxiAuditLog" (
    "id" TEXT NOT NULL,
    "actorType" "TaxiAuditActorType" NOT NULL,
    "actorId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "payloadJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaxiAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxiProviderReadinessSnapshot" (
    "id" TEXT NOT NULL,
    "providerArea" "TaxiProviderArea" NOT NULL,
    "countryCode" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,
    "configured" BOOLEAN NOT NULL DEFAULT false,
    "referenceLabelsJson" JSONB NOT NULL,
    "readinessJson" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaxiProviderReadinessSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxiIdempotencyRecord" (
    "id" TEXT NOT NULL,
    "idempotencyKey" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "status" "TaxiIdempotencyStatus" NOT NULL DEFAULT 'created',
    "responseFingerprint" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxiIdempotencyRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxiTripRatingLedger" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "riderProfileId" TEXT,
    "driverProfileId" TEXT,
    "source" "TaxiRatingLedgerSource" NOT NULL,
    "stars" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TaxiTripRatingLedger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaxiRealtimeTripShadow" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "status" "TaxiRealtimeShadowStatus" NOT NULL DEFAULT 'planned',
    "lastKnownGeoJson" JSONB,
    "lastEventAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaxiRealtimeTripShadow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AISession_userId_mode_idx" ON "AISession"("userId", "mode");

-- CreateIndex
CREATE UNIQUE INDEX "AIConsent_userId_key" ON "AIConsent"("userId");

-- CreateIndex
CREATE INDEX "AIConsentEvent_userId_scope_idx" ON "AIConsentEvent"("userId", "scope");

-- CreateIndex
CREATE INDEX "AIMemoryEntry_userId_kind_idx" ON "AIMemoryEntry"("userId", "kind");

-- CreateIndex
CREATE INDEX "AIWorkspaceConnection_userId_kind_idx" ON "AIWorkspaceConnection"("userId", "kind");

-- CreateIndex
CREATE INDEX "AITask_userId_status_idx" ON "AITask"("userId", "status");

-- CreateIndex
CREATE INDEX "AIUsageEvent_userId_featureKey_idx" ON "AIUsageEvent"("userId", "featureKey");

-- CreateIndex
CREATE INDEX "SabiCallSession_initiatedByUserId_idx" ON "SabiCallSession"("initiatedByUserId");

-- CreateIndex
CREATE INDEX "SabiCallSession_contextType_contextId_idx" ON "SabiCallSession"("contextType", "contextId");

-- CreateIndex
CREATE INDEX "SabiCallSession_status_idx" ON "SabiCallSession"("status");

-- CreateIndex
CREATE INDEX "SabiCallSession_presentationStatus_idx" ON "SabiCallSession"("presentationStatus");

-- CreateIndex
CREATE INDEX "SabiCallSession_presenterUserId_idx" ON "SabiCallSession"("presenterUserId");

-- CreateIndex
CREATE INDEX "SabiCallSession_createdAt_idx" ON "SabiCallSession"("createdAt");

-- CreateIndex
CREATE INDEX "SabiCallParticipant_callId_idx" ON "SabiCallParticipant"("callId");

-- CreateIndex
CREATE INDEX "SabiCallParticipant_userId_idx" ON "SabiCallParticipant"("userId");

-- CreateIndex
CREATE INDEX "SabiCallParticipant_status_idx" ON "SabiCallParticipant"("status");

-- CreateIndex
CREATE UNIQUE INDEX "SabiCallParticipant_callId_userId_key" ON "SabiCallParticipant"("callId", "userId");

-- CreateIndex
CREATE INDEX "SabiCallSignal_callId_idx" ON "SabiCallSignal"("callId");

-- CreateIndex
CREATE INDEX "SabiCallSignal_fromUserId_idx" ON "SabiCallSignal"("fromUserId");

-- CreateIndex
CREATE INDEX "SabiCallSignal_toUserId_idx" ON "SabiCallSignal"("toUserId");

-- CreateIndex
CREATE INDEX "SabiCallSignal_type_idx" ON "SabiCallSignal"("type");

-- CreateIndex
CREATE INDEX "SabiCallSignal_createdAt_idx" ON "SabiCallSignal"("createdAt");

-- CreateIndex
CREATE INDEX "SabiCallEvent_callId_idx" ON "SabiCallEvent"("callId");

-- CreateIndex
CREATE INDEX "SabiCallEvent_actorUserId_idx" ON "SabiCallEvent"("actorUserId");

-- CreateIndex
CREATE INDEX "SabiCallEvent_type_idx" ON "SabiCallEvent"("type");

-- CreateIndex
CREATE INDEX "SabiCallEvent_createdAt_idx" ON "SabiCallEvent"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "SabiProviderKeyReference_providerKey_key" ON "SabiProviderKeyReference"("providerKey");

-- CreateIndex
CREATE UNIQUE INDEX "SabiEntitlementEvent_idempotencyKey_key" ON "SabiEntitlementEvent"("idempotencyKey");

-- CreateIndex
CREATE UNIQUE INDEX "SabiRevenueSharePolicyVersion_policyKey_version_key" ON "SabiRevenueSharePolicyVersion"("policyKey", "version");

-- CreateIndex
CREATE UNIQUE INDEX "StreamGiftCatalogItem_giftKey_key" ON "StreamGiftCatalogItem"("giftKey");

-- CreateIndex
CREATE INDEX "StreamGiftCatalogItem_active_idx" ON "StreamGiftCatalogItem"("active");

-- CreateIndex
CREATE INDEX "StreamGiftCatalogItem_diamondPrice_idx" ON "StreamGiftCatalogItem"("diamondPrice");

-- CreateIndex
CREATE INDEX "StreamGiftCatalogItem_premiumTier_idx" ON "StreamGiftCatalogItem"("premiumTier");

-- CreateIndex
CREATE UNIQUE INDEX "StreamGiftSendIntent_idempotencyKeyHash_key" ON "StreamGiftSendIntent"("idempotencyKeyHash");

-- CreateIndex
CREATE INDEX "StreamGiftSendIntent_senderUserId_status_idx" ON "StreamGiftSendIntent"("senderUserId", "status");

-- CreateIndex
CREATE INDEX "StreamGiftSendIntent_receiverUserId_status_idx" ON "StreamGiftSendIntent"("receiverUserId", "status");

-- CreateIndex
CREATE INDEX "StreamGiftSendIntent_roomId_idx" ON "StreamGiftSendIntent"("roomId");

-- CreateIndex
CREATE INDEX "StreamGiftSendIntent_conversationId_idx" ON "StreamGiftSendIntent"("conversationId");

-- CreateIndex
CREATE INDEX "StreamGiftSendIntent_giftCatalogItemId_idx" ON "StreamGiftSendIntent"("giftCatalogItemId");

-- CreateIndex
CREATE INDEX "StreamGiftSendIntent_providerReferenceHash_idx" ON "StreamGiftSendIntent"("providerReferenceHash");

-- CreateIndex
CREATE UNIQUE INDEX "StreamGiftLedgerEntry_idempotencyKeyHash_key" ON "StreamGiftLedgerEntry"("idempotencyKeyHash");

-- CreateIndex
CREATE INDEX "StreamGiftLedgerEntry_sendIntentId_idx" ON "StreamGiftLedgerEntry"("sendIntentId");

-- CreateIndex
CREATE INDEX "StreamGiftLedgerEntry_partyUserId_entryKind_idx" ON "StreamGiftLedgerEntry"("partyUserId", "entryKind");

-- CreateIndex
CREATE INDEX "StreamGiftLedgerEntry_createdAt_idx" ON "StreamGiftLedgerEntry"("createdAt");

-- CreateIndex
CREATE INDEX "StreamGiftCreatorEarning_creatorUserId_status_idx" ON "StreamGiftCreatorEarning"("creatorUserId", "status");

-- CreateIndex
CREATE INDEX "StreamGiftCreatorEarning_sendIntentId_idx" ON "StreamGiftCreatorEarning"("sendIntentId");

-- CreateIndex
CREATE INDEX "StreamGiftCreatorEarning_ledgerEntryId_idx" ON "StreamGiftCreatorEarning"("ledgerEntryId");

-- CreateIndex
CREATE INDEX "StreamGiftSettlementGate_sendIntentId_gateKind_idx" ON "StreamGiftSettlementGate"("sendIntentId", "gateKind");

-- CreateIndex
CREATE INDEX "StreamGiftSettlementGate_creatorUserId_status_idx" ON "StreamGiftSettlementGate"("creatorUserId", "status");

-- CreateIndex
CREATE INDEX "StreamGiftSettlementGate_status_idx" ON "StreamGiftSettlementGate"("status");

-- CreateIndex
CREATE INDEX "StreamGiftDeliveryReceiptAudit_sendIntentId_idx" ON "StreamGiftDeliveryReceiptAudit"("sendIntentId");

-- CreateIndex
CREATE INDEX "StreamGiftDeliveryReceiptAudit_clientReceiptId_idx" ON "StreamGiftDeliveryReceiptAudit"("clientReceiptId");

-- CreateIndex
CREATE INDEX "StreamGiftDeliveryReceiptAudit_receiverUserId_idx" ON "StreamGiftDeliveryReceiptAudit"("receiverUserId");

-- CreateIndex
CREATE INDEX "StreamGiftDeliveryReceiptAudit_createdAt_idx" ON "StreamGiftDeliveryReceiptAudit"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "StreamGiftDeliveryReceiptAudit_sendIntentId_clientReceiptId_key" ON "StreamGiftDeliveryReceiptAudit"("sendIntentId", "clientReceiptId");

-- CreateIndex
CREATE UNIQUE INDEX "TaxiRiderProfile_userId_key" ON "TaxiRiderProfile"("userId");

-- CreateIndex
CREATE INDEX "TaxiRiderProfile_countryCode_cityId_idx" ON "TaxiRiderProfile"("countryCode", "cityId");

-- CreateIndex
CREATE INDEX "TaxiRiderProfile_trustStatus_idx" ON "TaxiRiderProfile"("trustStatus");

-- CreateIndex
CREATE UNIQUE INDEX "TaxiDriverProfile_userId_key" ON "TaxiDriverProfile"("userId");

-- CreateIndex
CREATE INDEX "TaxiDriverProfile_status_countryCode_cityId_idx" ON "TaxiDriverProfile"("status", "countryCode", "cityId");

-- CreateIndex
CREATE INDEX "TaxiDriverProfile_adminApprovedAt_idx" ON "TaxiDriverProfile"("adminApprovedAt");

-- CreateIndex
CREATE INDEX "TaxiDriverApplication_driverProfileId_status_idx" ON "TaxiDriverApplication"("driverProfileId", "status");

-- CreateIndex
CREATE INDEX "TaxiDriverApplication_reviewerAdminId_idx" ON "TaxiDriverApplication"("reviewerAdminId");

-- CreateIndex
CREATE UNIQUE INDEX "TaxiVehicle_plateNumberHash_key" ON "TaxiVehicle"("plateNumberHash");

-- CreateIndex
CREATE INDEX "TaxiVehicle_driverProfileId_status_idx" ON "TaxiVehicle"("driverProfileId", "status");

-- CreateIndex
CREATE INDEX "TaxiVehicle_vehicleClass_status_idx" ON "TaxiVehicle"("vehicleClass", "status");

-- CreateIndex
CREATE INDEX "TaxiDriverVehicleAssignment_driverProfileId_active_idx" ON "TaxiDriverVehicleAssignment"("driverProfileId", "active");

-- CreateIndex
CREATE INDEX "TaxiDriverVehicleAssignment_vehicleId_active_idx" ON "TaxiDriverVehicleAssignment"("vehicleId", "active");

-- CreateIndex
CREATE INDEX "TaxiTariffRegion_status_countryCode_cityId_idx" ON "TaxiTariffRegion"("status", "countryCode", "cityId");

-- CreateIndex
CREATE UNIQUE INDEX "TaxiTariffRegion_countryCode_cityId_zoneId_tariffCode_key" ON "TaxiTariffRegion"("countryCode", "cityId", "zoneId", "tariffCode");

-- CreateIndex
CREATE INDEX "TaxiQuote_riderProfileId_status_idx" ON "TaxiQuote"("riderProfileId", "status");

-- CreateIndex
CREATE INDEX "TaxiQuote_expiresAt_status_idx" ON "TaxiQuote"("expiresAt", "status");

-- CreateIndex
CREATE INDEX "TaxiQuote_routeProviderRef_idx" ON "TaxiQuote"("routeProviderRef");

-- CreateIndex
CREATE INDEX "TaxiRiderRequest_riderProfileId_status_idx" ON "TaxiRiderRequest"("riderProfileId", "status");

-- CreateIndex
CREATE INDEX "TaxiRiderRequest_quoteId_idx" ON "TaxiRiderRequest"("quoteId");

-- CreateIndex
CREATE INDEX "TaxiRiderRequest_tariffRegionId_status_idx" ON "TaxiRiderRequest"("tariffRegionId", "status");

-- CreateIndex
CREATE INDEX "TaxiDispatchOffer_riderRequestId_status_idx" ON "TaxiDispatchOffer"("riderRequestId", "status");

-- CreateIndex
CREATE INDEX "TaxiDispatchOffer_driverProfileId_status_idx" ON "TaxiDispatchOffer"("driverProfileId", "status");

-- CreateIndex
CREATE INDEX "TaxiDispatchOffer_offerExpiresAt_status_idx" ON "TaxiDispatchOffer"("offerExpiresAt", "status");

-- CreateIndex
CREATE UNIQUE INDEX "TaxiTrip_dispatchOfferId_key" ON "TaxiTrip"("dispatchOfferId");

-- CreateIndex
CREATE INDEX "TaxiTrip_driverProfileId_status_idx" ON "TaxiTrip"("driverProfileId", "status");

-- CreateIndex
CREATE INDEX "TaxiTrip_vehicleId_status_idx" ON "TaxiTrip"("vehicleId", "status");

-- CreateIndex
CREATE INDEX "TaxiTrip_completedAt_idx" ON "TaxiTrip"("completedAt");

-- CreateIndex
CREATE INDEX "TaxiPaymentHold_tripId_status_idx" ON "TaxiPaymentHold"("tripId", "status");

-- CreateIndex
CREATE INDEX "TaxiPaymentHold_providerReferenceLabel_idx" ON "TaxiPaymentHold"("providerReferenceLabel");

-- CreateIndex
CREATE INDEX "TaxiDriverSettlement_driverProfileId_status_idx" ON "TaxiDriverSettlement"("driverProfileId", "status");

-- CreateIndex
CREATE INDEX "TaxiDriverSettlement_tripId_status_idx" ON "TaxiDriverSettlement"("tripId", "status");

-- CreateIndex
CREATE INDEX "TaxiSupportCase_tripId_status_idx" ON "TaxiSupportCase"("tripId", "status");

-- CreateIndex
CREATE INDEX "TaxiSupportCase_riderProfileId_status_idx" ON "TaxiSupportCase"("riderProfileId", "status");

-- CreateIndex
CREATE INDEX "TaxiSupportCase_assignedAdminId_status_idx" ON "TaxiSupportCase"("assignedAdminId", "status");

-- CreateIndex
CREATE INDEX "TaxiDisputeEvidence_supportCaseId_evidenceType_idx" ON "TaxiDisputeEvidence"("supportCaseId", "evidenceType");

-- CreateIndex
CREATE INDEX "TaxiDisputeEvidence_submittedByActorId_idx" ON "TaxiDisputeEvidence"("submittedByActorId");

-- CreateIndex
CREATE INDEX "TaxiSafetyEvent_tripId_eventType_idx" ON "TaxiSafetyEvent"("tripId", "eventType");

-- CreateIndex
CREATE INDEX "TaxiSafetyEvent_severity_createdAt_idx" ON "TaxiSafetyEvent"("severity", "createdAt");

-- CreateIndex
CREATE INDEX "TaxiAuditLog_actorType_actorId_idx" ON "TaxiAuditLog"("actorType", "actorId");

-- CreateIndex
CREATE INDEX "TaxiAuditLog_targetType_targetId_idx" ON "TaxiAuditLog"("targetType", "targetId");

-- CreateIndex
CREATE INDEX "TaxiAuditLog_action_createdAt_idx" ON "TaxiAuditLog"("action", "createdAt");

-- CreateIndex
CREATE INDEX "TaxiProviderReadinessSnapshot_providerArea_countryCode_city_idx" ON "TaxiProviderReadinessSnapshot"("providerArea", "countryCode", "cityId");

-- CreateIndex
CREATE INDEX "TaxiProviderReadinessSnapshot_configured_idx" ON "TaxiProviderReadinessSnapshot"("configured");

-- CreateIndex
CREATE UNIQUE INDEX "TaxiIdempotencyRecord_idempotencyKey_key" ON "TaxiIdempotencyRecord"("idempotencyKey");

-- CreateIndex
CREATE INDEX "TaxiIdempotencyRecord_scope_status_idx" ON "TaxiIdempotencyRecord"("scope", "status");

-- CreateIndex
CREATE INDEX "TaxiTripRatingLedger_tripId_source_idx" ON "TaxiTripRatingLedger"("tripId", "source");

-- CreateIndex
CREATE INDEX "TaxiTripRatingLedger_driverProfileId_idx" ON "TaxiTripRatingLedger"("driverProfileId");

-- CreateIndex
CREATE INDEX "TaxiTripRatingLedger_riderProfileId_idx" ON "TaxiTripRatingLedger"("riderProfileId");

-- CreateIndex
CREATE INDEX "TaxiRealtimeTripShadow_tripId_status_idx" ON "TaxiRealtimeTripShadow"("tripId", "status");

-- CreateIndex
CREATE INDEX "TaxiRealtimeTripShadow_lastEventAt_idx" ON "TaxiRealtimeTripShadow"("lastEventAt");

-- AddForeignKey
ALTER TABLE "AISession" ADD CONSTRAINT "AISession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIConsent" ADD CONSTRAINT "AIConsent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIConsentEvent" ADD CONSTRAINT "AIConsentEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIMemoryEntry" ADD CONSTRAINT "AIMemoryEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIWorkspaceConnection" ADD CONSTRAINT "AIWorkspaceConnection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AITask" ADD CONSTRAINT "AITask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIUsageEvent" ADD CONSTRAINT "AIUsageEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SabiCallSession" ADD CONSTRAINT "SabiCallSession_initiatedByUserId_fkey" FOREIGN KEY ("initiatedByUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SabiCallParticipant" ADD CONSTRAINT "SabiCallParticipant_callId_fkey" FOREIGN KEY ("callId") REFERENCES "SabiCallSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SabiCallParticipant" ADD CONSTRAINT "SabiCallParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SabiCallSignal" ADD CONSTRAINT "SabiCallSignal_callId_fkey" FOREIGN KEY ("callId") REFERENCES "SabiCallSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SabiCallEvent" ADD CONSTRAINT "SabiCallEvent_callId_fkey" FOREIGN KEY ("callId") REFERENCES "SabiCallSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StreamGiftSendIntent" ADD CONSTRAINT "StreamGiftSendIntent_giftCatalogItemId_fkey" FOREIGN KEY ("giftCatalogItemId") REFERENCES "StreamGiftCatalogItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StreamGiftLedgerEntry" ADD CONSTRAINT "StreamGiftLedgerEntry_sendIntentId_fkey" FOREIGN KEY ("sendIntentId") REFERENCES "StreamGiftSendIntent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StreamGiftCreatorEarning" ADD CONSTRAINT "StreamGiftCreatorEarning_sendIntentId_fkey" FOREIGN KEY ("sendIntentId") REFERENCES "StreamGiftSendIntent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StreamGiftCreatorEarning" ADD CONSTRAINT "StreamGiftCreatorEarning_ledgerEntryId_fkey" FOREIGN KEY ("ledgerEntryId") REFERENCES "StreamGiftLedgerEntry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StreamGiftSettlementGate" ADD CONSTRAINT "StreamGiftSettlementGate_sendIntentId_fkey" FOREIGN KEY ("sendIntentId") REFERENCES "StreamGiftSendIntent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StreamGiftDeliveryReceiptAudit" ADD CONSTRAINT "StreamGiftDeliveryReceiptAudit_sendIntentId_fkey" FOREIGN KEY ("sendIntentId") REFERENCES "StreamGiftSendIntent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiDriverApplication" ADD CONSTRAINT "TaxiDriverApplication_driverProfileId_fkey" FOREIGN KEY ("driverProfileId") REFERENCES "TaxiDriverProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiVehicle" ADD CONSTRAINT "TaxiVehicle_driverProfileId_fkey" FOREIGN KEY ("driverProfileId") REFERENCES "TaxiDriverProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiDriverVehicleAssignment" ADD CONSTRAINT "TaxiDriverVehicleAssignment_driverProfileId_fkey" FOREIGN KEY ("driverProfileId") REFERENCES "TaxiDriverProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiDriverVehicleAssignment" ADD CONSTRAINT "TaxiDriverVehicleAssignment_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "TaxiVehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiQuote" ADD CONSTRAINT "TaxiQuote_riderProfileId_fkey" FOREIGN KEY ("riderProfileId") REFERENCES "TaxiRiderProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiQuote" ADD CONSTRAINT "TaxiQuote_tariffRegionId_fkey" FOREIGN KEY ("tariffRegionId") REFERENCES "TaxiTariffRegion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiRiderRequest" ADD CONSTRAINT "TaxiRiderRequest_riderProfileId_fkey" FOREIGN KEY ("riderProfileId") REFERENCES "TaxiRiderProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiRiderRequest" ADD CONSTRAINT "TaxiRiderRequest_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "TaxiQuote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiRiderRequest" ADD CONSTRAINT "TaxiRiderRequest_tariffRegionId_fkey" FOREIGN KEY ("tariffRegionId") REFERENCES "TaxiTariffRegion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiDispatchOffer" ADD CONSTRAINT "TaxiDispatchOffer_riderRequestId_fkey" FOREIGN KEY ("riderRequestId") REFERENCES "TaxiRiderRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiDispatchOffer" ADD CONSTRAINT "TaxiDispatchOffer_driverProfileId_fkey" FOREIGN KEY ("driverProfileId") REFERENCES "TaxiDriverProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiTrip" ADD CONSTRAINT "TaxiTrip_dispatchOfferId_fkey" FOREIGN KEY ("dispatchOfferId") REFERENCES "TaxiDispatchOffer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiTrip" ADD CONSTRAINT "TaxiTrip_driverProfileId_fkey" FOREIGN KEY ("driverProfileId") REFERENCES "TaxiDriverProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiTrip" ADD CONSTRAINT "TaxiTrip_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "TaxiVehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiPaymentHold" ADD CONSTRAINT "TaxiPaymentHold_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "TaxiTrip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiDriverSettlement" ADD CONSTRAINT "TaxiDriverSettlement_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "TaxiTrip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiDriverSettlement" ADD CONSTRAINT "TaxiDriverSettlement_driverProfileId_fkey" FOREIGN KEY ("driverProfileId") REFERENCES "TaxiDriverProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiSupportCase" ADD CONSTRAINT "TaxiSupportCase_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "TaxiTrip"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiSupportCase" ADD CONSTRAINT "TaxiSupportCase_riderProfileId_fkey" FOREIGN KEY ("riderProfileId") REFERENCES "TaxiRiderProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiDisputeEvidence" ADD CONSTRAINT "TaxiDisputeEvidence_supportCaseId_fkey" FOREIGN KEY ("supportCaseId") REFERENCES "TaxiSupportCase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiSafetyEvent" ADD CONSTRAINT "TaxiSafetyEvent_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "TaxiTrip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiTripRatingLedger" ADD CONSTRAINT "TaxiTripRatingLedger_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "TaxiTrip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiTripRatingLedger" ADD CONSTRAINT "TaxiTripRatingLedger_riderProfileId_fkey" FOREIGN KEY ("riderProfileId") REFERENCES "TaxiRiderProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiTripRatingLedger" ADD CONSTRAINT "TaxiTripRatingLedger_driverProfileId_fkey" FOREIGN KEY ("driverProfileId") REFERENCES "TaxiDriverProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaxiRealtimeTripShadow" ADD CONSTRAINT "TaxiRealtimeTripShadow_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "TaxiTrip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
