import React from "react";
import SabiAiStudioMobileEntryScreen from "../src/modules/ai/mobile/studio/SabiAiStudioMobileEntryScreen";
import FullActivationGate from "../src/shared/auth/FullActivationGate";

export default function AiStudioRouteScreen() {
  return (
    <FullActivationGate service="sabi_ai_studio">
      <SabiAiStudioMobileEntryScreen />
    </FullActivationGate>
  );
}
