import React from "react";
import SabiModuleEntryScreen from "../src/modules/home/screens/SabiModuleEntryScreen";
import FullActivationGate from "../src/shared/auth/FullActivationGate";

export default function CameraEntryScreen() {
  return (
    <FullActivationGate service="camera">
      <SabiModuleEntryScreen moduleCode="camera" />
    </FullActivationGate>
  );
}
