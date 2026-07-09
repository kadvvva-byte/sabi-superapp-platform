/**
 * OWNER_MAPS_SHARED_SERVER_CONFIG_003G_FIX3
 *
 * One shared server-side Maps provider config for Sabi:
 * - Taxi
 * - Messenger location
 * - Sabi Maps
 * - Studio/AI maps tools
 *
 * Existing server key from previous Maps setup is reused first:
 *   SABI_AI_MAPS_API_KEY
 *
 * No Google key is allowed in mobile, Git, app.json, app.config.js, or chat.
 */

const MAPS_SERVER_KEY_ENV_CANDIDATES = [
  "SABI_AI_MAPS_API_KEY",
  "SABI_GOOGLE_MAPS_SERVER_API_KEY",
  "SABI_TAXI_GOOGLE_MAPS_SERVER_API_KEY",
  "SABI_TAXI_GOOGLE_MAPS_API_KEY",
  "TAXI_GOOGLE_MAPS_SERVER_API_KEY",
  "TAXI_GOOGLE_MAPS_API_KEY",
  "GOOGLE_MAPS_SERVER_API_KEY",
  "GOOGLE_MAPS_WEB_SERVICE_API_KEY",
  "GOOGLE_MAPS_API_KEY",
  "GOOGLE_PLACES_API_KEY",
] as const;

export type SabiMapsServerProviderConfig = {
  configured: boolean;
  configuredEnvName: string;
  keyLocation: "server_env_or_secret_manager_only";
  mobileReceivesKey: false;
};

export function readSabiMapsServerApiKey(): string {
  for (const name of MAPS_SERVER_KEY_ENV_CANDIDATES) {
    const key = String(process.env[name] || "").trim();

    if (key) {
      return key;
    }
  }

  return "";
}

export function readSabiMapsServerConfiguredEnvName(): string {
  for (const name of MAPS_SERVER_KEY_ENV_CANDIDATES) {
    if (String(process.env[name] || "").trim()) {
      return name;
    }
  }

  return "";
}

export function getSabiMapsServerProviderConfig(): SabiMapsServerProviderConfig {
  const configuredEnvName = readSabiMapsServerConfiguredEnvName();

  return {
    configured: Boolean(configuredEnvName),
    configuredEnvName: configuredEnvName || "not_configured",
    keyLocation: "server_env_or_secret_manager_only",
    mobileReceivesKey: false,
  };
}
