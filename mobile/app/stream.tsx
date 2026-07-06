import React from "react";
import StreamScreen from "../src/modules/stream/screens/StreamScreen";
import FullActivationGate from "../src/shared/auth/FullActivationGate";

export default function StreamRouteScreen() {
  return (
    <FullActivationGate service="stream">
      <StreamScreen />
    </FullActivationGate>
  );
}
