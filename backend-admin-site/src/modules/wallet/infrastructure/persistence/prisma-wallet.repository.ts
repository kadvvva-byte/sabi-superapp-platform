import { PrismaClient, WalletType } from "@prisma/client"
import { WalletRepository } from "../../domain/repositories/wallet.repository"
import { Wallet } from "../../domain/entities/wallet.entity"

export class PrismaWalletRepository implements WalletRepository {

  constructor(private prisma: PrismaClient) {}

  async create(wallet: Wallet): Promise<void> {

    await this.prisma.wallet.create({
      data: {
        id: wallet.walletId,
        currency: wallet.currency,
        type: WalletType.MAIN,

        user: {
          connect: {
            id: wallet.userId
          }
        },

        balance: {
          create: {
            balance: wallet.balance
          }
        }

      }
    })

  }

  async findById(id: string): Promise<Wallet | null> {

    const wallet = await this.prisma.wallet.findUnique({
      where: { id },
      include: { balance: true }
    })

    if (!wallet) return null

    return new Wallet(
      wallet.id,
      wallet.userId,
      Number(wallet.balance?.balance ?? 0),
      wallet.currency
    )

  }

  async findByUserId(userId: string): Promise<Wallet | null> {

    const wallet = await this.prisma.wallet.findFirst({
      where: { userId },
      include: { balance: true }
    })

    if (!wallet) return null

    return new Wallet(
      wallet.id,
      wallet.userId,
      Number(wallet.balance?.balance ?? 0),
      wallet.currency
    )

  }

  async save(wallet: Wallet): Promise<void> {

    await this.prisma.walletBalance.update({
      where: { walletId: wallet.walletId },
      data: {
        balance: wallet.balance
      }
    })

  }

}