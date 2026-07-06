import type { SabiGalleryFoundationPolicy, SabiGalleryFoundationStatus } from "./gallery-foundation.types";

export const SABI_GALLERY_FOUNDATION_POLICY: SabiGalleryFoundationPolicy = {
  version: "GALLERY-100.7",
  privateByDefault: true,
  publicRequiresExplicitSelection: true,
  fakeMediaAllowed: false,
  autoPublicUploadAllowed: false,
  aiAnalysisRequiresProvider: true,
  cloudSyncRequiresProvider: true,
  moderationReviewSupported: true,
  publicProfileBridgeReady: true,
  shareToMessengerSupported: true,
  qrShareSupported: true,
    albumFilteringReady: true,
    sortingReady: true,
    persistenceReady: true,
    safeDeleteReady: true,
    systemShareExportReady: true,
    corruptedStorageRepairReady: true,
  publicProfileSelectorsReady: true,
  publicProfileSnapshotReady: true,
  privateLeakProtectionReady: true,
  editorRealEffectsReady: true,
  acceptedFullscreenViewerReady: true,
  acceptedSabiPlayerReady: true,
  notes: [
    "Uploaded photos and videos stay private by default.",
    "Only media explicitly selected by the user can be shown on the public profile.",
    "Public profile bridge exposes only explicitly selected public media.",
    "No fake photos, fake uploads, fake shares, fake likes, or fake AI analysis are allowed.",
    "Cloud media storage, OCR, image moderation, and AI analysis must show provider-required state until real providers are connected.",
    "Gallery local state must normalize persisted records and safely discard corrupted entries.",
    "Public Profile selectors expose only explicitly selected public media with photo/video counts and latest public media metadata.",
    "Private/internal Gallery media must never appear in public profile selectors or public profile payloads.",
  ],
};

export function getSabiGalleryFoundationStatus(): SabiGalleryFoundationStatus {
  return {
    ok: true,
    version: "GALLERY-100.7",
    module: "gallery",
    mobileRoute: "/gallery",
    apiBasePath: "/api/v2/gallery",
    runtimeStatus: "foundation_ready",
    localStorageStatus: "mobile_local_ready",
    cloudStorageStatus: "provider_required",
    publicProfileStatus: "explicit_selection_ready",
    aiMediaStatus: "provider_required",
    fakeDataAllowed: false,
    providers: {
      cloudStorage: "provider_required",
      aiAnalysis: "api_key_required",
      moderation: "provider_required",
    },
    policy: SABI_GALLERY_FOUNDATION_POLICY,
  };
}
