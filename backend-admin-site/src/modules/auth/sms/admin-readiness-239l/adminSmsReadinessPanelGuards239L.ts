export const adminSmsReadinessPanelRuntimeLocks239L = {
  noLiveDeploy: true,
  noSmsProviderCall: true,
  noSmsSent: true,
  noFirebaseApiCall: true,
  noSecrets: true,
  noEnvRead: true,
  noDbSessionTokenWrite: true,
  noAdminRuntimeMount: true,
  disabled_by_default: true,
} as const;

export const adminSmsReadinessPanelPlaceholders239L = [
  '<SMS_VERIFY_SERVICE_ID>',
  '<SMS_SENDER_ID>',
  '<SMS_WEBHOOK_SECRET>',
  '<OWNER_APPROVAL_REFERENCE>',
  '<FIREBASE_PROJECT_ID>',
  '<FIREBASE_APP_ID>',
  '<FIREBASE_AUTH_DOMAIN>',
  '<FIREBASE_API_KEY_REFERENCE>',
] as const;
