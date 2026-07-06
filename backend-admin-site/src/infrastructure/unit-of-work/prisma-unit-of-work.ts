import { PrismaClient } from "@prisma/client"

export class PrismaUnitOfWork {

  constructor(private readonly prisma: PrismaClient) {}

  async run<T>(p0: unknown, fn: (tx: PrismaClient) => Promise<T>): Promise<T> {
    return this.prisma.$transaction(async (tx) => {
      return fn(tx as PrismaClient)
    })
  }
}