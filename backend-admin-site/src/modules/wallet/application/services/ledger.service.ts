import { prisma } from "../../../../config/prisma"
import { randomUUID } from "crypto"
import { EventBus } from "../../../../core/events/event-bus"

const eventBus = new EventBus()

export class LedgerService {

  constructor() {

    eventBus.subscribe("payment.completed", async (payload) => {

      const { fromWalletId, toWalletId, transactionId, amount } = payload

      await this.createEntry(fromWalletId, transactionId, amount, "DEBIT")

      await this.createEntry(toWalletId, transactionId, amount, "CREDIT")

    })

  }

  async createEntry(
    walletId: string,
    transactionId: string,
    amount: number,
    type: "DEBIT" | "CREDIT"
  ) {

    await prisma.ledgerEntry.create({
      data: {

        wallet: {
          connect: { id: walletId }
        },

        transaction: {
          connect: { id: transactionId }
        },

        amount: amount,

        type: type,

        operationType: "TRANSFER",

        uniqueOperationId: randomUUID(),

        createdAt: new Date()

      }
    })

  }

}