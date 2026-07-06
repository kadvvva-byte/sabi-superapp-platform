export interface TransferDto {
  fromWalletId: string
  toWalletId: string
  amount: number
  currency?: string
  description?: string
}