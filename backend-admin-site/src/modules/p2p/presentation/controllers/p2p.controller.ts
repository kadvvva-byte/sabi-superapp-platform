import { Request, Response } from "express"
import { TransferP2PUseCase } from "../../application/use-cases/transfer-p2p.use-case"
import { PrismaP2PRepository } from "../../infrastructure/persistence/prisma-p2p.repository"

const repository = new PrismaP2PRepository()
const useCase = new TransferP2PUseCase(repository)

export async function transferP2P(req: Request, res: Response) {
  const transfer = await useCase.execute(req.body)
  res.json(transfer)
}