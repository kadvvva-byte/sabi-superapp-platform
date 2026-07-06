export class VelocityService {

  checkTransactionsPerMinute(count: number) {

    const MAX_TX_PER_MINUTE = 10

    if (count > MAX_TX_PER_MINUTE) {
      throw new Error("Too many transactions. Please try again later.")
    }

  }

}