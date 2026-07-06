import { getPlayReady4Readiness } from "./play-ready-4-console-documents";

export const PLAY_READY_4_PLAY_CONSOLE_DOCUMENTS_STAGING_MANIFEST = {
  version: "PLAY-READY-4",
  stage: "controlled_play_console_document_draft_and_closed_testing_release_checklist_source_only",
  sourceOnly: true,
  changedScope: "src/modules/play-ready/foundation/play-ready-4-console-documents/**",
  covers: [
    "Privacy Policy sections",
    "Data Safety answer map",
    "Account deletion instructions",
    "App access / reviewer notes",
    "Financial features declaration notes",
    "AI reporting reviewer evidence",
    "UGC moderation reviewer evidence",
    "Target SDK / AAB checklist",
    "Closed testing checklist",
  ],
  implementationDoneNow: false,
  providerCallsNow: false,
  walletMutationNow: false,
  paymentAuthorizationNow: false,
  moneyMovementNow: false,
  noFakeSuccess: true,
  nextStage: "PLAY-READY-5",
  readiness: getPlayReady4Readiness(),
} as const;
