import { Escrow } from "../entities/escrow.entity"

export interface EscrowRepository {

  save(escrow: Escrow): Promise<void>

  findById(id: string): Promise<Escrow | null>

}