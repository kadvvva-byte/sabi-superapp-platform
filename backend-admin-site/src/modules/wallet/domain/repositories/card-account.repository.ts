import { CardAccountEntity } from "../entities/card-account.entity"

export interface CardAccountRepository {
  findById(id: string): Promise<CardAccountEntity | null>
  findByOwnerUserId(ownerUserId: string): Promise<CardAccountEntity[]>
  save(account: CardAccountEntity): Promise<void>
}