import { TransferDto } from "../dto/transfer.dto"
import { P2PRepository } from "../../domain/repositories/p2p.repository"
import { P2PTransfer } from "../../domain/entities/p2p-transfer.entity"
import { randomUUID } from "crypto"
import { WalletTransferService } from "../../../wallet/application/services/wallet-transfer.service"

const walletTransfer = new WalletTransferService()

export class TransferP2PUseCase {

  constructor(private p2pRepository: P2PRepository) {}

  async execute(dto: TransferDto) {

    if (dto.fromWalletId === dto.toWalletId) {
      throw new Error("Cannot transfer to same wallet")
    }

    const transfer = new P2PTransfer(
      randomUUID(),
      dto.fromWalletId,
      dto.toWalletId,
      dto.amount,
      "PENDING"
    )

    await this.p2pRepository.save(transfer)

    // REAL MONEY TRANSFER
    await walletTransfer.transfer(
      dto.fromWalletId,
      dto.toWalletId,
      dto.amount
    )

    return transfer
    transfer.status = "COMPLETED"
  }
}