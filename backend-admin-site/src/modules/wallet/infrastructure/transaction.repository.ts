import { Transaction } from "../domain/transaction.entity";

export class TransactionRepository {

  private transactions: Transaction[] = [];

  save(tx: Transaction) {
    this.transactions.push(tx);
    return tx;
  }

  findByWallet(walletId: string) {

    return this.transactions.filter(
      (tx) =>
        tx.fromWalletId === walletId ||
        tx.toWalletId === walletId
    );

  }

}