export type PremiumPlan = "FREE" | "PREMIUM" | "BUSINESS_PREMIUM" | "ADMIN";

export type PremiumFeatureKey =
  | "ai_text_translation"
  | "ai_audio_translation"
  | "ai_video_translation"
  | "ai_call_translation"
  | "ai_workspace_access"
  | "ai_business_assistant"
  | "ai_deep_search"
  | "ai_media_search"
  | "ai_student_assistant"
  | "bots_access"
  | "business_account_access"
  | "advanced_qr_routes"
  | "priority_support";

export type PremiumEntitlementState = {
  userId: string;
  plan: PremiumPlan;
  active: boolean;
  features: readonly PremiumFeatureKey[];
  source: "system_default" | "manual_override" | "payment_confirmation";
};
