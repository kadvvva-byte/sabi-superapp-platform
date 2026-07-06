import { P2PTransfer } from "../entities/p2p-transfer.entity"

export interface P2PRepository {
  save(transfer: P2PTransfer): Promise<void>
  findById(id: string): Promise<P2PTransfer | null>
}