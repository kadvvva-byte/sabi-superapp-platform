import type {
  SabiCallId,
  SabiCallMetadata,
  SabiUserId,
} from "../../contracts";

export type SabiCallTranslationProviderRequest = {
  callId: SabiCallId;
  userId: SabiUserId;
  segmentId: string;
  sourceLanguage: string;
  targetLanguage: string;
  text: string;
  metadata?: SabiCallMetadata;
};

export type SabiCallTranslationProviderResult = {
  translatedText: string;
  detectedSourceLanguage?: string | null;
  providerSegmentId?: string | null;
  metadata?: SabiCallMetadata;
};

export type SabiCallTranslationProviderHealth = {
  ready: boolean;
  providerKey: string | null;
  reason: "provider_not_configured" | null;
};

export interface SabiCallTranslationProvider {
  readonly providerKey: string;
  getHealth(): SabiCallTranslationProviderHealth;
  translateCallSegment(
    request: SabiCallTranslationProviderRequest
  ): Promise<SabiCallTranslationProviderResult>;
}
