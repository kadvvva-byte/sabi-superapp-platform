import type { QrRouteResolution } from "../constants/qr-types";

export class QrRoutePolicyService {
  isCoinRoute(route: QrRouteResolution): boolean {
    return route === "coin_send" || route === "coin_receive";
  }

  isSabiWalletRoute(route: QrRouteResolution): boolean {
    return route === "sabi_merchant_payment" || route === "sabi_user_transfer";
  }

  supports(route: QrRouteResolution): boolean {
    return (
      this.isCoinRoute(route) ||
      this.isSabiWalletRoute(route) ||
      route === "business_invoice" ||
      route === "business_merchant_payment" ||
      route === "attendance" ||
      route === "appointment" ||
      route === "verification" ||
      route === "messaging"
    );
  }
}
