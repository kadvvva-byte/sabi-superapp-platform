export type SabiGalleryVisibility = "private" | "public";

export type SabiGalleryProviderStatus =
  | "not_required"
  | "provider_required"
  | "api_key_required"
  | "disabled";

export type SabiGalleryFoundationPolicy = {
  version: "GALLERY-100.7";
  privateByDefault: true;
  publicRequiresExplicitSelection: true;
  fakeMediaAllowed: false;
  autoPublicUploadAllowed: false;
  aiAnalysisRequiresProvider: true;
  cloudSyncRequiresProvider: true;
  moderationReviewSupported: true;
  publicProfileBridgeReady: true;
  shareToMessengerSupported: true;
  qrShareSupported: true;
  albumFilteringReady: true;
  sortingReady: true;
  persistenceReady: true;
  safeDeleteReady: true;
  systemShareExportReady: true;
  corruptedStorageRepairReady: true;
  publicProfileSelectorsReady: true;
  publicProfileSnapshotReady: true;
  privateLeakProtectionReady: true;
  editorRealEffectsReady: true;
  acceptedFullscreenViewerReady: true;
  acceptedSabiPlayerReady: true;
  notes: string[];
};

export type SabiGalleryFoundationStatus = {
  ok: true;
  version: "GALLERY-100.7";
  module: "gallery";
  mobileRoute: "/gallery";
  apiBasePath: "/api/v2/gallery";
  runtimeStatus: "foundation_ready";
  localStorageStatus: "mobile_local_ready";
  cloudStorageStatus: "provider_required";
  publicProfileStatus: "explicit_selection_ready";
  aiMediaStatus: "provider_required";
  fakeDataAllowed: false;
  providers: {
    cloudStorage: SabiGalleryProviderStatus;
    aiAnalysis: SabiGalleryProviderStatus;
    moderation: SabiGalleryProviderStatus;
  };
  policy: SabiGalleryFoundationPolicy;
};
