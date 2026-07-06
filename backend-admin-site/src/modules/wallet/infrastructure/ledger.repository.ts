type LedgerEntry = {
  from: string
  to: string
  amount: number
  type: string
  createdAt: number
}

export class LedgerRepository {

  private entries: LedgerEntry[] = []

  createEntry(data: {
    from: string
    to: string
    amount: number
    type: string
  }) {

    const entry: LedgerEntry = {
      ...data,
      createdAt: Date.now()
    }

    this.entries.push(entry)

    return entry
  }

  getAll() {
    return this.entries
  }

}