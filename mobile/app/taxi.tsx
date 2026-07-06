import React from "react";
import TaxiScreen from "../src/modules/taxi/screens/TaxiScreen";
import FullActivationGate from "../src/shared/auth/FullActivationGate";

export default function TaxiRouteScreen() {
  return (
    <FullActivationGate service="taxi">
      <TaxiScreen />
    </FullActivationGate>
  );
}
