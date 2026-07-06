import { PrismaClient, Prisma } from "@prisma/client"

export class AtomicTransactionService {

  constructor(private prisma: PrismaClient) {}

  async execute<T>(callback: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {

    return this.prisma.$transaction(async (tx) => {
      return callback(tx)
    })

  }

}