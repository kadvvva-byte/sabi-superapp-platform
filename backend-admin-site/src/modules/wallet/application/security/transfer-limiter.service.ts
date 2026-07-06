export class TransferLimiterService {

  validate(amount: number) {

    const MAX_TRANSFER = 10000

    if (amount > MAX_TRANSFER) {
      throw new Error("Transfer limit exceeded")
    }

  }

}