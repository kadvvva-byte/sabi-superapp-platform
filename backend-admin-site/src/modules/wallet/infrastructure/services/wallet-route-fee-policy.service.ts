import { FeeDirection } from "../../domain/constants/fee-direction"
import {
  FeePolicyEntity,
  type FeePolicyOperation,
} from "../../domain/entities/fee-policy.entity"

export class WalletRouteFeePolicyService {
  resolve(route: string, currency = "USD"): FeePolicyEntity {
    if (route === "merchant_payment") {
      return FeePolicyEntity.create({
        title: "Merchant payment fee",
        description: "Service fee for merchant payment QR flow",
        direction: FeeDirection.INCOMING,
        percent: 2.5,
        flatFee: 0,
        currency,
        status: "active",
        operationTypes: ["merchant_payment"],
      })
    }

    if (route === "sabi_user_transfer") {
      return FeePolicyEntity.create({
        title: "User transfer fee",
        description: "Service fee for user transfer QR flow",
        direction: FeeDirection.OUTGOING,
        percent: 0,
        flatFee: 0,
        currency,
        status: "active",
        operationTypes: ["wallet_transfer"],
      })
    }

    if (route === "coin_send") {
      return FeePolicyEntity.create({
        title: "Coin send fee",
        description: "Service fee for coin send QR flow",
        direction: FeeDirection.OUTGOING,
        percent: 0,
        flatFee: 0,
        currency,
        status: "active",
        operationTypes: ["coin_transfer"],
      })
    }

    if (route === "coin_receive") {
      return FeePolicyEntity.create({
        title: "Coin receive fee",
        description: "Service fee for coin receive QR flow",
        direction: FeeDirection.INCOMING,
        percent: 0,
        flatFee: 0,
        currency,
        status: "active",
        operationTypes: ["coin_transfer"],
      })
    }

    return FeePolicyEntity.create({
      title: "Default wallet fee",
      description: "Default wallet route service fee",
      direction: FeeDirection.OUTGOING,
      percent: 0,
      flatFee: 0,
      currency,
      status: "active",
      operationTypes: [],
    })
  }

  resolveOperationType(route: string): FeePolicyOperation {
    if (route === "merchant_payment") {
      return "merchant_payment"
    }

    if (route === "coin_send" || route === "coin_receive") {
      return "coin_transfer"
    }

    if (route === "sabi_user_transfer") {
      return "wallet_transfer"
    }

    return "custom"
  }
}