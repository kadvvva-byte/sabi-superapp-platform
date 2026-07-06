import type {
  UniversalQrExecutionInput,
  UniversalQrRouteDescriptor,
} from "../../../contracts/universal-qr-execution.port"
import type {
  QrSnapshot,
  UniversalQrRouteResolver,
} from "./universal-qr-execution.service"

export class DefaultUniversalQrRouteResolver
  implements UniversalQrRouteResolver
{
  async resolve(
    qr: QrSnapshot,
    input: UniversalQrExecutionInput,
  ): Promise<UniversalQrRouteDescriptor> {
    const route = input.routeOverride?.trim() || qr.route
    const payloadType = qr.payloadType
    const domain = qr.domain ?? undefined

    let kind: UniversalQrRouteDescriptor["kind"] = "unsupported"

    if (payloadType.includes("p2p")) {
      kind = "p2p_transfer"
    } else if (payloadType.includes("merchant")) {
      kind = "merchant_payment"
    } else if (payloadType.includes("topup")) {
      kind = "wallet_topup"
    } else if (payloadType.includes("invoice")) {
      kind = "invoice_payment"
    } else if (payloadType.includes("profile")) {
      kind = "profile_payment"
    } else if (domain === "miniapp") {
      kind = "miniapp_payment"
    } else if (domain === "payment") {
      kind = "wallet_payment"
    }

    return {
      qrId: qr.id,
      rail: qr.rail,
      domain,
      payloadType,
      route,
      kind,
      amount: input.amount ?? qr.amount ?? undefined,
      currency: input.currency ?? qr.currency ?? undefined,
      metadata: qr.metadata,
    }
  }
}
