import type {
  SabiCallFailureCode,
  SabiCallId,
  SabiCallMetadata,
  SabiCallTranslationSegmentResult,
  SabiCallTranslationState,
  SabiUserId,
} from "./sabi-call.types";

export type SabiCallTranslationProviderStatus =
  | "provider_ready"
  | "provider_not_configured";

export type SabiCallTranslationStartRequest = {
  callId: SabiCallId;
  userId: SabiUserId;
  sourceLanguage: string;
  targetLanguage: string;
};

export type SabiCallTranslationStopRequest = {
  callId: SabiCallId;
  userId: SabiUserId;
};

export type SabiCallTranslationSegmentRequest = {
  callId: SabiCallId;
  userId: SabiUserId;
  sourceLanguage: string;
  targetLanguage: string;
  text: string;
  segmentId?: string | null;
  metadata?: SabiCallMetadata;
};

export type SabiCallTranslationSegmentResponse = SabiCallTranslationSegmentResult;

export type SabiCallTranslationProviderHealth = {
  status: SabiCallTranslationProviderStatus;
  providerKey: string | null;
  reason: SabiCallFailureCode | null;
};

export type SabiCallTranslationRuntimeState = {
  health: SabiCallTranslationProviderHealth;
  state: SabiCallTranslationState;
};
