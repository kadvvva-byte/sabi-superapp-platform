import { CoinDepositEntity } from "../entities/coin-deposit.entity"

export interface CoinDepositRepository {
  findById(id: string): Promise<CoinDepositEntity | null>
  findByCoinWalletId(coinWalletId: string): Promise<CoinDepositEntity[]>
  save(deposit: CoinDepositEntity): Promise<void>
}