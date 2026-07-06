import { resolveAppLanguage, type AppLanguageCode } from "../../../shared/data/languages";
import type { MobileBootstrapRuntimeConfig, ReleaseChannel } from "./bootstrap.types";

export class RuntimeConfigService {
  private readonly config: MobileBootstrapRuntimeConfig;

  constructor() {
    this.config = {
      appName: process.env.APP_NAME?.trim() || "Sabi Super App",
      environment: process.env.NODE_ENV?.trim() || "development",
      version: process.env.APP_VERSION?.trim() || "0.1.0",
      buildNumber: process.env.APP_BUILD_NUMBER?.trim() || "1",
      releaseChannel: this.resolveReleaseChannel(process.env.APP_RELEASE_CHANNEL),
      defaultLanguage: resolveAppLanguage(process.env.APP_DEFAULT_LANGUAGE, "en"),
      defaultCountryIso2: (process.env.APP_DEFAULT_COUNTRY_ISO2?.trim() || "UZ").toUpperCase(),
    };
  }

  private resolveReleaseChannel(value?: string): ReleaseChannel {
    if (value === "production" || value === "staging") {
      return value;
    }

    return "development";
  }

  getPublicConfig(): MobileBootstrapRuntimeConfig {
    return { ...this.config };
  }
}
