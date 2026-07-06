import { CardAccountRepository } from "../../domain/repositories/card-account.repository"

export class ListCardAccountsUseCase {
  constructor(private readonly cardAccounts: CardAccountRepository) {}

  public async execute(ownerUserId: string) {
    const accounts = await this.cardAccounts.findByOwnerUserId(ownerUserId)
    return accounts.map((account) => account.toJSON())
  }
}