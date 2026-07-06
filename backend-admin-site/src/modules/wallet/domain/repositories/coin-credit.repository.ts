import { CoinCreditEntity } from "../entities/coin-credit.entity"

export interface CoinCreditRepository {
  findById(id: string): Promise<CoinCreditEntity | null>
  findByCoinWalletId(coinWalletId: string): Promise<CoinCreditEntity[]>
  save(credit: CoinCreditEntity): Promise<void>
}