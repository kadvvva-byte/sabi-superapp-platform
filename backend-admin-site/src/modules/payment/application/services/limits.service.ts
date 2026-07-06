export class LimitsService {

  checkDailyLimit(amount: number) {

    const DAILY_LIMIT = 5000

    if (amount > DAILY_LIMIT) {
      throw new Error("Daily transaction limit exceeded")
    }

  }

}