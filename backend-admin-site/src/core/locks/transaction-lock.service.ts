export class TransactionLockService {

  private locks: Set<string> = new Set()

  acquire(lockId: string) {

    if (this.locks.has(lockId)) {
      throw new Error("Transaction already in progress")
    }

    this.locks.add(lockId)

  }

  release(lockId: string) {

    this.locks.delete(lockId)

  }

}