import { EventBus } from "../../../../core/events/event-bus"

const eventBus = new EventBus()

export class FraudDetectionService {

  constructor() {

    eventBus.subscribe("payment.completed", async (payload) => {

      const { fromWalletId, amount } = payload

      if (amount > 10000) {

        console.log("⚠️ Fraud Alert")
        console.log(`Large payment detected from wallet ${fromWalletId}`)

      }

    })

  }

}